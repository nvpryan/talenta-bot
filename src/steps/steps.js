import puppeteer from "puppeteer";
import login from "./login.js";
import { WEB_URL } from "../config/app.config.js";
import { clockIn, clockOut } from "./attendance.js";

const steps = async (type) => {
  console.log("Automating", type);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  await browser
    .defaultBrowserContext()
    .overridePermissions(WEB_URL, ["geolocation"]);
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setGeolocation({ latitude: -8.6499, longitude: 115.216 });
  await page.goto(WEB_URL);

  console.log("Logging in...");
  await login(page);
  console.log("Logged in");

  // Go to attendance page
  await page.waitForSelector(`a[href="/live-attendance"]`);
  console.log("Going to attendance page");
  await page.click(`a[href="/live-attendance"]`);

  // Clock in/out
  if (type === "clock-in") {
    console.log("Clocking in...");
    await clockIn(page);
    console.log("Clocked in");
  } else {
    console.log("Clocking out...");
    await clockOut(page);
    console.log("Clocked out");
  }
  await browser.close();
};

export default steps;

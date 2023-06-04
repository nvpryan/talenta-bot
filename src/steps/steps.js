import puppeteer from "puppeteer";
import login from "./login.js";
import { WEB_URL } from "../config/app.config.js";
import { clockIn, clockOut } from "./attendance.js";

const steps = async (type) => {
  const browser = await puppeteer.launch({ headless: true });
  await browser
    .defaultBrowserContext()
    .overridePermissions(WEB_URL, ["geolocation"]);
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setGeolocation({ latitude: -8.6499, longitude: 115.216 });
  await page.goto(WEB_URL);

  await login();

  // Go to attendance page
  await page.waitForSelector(`a[href="/live-attendance"]`);
  await page.click(`a[href="/live-attendance"]`);

  // Clock in/out
  if (type === "clock-in") {
    await clockIn(page);
  } else {
    await clockOut(page);
  }
};

export default steps;

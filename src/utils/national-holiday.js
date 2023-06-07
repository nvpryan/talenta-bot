import puppeteer from "puppeteer";
import { WEB_URL } from "../config/app.config.js";
import login from "../steps/login.js";
import Holiday from "../models/Holiday.js";

const getHolidays = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
    ],
  });
  const page = await browser.newPage();
  await page.goto(WEB_URL);

  await page.setViewport({ width: 1280, height: 800 });
  await login(page);

  // Go to calendar page
  await page.waitForSelector(`a[href="/employee/company-calendar"]`);
  await page.click(`a[href="/employee/company-calendar"]`);

  page.on("response", async (response) => {
    if (response.url().includes("get-comp-cal-data")) {
      const data = await response.json();
      data.events.forEach(async (event) => {
        if (event.type === "H" || event.type === "N") {
          Holiday.create({
            title: event.title,
            startDate: event.start,
            daysAmount: event.amount_days,
          });
        }
      });
    }
  });
};

export default getHolidays;

import puppeteer from "puppeteer";
import { WEB_URL } from "../config/app.config.js";
import login from "../steps/login.js";
import Holiday from "../models/Holiday.js";

const getHolidays = async () => {
  console.log("Getting monthly holidays...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(WEB_URL);

  await login(page);

  // Go to calendar page
  await page.waitForSelector(`a[href="/employee/company-calendar"]`);
  await page.click(`a[href="/employee/company-calendar"]`);

  page.on("response", async (response) => {
    if (response.url().includes("get-comp-cal-data") && response.ok()) {
      const headers = response.headers();
      const contentType = headers["content-type"];
      if (contentType && contentType.includes("text/html")) {
        const data = await response.json();
        console.log("Saving monthly holidays...");
        console.log(data.events);
        await data.events.forEach(async (event) => {
          const holiday = await Holiday.findOne({ startDate: event.start });
          if ((event.type === "H" || event.type === "N") && !holiday) {
            Holiday.create({
              title: event.title,
              startDate: event.start,
              daysAmount: event.amount_days,
            });
          }
        });
        console.log("Monthly holidays saved");
        console.log("\n");
        await browser.close();
      }
    }
  });
};

export default getHolidays;

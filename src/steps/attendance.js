const CLOCK_IN_BUTTON = `//span[normalize-space()="Clock In"]/..`;
const CLOCK_OUT_BUTTON = `//span[normalize-space()="Clock Out"]/..`;

/**
 * @param {import("puppeteer").Page} page
 */
const clockIn = async (page) => {
  await page.waitForXPath(CLOCK_IN_BUTTON);
  const [clockInButton] = await page.$x(CLOCK_IN_BUTTON);
  clockInButton.click();
};

const clockOut = async (page) => {
  await page.waitForXPath(CLOCK_OUT_BUTTON);
  const [clockOutButton] = await page.$x(CLOCK_OUT_BUTTON);
  clockOutButton.click();
};

export { clockIn, clockOut };

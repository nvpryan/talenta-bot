import { USERNAME, PASSWORD } from "../config/app.config.js";
import { loadSession } from "../utils/session-handler.js";
/**
 *
 * @param {import('puppeteer').Page} page
 */
const login = async (page) => {
  const userSession = await loadSession();
  if (userSession) {
    console.log("Using saved session");
    await page.setCookie(...userSession);
    await page.reload();
  } else {
    console.log("Using user credentials");
    await page.type("#user_email", USERNAME);
    await page.type("#user_password", PASSWORD);
    await page.click("#new-signin-button");
  }
};

export default login;

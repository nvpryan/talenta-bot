import "dotenv/config";
const WEB_URL = "https://hr.talenta.co";
const { USERNAME, PASSWORD, SENTRY_DSN, NODE_ENV } = process.env;
export { WEB_URL, USERNAME, PASSWORD, SENTRY_DSN, NODE_ENV };

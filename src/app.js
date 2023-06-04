import { SENTRY_DSN } from "./config/app.config.js";
import * as Scheduler from "./scheduler/scheduler.js";
import * as Sentry from "@sentry/node";

const app = async () => {
  Sentry.init({ dsn: SENTRY_DSN, tracesSampleRate: 1.0 });
  Scheduler.initSchedule();
};
app().catch((err) => {
  console.error(err);
  Sentry.captureException(err);
  process.exit(1);
});

import { scheduleJob } from "node-schedule";
import moment from "moment-timezone";
import steps from "../steps/steps";
import getHolidays from "../utils/national-holiday";
import Holiday from "../models/Holiday";

class Scheduler {
  defaultTZ = "Asia/Singapore";
  constructor() {}
  start() {
    scheduleJob(
      "0 9,18 * * *",
      async () => {
        const date = moment().tz(this.defaultTZ);
        const holiday = await Holiday.findOne({
          startDate: date.format("YYYY-MM-DD"),
        });

        if (holiday) {
          return;
        }

        const stepType = "clock-in";
        if (date.hour() === 18 && date.minute() === 0) {
          stepType = "clock-out";
        }
        await steps(stepType);
      },
      { timezone: this.defaultTZ }
    );

    scheduleJob("0 1 1 * *", async () => await getHolidays(), {
      timezone: this.defaultTZ,
    });
  }
}

export default Scheduler;

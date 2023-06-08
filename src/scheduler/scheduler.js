import { scheduleJob, Range, RecurrenceRule } from "node-schedule";
import moment from "moment-timezone";
import steps from "../steps/steps.js";
import getHolidays from "../utils/national-holiday.js";
import Holiday from "../models/Holiday.js";

const DEFAULT_TZ = "Asia/Singapore";

async function attendance() {
  try {
    const date = moment().tz(DEFAULT_TZ);
    const holiday = await Holiday.findOne({
      startDate: date.format("YYYY-MM-DD"),
    });

    if (holiday || date.day() === 0 || date.day() === 6) {
      return;
    }

    let stepType = "clock-in";
    if (date.hour() >= 18) {
      stepType = "clock-out";
    }
    await steps(stepType);
  } catch (err) {
    throw err;
  }
}

async function holiday() {
  try {
    await getHolidays();
  } catch (error) {
    throw error;
  }
}

const initSchedule = () => {
  const ruleAttendance = new RecurrenceRule();
  ruleAttendance.dayOfWeek = [new Range(1, 5)];
  ruleAttendance.hour = [9, 18];
  ruleAttendance.minute = 0;
  ruleAttendance.second = 0;
  ruleAttendance.tz = DEFAULT_TZ;

  const ruleHoliday = new RecurrenceRule();
  ruleHoliday.month = [new Range(0, 11)];
  ruleHoliday.date = 1;

  scheduleJob(ruleAttendance, attendance);
  scheduleJob(ruleHoliday, holiday);
};

export { initSchedule };

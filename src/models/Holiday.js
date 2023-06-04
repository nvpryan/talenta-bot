import db from "../config/database.config.js";

const HolidaySchema = new db.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true, unique: true },
  daysAmount: { type: Number, required: true },
});

const Holiday = db.model("Holiday", HolidaySchema);

export default Holiday;

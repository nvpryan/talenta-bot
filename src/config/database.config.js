import mongoose from "mongoose";
import "dotenv/config";
const { MONGO_URI } = process.env;

await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

export default mongoose;

import mongoose from "mongoose";
import "dotenv/config";
import { MONGO_URI } from process.env;

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

export default db;
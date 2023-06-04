import db from "../config/database.config.js";

const UserSchema = new db.Schema({
  username: { type: String, required: true, unique: true },
  session: { type: String, required: true },
});

const User = db.model("User", UserSchema);

export default User;

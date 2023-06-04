import User from "../models/User.js";
import { USERNAME } from "../config/app.config.js";

const saveSession = async (cookies) => {
  const user = await User.findOne({ username: USERNAME });
  if (user) {
    user.session = JSON.stringify(cookies);
    await user.save();
  } else {
    await User.create({
      username: USERNAME,
      session: JSON.stringify(cookies),
    });
  }
};

const loadSession = async () => {
  const user = await User.findOne({ username: USERNAME });
  return JSON.parse(user.session);
};

export { saveSession, loadSession };

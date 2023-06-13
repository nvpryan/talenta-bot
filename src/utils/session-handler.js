import User from "../models/User.js";
import { USERNAME } from "../config/app.config.js";

const saveSession = async (cookies) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

const loadSession = async () => {
  const _ = await User.findOne({ username: USERNAME });
  // return user ? JSON.parse(user.session) : undefined;
  return undefined; // TODO: Session does not detected for now
};

export { saveSession, loadSession };

import { Request, Response } from "express";
import User from "../modals/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, avatar, password } = req.body;
  try {
    let user = await User.findOne({ email });

    // if user already exist
    if (user) {
      res.status(400).json({ success: false, msg: "User already exists" });
      return;
    }

    // create new user
    user = new User({
      name,
      email,
      password,
      avatar: avatar || "",
    });

    // hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // save user
    await user.save();

    // token
    const token = generateToken(user);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, msg: "Invalid Credentials" });
      return;
    }

    // compare password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, msg: "Invalid Credentials" });
      return;
    }

    // token
    const token = generateToken(user);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export { registerUser, loginUser };

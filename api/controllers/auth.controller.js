import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/ErrorHandler.js";
export async function signup(req, res, next) {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(ErrorHandler(400, "All feilds are required"));
  }
  const hssedPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = new User({
      username,
      email,
      password: hssedPassword,
    });
    await newUser.save();
    res.json("signup successfull !!");
  } catch (error) {
    next(error);
  }
}

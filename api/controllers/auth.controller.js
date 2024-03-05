import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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

export async function sigin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(ErrorHandler(400, "All feilds are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    console.log(validUser)
    if (!validUser) {
      return next(ErrorHandler(400, "User Not Found"));
    }

    const validpassword = bcryptjs.compareSync(password, validUser.password);

    if (!validpassword) {
      return next(ErrorHandler(400, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SEC);

    const {password:pass,...rest} = validUser._doc

    res.status(200).cookie("blog_token", token, { httpOnly: true }).json(rest);

  } catch (error) {
    next(error)
  }
}

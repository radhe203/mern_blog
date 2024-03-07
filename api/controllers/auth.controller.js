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
    if (!validUser) {
      return next(ErrorHandler(400, "User Not Found"));
    }

    const validpassword = bcryptjs.compareSync(password, validUser.password);

    if (!validpassword) {
      return next(ErrorHandler(400, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validUser._id,isAdmin:validUser.isAdmin }, process.env.JWT_SEC);

    const { password: pass, ...rest } = validUser._doc;

    res.status(200).cookie("blog_token", token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
}

export async function google(req, res, next) {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id, isAdmin:existingUser.isAdmin}, process.env.JWT_SEC);

      const { password: pass, ...rest } = existingUser._doc;

      res
        .status(200)
        .cookie("blog_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const genratedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hssedPassword = bcryptjs.hashSync(genratedPassword, 10);
      const username =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4);

      const newUser = new User({
        username,
        email,
        password: hssedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id,isAdmin:newUser.isAdmin }, process.env.JWT_SEC);

      const { password: pass, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("blog_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(ErrorHandler(400,error.message))
  }
}

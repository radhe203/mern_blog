import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "i am working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(ErrorHandler(401, "not allowed"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(ErrorHandler(401, "Not a strong password"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(ErrorHandler(401, "username length must be between 7 to 20 "));
    } else if (req.body.username.includes(" ")) {
      return next(ErrorHandler(401, "username can not contain spaces "));
    } else if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(ErrorHandler(401, "username can only contain numbers and letters "));
    }
  }

  try {
    const update =   await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
    const { password, ...rest } = update._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};




export async function deleteUser(req,res,next){
  if (req.user.id !== req.params.userId) {
    return next(ErrorHandler(401, "not allowed"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("user deleted successfully")
  } catch (error) {
    next(error)
  }
}


export async function signOut(req,res,next){
  try {
    res.clearCookie('blog_token').status(200).json("user has been signed out successfully")
  } catch (error) {
    next(error)
  }
}
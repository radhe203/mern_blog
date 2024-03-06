import Post from "../models/post.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const create = async(req, res, next) => {
  if (!req.user.isAdmin) {
    return next(ErrorHandler(401, "your not allwoed to create a post"))
  }

  if (!req.body.tittle || !req.body.content) {
    return next( ErrorHandler(401, "all feild are required"))
  }

  const slug = req.body.tittle
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/^[a-zA-Z0-9]+$/, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });


  try {
    const savaedPost = await newPost.save()
    res.status(200).json(savaedPost)
  } catch (error) {
    next(error)
  }
};

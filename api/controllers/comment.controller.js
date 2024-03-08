import { ErrorHandler } from "../utils/ErrorHandler.js";
import Comment from "../models/comment.model.js";
export async function createComment(req, res, next) {
  try {
    const { content, postId, userId } = req.body;

    if (req.user.id !== userId) {
      return next(ErrorHandler(401, "not allowed to leave a comment"));
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
}

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

export async function getComments(req, res, next) {
  console.log("all com");
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export async function likeComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(ErrorHandler(404, "comment not found"));
    }
    const userIndex = comment.likes.findIndex((id) => id === req.user.id);

    if (userIndex === -1) {
      comment.likes.push(req.user.id);
      comment.numberOfLikes += 1;
    } else {
      comment.likes.splice(userIndex, 1);
      comment.numberOfLikes -= 1;
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function editComment(req, res, next) {
  console.log(req.body)
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(ErrorHandler(404, "comment not found"));
    }
    if (req.user.id !== comment.userId && !req.user.isAdmin) {
      return next(ErrorHandler(401, "not allowed to edit a comment"));
    }
    const editComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    console.log(editComment);
    res.status(200).json(editComment);
  } catch (error) {
    next(error);
  }
}

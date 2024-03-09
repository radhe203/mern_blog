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
    res.status(200).json(editComment);
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(ErrorHandler(404, "comment not found"));
    }
    if (req.user.id !== comment.userId && !req.user.isAdmin) {
      return next(ErrorHandler(401, "not allowed to delete a comment"));
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("comment has been deleted successfully");
  } catch (error) {
    next(error);
  }
}

export async function getallComment(req, res, next) {
  if (!req.user.isAdmin)
    return next(ErrorHandler(401, "not allowed to get all comments"));

  try {
    const StartIndex = req.query.StartIndex || 0;
    const limit = req.query.limit || 9;
    const sortDirection = req.query.sort === "desc" ? 1 : -1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(StartIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthcomments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      comments,
      totalComments,
      lastMonthcomments,
    });
  } catch (error) {
    next(error);
  }
}

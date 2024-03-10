import Post from "../models/post.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(ErrorHandler(401, "your not allwoed to create a post"));
  }

  if (!req.body.tittle || !req.body.content) {
    return next(ErrorHandler(401, "all feild are required"));
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
    const savaedPost = await newPost.save();
    res.status(200).json(savaedPost);
  } catch (error) {
    next(error);
  }
};

export async function getPosts(req, res, next) {
 
  try {
    console.log(req.query)
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { tittle: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();


    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
}
export async function deletePost(req, res, next) {
  if (!req.user.isAdmin || req.params.userId !== req.user.id) {
    return next(ErrorHandler(401, "you are not allowed to do it"));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("the post has been deleted");
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req, res, next) {
  if (!req.user.isAdmin || req.params.userId !== req.user.id) {
    return next(ErrorHandler(401, "you are not allowed to do it"));
  }

  const newSlug = req.body.tittle
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/^[a-zA-Z0-9]+$/, "-");

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          slug: newSlug,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
}

import express from "express";
import { createComment, editComment, getComments,likeComment } from "../controllers/comment.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();    

router.post('/create',VerifyToken,createComment)
router.get('/getpostcomments/:postId',getComments)
router.put('/likecomment/:commentId',VerifyToken,likeComment)
router.put('/editcomment/:commentId', VerifyToken, editComment)

export default router;                              
import express from "express";
import { createComment, deleteComment, editComment, getComments,getallComment,likeComment } from "../controllers/comment.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();    

router.post('/create',VerifyToken,createComment)
router.get('/getpostcomments/:postId',getComments)
router.put('/likecomment/:commentId',VerifyToken,likeComment)
router.put('/editcomment/:commentId', VerifyToken, editComment)
router.delete('/deletecomment/:commentId', VerifyToken,deleteComment)
router.get('/getallcomments',VerifyToken, getallComment)

export default router;                              
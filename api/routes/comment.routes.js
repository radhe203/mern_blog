import express from "express";
import { createComment, getComments } from "../controllers/comment.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();    

router.post('/create',VerifyToken,createComment)
router.get('/getpostcomments/:postId',getComments)


export default router;                              
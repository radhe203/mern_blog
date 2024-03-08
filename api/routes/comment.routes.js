import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();    

router.post('/create',VerifyToken,createComment)


export default router;                              
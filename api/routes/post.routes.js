import express from "express"
import { VerifyToken } from "../utils/VerifyToken.js"
import { create } from "../controllers/post.controller.js"

const router = express.Router()

router.post('/create',VerifyToken,create)

export default router
import express from "express"
import { VerifyToken } from "../utils/VerifyToken.js"
import { create,getPosts,deletePost } from "../controllers/post.controller.js"
const router = express.Router()


router.post('/create',VerifyToken,create)
router.get('/getposts',getPosts)
router.delete('/delete/:userId/:postId',VerifyToken,deletePost)




export default router
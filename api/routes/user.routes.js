import express from 'express'
import { updateUser, test, deleteUser, signOut } from '../controllers/user.controller.js';
import { VerifyToken } from '../utils/VerifyToken.js';
import { updatePost } from '../controllers/post.controller.js';
const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',VerifyToken,updateUser)
router.delete('/delete/:userId',VerifyToken,deleteUser)
router.post('/updatepost',VerifyToken,updatePost)

export default router;
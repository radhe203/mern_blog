import express from 'express'
import { updateUser, test, deleteUser, signOut } from '../controllers/user.controller.js';
import { VerifyToken } from '../utils/VerifyToken.js';
const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',VerifyToken,updateUser)
router.delete('/delete/:userId',VerifyToken,deleteUser)
router.post('/signout',signOut)


export default router;
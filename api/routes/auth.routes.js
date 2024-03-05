import express from 'express'
import { sigin, signup ,google} from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/signup',signup)
router.post('/signin',sigin)
router.post('/google',google)

export default router;
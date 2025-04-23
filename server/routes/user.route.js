import express from 'express';
import {register ,login, getUser} from '../controllers/index.js';
import {authMiddleware} from '../middlewares/index.js';
const router = express.Router();


router.post('/register', register),
router.post('/login', login);
router.get('/getuser',authMiddleware ,getUser);

export default router
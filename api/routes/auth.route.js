import express from 'express';
import { signUp, signIn } from '../controller/auth.controller.js';

const router = express.Router();

// Sign Up Route
router.post('/signup', signUp);

// Sign In Route
router.post('/signin', signIn);

export default router;

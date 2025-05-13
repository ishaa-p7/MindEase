import express from 'express';
import { getMoods, addMood } from '../controller/mood.controller.js';

const router = express.Router();

router.get('/:userId', getMoods);
router.post('/', addMood);

export default router;


import express from 'express';
import { getMoods, addMood, deleteMood } from '../controller/mood.controller.js';

const router = express.Router();

router.get('/:userId', getMoods);
router.post('/', addMood);
router.delete('/:id', deleteMood);

export default router;


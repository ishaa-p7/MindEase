import express from 'express';
import { getAllBreathingExercises } from '../controller/breathing.controller.js';

const router = express.Router();

router.get('/', getAllBreathingExercises);

export default router;

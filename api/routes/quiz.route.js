import express from 'express';
import {
  getAllQuizzes,
  getQuizById,
  submitQuiz
} from '../controller/quiz.controller.js';

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.post('/submit', submitQuiz);

export default router;

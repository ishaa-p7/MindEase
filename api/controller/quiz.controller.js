import { Quiz } from '../models/quiz.model.js';

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'title');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Submit quiz and get result
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

   const totalScore = answers.reduce((sum, { questionIndex, optionIndex }) => {
  const question = quiz.questions[questionIndex];
  if (!question || !question.options[optionIndex]) return sum;
  return sum + question.options[optionIndex].score;
}, 0);


    const resultCategory = quiz.resultCategories.find(
      (cat) => totalScore >= cat.minScore && totalScore <= cat.maxScore
    );

    if (!resultCategory) {
      return res.status(400).json({ message: 'No matching result category' });
    }

    res.json({
      result: resultCategory.result,
      recommendation: resultCategory.recommendation,
      score: totalScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      text: String,
      score: Number
    }
  ]
});

const QuizSchema = new mongoose.Schema({
  title: String,
  questions: [QuestionSchema],
  resultCategories: [
    {
      minScore: Number,
      maxScore: Number,
      result: String,
      recommendation: String
    }
  ]
});

export const Quiz = mongoose.model('Quiz', QuizSchema);

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import moodRoutes from './routes/mood.route.js';
import authRoutes from './routes/auth.route.js'
import quizRoutes from './routes/quiz.route.js';
import { seedQuizzes } from './utils/seed.js';

dotenv.config();


const app=express();
app.use(express.json());

app.use(cors());

app.use('/api/moods', moodRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

mongoose.connect(process.env.MONGO)
  .then(async () => {
    console.log('✅ MongoDB connected');

    await seedQuizzes();

    app.listen(3000, () => {
      console.log('🚀 Server running on port 3000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
 
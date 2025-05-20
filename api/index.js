import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import moodRoutes from './routes/mood.route.js';
import authRoutes from './routes/auth.route.js'
import quizRoutes from './routes/quiz.route.js';
import { seedQuizzes,seedSounds,seedBreathingExercises } from './utils/seed.js';
import psychiatristRoutes from './routes/psychiatrist.route.js';
import memeRouter from './routes/meme.route.js'
import soundRoutes from './routes/sound.route.js';
import breathingRoute from './routes/breathing.route.js';


dotenv.config();


const app=express();
app.use(express.json());

app.use(cors());

app.use('/api/moods', moodRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/psychiatrists', psychiatristRoutes);
app.use('/api/meme', memeRouter);
app.use('/api/sounds', soundRoutes);
app.use('/api/breathing', breathingRoute);

mongoose.connect(process.env.MONGO)
  .then(async () => {
    console.log('✅ MongoDB connected');

    await seedQuizzes();
    await seedSounds();
await seedBreathingExercises();
    app.listen(3000, () => {
      console.log('🚀 Server running on port 3000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
 
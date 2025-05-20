import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  action: String,
  duration: Number,
  instruction: String,
});

const breathingExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  benefits: { type: String, required: true },
  steps: [stepSchema],
});

export const BreathingExercise = mongoose.model('BreathingExercise', breathingExerciseSchema);

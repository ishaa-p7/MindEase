import { BreathingExercise } from '../models/breathing.model.js';

export const getAllBreathingExercises = async (req, res) => {
  try {
    const exercises = await BreathingExercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch breathing exercises' });
  }
};

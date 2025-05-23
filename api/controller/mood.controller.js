import Mood from '../models/mood.model.js';

// GET all moods for a user
export const getMoods = async (req, res) => {
  const { userId } = req.params;

  try {
    const moods = await Mood.find({ userId });
    res.status(200).json({
      message: 'Moods fetched successfully',
      data: moods
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
};

// ADD a new mood entry
export const addMood = async (req, res) => {
  const { mood, date, userId } = req.body;

  try {
    const newMood = new Mood({ mood, date, userId });
    await newMood.save();
    res.status(201).json({
      message: 'Mood added successfully',
      data: newMood
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add mood' });
  }
};

// DELETE a mood entry by ID
export const deleteMood = async (req, res) => {
  const { id } = req.params;


  try {
    const mood = await Mood.findById(id);

    if (!mood) {
      return res.status(404).json({ error: 'Mood not found' });
    }


    await Mood.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Mood deleted successfully',
      data: mood,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete mood' });
  }
};


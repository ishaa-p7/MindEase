import { Sound } from '../models/sound.js';

export const getAllSounds = async (req, res) => {
  try {
    const sounds = await Sound.find();
    res.status(200).json(sounds);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sounds', error });
  }
};

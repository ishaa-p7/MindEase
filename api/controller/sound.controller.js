import { Sound } from '../models/sound.js';

export const getAllSounds = async (req, res) => {
  try {
    const sounds = await Sound.find();

    // Attach filenames manually (based on some logic or naming convention)
    const soundsWithFiles = sounds.map((sound) => ({
      ...sound.toObject(),
      filename: `${sound.name.toLowerCase()}.mp3`, // assuming filename matches sound name
    }));

    res.json(soundsWithFiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sounds" });
  }
};


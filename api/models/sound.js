import mongoose from 'mongoose';

const soundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  duration: String,
});

export const Sound = mongoose.model('Sound', soundSchema);

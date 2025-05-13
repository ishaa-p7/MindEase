import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;

import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious', 'excited', 'neutral'],
  },
  note: {
    type: String,
  },
}, {
  timestamps: true  // ✅ This adds createdAt and updatedAt automatically
});

const Mood = mongoose.model('Mood', moodSchema);
export default Mood;


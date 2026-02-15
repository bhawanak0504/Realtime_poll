import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  pollId: { type: String, unique: true },
  question: String,
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 }
    }
  ],
  voters: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Poll", pollSchema);
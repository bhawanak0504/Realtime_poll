import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";
import Poll from "./models/Poll.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL }
});

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const voteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many votes from this IP" }
});

app.post("/create", async (req, res) => {
  const { question, options } = req.body;

  if (!question || options.length < 2) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const poll = await Poll.create({
    pollId: uuidv4(),
    question,
    options: options.map(opt => ({ text: opt })),
    voters: []
  });

  res.json({ link: `/poll/${poll.pollId}` });
});

app.get("/poll/:id", async (req, res) => {
  const poll = await Poll.findOne({ pollId: req.params.id });
  if (!poll) return res.status(404).json({ error: "Poll not found" });

  res.json(poll);
});

app.post("/vote/:id", voteLimiter, async (req, res) => {
  const { optionIndex, voterId } = req.body;

  const poll = await Poll.findOne({ pollId: req.params.id });
  if (!poll) return res.status(404).json({ error: "Poll not found" });

  if (poll.voters.includes(voterId)) {
    return res.status(400).json({ error: "You already voted" });
  }

  if (!poll.options[optionIndex]) {
    return res.status(400).json({ error: "Invalid option" });
  }

  poll.options[optionIndex].votes += 1;
  poll.voters.push(voterId);

  await poll.save();

  io.to(poll.pollId).emit("updateResults", poll.options);

  res.json({ success: true });
});

io.on("connection", socket => {
  socket.on("joinPoll", pollId => {
    socket.join(pollId);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
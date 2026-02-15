import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import API from "./api";

const socket = io(API);

export default function PollRoom() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voterId, setVoterId] = useState("");

  useEffect(() => {
    let storedId = localStorage.getItem("voterId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("voterId", storedId);
    }
    setVoterId(storedId);

    axios.get(`${API}/poll/${id}`)
      .then(res => setPoll(res.data));

    socket.emit("joinPoll", id);

    socket.on("updateResults", (options) => {
      setPoll(prev => ({ ...prev, options }));
    });

    return () => socket.off("updateResults");
  }, [id]);

  const vote = async (index) => {
    try {
      await axios.post(`${API}/vote/${id}`, {
        optionIndex: index,
        voterId
      });
      setVoted(true);
    } catch (err) {
      alert(err.response?.data?.error || "Error voting");
    }
  };

  if (!poll) return <p>Loading...</p>;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  const maxVotes = Math.max(...poll.options.map(opt => opt.votes));

return (
  <div className="card">
    <h2>{poll.question}</h2>

    <p style={{ marginBottom: "15px", fontWeight: "bold" }}>
      Total Votes: {totalVotes}
    </p>

    {poll.options.map((opt, i) => {
      const percent = totalVotes
        ? ((opt.votes / totalVotes) * 100).toFixed(1)
        : 0;

      return (
        <div
          key={i}
          className={`option ${opt.votes === maxVotes && maxVotes > 0 ? "winner" : ""}`}
        >

          <button disabled={voted} onClick={() => vote(i)}>
            {opt.text}
          </button>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percent}%` }}
            />
          </div>

          <small>{opt.votes} votes ({percent}%)</small>
        </div>
      );
    })}
  </div>
);
}
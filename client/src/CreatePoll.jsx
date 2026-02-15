import { useState } from "react";
import axios from "axios";
import API from "./api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const createPoll = async () => {
    setError("");

    // Basic validation
    const filteredOptions = options.filter(opt => opt.trim() !== "");

    if (!question.trim()) {
      setError("Question cannot be empty");
      return;
    }

    if (filteredOptions.length < 2) {
      setError("At least 2 valid options are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/create`, {
        question,
        options: filteredOptions
      });

      setLink(window.location.origin + res.data.link);
    } catch (err) {
      setError("Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card">
      <h2>Create Poll</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Enter poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((opt, i) => (
  <div key={i} style={{ display: "flex", gap: "10px" }}>
    <input
      placeholder={`Option ${i + 1}`}
      value={opt}
      onChange={(e) => {
        const newOpts = [...options];
        newOpts[i] = e.target.value;
        setOptions(newOpts);
      }}
    />

    {options.length > 2 && (
      <button
        type="button"
        onClick={() => {
          const newOpts = options.filter((_, index) => index !== i);
          setOptions(newOpts);
        }}
      >
        ❌
      </button>
    )}
  </div>
 ))}
      <button onClick={() => setOptions([...options, ""])}>
        Add Option
      </button>

      <button onClick={createPoll} disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </button>

      {link && (
        <div className="link-box">
          <p>Poll created! Share the link:</p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="poll-link"
          >
            {link}
          </a>

          <button onClick={copyLink}>
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
}
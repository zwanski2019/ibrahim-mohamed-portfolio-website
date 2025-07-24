// components/GPTAssistant.tsx

"use client";
import { useState } from "react";

const TOOLS = [
  { id: "chatbot", label: "💬 Chatbot" },
  { id: "resume", label: "📝 Resume Enhancer" },
  { id: "blog", label: "📰 Blog Intro Generator" },
  { id: "code", label: "💡 Code Explainer" },
];

export default function GPTAssistant() {
  const [tool, setTool] = useState("chatbot");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResponse("Thinking...");

    const res = await fetch(`https://api.zwanski.org/api/ai-tools`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, prompt: input }),
    });

    const data = await res.json();
    setResponse(data.result || "No response received.");
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-white rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold text-center">Zwanski AI Assistant</h1>

      <div className="flex gap-2 justify-center">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            className={`px-3 py-1 rounded ${
              tool === t.id ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTool(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            tool === "chatbot"
              ? "Ask a question..."
              : tool === "resume"
              ? "Paste your resume text..."
              : tool === "blog"
              ? "What's your blog topic?"
              : "Paste your code here..."
          }
          rows={5}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate
        </button>
      </form>

      {response && (
        <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}

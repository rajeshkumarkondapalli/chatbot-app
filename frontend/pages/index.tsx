import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ query: string; response: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_query: input, bot_response: "This is a bot response" }),
    });

    const data = await res.json();
    setMessages([...messages, { query: input, response: data.response }]);
    setInput("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Chatbot</h1>
      <div className="border p-2 h-64 overflow-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <p><strong>User:</strong> {msg.query}</p>
            <p><strong>Bot:</strong> {msg.response}</p>
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full mt-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="mt-2 p-2 bg-blue-500 text-white" onClick={sendMessage}>Send</button>
    </div>
  );
}

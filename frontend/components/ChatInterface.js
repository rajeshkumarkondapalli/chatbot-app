import { useState, useEffect } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage = { text: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputValue('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      const botResponse = { text: data.response, sender: 'bot' };
      setMessages([...messages, newMessage, botResponse]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = { text: "Error communicating with the server.", sender: 'bot' };
      setMessages([...messages, newMessage, errorResponse]);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
      <div style={{ marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '5px',
              padding: '8px',
              borderRadius: '5px',
              backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#ECE5DD',
              textAlign: message.sender === 'user' ? 'right' : 'left',
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flexGrow: 1, padding: '8px', marginRight: '10px' }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;

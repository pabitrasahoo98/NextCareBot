import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I have a few questions for you. Please provide your answers below.", sender: "bot" }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState([]);
  
  const chatAreaRef = useRef(null);

  // Array of questions to be asked
  const questions = [
    { text: "What is your name?" },
    { text: "What is your age?" },
    { text: "What is your favorite color?" },
    { text: "What is your occupation?" },
    { text: "Where do you live?" }
  ];

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = async () => {
    if (!userInput) return;

    // Add user input to the answers array and to the messages
    setAnswers([...answers, userInput]);
    setMessages([...messages, { text: userInput, sender: "user" }]);

    // Simulate "saving the answer" message (i.e., mimicking an API call response)
    setMessages((prev) => [
      ...prev,
      { text: `Answer "${userInput}" saved successfully!`, sender: "bot" }
    ]);

    // Move to the next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setMessages((prev) => [
        ...prev,
        { text: "Thank you for answering all the questions!", sender: "bot" }
      ]);
    }

    // Bot response to the next question
    setMessages((prev) => [
      ...prev,
      { text: questions[currentQuestionIndex + 1]?.text || "All questions answered!", sender: "bot" }
    ]);

    // Reset user input
    setUserInput("");
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <h1>Chatbot</h1>
      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Text input for answering the current question */}
      {currentQuestionIndex < questions.length && (
        <div>
          <div className="question-text">{questions[currentQuestionIndex].text}</div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="text-input"
            placeholder="Enter your answer"
          />
          <button onClick={handleSend} className="send-button" disabled={!userInput}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css"; // Import the CSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I have a few questions for you. Please select answers from the dropdown.", sender: "bot" }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dropdownInput, setDropdownInput] = useState("");
  const [answers, setAnswers] = useState([]);
  
  const chatAreaRef = useRef(null);

  // Array of questions to be asked
  const questions = [
    { text: "What is your name?", options: ["John", "Jane", "Other"] },
    { text: "What is your age?", options: ["Under 18", "18-25", "26-35", "36-45", "46+"] },
    { text: "What is your favorite color?", options: ["Red", "Blue", "Green", "Yellow"] },
    { text: "What is your occupation?", options: ["Student", "Employed", "Self-employed", "Unemployed"] },
    { text: "Where do you live?", options: ["USA", "Canada", "UK", "Australia", "Other"] }
  ];

  const handleDropdownChange = (event) => {
    setDropdownInput(event.target.value);
  };

  const handleSend = async () => {
    if (!dropdownInput) return;
    console.log(answers);
    console.log(messages);

    // Add user input to the answers array and to the messages
    setAnswers([...answers, dropdownInput]);
    setMessages([...messages, { text: dropdownInput, sender: "user" }]);

    // Check if the answer is "John" and display a special message
    if (currentQuestionIndex === 0 && dropdownInput === "John") {
      // Display a special message for "John"
      setMessages((prev) => [
        ...prev,
        { text: `Welcome, ${dropdownInput}!`, sender: "bot" }
      ]);
    } else {
      // Simulate "saving the answer" message (i.e., mimicking an API call response)
      setMessages((prev) => [
        ...prev,
        { text: `Answer "${dropdownInput}" saved successfully!`, sender: "bot" }
      ]);
    }

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

    // Reset dropdown input
    setDropdownInput("");
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

      {/* Dropdown for answering the current question */}
      {currentQuestionIndex < questions.length && (
        <div>
          <div className="question-text">{questions[currentQuestionIndex].text}</div>
          <select
            value={dropdownInput}
            onChange={handleDropdownChange}
            className="select-dropdown"
          >
            <option value="">Select an answer</option>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={handleSend} className="send-button" disabled={!dropdownInput}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

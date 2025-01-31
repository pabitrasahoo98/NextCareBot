import React, { useState, useEffect, useRef } from "react";
import axios from "axios";  
import "./Chatbot.css";
import { useNavigate } from "react-router-dom";


const API_URL = "http://127.0.0.1:8080/MessageCreate";

const Chatbot = () => {
  const navigate=useNavigate();
  const userId = localStorage.getItem('userId');
  const [messages, setMessages] = useState([
    { text: "Hi! I am NextCare Bot. By answering a few questions, I can assist you regarding your health condition.", sender: "bot", is_bot: true }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  
  const chatAreaRef = useRef(null);

  const questions = [
    { text: "Are you experiencing a headache right now or recently?", options: ["Yes", "No"] },
    { text: "How long has your headache lasted?", options: ["Less than 1 hour", "1-3 hours", "More than 3 hours"] },
    { text: "When did your headache start?", options: ["Today", "Yesterday", "Earlier this week"] },
    { text: "Where is the pain located?", options: ["Front of the head", "Side of the head", "Back of the head", "Whole head"] },
    { text: "What does your headache feel like?", options: ["Sharp", "Dull", "Throbbing", "Pressure"] },
    { text: "Do you have any of these symptoms with your headache?", options: ["Nausea", "Dizziness", "Vision changes", "None of the above"] },
    { text: "Do you have any of these conditions or recent events?", options: ["High blood pressure", "Stress", "Cold/Flu", "None of the above"] },
    { text: "Are you able to check your temperature and blood pressure?", options: ["Yes", "No"] },
    { text: "Headache Frequency and Chronicity", options: ["Occasional", "Frequent", "Chronic"] }
  ];

  const handleRadioChange = (event) => {
    setUserInput(event.target.value); // Set selected radio button value as user input
  };

  const handleViewResponses = () => {
    navigate(`/responses/${userId}`);
  };

  const handleSend = async () => {
    if (!userInput) return;

    // Add the bot's question first to the database
    await postResponse(questions[currentQuestionIndex].text, "", true);  // Posting the bot's question (with is_bot: true)

    // Add the user's response to the messages array
    const userMessage = { text: userInput, sender: "user", is_bot: false };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Post the user's response to the API (after bot's question)
    await postResponse(questions[currentQuestionIndex].text, userInput, false);  // Posting the user's answer (with is_bot: false)

    // Move to the next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Thank you for answering all the questions!", sender: "bot", is_bot: true }
      ]);
    }

    // Reset user input
    setUserInput("");
  };

  // Function to post responses (both bot and user messages)
  const postResponse = async (question, response, isBot = false) => {
    try {
      const payload = {
        user_id: userId,  // Ensure the correct userId is passed
        message: isBot ? question : response,  // Send the question (if bot) or the response (if user)
        is_bot: isBot,  // Whether the message is from the bot or user
      };

      // Send the POST request to the correct API endpoint
      const res = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json', // Specify that you're sending JSON data
        }
      });

      if (res.status === 201) {
        console.log(isBot ? "Question sent successfully to the API" : "User response sent successfully to the API");
      } else {
        console.error("Failed to save response");
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <h1>Chatbot</h1>

      <div className="chat-area" ref={chatAreaRef}>
        {/* Display all messages */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Display the current question and options for the user */}
      {currentQuestionIndex < questions.length && (
        <div className="question-container">
          <div className="question-text">{questions[currentQuestionIndex].text}</div>
          
          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="radio-option">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="answer"
                  value={option}
                  checked={userInput === option}
                  onChange={handleRadioChange}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
          </div>

          <button
            onClick={handleSend}
            className="send-button"
            disabled={!userInput}
          >
            Send
          </button>
        </div>
        
      )}
      {currentQuestionIndex >= questions.length && (
        <button onClick={handleViewResponses} className="view-responses-button">
          View All Responses
        </button>
      )}
    </div>
  );
};

export default Chatbot;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";  
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";

const API_URL = "http://127.0.0.1:8080/MessageCreate";

const Chatbot = () => {
  const navigate = useNavigate();
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
    setUserInput(event.target.value);
  };

  const handleViewResponses = () => {
    navigate(`/response/${userId}`);
  };

  const handleSend = async () => {
    const botQuestion = questions[currentQuestionIndex].text;
    if (!userInput) return;

    if (currentQuestionIndex === 0 && userInput === "No") {
      
      window.location.reload();  
      return;  
    }
     
    const botMessage = { text: botQuestion, sender: "bot", is_bot: true };
    setMessages(prevMessages => [...prevMessages, botMessage]);
    
    await postResponse(questions[currentQuestionIndex].text, "", true);  

    
    const userMessage = { text: userInput, sender: "user", is_bot: false };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    
    await postResponse(questions[currentQuestionIndex].text, userInput, false);  

    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Thank you for answering all the questions!", sender: "bot", is_bot: true }
      ]);
    }

    
    setUserInput("");
  };

  
  const postResponse = async (question, response, isBot = false) => {
    try {
      const payload = {
        user_id: userId,  
        message: isBot ? question : response,  
        is_bot: isBot,  
      };

      
      const res = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json', 
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

      {currentQuestionIndex >= 5 && (
        <button onClick={handleViewResponses} className="view-responses-button">
          View Your Responses
        </button>
      )}
    </div>
  );
};

export default Chatbot;

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
    { text: "Hello! I’m your health assistant. could we begin?", options: ["Yes", "No"] },
    { text:"could you tell me your age?",options:["10-20","21-40","41-60"]},
    { text: "Thank you! Could you please tell me your gender? ", options: ["male", "female","other","prefer not to say"] },
    { text:"Do you have any known allergies or sensitivities?" , options: ["Yes", "No"] },
    { text:"Please give  the name of  allergy you have" , options: ["Chemical allergy", "Penicillin allergy","Pollen allergy","Other"] },
    { text:"Do you have any pre-existing medical conditions or are you currently taking any medications? " , options: ["yes", "No"] },
    { text:"What is your primary concern today or what symptoms have you been experiencing?" , options: ["Allergic reactions", "Respiratory symptoms","Digestive issues","Other concerns"] },
    { text:"Have you experienced any recent weight changes, such as unexplained weight loss or gain? " , options: ["yes", "No"] },
    { text:"Have you been feeling more tired than usual lately? " , options: ["yes", "No"] },
    { text:"Have you noticed any changes in your appetite or eating habits? " , options: ["yes", "No"] },
    { text:"Do you regularly engage in any physical activity or exercise?" , options: ["yes", "No"] },
    { text:"How often do you exercise, and what type of activity do you do?" , options: ["Daily exercise", "Several times a week","Occasionally","Rarely or never"] },
    { text:"Do you smoke or use any tobacco products? " , options: ["yes", "No"] },
    { text: "Do you consume alcohol or any other substances?", options: ["Yes", "No"] },
    { text: "How would you rate your overall stress levels?", options: ["Low (1-3)", "Moderate (4-6)", "High (7-8)", "Very high (9-10)"] },
    { text: "How many hours of sleep do you get on average per night?", options: ["Less than 4", "4-6", "7-8", "More than 8"] },
    { text: "Have you experienced any pain or discomfort in your chest or shortness of breath?", options: ["Yes", "No"] },
    { text: "Do you have a family history of any chronic diseases?", options: ["Diabetes", "Heart Disease", "Cancer", "Other"] },
    { text: "Do you have any upcoming doctor visits, lab tests, or procedures?", options: ["Yes", "No"] },
    { text: "Are you experiencing any feelings of anxiety, depression, or stress?", options: ["Yes", "No"] },
    { text: "Would you like to receive regular health tips and updates?", options: ["Yes", "No"] },

    { text: "Would you like to set up a follow-up reminder for these symptoms?", options: ["Yes", "No"] },
    { text: "Would you like to send your health data and symptom summary to your doctor or healthcare provider?", options: ["Yes", "No"] },
    { text: "Would you like to track your symptoms and health progress over time?", options: ["Yes", "No"] },
    { text: "How would you rate this chatbot's assistance today?", options: ["Very helpful", "Somewhat helpful", "Neutral", "Not helpful"] }

 
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

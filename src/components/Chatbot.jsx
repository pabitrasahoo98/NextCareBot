import React, { useState, useEffect, useRef } from "react";
import axios from "axios";  // Import axios
import "./Chatbot.css";

// Replace this with your actual API endpoint
const API_URL = "https://yourapi.com/endpoint"; 

const Chatbot = ({ userId }) => {  // Assuming userId is passed as a prop
  const [messages, setMessages] = useState([
    { text: "Hi! I am NextCare Bot. By answering a few questions, I can assist you regarding your health condition.", sender: "bot", is_bot: true }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false); // State for bot typing indicator

  const chatAreaRef = useRef(null);

  // Array of questions to be asked, each with predefined options
  const questions = [
    { text: "Are you experiencing a headache right now or recently?", options: ["Yes", "No"] },
    { text: "How long has your headache lasted?", options: ["Less than 30 minutes", "30 minutes to 4 hours", "4 hours to 72 hours", "More than 72 hours"] },
    { text: "When did your headache start?", options: ["Gradual onset", "Sudden onset"] },
    { text: "Where is the pain located?", options: ["One side of the head (unilateral)", "Both sides of the head (bilateral)", "Back of the head and neck", "Forehead and behind the eyes", "All over the head"] },
    { text: "What does your headache feel like?", options: ["Throbbing or pulsing", "Dull, aching pain", "Sharp or stabbing pain", "Pressure-like or tightening"] },
    { text: "Do you have any of these symptoms with your headache?", options: ["Nausea or vomiting", "Sensitivity to light (photophobia)", "Sensitivity to sound (phonophobia)", "Aura or visual disturbances", "Neck stiffness", "Fever"] },
    { text: "Do you have any of these conditions or recent events?", options: ["Recent head injury or trauma", "Hypertension (high blood pressure)", "Pregnancy or recent childbirth", "Cancer or immune suppression", "History of stroke or brain aneurysm", "Family history of migraines or neurological disorders"] },
    { text: "Headache Frequency and Chronicity", options: ["Rarely (less than once a month)", "Occasionally (1-4 times a month)", "Frequently (more than 4 times a month)", "Daily or nearly daily"] }
  ];

  const handleRadioChange = (event) => {
    setUserInput(event.target.value); // Set selected radio button value as user input
  };

  const handleSend = async () => {
    if (!userInput) return;

    // Add user input to the messages array with is_bot flag as false
    const userMessage = {
      text: userInput,
      sender: "user",
      is_bot: false
    };

    setMessages([...messages, userMessage]);

    // Simulate bot typing delay
    setIsBotTyping(true);

    // Simulate bot's response delay
    setTimeout(async () => {
      setIsBotTyping(false);

      // Move to the next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for answering all the questions!", sender: "bot", is_bot: true }
        ]);
      }

      // Bot response to the next question
      setMessages((prev) => [
        ...prev,
        { text: questions[currentQuestionIndex + 1]?.text || "All questions answered!", sender: "bot", is_bot: true }
      ]);

      // Reset user input
      setUserInput("");

      // Send both question and user response to the server
      await postResponse(questions[currentQuestionIndex].text, userInput);
    }, 1000); // Simulate a 1-second delay
  };

  // Function to make the POST request using axios
  const postResponse = async (question, response) => {
    try {
      const payload = {
        user_id: userId,  // User ID to link the message to the user
        message: response,  // User's selected answer
        is_bot: false,  // This is a user message
      };

      // Send the user response to the backend
      const res = await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          // You can add other headers here (e.g., authorization token) if needed
        }
      });

      // Check the response status
      if (res.status === 200) {
        console.log("Response saved successfully");
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

        {/* Display "Bot is typing..." while waiting for bot response */}
        {isBotTyping && (
          <div className="message bot">
            <span className="message-text">Bot is typing...</span>
          </div>
        )}
      </div>

      {/* Radio buttons for answering the current question */}
      {currentQuestionIndex < questions.length && !isBotTyping && (
        <div>
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
    </div>
  );
};

export default Chatbot;

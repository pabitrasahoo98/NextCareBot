import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "./Response.css";

const Responses = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Use template literals to insert the user ID into the URL correctly
        const res = await axios.get(`http://127.0.0.1:8080/message/${id}`);
        if (res.status === 200) {
          setResponses(res.data); // Set responses data from the API
        } else {
          console.error("Failed to fetch responses");
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    if (id) {
      fetchMessages(); // Fetch messages if the user ID is available
    }
  }, [id]); // Re-run the effect if the ID changes

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="responses-container">
      <h1> User Responses</h1>
      <div className="responses-list">
        {responses.length === 0 ? (
          <p>No responses available yet.</p> // Display a message if there are no responses
        ) : (
          responses.map((response, index) => (
            <div key={index} className="response-item">
              <strong>{response.is_bot ? "Bot" : "User"}:</strong> {response.message}
            </div>
          ))
        )}
      </div>

      <button onClick={handleBackToHome} className="back-to-chatbot-button">
        Back to Home
      </button>
    </div>
  );
};

export default Responses;

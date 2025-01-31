import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "./Response.css";

const Responses = () => {
  const { id } = useParams();
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();  
  const [responses, setResponses] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8080/message/${id}`);
        if (res.status === 200) {
          setResponses(res.data); 
        } else {
          console.error("Failed to fetch responses");
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);  
      }
    };

    if (id) {
      fetchMessages();  
    }
  }, [id]); 

  const handleBackToHome = () => {
    navigate('/');  
  };

  // Function to format the date into dd/mm/yyyy format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');  // Adds leading zero if day < 10
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;  // Format as dd/mm/yyyy
  };

  return (
    <div className="responses-container">
      <h1>User Responses</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="responses-list">
          {responses.length === 0 ? (
            <p>No responses available yet.</p> 
          ) : (
            responses.map((response) => (
              <div key={response.id} className="response-item">
                <strong>{response.is_bot ? "Bot" : userName}:</strong> {response.message}
                <div className="response-date">
                  <em>{formatDate(response.created_at)}</em>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <button onClick={handleBackToHome} className="back-to-chatbot-button">
        Back to Home
      </button>
    </div>
  );
};

export default Responses;

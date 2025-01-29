import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobile || !password) {
      setErrorMessage('Both fields are required');
      return;
    }

    // Preparing the user data to send in the POST request
    const userData = {
      mobile: mobile,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8080/login', userData);  // Replace with your API endpoint
      if (response.status === 200) {
        console.log(response)
        setErrorMessage('');
        navigate('/');
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No:</label>
          <input
            type="text"  // Use 'text' instead of 'number' to allow for 10-digit mobile input
            id="mob"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <a onClick={handleSignup}>Sign Up</a></p>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
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
        alert("Login successfull")
        const { user_id, user_name } = response.data; 

          // Store id and name in localStorage
          localStorage.setItem('userId', user_id); 
          localStorage.setItem('userName', user_name); 
        setErrorMessage('');
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('invalid Credentials');
        alert('invalid Credentials');
      }else {
      console.error('There was an error logging in:', error);
      alert("Please try again ")
      setErrorMessage(' Please try again.');
      }
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate(); 
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobile || !password) {
      setErrorMessage('Both fields are required');
      return;
    }
   
  };

  const handleSignup= () => {

    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No:</label>
          <input
            type="number"
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

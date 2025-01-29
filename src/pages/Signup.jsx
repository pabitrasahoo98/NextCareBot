import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validation function
  const validateForm = () => {
    // Name validation (non-empty and min 3 characters)
    if (name.trim().length < 3) {
      setErrorMessage('Name should be at least 3 characters long.');
      return false;
    }

    // Mobile number validation (exactly 10 digits)
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }

    // Password validation (minimum 8 characters, at least one digit)
    const passwordPattern = /^(?=.*\d).{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one digit.');
      return false;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    // Clear error message if validation passes
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If form is valid, navigate to login page
      navigate('/login');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Optional function to format mobile input (auto-formatting with dashes)
  const handleMobileChange = (e) => {
    const formattedMobile = e.target.value.replace(/[^\d]/g, ''); // Remove non-digit characters
    setMobile(formattedMobile.slice(0, 10)); // Limit input to 10 digits
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={handleMobileChange}
            maxLength={10} // Optional, just in case the user tries to paste more than 10 digits
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a onClick={handleLogin}>Log In</a></p>
    </div>
  );
};

export default Signup;

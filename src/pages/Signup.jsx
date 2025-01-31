import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios'; 

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  
  const validateForm = () => {
    if (name.trim().length < 3) {
      setErrorMessage('Name should be at least 3 characters long.');
      return false;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }

    const passwordPattern = /^(?=.*\d).{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one digit.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); 

      const userData = {
        name,
        dob,
        gender,
        mobile,
        password,
      };

      try {
        const response = await axios.post('http://127.0.0.1:8080/users', userData);

        if (response.status === 201) {
          setLoading(false); 
          setErrorMessage('');
          const { user_id, user_name } = response.data; 

          localStorage.setItem('userId', user_id); 
          localStorage.setItem('userName', user_name); 
          alert('Sign-up successful!');
          navigate('/');
          setName('');
          setDob('');
          setGender('');
          setMobile('');
          setPassword('');
          setConfirmPassword('');
        }
       
      } catch (error) {
        setLoading(false); 
  
      
        if (error.response && error.response.status === 400) {
          setErrorMessage('A user with this mobile number already exists.');
          alert('A user with this mobile number already exists.');
          navigate("/login")
        } else {
          console.error('There was an error submitting the form:', error);
          setErrorMessage('An error occurred. Please try again later.');
        }
    }
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleMobileChange = (e) => {
    const formattedMobile = e.target.value.replace(/[^\d]/g, '');
    setMobile(formattedMobile.slice(0, 10)); 
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
            maxLength={10}
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

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p>Already have an account? <a onClick={handleLogin}>Log In</a></p>
    </div>
  );
};

export default Signup;

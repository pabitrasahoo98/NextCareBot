import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Chatbot from "../components/Chatbot"; // Your Chatbot component
import "./Home.css";
import hero from "../public/hero.png";
import ministry from "../public/ministry.png";
import nidhi from "../public/Nidhi.png";
import step1 from "../public/step1.png";
import step2 from "../public/step2.png";
import step3 from "../public/step3.png";
import hw from "../public/hw.png";
import digi from "../public/digi.png";
import instagram from "../public/instagram.png";
import linkedin from "../public/linkedin.png";
import twitter from "../public/twitter.png";
import verified from "../public/verified.png";
import cc from "../public/credit-card.png";

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false); // State to toggle between home and chatbot
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleToggle = () => {
    setShowChatbot(!showChatbot); // Toggle between showing home and chatbot
  };

  return (
    <div>
      <header>
        <nav>
          <div className="logo">
            <span className="logo-text">NC</span>
            <span className="beta">Beta</span>
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">ABDM</a></li>
            <li><a href="#">Health Feed</a></li>
            <li><a href="#">Meds&Lab</a></li>
          </ul>
          <button className="login-btn" onClick={handleLogin}>Login</button>
        </nav>
      </header>

      <main>
        {/* Toggle Button to Show Chatbot */}
        <button className="toggle-chatbot-btn" onClick={handleToggle}>
          {showChatbot ? "Back to Home" : "Go to Chatbot"}
        </button>

        {/* Display Home content or Chatbot based on the toggle */}
        {showChatbot ? (
          <Chatbot />
        ) : (
          <div>
            <div className="hero">
              <div className="hero-content">
                <h1>Welcome to the Future Of Care</h1>
                <p>Organize your health history by uploading and securely storing all your medical records in one place.</p>
                <button className="get-started-btn">Get Started</button>
              </div>
              <div className="hero-image">
                <img src={hero} alt="Nextcare" />
              </div>
            </div>

            <div className="supporters">
              <p>Supported by Department of Science & Technology (DST)</p>
              <div className="supporter-logos">
                <img src={ministry} alt="DST Logo" />
                <img src={nidhi} alt="NIDHI PRAVAH Logo" />
              </div>
            </div>

            <section className="how-to-use">
              <h2>How to Use</h2>
              <div className="steps-container">
                <div className="step">
                  <img src={step1} alt="Upload prescription" />
                  <p>Step 1: Upload your prescription.</p>
                </div>
                <div className="step">
                  <img src={step2} alt="Process prescription" />
                  <p>Step 2: We will work on it.</p>
                </div>
                <div className="step">
                  <img src={step3} alt="Receive digital prescription" />
                  <p>Step 3: Receive your digital prescription.</p>
                </div>
              </div>
            </section>

            <section className="comparison">
              <h2>Handwritten vs. Digital Prescriptions</h2>
              <div className="comparison-container">
                <div className="comparison-item">
                  <img src={hw} alt="Handwritten prescription" />
                  <p>Handwritten prescriptions can be unclear and difficult to read, increasing the chances of errors.</p>
                </div>
                <div className="comparison-item">
                  <img src={digi} alt="Digital prescription" />
                  <p>Digital prescriptions are clear, accurate, and can be easily shared with pharmacies, reducing errors.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section company-info">
            <div className="footer-logo">
              <span className="logo-text" style={{ fontSize: "6vmax", margin: "auto" }}>
                NC
              </span>
              <span className="beta">Beta</span>
            </div>
            <p className="company-name">
              By <span style={{ color: "black" }}> Stats&Facts Technologies Pvt. Ltd.</span>
            </p>
            <div className="contact-info">
              <p>
                Email{" "}
                <span style={{ color: "black" }}>
                  <a href="#" style={{ textDecoration: "none", color: "black" }}>
                    support@nextcare.life
                  </a>
                </span>
              </p>
              <p>
                Phone{" "}
                <span style={{ color: "black" }}>
                  <a href="#" style={{ textDecoration: "none", color: "black" }}>
                    (+91) 91244 16966
                  </a>
                </span>
              </p>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h3>Calculators</h3>
              <ul>
                <li><a href="#">BMI</a></li>
                <li><a href="#">BMR</a></li>
                <li><a href="#">Blood Pressure Risk</a></li>
                <li><a href="#">Pregnancy Due Date</a></li>
                <li><a href="#">Diabetes Risk</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Get Started</h3>
              <ul>
                <li><a href="#">HCR</a></li>
                <li><a href="#">Why nextcare.life</a></li>
                <li><a href="#">How it Works</a></li>
                <li><a href="#">Our Story</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Health Feed</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="trust-bar">
          <div className="trust-items">
            <div className="trust-item">
              <img src={verified} alt="verified" style={{ height: "20px", width: "20px", filter: "brightness(0) invert(1)" }} />
              <span>100% Authentic</span>
            </div>
            <div className="trust-item">
              <img src={cc} alt="credit card" style={{ height: "20px", width: "20px", filter: "brightness(0) invert(1)" }} />
              <span>Secure Payments</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>copyright &copy; 2025 <br /> Stats & Facts Technologies Pvt. Ltd.</p>
            <div className="footer-links">
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Refund & Cancellation Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

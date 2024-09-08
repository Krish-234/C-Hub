import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Components/UserContext.jsx";
import "./Homepage.css";

const Homepage = () => {
  const [login, setLogin] = useState(false); // Track login mode, initially false
  const [showForm, setShowForm] = useState(false); // Form is hidden at the start
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeButton, setActiveButton] = useState(null); // Track which button is active (login/signup)

  const handleLoginClick = () => {
    setShowForm(true); // Show form when login is clicked
    setLogin(true);
    setActiveButton("login"); // Set login button as active
  };

  const handleSignupClick = () => {
    setShowForm(true); // Show form when signup is clicked
    setLogin(false);
    setActiveButton("signup"); // Set signup button as active
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Login validation logic
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }
    console.log("Logging in with", { email, password });
    // Add your login API call or validation here
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Signup validation logic
    if (!email || !password || !confirmedPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmedPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Signing up with", { email, password });
    // Add your signup API call or validation here
  };

  return (
    <div className="app_home-container">
      <h1>Welcome to C-hub!</h1>
      <p>Fill in the details and Get started !</p>
      <div className="login-buttons">
        <button
          data-state={activeButton === "login" ? "active" : ""}
          onClick={handleLoginClick}
        >
          login
        </button>
        <button
          data-state={activeButton === "signup" ? "active" : ""}
          onClick={handleSignupClick}
        >
          Sign Up
        </button>
      </div>
      <div>
        {showForm && (
          <form
            onSubmit={activeButton === "login" ? handleLogin : handleSignup}
          >
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="nameInput"
            />
            <input
              type="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="passwordInput"
            />

            {/* Show Confirm Password only if "signup" is active */}
            {activeButton === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password..."
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                id="confirmPasswordInput"
              />
            )}

            <button type="submit" id="submitButton">
              {activeButton === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
        )}
      </div>
      <p>
        Created by <a href="https://github.com/Krish-234/">@Krish-234</a>
      </p>
    </div>
  );
};

export default Homepage;

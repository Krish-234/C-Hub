import React, { useState } from "react";
import { apiClient } from "../../lib/api-client.js";
import "./Homepage.css";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constants.js";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/index.js";

const Homepage = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [login, setLogin] = useState(true); // Track login mode, initially false
  const [showForm, setShowForm] = useState(true); // Form is hidden at the start
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [activeButton, setActiveButton] = useState("login"); // Track which button is active (login/signup)

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

  const validateSignup = () => {
    if (!email || !password || !confirmedPassword) {
      alert("Please fill in all fields.");
      return false;
    }
    if (password !== confirmedPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return false;
    }
    return true;
  };

  // Async function for login API call
  const handleLogin = async () => {
    const response = await apiClient.post(
      LOGIN_ROUTE,
      { email, password },
      { withCredentials: true }
    );
    if (response.data.user.id) {
      setUserInfo(response.data.user);
      if (response.data.user.profileSetup) navigate("/chat");
      else navigate("/profile");
    }
    console.log({ response });
  };

  // Async function for signup API call
  const handleSignup = async () => {
    const response = await apiClient.post(
      SIGNUP_ROUTE,
      { email, password },
      { withCredentials: true }
    );
    if (response.status === 201) {
      setUserInfo(response.data.user);
      navigate("/profile");
    }
    console.log({ response });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (activeButton === "login") {
      if (validateLogin()) {
        await handleLogin(); // Call async login function
      }
    } else if (activeButton === "signup") {
      if (validateSignup()) {
        await handleSignup(); // Call async signup function
      }
    }
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
          <form onSubmit={handleFormSubmit}>
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

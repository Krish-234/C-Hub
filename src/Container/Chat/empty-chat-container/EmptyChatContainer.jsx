import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/welcome-animation.json"; // Path to your Lottie file
import './EmptyChatContainer.css';

const EmptyChatContainer = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="empty-chat-background">
    <div className="empty-chat-container">
      <div className="empty-chat-animation">
        {/* <Lottie options={defaultOptions} height={150} width={150} /> */}
      </div>
      <div className="empty-chat-message">
        <h2>Welcome to the C-hub!</h2>
        <p>Select a contact to start messaging or create a new conversation.</p>
      </div>
    </div>
    </div>
  );  
};

export default EmptyChatContainer;

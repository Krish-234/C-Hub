import React, { useEffect } from "react";
import "./Chat.css";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import {
  ChatContainer,
  ContactsContainer,
  EmptyChatContainer,
} from "./index.js";
 
const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      alert("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="app_chat-background">
      {isUploading && (
        <div className="uplaod_display-container">
          <h5 className="upload-display"> Uploading File </h5>
          {fileUploadProgress}
        </div>
      )}
      {isDownloading && (
        <div className="download_display-container">
          <h5 className="download-display"> Downloading Files </h5>
          {fileDownloadProgress}
        </div>
      )}
      <div className="app_chat-container">
        <div className="app_chat-contacts">
          <ContactsContainer />
        </div>
        <div className="app_chat-message">
          {selectedChatType === undefined ? (
            <EmptyChatContainer />
          ) : (
            <ChatContainer />
          )}
          {/* <EmptyChatContainer /> */}
          {/* <ChatContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;

import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import "./MessageBar.css";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "../../store";
import { useSocket } from "../../context/SocketContext";
import { apiClient } from "../../lib/api-client.js";
import { UPLOAD_FILE_ROUTE } from "../../utils/constants";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo, setIsUploading, setFileUploadProgress } = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  
  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };


  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileURL: undefined,
      });
      setMessage("");
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
        const res = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round((100* data.loaded)/data.total));
          }
        });

        if(res.status === 200 && res.data){
          setIsUploading(false);
          if(selectedChatType === "contact"){
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileURL: res.data.filePath,
            });
          }
        }
      }

      console.log({ file });
    } catch (error) {
      setIsUploading(false);
      console.log({ error });
    }
  };

  return (
    <div className="message-bar">
      <input
        type="text"
        className="message-input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <button className="icon-btn" onClick={handleAttachmentClick}>
        <GrAttachment className="icon" />
      </button>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleAttachmentChange}
      ></input>
      <button className="icon-btn" onClick={() => setEmojiPickerOpen(true)}>
        <RiEmojiStickerLine className="icon" />
      </button>
      <div className="emoji-picker-window" ref={emojiRef}>
        <EmojiPicker
          theme="dark"
          open={emojiPickerOpen}
          onEmojiClick={handleAddEmoji}
          autoFocusSearch={false}
        />
      </div>
      <button className="send-btn">
        <IoSend className="icon" onClick={handleSendMessage} />
      </button>
    </div>
  );
};

export default MessageBar;

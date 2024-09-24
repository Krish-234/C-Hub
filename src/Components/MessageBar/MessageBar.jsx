import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import "./MessageBar.css";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "../../store";
import { useSocket } from "../../context/SocketContext";

const MessageBar = () => {
  const emojiRef = useRef();
  const socket = useSocket();
  const {selectedChatType,selectedChatData,userInfo} = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if(emojiRef.current && !emojiRef.current.contains(e.target)){
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => {
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[emojiRef])
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if(selectedChatType === "contact"){
      socket.emit("sendMessage",{
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined
      });
      setMessage("");
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
      />
      <button className="icon-btn">
        <GrAttachment className="icon" />
      </button>
      <button className="icon-btn" onClick={() => setEmojiPickerOpen(true)}>
        <RiEmojiStickerLine className="icon" />
      </button>
      <div className="emoji-picker-window" ref={emojiRef} >
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

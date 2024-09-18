import { RiCloseFill } from "react-icons/ri";
import "./ChatHeader.css";

const ChatHeader = () => {
  return (
    <div className="chat_header-background">
      <div className="chat_header-container">
        <div className="chat_header-left-content">
          <div className="chat_header-inner-left-content"></div>
          <div className="chat_header-right-content">
            <button className="chat_header-close-button">
              <RiCloseFill className="chat_header-close-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

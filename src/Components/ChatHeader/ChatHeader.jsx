import { RiCloseFill } from "react-icons/ri";
import "./ChatHeader.css";
import { useAppStore } from "../../store";
import { HOST } from "../../utils/constants";

const ChatHeader = () => {
  const {closeChat,selectedChatData} = useAppStore();

  return (
    <div className="chat_header-background">
      <div className="chat_header-container">
        <div className="chat_header-left-content">
          <div className="chat_header-inner-left-content">
          <div
                      className="chat_header-dm-avatar"
                      style={{ backgroundColor: selectedChatData.color }}
                    >
                      {selectedChatData.image ? (
                        <img
                          src={`${HOST}/${selectedChatData.image}`}
                          alt="profile"
                          className="avatar-image"
                        />
                      ) : (
                        <div className="chat_header-dm-avatar-placeholder">
                          {selectedChatData.firstName
                            ? selectedChatData.firstName.charAt(0)
                            : selectedChatData.email.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="chat_header-dm-name">
                      {selectedChatData.firstName && selectedChatData.lastName
                        ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                        : `${selectedChatData.email}`}
                    </div>
          </div>
          <div className="chat_header-right-content">
            <button className="chat_header-close-button" onClick={closeChat} >
              <RiCloseFill className="chat_header-close-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

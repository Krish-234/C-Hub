import { useEffect, useRef } from "react";
import { useAppStore } from "../../store";
import "./MessageContainer.css";
import moment from "moment";
import { apiClient } from "../../lib/api-client";
import { GET_ALL_MESSAGES_ROUTE } from "../../utils/constants";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setSelectedChatMessages,
    selectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );

        if(res.data.messages){
          setSelectedChatMessages(res.data.messages);
        }
      } catch(err) {
        console.log({err});
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id} className="app_message-container">
          {showDate && (
            <div className="app_message-date">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <>
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div className="app_message-msg">{message.content}</div>
        )}
      </div>
      <div
        className={`${
          message.sender === selectedChatData._id
            ? "app_message-time-left"
            : "app_message-time-right"
        }`}
      >
        {moment(message.timestamp).format("LT")}
      </div>
    </>
  );

  return (
    <div className="message_container-background">
      {renderMessages()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;

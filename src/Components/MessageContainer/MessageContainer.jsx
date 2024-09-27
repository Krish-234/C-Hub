import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store";
import "./MessageContainer.css";
import moment from "moment";
import { apiClient } from "../../lib/api-client";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "../../utils/constants";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setSelectedChatMessages,
    selectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );

        if (res.data.messages) {
          setSelectedChatMessages(res.data.messages);
        }
      } catch (err) {
        console.log({ err });
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

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

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

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const res = await apiClient.get(`${HOST}/${url}`, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const {loaded,total} = progressEvent;
        const percentCompleted = Math.round((loaded*100)/total);
        setFileDownloadProgress(percentCompleted);
      },
    });
    const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
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

        {message.messageType === "file" && (
          <div className="app_message-img">
            {checkIfImage(message.fileURL) ? (
              <div
                className="message-img-img"
                onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileURL);
                }}
              >
                <img
                  src={`${HOST}/${message.fileURL}`}
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="Zip-download-container">
                <span className="zip-icon">
                  <MdFolderZip />
                </span>
                <span>{message.fileURL.split("/").pop()}</span>
                <span
                  className="download-icon"
                  onClick={() => downloadFile(message.fileURL)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
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
    <>
      <div className="message_container-background">
        {renderMessages()}
        <div ref={scrollRef}></div>
      </div>
      {showImage && (
        <div className="img_display-container">
          <div className="img-display-img">
            <img src={`${HOST}/${imageURL}`} alt="wrongURL" />
          </div>
          <div className="img_display-icons">
            <button
              className="display_download-icon"
              onClick={() => downloadFile(imageURL)}
            >
              <IoMdArrowRoundDown />
            </button>
            <button
              className="display_download-icon"
              onClick={() => {
                setImageURL(null);
                setShowImage(false);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageContainer;

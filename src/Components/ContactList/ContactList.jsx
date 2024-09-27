import React from "react";
import "./ContactList.css";
import { useAppStore } from "../../store";
import { HOST } from "../../utils/constants";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) {
      setSelectedChatType("channel");
    } else {
      setSelectedChatType("contact");
    }
  
    setSelectedChatData(contact);

    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="app_contacts_list">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`contacts_list-container ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-purple"
              : "bg-grey"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div
            className="chat_header-dm-avatar"
            style={{ backgroundColor: contact.color }}
          >
            {contact.image ? (
              <img
                src={`${HOST}/${contact.image}`}
                alt="profile"
                className="avatar-image"
              />
            ) : (
              <div className="chat_header-dm-avatar-placeholder">
                {contact.firstName
                  ? contact.firstName.charAt(0)
                  : contact.email.charAt(0)}
              </div>
            )}
          </div>
          <div className="chat_header-dm-name">
            {contact.firstName && contact.lastName
              ? `${contact.firstName} ${contact.lastName}`
              : `${contact.email}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;

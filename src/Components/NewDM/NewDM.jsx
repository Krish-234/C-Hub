import React, { useState } from "react";
import "./NewDM.css";
import { FaPlus } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import animationData from "../../assets/welcome-animation.json";
import Lottie from "react-lottie";
import { apiClient } from "../../lib/api-client";
import { SEARCH_CONTACT_ROUTES } from "../../utils/constants";
import { HOST } from "../../utils/constants";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const handleCloseModal = () => {
    setOpenNewContactModal(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACT_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );

        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts);
        }
        console.log(res.data.contacts);
      } else {
        setSearchedContacts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="plus-icon">
        <FaPlus onClick={() => setOpenNewContactModal(true)} />
      </div>

      {/* Modal to search contacts */}
      {openNewContactModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-close">
              <h3>Search Contacts</h3>
              <RiCloseFill
                className="modal_close-btn"
                onClick={handleCloseModal}
              />
            </div>
            <input
              type="text"
              placeholder="Search for contacts..."
              className="search-input"
              onChange={(e) => searchContacts(e.target.value)}
            />
            <div className="contacts-list">
              {searchedContacts.length > 0 ? (
                searchedContacts.map((contact) => (
                  <div key={contact._id} className="contact-item">
                    <div
                      className="user_prof-dm-avatar"
                      style={{ backgroundColor: contact.color }}
                    >
                      {contact.image ? (
                        <img
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="avatar-image"
                        />
                      ) : (
                        <div className="user_prof-dm-avatar-placeholder">
                          {contact.firstName
                            ? contact.firstName.charAt(0)
                            : contact.email.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="user_prof-dm-name">
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : `${contact.email}`}
                        <span>{contact.email}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="welcome_search-msg">
                  Search New <br /> Contact!
                </div>
                // <Lottie options={defaultOptions} height={70} width={70} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewDM;

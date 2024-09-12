import React, { useState } from "react";
import "./Profile.css";
import { useAppStore } from "../../store";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa"; // Importing the icons
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [avatarColor, setAvatarColor] = useState("#ccc"); // Default avatar color

  const saveChanges = async () => {
    // Logic for saving changes goes here
  };

  const colorOptions = ["#FF6347", "#4682B4", "#32CD32", "#FFD700"]; // Define 4 semi-transparent colors

  return (
    <div className="app_profile-container">
      <div className="profile-inner-container">
        <div>
          <IoArrowBack className="back-arrow" />
        </div>

        <div className="profile-content">
          <div
            className="avatar-wrapper"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="avatar" style={{ backgroundColor: avatarColor }}>
              {image ? (
                <img src={image} alt="profile" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  {firstName ? firstName.charAt(0) : email.charAt(0)}
                </div>
              )}
              {/* Conditionally render FaTrash if image exists, otherwise render FaPlus */}
              {hovered && (
                <div className="icon-wrapper">
                  {image ? (
                    <FaTrash className="avatar-icon" onClick={() => setImage(null)} />
                  ) : (
                    <FaPlus className="avatar-icon" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Input fields for email, first name, and last name */}
          <div className="profile-inputs">
            <input
              type="text"
              disabled value={email}
              placeholder="Email"
              className="input-field"
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="input-field"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="input-field"
            />

            {/* Color selection options */}
            <div className="color-options">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className="color-box"
                  style={{ backgroundColor: color }}
                  onClick={() => setAvatarColor(color)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={saveChanges} className="save-button">
        Save Changes
      </button>
    </div>
  );
};

export default Profile;

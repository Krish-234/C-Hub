import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { useAppStore } from "../../store";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa"; // Importing the icons
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-client.js";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "../../utils/constants.js";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [avatarColor, setAvatarColor] = useState("#ccc"); // Default avatar color
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setAvatarColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      alert("firstName is required");
      return false;
    }
    if (!lastName) {
      alert("lastName is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    // Logic for saving changes goes here
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: avatarColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          alert("profile updated successfully.");
          navigate("/chat");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      alert("Please setup profile.");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data.image) {
        setUserInfo({ ...userInfo, image: res.data.image });
        // alert("image updated successfully.");
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        // alert("image removed successfully.");
        setImage(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const colorOptions = ["#FF6347", "#4682B4", "#32CD32", "#FFD700"]; // Define 4 semi-transparent colors

  return (
    <div className="app_profile-container">
      <div className="profile-inner-container">
        <div onClick={handleNavigate}>
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
                <div
                  className="icon-wrapper"
                  onClick={image ? handleDeleteImage : handleFileInputClick}
                >
                  {image ? (
                    <FaTrash
                      className="avatar-icon"
                      onClick={() => setImage(null)}
                    />
                  ) : (
                    <FaPlus className="avatar-icon" />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                    name="profile-image"
                    accept=".png, .jpg, .jpeg, .svg, .webp"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Input fields for email, first name, and last name */}
          <div className="profile-inputs">
            <input
              type="text"
              disabled
              value={email}
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

import React from "react";
import "./ProfileInfo.css";
import { useAppStore } from "../../../../store";
import { HOST, LOGOUT_ROUTE } from "../../../../utils/constants";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { apiClient } from "../../../../lib/api-client";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

        console.log(res);
      if (res.status === 200) {
        setUserInfo(null);
        navigate("/auth");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user_profile-info">
      <div
        className="user_profile-avatar"
        style={{ backgroundColor: userInfo.color }}
      >
        {userInfo.image ? (
          <img
            src={`${HOST}/${userInfo.image}`}
            alt="profile"
            className="avatar-image"
          />
        ) : (
          <div className="user_profile-avatar-placeholder">
            {userInfo.firstName
              ? userInfo.firstName.charAt(0)
              : userInfo.email.charAt(0)}
          </div>
        )}
      </div>
      <div className="user_profile-name">
        {userInfo.firstName && userInfo.lastName
          ? `${userInfo.firstName} ${userInfo.lastName}`
          : ""}
      </div>

      <div className="user_profile-edit">
        <FiEdit2
          className="user_profile-icon"
          onClick={() => {
            navigate("/profile");
          }}
        ></FiEdit2>
        <span className="tooltip">Edit Profile</span>
      </div>

      <div className="user_profile-edit">
        <IoPowerSharp
          className="user_profile-icon2"
          onClick={handleLogOut}
        ></IoPowerSharp>
        <span className="tooltip">Logout</span>
      </div>
    </div>
  );
};

export default ProfileInfo;

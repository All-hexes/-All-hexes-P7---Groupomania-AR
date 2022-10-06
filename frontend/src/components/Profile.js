import React from "react";
import "../styles/Profile.css";
import coverImage from "../assets/social-media.webp";
import profileImage from "../assets/avatar.webp";

// const usersImgUrl = process.env.REACT_APP_USERS_IMG_URL;

const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

function Profile() {
  return (
    <>
      <div className="profile-container">
        <div className="cover-container">
          <img
            className="cover-image"
            src={
              currentUser.coverPicture !== ""
                ? currentUser.coverPicture
                : coverImage
            }
            alt=""
          />
        </div>
        <div className="user-info-container">
          <img
            className="profile-image"
            src={
              currentUser.profilePicture !== ""
                ? `http://localhost:3000/images/` + currentUser.profilePicture
                : profileImage
            }
            alt=""
          />
          <h3 className="profile-name">
            {currentUser.name} {currentUser.lastName}
          </h3>
          <span className="user-position">{currentUser.position}</span>
        </div>
      </div>
    </>
  );
}

export default Profile;

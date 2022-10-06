import React, { useState } from "react";
import "../styles/ProfileOptions.css";
import coverImage from "../assets/social-media.webp";
import profileImage from "../assets/avatar.webp";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// const usersImgUrl = process.env.REACT_APP_USERS_IMG_URL;

const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

function ProfileOptions() {
  let navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const [modifyUserDetails, setModifyUserDetails] = useState(false);

  const modifyProfile = (e) => {
    e.preventDefault();

    let dataUser = new FormData(e.target);

    try {
      axios
        .put(
          `http://localhost:3000/api/auth/profile/${currentUser._id}`,
          dataUser,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          let user = JSON.parse(window.localStorage.getItem("currentUser"));
          let dataToUpdate = res.data.userUpdate;
          user.name = dataToUpdate.name;
          user.lastName = dataToUpdate.lastName;
          user.position = dataToUpdate.userPosition;
          user.profilePicture = dataToUpdate.profilePicture;
          window.localStorage.setItem("currentUser", JSON.stringify(user));
          refreshPage();
        })
        .catch(function (err) {
          console.error(`Retour du serveur : ${err}`);
        });
    } catch (err) {
      console.error(`Retour du serveur : ${err}`);
    }

    setModifyUserDetails(false);
  };

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
            {currentUser.name} {currentUser.lastName}{" "}
          </h3>
          <span className="user-position">{currentUser.position}</span>
        </div>
        <div className="show-edit-profile">
          <button
            title="Modifier"
            onClick={() => {
              setModifyUserDetails(true);
            }}
          >
            <i className="fa-solid fa-user-pen"></i>
          </button>
        </div>

        {modifyUserDetails ? (
          <div className="edit-profile-form">
            <form className="form-modify-profile" onSubmit={modifyProfile}>
              <h3>Modifier les informations</h3>
              <div>
                <label>Prénom</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={currentUser.name}
                  aria-label="Prénom"
                  required
                ></input>
              </div>
              <div>
                <label>Nom de famille</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={currentUser.lastName}
                  aria-label="Nom de famille"
                  required
                ></input>
              </div>
              <div>
                <label>Poste</label>
                <input
                  type="text"
                  name="userPosition"
                  id="userPosition"
                  defaultValue={currentUser.position}
                  aria-label="Poste de la personne"
                ></input>
              </div>
              <div className="select-new-image">
                <label>Image de profil</label>
                <input
                  id="file"
                  name="image"
                  className=""
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                ></input>
              </div>
              <div>
                <button
                  className="btn-save"
                  name="save"
                  type="submit"
                  id="buttonSignup"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ProfileOptions;

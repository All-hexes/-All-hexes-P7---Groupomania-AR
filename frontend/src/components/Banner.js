import React from "react";
import "../styles/Banner.css";

import logo from "../assets/icon-left-font.png";

function Banner() {
  return (
    <>
      <header className="App-banner">
        <img src={logo} className="logo" alt="Logo Groupomania" />
        <h1>
          Bienvenue sur le réseau d'échanges et de partages de Groupamania.
          Restez en contact avec vos collègues !
        </h1>
      </header>
    </>
  );
}

export default Banner;

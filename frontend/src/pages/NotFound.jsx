import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon-left-font.png";
import imgNotFound from "../assets/error-404.gif";
import Login from "../components/Login";
import Feed from "./Feed";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
      <main className="page-notfound-container">
        <img src={logo} className="logo" alt="Logo Groupomania" />
        <h1>
          Oups ! Il semble que cette page n'existe pas, ou vous devez être
          authentifié pour y accéder.
        </h1>
        <img
          src={imgNotFound}
          className="page-notfount-img"
          alt="Page introuvable"
        />
        <Link to="/login" element={<Login />}>
          <button
            className="btn-signup"
            name="signup"
            type="button"
            id="buttonSignup"
          >
            S'identifier
          </button>
        </Link>
        <Link to="/feed" element={<Feed />}>
          <button
            className="btn-signup"
            name="signup"
            type="button"
            id="buttonSignup"
          >
            Retour à la page d'accueil
          </button>
        </Link>
      </main>
    </>
  );
}

export default NotFound;

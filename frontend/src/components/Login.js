import React, { useState } from "react";
import "../styles/Form.css";
import { useNavigate, Outlet, Link } from "react-router-dom";

import Banner from "./Banner";
import Signup from "./Signup";
import Footer from "./Footer";

function Login() {
  let navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const [userAuth, setUserAuth] = useState(false);
  const [userKeyRef, setUserKeyRef] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  window.localStorage.setItem("userAuth", userAuth);
  window.localStorage.setItem("userKeyRef", userKeyRef);

  function onSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (apiData) {
        if (apiData.ok) {
          setUserAuth(true);
          return apiData.json();
        }
      })
      .then((res) => {
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(res.currentUser)
        );
        window.localStorage.setItem("userKeyRef", res.keyRef);
        window.localStorage.setItem("token", res.token);
        setUserKeyRef(res.keyRef);
        navigate("/feed", { replace: true });
        refreshPage();
      })
      .catch(function (err) {
        console.error(`Retour du serveur : ${err}`);
        setErrorMessage(true);
      });
  }

  return (
    <>
      <div className="main-container">
        <Banner />
        <main className="form-container">
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Adresse e-mail"
                aria-label="Adresse e-mail"
                required
              ></input>
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                required
              ></input>
            </div>
            <div>
              <button name="login" type="submit" id="login">
                S'identifier
              </button>
            </div>
            {errorMessage ? (
              <span className="error-message">
                Paire identifiant/mot de passe incorrecte
              </span>
            ) : null}
            <div className="line">Première visite sur l'app ?</div>
            <div>
              <Link to="/signup" element={<Signup />}>
                <button
                  className="btn-signup"
                  name="signup"
                  type="button"
                  id="buttonSignup"
                >
                  Inscrivez-vous
                </button>
              </Link>
            </div>
            <Outlet />
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Login;

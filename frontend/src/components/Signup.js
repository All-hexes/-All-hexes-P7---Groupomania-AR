import React, { useState } from "react";
import "../styles/Form.css";
import { Outlet, Link } from "react-router-dom";

import Banner from "./Banner";
import Login from "./Login";
import Footer from "./Footer";
import FormInput from "./FormInput";

function Signup() {
  const [success, setSuccess] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formInputs = [
    {
      type: "text",
      name: "name",
      id: "name",
      placeholder: "Prénom",
      label: "Prénom",
      required: true,
      pattern: `^[A-Za-z]{2,16}$`,
      errormessage:
        "Le prénom doit comporter entre 2 et 16 caractères et ne doit pas contenir de chiffres",
    },
    {
      type: "text",
      name: "lastName",
      id: "lastName",
      placeholder: "Nom de famille",
      label: "Nom de famille",
      required: true,
      pattern: `^[A-Za-z]{2,16}$`,
      errormessage:
        "Le nom de famille doit comporter entre 2 et 16 caractères et ne doit pas contenir de chiffres",
    },
    {
      type: "email",
      name: "email",
      id: "email",
      placeholder: "Adresse e-mail",
      label: "Adresse e-mail",
      required: true,
      pattern: `[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+$`,
      errormessage: "Adresse e-mail invalide",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      placeholder: "Mot de passe",
      label: "Mot de passe",
      required: true,
      pattern: `^(?=.*[0-9]{2,18})[a-zA-Z0-9]{8,100}$`,
      errormessage:
        "Le mot de passe doit être composé de 8 caractères minimum, dont une lettre majuscule, une lettre minuscule et au moins deux chiffres",
    },
    {
      type: "password",
      name: "confirmPassword",
      id: "confirmPassword",
      placeholder: "Confirmez votre mot de passe",
      label: "Confirmez votre mot de passe",
      required: true,
      pattern: formValues.password,
      errormessage: "Les mots de passe ne correspondent pas",
    },
  ];

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  function onSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (apiData) {
        if (apiData.ok) {
          return apiData.json();
        }
      })
      .then(() => {
        setSuccess(true);
      })
      .catch(function (err) {
        console.error(`Retour du serveur : ${err}`);
      });
  }

  return (
    <>
      <div className="main-container">
        <Banner />
        <main className="form-container">
          <form className="form-signup" onSubmit={onSubmit}>
            {formInputs.map((input) => (
              <div key={input.id} className="form-input">
                <FormInput
                  {...input}
                  value={formValues[input.name]}
                  onChange={onChange}
                ></FormInput>
              </div>
            ))}
            <div>
              <button name="signup" type="submit" id="signup">
                S'inscrire
              </button>
              {success ? (
                <div className="auth-success">
                  <h4>Compte créé avec succès</h4>
                  <p>
                    Vous pouvez maintenant vous connecter en utlisant vos identifiants.
                  </p>
                </div>
              ) : null}
            </div>
            <div className="line">Déjà inscrit(e) ?</div>
            <div>
              <Link to="/login" element={<Login />}>
                <button
                  className="btn-signup"
                  name="signup"
                  type="button"
                  id="buttonSignup"
                >
                  Identifiez-vous
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

export default Signup;

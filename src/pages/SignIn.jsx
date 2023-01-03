/* @ts-nocheck */
/* eslint-disable */

import axios from "axios";
import React, { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addUser } from "../features/userSlices";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlLogin, setControlLogin] = useState(false);

  const { user } = useSelector((state) => state.user);

  const [userId, setUserId] = useState(user?.user);

  const emailError = useRef();
  const passwordError = useRef();

  const handleAdminSignin = (e) => {
    e.preventDefault();
    emailError.current.innerHTML = "";
    passwordError.current.innerHTML = "";
    if (!email || !password) {
      if (!email) {
        emailError.current.innerHTML = "Email inconnu";
      }
      if (!password) {
        passwordError.current.innerHTML =
          "Le mot de passe doit avoir 6 caracteres minimum";
      }
    } else {
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/users/login`,
          data: {
            email,
            password,
          },
          withCredentials: true,
        }).then((res) => {
          if (res.data.message) {
            emailError.current.innerHTML = res.data.message;
          } else {
            dispatch(addUser(res.data));
            window.location = "/";
          }
        });
      } catch (error) {
        // notyFyErrorSignin();
        console.log(error);
      }
    }
  };

  return (
    <div className="signin">
      {!userId && (
        <h1 className="signin-title">
          Hi 👋, Connectez-vous pour accéder à la page d&apos;admin de ibendouma
        </h1>
      )}
      <form onSubmit={handleAdminSignin}>
        <div>
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            placeholder="Votre adresse email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <div ref={emailError} className="admin-signin-errors"></div>
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div ref={passwordError} className="admin-signin-errors"></div>
        </div>
        <input type="submit" value="Connexion" className="signin-submit" />
      </form>
    </div>
  );
};

export default SignIn;

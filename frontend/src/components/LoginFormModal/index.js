// frontend/src/components/LoginFormModal/index.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (!errors) {
      const err = {};
      if (credential.length < 4)
        err.credential = "Credentials must be more than 4 characters";
      if (password.length < 6)
        err.password = "Password must be more than 6 characters";
      setErrors(err);
    }
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const loginDemoUser = () => {
    return dispatch(
      sessionActions.login({
        credential: "Demo-lition",
        password: "password",
      })
    ).then(closeModal);
  };

  return (
    <>
      <div className="login-div">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <input
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && (
            <p className="login-errors">
              The provided credentials were invalid
            </p>
          )}
          <button
            className="login-button"
            type="submit"
          >
            Log In
          </button>
          <div>
            <button onClick={loginDemoUser} className="demo-user-button">
              Demo-user
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;

import React, { useEffect, useRef, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  let disabled = false

  if (password === '' || credential === '' || Object.keys(errors).length > 0) {
    disabled = true
  }

  useEffect(() => {
    const validationErrors = {}
    if (credential && credential.length < 4) {
      validationErrors.credential = 'Username or Email must be at least 4 characters'
    }
    if (password && password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(validationErrors)
  }, [credential, password])


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

  return (
    <>
      <h1>Log In</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div className={`form-group ${ errors.credential || errors.password ? "error" : ""}`}>
          {errors.credential && (
            <div className="msg">{errors.credential}</div>
          )}
          <input
            className="input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
          {errors.password && (
            <div className="msg">{errors.password}</div>
          )}
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button disabled={disabled} type="submit">Log In</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;

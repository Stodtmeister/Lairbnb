import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import * as sessionActions from '../../store/session'
import './SignupForm.css'

function SignupFormModal() {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()
  let disabled = false

  if (
    Object.keys(errors).length ||
    !firstName.length ||
    !lastName.length ||
    !email.length ||
    !username.length ||
    !password.length ||
    !confirmPassword.length
  ) {
    disabled = true
  }

  useEffect(() => {
    const validationErrors = {}
    if (username && username.length < 4) {
      validationErrors.username = 'Username must be at least 4 characters'
    }
    if (password && password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(validationErrors)
  }, [username, password, email])

  async function handleSubmit(e) {
    e.preventDefault()

    if (password === confirmPassword) {
      setErrors({})
      let res = await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json()
          if (data && data.errors) {
            setErrors(data.errors)
          }
        })
    } else {
      return setErrors({ confirmPassword: "Passwords don't match" })
    }
  }

  return (
    <form id="form" className="signup" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className={`form-group1 ${Object.keys(errors).length ? 'error' : ''}`} >
        <input
          className="input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.email && <div className="msg">{errors.email}</div>}
        <input
          className="input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.username && <div className="msg">{errors.username}</div>}
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.password && <div className="msg">{errors.password}</div>}
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <div className="msg">{errors.confirmPassword}</div>
        )}
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="sign-up" disabled={disabled} type="submit">
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignupFormModal

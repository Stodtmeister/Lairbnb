import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import * as sessionActions from '../../store/session'
import './SignupForm.css'

function SignupFormModal() {
  const dispatch = useDispatch()
  const emailRef = useRef('')
  const firstNameRef = useRef('')
  const lastNameRef = useRef('')
  const confirmPasswordRef = useRef('')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()
  let disabled = false

  if (
    Object.keys(errors).length ||
    !emailRef.current.value    ||
    !username.length ||
    !firstNameRef.current.value||
    !lastNameRef.current.value ||
    !password.length
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
  }, [username, password])

  async function handleSubmit(e) {
    e.preventDefault()

    if (password === confirmPasswordRef.current.value) {
      setErrors({});
      const response = await dispatch(sessionActions.signup({
        email: emailRef.current.value,
        username: username,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        password: password
      }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
      console.log('RESPONSE', response)
    } else {
      return setErrors({
        confirmPassword: "Passwords don't match"
      });
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form id='form' className="signup" onSubmit={handleSubmit}>
        <div className={`form-group ${errors.username || errors.password || errors.confirmPassword ? 'error' : ''}`}>
          <input type="text" placeholder="Email" ref={emailRef} />
          {errors.username && (
            <div className='msg'>{errors.username}</div>
          )}
          <input className='input' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="text" placeholder="First Name" ref={firstNameRef} />
          <input type="text" placeholder="Last Name" ref={lastNameRef} />
          {errors.password && (
            <div className='msg'>{errors.password}</div>
          )}
          <input className='input' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {errors.confirmPassword && (
            <div className='msg'>{errors.confirmPassword}</div>
          )}
          <input
            className='input'
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <button disabled={disabled} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  )
}

export default SignupFormModal

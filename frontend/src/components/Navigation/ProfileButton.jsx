import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import OpenModalMenuItem from './OpenModalMenuItem'
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from '../SignupFormModal/SignupFormModal'
import { NavLink, useHistory } from 'react-router-dom'
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const ulRef = useRef()
  const [showMenu, setShowMenu] = useState(false)
  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden')

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return
    
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  const closeMenu = () => setShowMenu(false)

  const logout = (e) => {
    e.preventDefault()
    dispatch(sessionActions.logout())
    closeMenu()
    history.push('/')
  }

  return (
    <>
      <button className="profileBtn" onClick={openMenu}>
        <div className="innerBtn">
          <i className="fa-sharp fa-solid fa-bars"></i>
          <i id="profile" className="fas fa-user-circle fa-2xl" />
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            <div className="manage-spots">
              <NavLink to="/spots/current" onClick={closeMenu}>Manage Spots</NavLink>
              <NavLink to="/reviews/current" onClick={closeMenu}>Manage Reviews</NavLink>
            </div>
            <div>
              <button className="logout-btn" onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  )
}

export default ProfileButton

import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user)

  function handleClick() {
    alert('Feature Coming Soon...')
  }

  return (
    <>
      <div className="nav">
        <NavLink exact to="/">
          <i id="icon" class="fa-brands fa-airbnb fa-2xl"></i>
          <span class="navbar-text">airbnb</span>
        </NavLink>
        <div className="nav-btn-container">
          <button onClick={handleClick} className="btn1">Anywhere</button>
          <div></div>
          <button onClick={handleClick} className="btn2">Any week</button>
          <div></div>
          <button onClick={handleClick} className="btn3">Add guests</button>
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
        </div>
        <div>
          <span className={sessionUser?.id ? 'logged-in' : 'logged-out'}>
            <NavLink className="new-spot dynamic-content" to="/spots/new" />
          </span>
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
      <hr />
    </>
  )
}

export default Navigation

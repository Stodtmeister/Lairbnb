import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const loggedIn = sessionUser?.id ? 'logged-in' : 'logged-out'

  return (
    <div className='nav'>
      <NavLink exact to="/"><i id='icon' class="fa-brands fa-airbnb fa-2xl"></i>airbnb</NavLink>
      <div>
        <span className={loggedIn}>
          <NavLink to='/reviews'>Create a new spot</NavLink>
        </span>
        {isLoaded && (<ProfileButton user={sessionUser} />)}
      </div>
    </div>
  );
}

export default Navigation;

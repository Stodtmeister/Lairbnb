import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
      <NavLink exact to="/"><i id='icon' class="fa-brands fa-airbnb fa-2xl"></i>airbnb</NavLink>
      {isLoaded && (<ProfileButton user={sessionUser} />)}
    </div>
  );
}

export default Navigation;

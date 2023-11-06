import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
      <NavLink exact to="/"><i class="fa-brands fa-airbnb fa-2xl" style={{color: "#ff5a5f"}}></i></NavLink>
      {isLoaded && (<ProfileButton user={sessionUser} />)}
    </div>
  );
}

export default Navigation;

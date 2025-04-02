import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='main-header'>
      <div className='header-container'>
        <div className='header-logo'>
          <Link to='/'>Frontend Custom Shop</Link>
        </div>
        <div className='header-menu'>
          <NavLink to='alert'>Sweet alert</NavLink>
          <NavLink to='drag-and-drop'>Drag and drop</NavLink>
          <NavLink to='superstruct'>Superstruct</NavLink>{' '}
          <NavLink to='select-city'>City Select</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

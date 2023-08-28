import React from 'react';
import './GlobalNav.css';

const GlobalNav = () => (
  <nav className="nav-bar">
    <a href='/' className='nav-brand'>Space-travelers-hub CMS</a>
    <ul className='nav-links'>
      <li><a className='nav-link' href="/Books">BOOKS</a></li>
      <li><a className='nav-link' href="/Categories">CATEGORIES</a></li>
    </ul>
    <button class="icon-button" type="button">
      <span class="material-icons primary-color">person</span>
    </button>
  </nav>
);

export default GlobalNav;

import React from 'react';
import { Link } from 'react-router-dom'; 
import Sidebar from './Sidebar'; 

const Header = () => {
  return (
    <div className='header'>
      <Sidebar /> 
      <div className='menu-icon'>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', paddingRight: '10px' }}>
          <i className='bx bxs-home'></i>
        </Link>
      </div>
    </div>
  );
};

export default Header;

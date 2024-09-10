import React from 'react';
import { Link } from 'react-router-dom';  // Assumendo che tu stia usando React Router per la navigazione
import Sidebar from './Sidebar';  // Assicurati di avere il componente Sidebar

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

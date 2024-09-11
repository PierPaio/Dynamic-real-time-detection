import React, { useState } from 'react';
import '../validations/App.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Cambia lo stato da aperto a chiuso
  };

  return (
    <>
      <div className="header">
        <div className="menu-icon" onClick={toggleSidebar}>
          <i className="bx bx-menu"></i>
        </div>
        <h1 className="title">Dynamic Real-Time Detection</h1>
      </div>

      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><h3 className='title-sidebar'>Static Detection</h3></li>
          <li><Link to="/upload">Upload File</Link></li>
          <br></br>
          <li><h3 className='title-sidebar'>Dynamic Detection</h3></li>
          <li><Link to="/path">Insert Path File</Link></li>
        </ul>
      </nav>

      {/* Overlay (opzionale, per chiudere cliccando fuori dalla sidebar) */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

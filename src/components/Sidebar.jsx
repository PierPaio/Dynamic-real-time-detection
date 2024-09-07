import React, { useState } from 'react';
import '../App.css'; // Assicurati di creare un file CSS o di aggiungere gli stili nel componente
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

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/upload">Upload File</Link></li>
          <li><Link to="/path">Insert Path File</Link></li>
        </ul>
      </nav>

      {/* Overlay (opzionale, per chiudere cliccando fuori dalla sidebar) */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

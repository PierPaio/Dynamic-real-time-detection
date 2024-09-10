import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CsvPlotter from '../components/CsvPlotter'; 
import Papa from 'papaparse'; 
import GeneratedHtml from '../components/GeneratedHtml';
import Sidebar from '../layout/Sidebar';
import FileUpload from '../components/FileUpload';
import PathInput from '../components/PathInput';
import csvFile from '../dati dinamici/Random_with_anomaly.csv';
import '../validations/App.css';
import CsvViewer from '../components/CsvViewer';


const App = () => {
  const [csvData, setCsvData] = useState([]);

  const loadCsvData = async () => {
    try {
      const response = await fetch(csvFile); 
      //risposta dei dati in formato testo
      const text = await response.text();

      Papa.parse(text, {
        header: true, // Indica che la prima riga del CSV contiene le intestazioni delle colonne
        complete: (results) => { //callback che viene invocata quando parsing del CSV è completato
          setCsvData(results.data);
        }
      });
    } catch (error) {
      console.error('Error loading CSV file:', error);
    }
  };

  useEffect(() => {
    loadCsvData(); // Carica i dati inizialmente
  }, []);

  return (
    
  <Router>
      <div className="wrapper">
        <div className='header' id='header'>
          <Sidebar /> 
          <div className='menu-icon'>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', paddingRight: '10px' }}>
              <i className='bx bxs-home'></i>
            </Link>
          </div>
        </div>

        {/* Aggiungi il contenitore flessibile per il contenuto */}
        <div className="content">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <h1 className="text-center">CSV Data Visualization</h1>
                <p style={{marginTop: '50px', fontSize: '25px'}}>This is the homepage. Use the sidebar to navigate.</p>
                <GeneratedHtml csvData={csvData} />
                <CsvPlotter data={csvData} />
              </div>
            } />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/path" element={<PathInput />} />
            <Route path="/csv-viewer" element={<CsvViewer />} />
          </Routes>
        </div>

        {/* Footer in fondo alla pagina */}
        <div className='footer'>
          <p>&copy; 2024 Pierpaolo Paio | Tutti i diritti riservati.</p>
        </div>
      </div>
  </Router>
  );
};

export default App;

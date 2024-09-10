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
import Header from '../layout/Header';
import Footer from '../layout/Footer';


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
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <h1 className="text-center">Welcome to our app</h1>
                <p style={{marginTop: '50px', fontSize: '25px'}}>This is the homepage. Use the sidebar to navigate.</p>
              </div>
            } />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/path" element={<PathInput />} />
            <Route path="/csv-viewer" element={<CsvViewer />} />
          </Routes>
        </div>

        {/* Footer in fondo alla pagina */}
        <Footer />
      </div>
  </Router>
  );
};

export default App;

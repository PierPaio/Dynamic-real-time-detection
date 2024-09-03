import React, { useState, useEffect } from 'react';
import CsvPlotter from './components/CsvPlotter'; 
import Papa from 'papaparse';
import csvFile from './data/Electric_Production.csv'; 
import GeneratedHtml from './components/GeneratedHtml';


const App = () => {
  const [csvData, setCsvData] = useState([]);

  const loadCsvData = async () => {
    alert("File updated successfully!")
    try {
      const response = await fetch(csvFile); 
      const text = await response.text();

      Papa.parse(text, {
        header: true, // Indica che la prima riga del CSV contiene le intestazioni delle colonne
        complete: (results) => {
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
    <>
      <div className='header' id='header'>
        <h1>Dynamic Real-Time Detection</h1>
        <a href="#plot" className="link-to-plot">Go to Plot</a> 
      </div>
      <div className="container">
        <h1 className="text-center">CSV Data Visualization</h1>
        <p className="text-center">File name: {`${csvFile}`}</p>
        <GeneratedHtml csvData={csvData} />
        <CsvPlotter data={csvData} id="plot" />
        <br></br>
        <a href="#header" className="link-to-data">Go to Data</a>
      </div>
      <div className='footer'>
        <p>&copy; 2024 Pierpaolo Paio | Tutti i diritti riservati.</p>
      </div>
    </>
  );
};

export default App;

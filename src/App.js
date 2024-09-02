import React, { useState, useEffect } from 'react';
import CsvPlotter from './components/CsvPlotter'; // Assicurati di avere il percorso corretto
import Papa from 'papaparse';
import csvFile from './data/Electric_Production.csv'; 
import GeneratedHtml from './components/GeneratedHtml';


const App = () => {
  const [csvData, setCsvData] = useState([]);

  const loadCsvData = async () => {
    try {
      const response = await fetch(csvFile); 
      const text = await response.text();

      Papa.parse(text, {
        header: true,
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

    const intervalId = setInterval(() => {
      loadCsvData(); // Ricarica i dati periodicamente
    }, 5000); // Intervallo di 5 secondi

    return () => clearInterval(intervalId); // Pulizia dell'intervallo
  }, []);

  return (
    <div className="container">
      <h1 className='title'>CSV Data Visualization</h1>
      <p className='title'>File name: {`${csvFile}`}</p>
      <GeneratedHtml csvData={csvData} />
      <CsvPlotter data={csvData} /> 
    </div>
  );
};

export default App;

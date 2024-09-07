import React, { useState } from "react";
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import CsvPlotter from "./CsvPlotter";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  // Funzione per quando l'utente seleziona un file
  const handleFileChange = (event) => {
    //Aggiorno stato del componente con file selezionato da input
    setFile(event.target.files[0]);
  };

  // Gestione caricamento del file con lettura
  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      //Evento si attiva quando lettura del file è completata
      reader.onload = (e) => {
        //text contiene contnuto del file letto
        const text = e.target.result;
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setCsvData(results.data);
          }
        });
      };
      //Legge contenuto del file come testo (stringa)
      reader.readAsText(file);
    } else {
      alert("Please select a file first.");
    }
  };

  // Funzione per quando si trascina un file
  const handleDragOver = (event) => {
    //Previene evento di default (scaricamento in questo caso)
    event.preventDefault();
    setDragOver(true);
  };

  // Funzione per quando il file viene trascinato fuori dall'area di drop
  const handleDragLeave = () => {
    setDragOver(false);
  };

  // Funzione per la gestione del rilascio del file nell'area di drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    //Oggetto standard per accedere ai file trascinati in operazioni di Drag & Drop
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const headers = csvData.length ? Object.keys(csvData[0]) : [];

  const xValues = csvData.map(row => row[headers[0]]);
  const yValues = csvData.map(row => row[headers[1]]);
  const anomalyValues = csvData.map(row => row[headers[2]]);

  //Separo dati in base a se è anomalia o meno
  const normalPoints = {
    x: xValues.filter((_, i) => anomalyValues[i] === '0'), 
    y: yValues.filter((_, i) => anomalyValues[i] === '0'),
    mode: "markers",
    marker: { color: 'green' },
    name: 'Normal'
  };

  const anomalyPoints = {
    x: xValues.filter((_, i) => anomalyValues[i] === '1'), 
    y: yValues.filter((_, i) => anomalyValues[i] === '1'),
    mode: "markers",
    marker: { color: 'red' },
    name: 'Anomaly'
  };

  return (
    <div className="container">
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        id="file-input" 
      />
      <label 
        htmlFor="file-input" 
        onDragOver={handleDragOver} 
        onDragLeave={handleDragLeave} 
        onDrop={handleDrop} 
        style={{
          border: '2px dashed #ccc',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: dragOver ? '#f0f0f0' : '#fff',
          cursor: 'pointer',
          color: "black",
          borderRadius: '6px',
          marginBottom: '20px',
          transition: 'background-color 0.3s, color 0.3s'
        }}
      >
        {file ? file.name : 'Drag & Drop your CSV file here or click to select'}
      </label>
      <button 
        type="button" 
        onClick={handleUpload} 
        className="btn btn-primary custom-hover"
        style={{ margin: '20px 0' }}
      >
        Upload CSV
      </button>
      {csvData.length > 0 && <CsvPlotter data={csvData} />}
    </div>
  );
};

export default FileUpload;

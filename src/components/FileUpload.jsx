import React, { useState } from "react";
import Papa from 'papaparse';
import CsvPlotter from "./CsvPlotter";
import GeneratedHtml from "./GeneratedHtml";

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

  

  return (
    <div className="container" id="data">
      {csvData.length <= 0 ? <>
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
            className="btn custom-hover"
            style={{ margin: '20px 0' }}
          >
            Upload CSV
          </button>
        </> : 
        <>
          <h2>CSV Data Viewer</h2>
          <br></br>
          <a href="#plot" className="link-to">Go to Plot</a>
          <GeneratedHtml csvData={csvData} />
          <div id='plot'>
                <CsvPlotter data={csvData} /> 
          </div>
          <br></br>
          <a href="#data" className="link-to">Go to Data</a>
        </> }      
    </div>
  );
};

export default FileUpload;

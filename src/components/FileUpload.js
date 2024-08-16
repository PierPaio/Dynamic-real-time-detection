import React, { useState } from "react";
import '../App.css';

const FileUpload = ({ onFileUpload }) => {
    const[file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false)

    //funzione per quando utente seleziona file
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    //gestione caricamento del file con lettura
    const handleUpload = () => {
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                onFileUpload(text);
            };
            reader.readAsText(file);
        }
    };
    
    //funzione per quando si trascina file
    const handleDragOver = (event) => {
        //previene evento di default del browser (esempio lo scaricamento)
        event.preventDefault();
        setDragOver(true);
      };
      
      //funzione per quando file trascinato fuori dall'area di drop
      const handleDragLeave = () => {
        setDragOver(false);
      };
      
      //funzione per gestione del rilascio del file nell'area di drop
      const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        //recupero file rilasciato
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
        //leggere e caricare il file
        handleUpload(droppedFile);
      };
    
    return (
        <div>
          <input type="file" accept=".csv" onChange={(event) => {
            handleFileChange(event);
            handleUpload(event.target.files[0]);
          }} style={{ display: 'none' }} id="file-input" />
          
          <label 
            htmlFor="file-input" 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={handleDrop} 
            style={{
              border: '2px dashed #ccc',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: dragOver ? '#f0f0f0' : '#fff'
            }}
          >
            {file ? file.name : 'Drag & Drop your CSV file here or click to select'}
          </label>
          <button type="button" onClick={handleUpload} className="btn btn-primary custom-hover">CSV upload</button>
    </div>
    )
};

export default FileUpload;
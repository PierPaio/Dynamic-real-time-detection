import React, { useState } from "react";
import '../App.css';

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);
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
                //Viene passato contenuto del file a funzione onFileUpload
                onFileUpload(text);
                alert("File uploaded successfully!");
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
        <div className="text-center">
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
                style={{ marginTop: '20px' }} // Assicura che il pulsante sia ben distanziato
            >
                Upload CSV
            </button>
        </div>
    );
};

export default FileUpload;

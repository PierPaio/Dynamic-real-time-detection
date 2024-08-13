import React, { useState } from "react";
import '../App.css';

const FileUpload = ({ onFileUpload }) => {
    const[file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

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

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
      };
    
      const handleDragLeave = () => {
        setDragOver(false);
      };
    
      const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
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
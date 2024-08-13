import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import GeneratedHtml from './components/GeneratedHtml';

function App() {

  const [csvdata, setCsvdata] = useState(null);

  const handleFileUpload = (data) => {
    setCsvdata(data);
    console.log("Caricato con successo")
  }

  return (
    <div className="container">
      <FileUpload onFileUpload={handleFileUpload} className="csv"/>
      <GeneratedHtml csvData={csvdata} />
    </div>
  );
}

export default App;

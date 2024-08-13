import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import GeneratedHtml from './components/GeneratedHtml';
import GeneratedPlotly from './components/GeneratedPlotly';

function App() {

  const [csvData, setCsvdata] = useState(null);

  const handleFileUpload = (data) => {
    setCsvdata(data);
    alert("File upload successfully!")
  }

  return (
    <div className="container">
      <FileUpload onFileUpload={handleFileUpload} />
      <GeneratedHtml csvData={csvData} />
      <GeneratedPlotly csvData={csvData} />
    </div>
  );
}

export default App;

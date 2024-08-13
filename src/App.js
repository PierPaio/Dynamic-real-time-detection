import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {

  const [csvdata, setCsvdata] = useState(null);

  const handleFileUpload = (data) => {
    setCsvdata(data);
    console.log("Caricato con successo")
  }

  return (
    <div className="App">
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import PathInput from '../components/PathInput';
import '../validations/App.css';
import CsvViewer from '../components/CsvViewer';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Home from '../layout/Home';

const App = () => {
  
  return (
  <Router>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/path" element={<PathInput />} />
            <Route path="/csv-viewer" element={<CsvViewer />} />
          </Routes>
        </div>
        <Footer />
      </div>
  </Router>
  );
};

export default App;

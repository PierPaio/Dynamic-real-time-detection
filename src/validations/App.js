import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import PathInput from '../components/PathInput';
import '../validations/App.css';
import CsvViewer from '../components/CsvViewer';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const App = () => {
  
  return (
  <Router>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <h1 className="text-center">Welcome to our app</h1>
                <p style={{marginTop: '50px', fontSize: '25px'}}>This is the homepage. Use the sidebar to navigate.</p>
              </div>
            } />
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

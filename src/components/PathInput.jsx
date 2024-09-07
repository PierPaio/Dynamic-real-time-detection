import React, { useState } from "react";
import Papa from 'papaparse';
import CsvPlotter from './CsvPlotter';

const PathInput = () => {
    const [path, setPath] = useState("");
    const [csvData, setCsvData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!path) return;
        
        setLoading(true); 

        try {
            const response = await fetch(path, { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            Papa.parse(text, {
                header: true,
                complete: (results) => {
                    setCsvData(results.data);
                    setLoading(false);
                }
            });
        } catch (error) {
            console.error('Error loading CSV file:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={path} 
                    onChange={(e) => setPath(e.target.value)} 
                    placeholder= "Enter CSV file path"
                    style={{ width: '300px', marginBottom: '20px', marginRight: '20px' }} 
                />
                <button type="submit" className="btn btn-primary">Load CSV</button>
            </form>
            
            {loading && <p>Loading...</p>}
            <p>Path: {path}</p>
            {csvData.length > 0 && <CsvPlotter data={csvData} />}
        </div>
    );
};

export default PathInput;

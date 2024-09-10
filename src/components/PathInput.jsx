import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const PathInput = () => {
    const [path, setPath] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const navigate = useNavigate();

    const fetchCsvData = async () => {
        const fullPath = 'http://localhost:3001/data'; // Usa solo l'endpoint /data
        try {
            const response = await fetch(fullPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCsvData(data);
        } catch (error) {
            setError(`Fetch error: ${error.message}`);
        }
    };

    useEffect(() => {
        if (path) {
            const interval = setInterval(fetchCsvData, 5000);
            return () => clearInterval(interval);
        }
    }, [path]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!path) return;
    
        setLoading(true);
        setError(null);
    
        try {
            // Assicurati che il corpo sia una stringa JSON valida
            const response = await fetch('http://localhost:3001/set-csv-path', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: path }) // Non usare console.log qui
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Recupera file CSV come testo normale
            await fetchCsvData();
    
            // Naviga a /csv-viewer route e passa i dati
            navigate("/csv-viewer", { state: { csvData } });
        } catch (error) {
            setError(`Fetch error: ${error.message}`);
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
                    placeholder="Enter CSV file path"
                    style={{ width: "300px", marginBottom: "20px", marginRight: "20px" }} 
                />
                <button type="submit" className="btn btn-primary">Load CSV</button>
            </form>
            
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default PathInput;

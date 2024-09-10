import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PathInput = () => {
    const [path, setPath] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const navigate = useNavigate();

    // Funzione per recuperare i dati CSV
    const fetchCsvData = () => {
        const fullPath = 'http://localhost:3001/data'; 
        fetch(fullPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCsvData(data);
            })
            .catch(error => {
                setError(`Fetch error: ${error.message}`);
            });
    };

    useEffect(() => {
        if (path) {
            const interval = setInterval(fetchCsvData, 2000);
            return () => clearInterval(interval);
        }
    }, [path]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!path) return;

        setLoading(true);
        setError(null);

        fetch('http://localhost:3001/set-csv-path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: path })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Recupera i dati CSV e naviga alla pagina
            return fetchCsvData();
        })
        .then(() => {
            // Naviga a /csv-viewer route e passa i dati
            navigate("/csv-viewer", { state: { csvData } });
        })
        .catch(error => {
            setError(`Fetch error: ${error.message}`);
            setLoading(false);
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} style={{marginTop: '50px'}}>
                <input 
                    type="text" 
                    value={path} 
                    onChange={(e) => setPath(e.target.value)} 
                    placeholder="Enter CSV file path"
                    style={{ width: "300px", marginBottom: "20px" }} 
                />
                <br></br>
                <button type="submit" className="btn custom-hover" style={{marginTop: '30px'}}>Load CSV</button>
            </form>
            
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default PathInput;

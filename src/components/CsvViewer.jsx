import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CsvPlotter from './CsvPlotter';
import GeneratedHtml from './GeneratedHtml';

const CsvViewer = () => {
    const location = useLocation();
    const [csvData, setCsvData] = useState(location.state?.csvData || []); //se non è vuoto, contiene dati da server
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [intervalId, setIntervalId] = useState(null);

    const fetchCsvData = async () => {
        try {
            const response = await fetch("http://localhost:3001/data"); //faccio richiesta a server 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); //converto dati in json
            setCsvData(data); //memorizzo i dati
            setLoading(false);
        } catch (error) {
            setError(`Fetch error: ${error.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCsvData(); // setto dati iniziali

        // Intervallo per aggiornamento ogni 2 secondi
        const id = setInterval(fetchCsvData, 2000);
        setIntervalId(id);

        // Pulisco intervallo quando smonto componente
        return () => clearInterval(id);
    }, []);

    return (
        <div className="container" id='data'>
            <h2>CSV Data Viewer</h2>
            <br></br>
            <a href="#plot" className='link-to'>Go to Plot</a>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {csvData.length > 0 && <GeneratedHtml csvData={csvData} /> }
            <div id='plot'>
                {csvData.length > 0 ? <CsvPlotter data={csvData} /> : (
                    <p>No data available</p>
                )}
            </div>
            <br></br>
            <a href="#data" className='link-to'>Go to Data</a>
        </div>
    );
};

export default CsvViewer;

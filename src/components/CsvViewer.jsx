import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CsvPlotter from './CsvPlotter';
import GeneratedHtml from './GeneratedHtml';
import Header from '../layout/Header';

const CsvViewer = () => {
    const location = useLocation();
    const [csvData, setCsvData] = useState(location.state?.csvData || []);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [intervalId, setIntervalId] = useState(null);

    const fetchCsvData = async () => {
        try {
            const response = await fetch("http://localhost:3001/data");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCsvData(data);
            setLoading(false);
        } catch (error) {
            setError(`Fetch error: ${error.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCsvData(); // Fetch initial data

        // Set interval to fetch data every 5 seconds
        const id = setInterval(fetchCsvData, 2000);
        setIntervalId(id);

        // Cleanup on component unmount
        return () => clearInterval(id);
    }, []);

    return (
        <div className="container">
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
            <a href="#" className='link-to'>Go to Data</a>
        </div>
    );
};

export default CsvViewer;

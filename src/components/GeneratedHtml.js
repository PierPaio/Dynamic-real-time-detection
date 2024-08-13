import React from "react";
import '../App.css';

const GeneratedHtml = ({ csvData }) => {
    if(!csvData) {
        return null;
    }

    const rows = csvData.split('\n').map(row => row.split(','));

    const tableContent = (
        <table className="table table-striped">
            <thead>
                <tr>
                    {rows[0].map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.slice(1).map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <h3>Table with data:</h3>
            <div>{tableContent}</div>
        </div>
    );
};

export default GeneratedHtml;
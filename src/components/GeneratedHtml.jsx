import React, { useEffect, useState } from 'react';
import '../App.css';

const GeneratedHtml = ({ csvData }) => {
    const [tableHtml, setTableHtml] = useState('');

    useEffect(() => {
        if (csvData.length > 0) {
            // Usa PapaParse per convertire CSV in JSON
            const headers = Object.keys(csvData[0]);
            const rows = csvData;

            // Crea l'HTML per l'intestazione della tabella
            const tableHeader = `<tr>${headers.map(header => 
                `<th>${header}</th>`
            ).join('')}</tr>`;

            // Crea l'HTML per il corpo della tabella
            const tableBody = rows.map(row => `
                <tr>${headers.map(header =>
                    `<td>${row[header] || ''}</td>`
                ).join('')}</tr>`
            ).join('');

            // Crea l'HTML completo della tabella
            const newTableHtml = `
                <table class="table table-striped">
                    <thead>${tableHeader}</thead>
                    <tbody>${tableBody}</tbody>
                </table>
            `;

            // Aggiorna lo stato con il nuovo HTML
            setTableHtml(newTableHtml);
        }
    }, [csvData]);

    if (!tableHtml) {
        return null;
    }

    return (
        <div className="mt-4">
            <h3>Table with data:</h3>
            <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
    );
};

export default GeneratedHtml;

import React, { useEffect} from "react";
import '../App.css';
import { saveAs } from "file-saver";

const GeneratedHtml = ({ csvData }) => {
    
    let tableHtml = '';
    if(csvData) {
        const rows = csvData.split('\n').map(row => row.split(','));

        tableHtml = `
            <table class="table table-striped">
                <thead>
                    <tr>${rows[0].map(header => `<th>${header}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${rows.slice(1).map(row => `
                        <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Contenuto completo del file HTML
    const fullHtmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CSV to HTML</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        </head>
        <body>
            ${tableHtml}
        </body>
        </html>
    `;

    useEffect(() => {
        if (csvData) { // Assicurati che il file venga salvato solo se i dati sono presenti
            const blob = new Blob([fullHtmlContent], { type: 'text/html;charset=utf-8' });
            saveAs(blob, 'file.html');
        }
    }, [csvData]); // L'effetto si attiva ogni volta che csvData cambia

    if(!csvData) {
        return null;
    }

    return (
        <div>
            <h3>Table with data:</h3>
            <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
    );
};

export default GeneratedHtml;
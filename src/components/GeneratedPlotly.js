import React from "react";
import Plot from "react-plotly.js";
import '../App.css';

const GeneratedPlotly = ({ csvData }) => {

    if(!csvData) {
        return null;
    }

    // Convert CSV data to an array of objects (rows)
    const rows = csvData.split('\n').map(row => row.split(','));
    //const headers = rows[0];
    const data = rows.slice(1);

    // Example: assuming the first column is X and the second column is Y
    const xValues = data.map(row => row[0]);
    const yValues = data.map(row => row[1]);

    return (
        <Plot
            data={[
                {
                    x: xValues,
                    y: yValues,
                    type: "scatter",
                    mode: "lines",
                    marker: {color: 'blue'},
                },
            ]}
            layout={{ 
                title: 'Plot from HTML file', 
                autosize: true,
            }}
            config={{ responsive: true }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            />
    );
};

export default GeneratedPlotly;


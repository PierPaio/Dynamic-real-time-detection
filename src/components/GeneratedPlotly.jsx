import React, {useState, useEffect} from "react";
import Plot from "react-plotly.js";
import '../App.css';

const GeneratedPlotly = ({ csvData }) => {

    const [xAxisTitle, setXAxisTitle] = useState('');
    const [yAxisTitle, setYAxisTitle] = useState('');
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);

    useEffect(() => {
        if (!csvData) return;

        // Converte i dati CSV in un array di oggetti (rows)
        const rows = csvData.split('\n').map(row => row.split(','));
        
        const headers = rows[0];
        const data = rows.slice(1);

        //La prima colonna è X, la seconda Y
        const xIndex = 0;  // Indice della colonna X
        const yIndex = 1;  // Indice della colonna Y

        // Imposta i titoli degli assi
        setXAxisTitle(headers[xIndex]);
        setYAxisTitle(headers[yIndex]);

        // Estrai i valori delle colonne X e Y
        setXValues(data.map(row => row[xIndex]));
        setYValues(data.map(row => row[yIndex]));

    }, [csvData]); //ogni volta che csvData cambia

    if(!csvData) {
        return null;
    }

    return (
        <div style={{ width: '100%' }}>
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
                    height: 400,
                    title: 'Plot from HTML file', 
                    autosize: true,
                    xaxis: { title: xAxisTitle },
                    yaxis: { title: yAxisTitle}
                }}
                //stile per fare in modo che diventi responsivo
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default GeneratedPlotly;


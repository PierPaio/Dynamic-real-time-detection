import React from 'react';
import Plot from 'react-plotly.js';

const CsvPlotter = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available to plot.</p>;

  //recupera le intestazioni che si trovano nella prima riga del file
  const headers = Object.keys(data[0]);
  //estrarre tutti valori della prima colonna
  const xValues = data.map(row => row[headers[0]]);
  //estrarre tutti valori della seconda colonna
  const yValues = data.map(row => row[headers[1]]);
  //estrarre tutti valori della terza colonna
  const anomalyValues = data.map(row => row[headers[2]]);

  //Separo dati in base a se è anomalia o meno
  const normalPoints = {
    x: xValues.filter((_, i) => anomalyValues[i] === '0'), 
    y: yValues.filter((_, i) => anomalyValues[i] === '0'),
    mode: "markers",
    marker: { color: 'green' },
    name: 'Normal'
  };

  const anomalyPoints = {
    x: xValues.filter((_, i) => anomalyValues[i] === '1'), 
    y: yValues.filter((_, i) => anomalyValues[i] === '1'),
    mode: "markers",
    marker: { color: 'red' },
    name: 'Anomaly'
  };

  return (
    <div style={{ width: '100%' }}>
      <Plot
        data={[ normalPoints, anomalyPoints ]}
        layout={{ 
          height: 400,
          autosize: true,
          title: 'CSV Data Plot',
          xaxis: { title: headers[0] },
          yaxis: { title: headers[1] }
        }}
        //stile per fare in modo che diventi responsivo
        config={{ responsive: true }}
        useResizeHandler={true}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default CsvPlotter;

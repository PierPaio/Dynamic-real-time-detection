import React from 'react';
import Plot from 'react-plotly.js';

const CsvPlotter = ({ data, id }) => {
  if (!data || data.length === 0) return;

  //recupera le intestazioni che si trovano nella prima riga del file
  const headers = Object.keys(data[0]);
  //estrarre tutti valori della prima colonna
  const xValues = data.map(row => row[headers[0]]);
  //estrarre tutti valori della seconda colonna
  const yValues = data.map(row => row[headers[1]]);

  return (
    <div id={id} style={{ width: '100%' }}>
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
                    autosize: true,
                    title: 'CSV Data Plot',
                    xaxis: { title: headers[0] },
                    yaxis: { title: headers[1] }
                }}
                //stile per fare in modo che diventi responsivo
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
  );
};

export default CsvPlotter;

const fs = require('fs');
const path = require('path');

// Percorsi dei file CSV
const rawDataFilePath = path.join(__dirname, 'server', 'data', 'Random.csv'); // Solo Timestamp e Value
const anomalyDataFilePath = path.join(__dirname, 'server', 'data', 'Random_with_anomaly.csv'); // Timestamp, Value, Anomaly

// Soglia per definire un'anomalia
const SOGLIA_ANOMALIA = 800;

// Funzione per generare dati casuali
const generateRandomData = () => {
  const timestamp = new Date().toISOString(); // Colonna data
  const randomValue = (Math.random() * 1000).toFixed(4); // Valore con 4 cifre decimali
  return { timestamp, randomValue };
};

// Funzione per aggiungere i dati ai file CSV
const appendDataToCsv = () => {
  const { timestamp, randomValue } = generateRandomData();

  // Formatta i dati per il file che contiene solo Timestamp e Value
  const rawData = `${timestamp},${randomValue}\n`;

  // Aggiunge solo Timestamp e Value al file Random.csv
  if (!fs.existsSync(rawDataFilePath)) {
    const header = 'Timestamp,Value\n';
    fs.writeFileSync(rawDataFilePath, header); // Crea il file con l'intestazione
  }
  fs.appendFile(rawDataFilePath, rawData, (err) => {
    if (err) {
      console.error('Errore nell\'aggiunta dei dati al file CSV (dati grezzi):', err);
    } else {
      console.log('Dati grezzi aggiunti al file CSV:', rawData);
    }
  });

  // Controlla se è un'anomalia
  const anomalia = randomValue > SOGLIA_ANOMALIA ? 1 : 0;

  // Formatta i dati per il file che contiene anche l'anomalia
  const anomalyData = `${timestamp},${randomValue},${anomalia}\n`;

  // Aggiunge Timestamp, Value e Anomaly al file Random_with_anomaly.csv
  if (!fs.existsSync(anomalyDataFilePath)) {
    const header = 'Timestamp,Value,Anomaly\n';
    fs.writeFileSync(anomalyDataFilePath, header); // Crea il file con l'intestazione
  }
  fs.appendFile(anomalyDataFilePath, anomalyData, (err) => {
    if (err) {
      console.error('Errore nell\'aggiunta dei dati al file CSV (con anomalie):', err);
    } else {
      console.log('Dati con anomalie aggiunti al file CSV:', anomalyData);
    }
  });
};

// Genera nuovi dati ogni 5 secondi
setInterval(appendDataToCsv, 5000);

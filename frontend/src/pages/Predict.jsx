import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/Predict.css'; // Optional custom styling

const Predict = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n').map((row) => row.split(','));
      const headers = rows[0];
      const data = rows.slice(1, 11); // First 10 rows
      const formattedData = data.map((row) =>
        Object.fromEntries(headers.map((header, i) => [header.trim(), row[i]]))
      );
      setCsvData(formattedData);
    };
    reader.readAsText(file);
  };

  const handlePredict = async () => {
    if (selectedIndex === null) {
      alert('Please select a row.');
      return;
    }

    const row = csvData[selectedIndex];
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict_single', row);
      setPrediction(res.data.prediction);

      // 🌟 Save to localStorage for Insights
      const existingData = JSON.parse(localStorage.getItem("predictionsData")) || [];
      const updatedData = [...existingData, { ...row, Prediction: res.data.prediction }];
      localStorage.setItem("predictionsData", JSON.stringify(updatedData));

    } catch (error) {
      console.error(error);
      alert('Error predicting.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4 text-light text-black">📥 Upload CSV and Predict a Row</h2>

        <input type="file" accept=".csv" onChange={handleFileChange} className="form-control mb-4" />

        {csvData.length > 0 && (
          <div className="table-responsive mb-4">
            <table className="table table-light table-striped table-hover">
              <thead>
                <tr>
                  <th>Select</th>
                  {Object.keys(csvData[0]).map((header, i) => (
                    <th key={i}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="radio"
                        name="selectedRow"
                        value={idx}
                        onChange={() => setSelectedIndex(idx)}
                      />
                    </td>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {csvData.length > 0 && (
          <div className="text-center">
            <button onClick={handlePredict} className="btn btn-success px-5">
              Predict Selected Row
            </button>
          </div>
        )}

        {prediction !== null && (
          <div className="mt-5 text-center">
            <h3 className="text-black ">Prediction Result:</h3>
            <h4 className={prediction === 0 ? 'text-success' : 'text-danger'}>
              {prediction === 0 ? '🌟 Normal Flow' : '⚠️ Attack Detected'}
            </h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Predict;

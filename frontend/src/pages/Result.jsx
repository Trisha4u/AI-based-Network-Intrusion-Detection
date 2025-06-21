import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";

const Result = () => {
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("singlePrediction");
    if (saved) {
      setPrediction(JSON.parse(saved));
    }
  }, []);

  if (!prediction) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger mb-3">⚠️ No prediction found!</h2>
        <button className="btn btn-primary" onClick={() => navigate("/predict")}>
          Go Predict Now
        </button>
      </div>
    );
  }

  const { row, result } = prediction;

  return (
    <div className="container py-5 text-white">
      <h1 className="text-center mb-4">🔍 Prediction Result</h1>

      <div className="card bg-dark p-4 border border-light">
        <h4 className="mb-3">
          🚦 Traffic classified as:{" "}
          <span className={`badge ${result === 0 ? "bg-success" : "bg-danger"}`}>
            {result === 0 ? "Normal" : "Attack"}
          </span>
        </h4>

        <h5 className="mt-4 mb-2">📄 Row Details:</h5>
        <div className="table-responsive">
          <table className="table table-striped table-dark table-bordered">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(row).map(([key, value], idx) => (
                <tr key={idx}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;

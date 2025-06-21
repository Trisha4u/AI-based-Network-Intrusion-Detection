import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Manual = () => {
  const [formData, setFormData] = useState({
    FlowDuration: '',
    TotalFwdPackets: '',
    TotalLengthofFwdPackets: '',
    FlowBytesPerSec: '',
    AvgPacketSize: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        FlowDuration: parseFloat(formData.FlowDuration),
        TotalFwdPackets: parseFloat(formData.TotalFwdPackets),
        TotalLengthofFwdPackets: parseFloat(formData.TotalLengthofFwdPackets),
        FlowBytesPerSec: parseFloat(formData.FlowBytesPerSec),
        AvgPacketSize: parseFloat(formData.AvgPacketSize),
      };

      const res = await axios.post('http://127.0.0.1:8000/predict_single', formattedData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert('❌ Prediction failed. Please enter valid numbers.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4">📌 Manual Feature Input</h2>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          <div className="mb-3">
            <label>Flow Duration</label>
            <input type="number" name="FlowDuration" onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Total Fwd Packets</label>
            <input type="number" name="TotalFwdPackets" onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Total Length of Fwd Packets</label>
            <input type="number" name="TotalLengthofFwdPackets" onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Flow Bytes/s</label>
            <input type="number" name="FlowBytesPerSec" onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Avg Packet Size</label>
            <input type="number" name="AvgPacketSize" onChange={handleChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Predict</button>
        </form>

        {prediction !== null && (
          <div className="mt-4 text-center">
            <h4 className={prediction === 0 ? 'text-success' : 'text-danger'}>
              {prediction === 0 ? '✅ Normal Flow Detected' : '⚠️ Attack Detected'}
            </h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Manual;

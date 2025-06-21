import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Pie, Bar } from 'react-chartjs-2';
import '../styles/Insights.css';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Insights = () => {
  const [normalCount, setNormalCount] = useState(0);
  const [attackCount, setAttackCount] = useState(0);

  useEffect(() => {
    const predictions = JSON.parse(localStorage.getItem('predictionsData')) || [];
    const normals = predictions.filter(p => p.Prediction === 0).length;
    const attacks = predictions.filter(p => p.Prediction === 1).length;
    setNormalCount(normals);
    setAttackCount(attacks);
  }, []);

  const pieData = {
    labels: ['Normal', 'Attack'],
    datasets: [{
      data: [normalCount, attackCount],
      backgroundColor: ['#28a745', '#dc3545'],
      borderColor: ['#28a745', '#dc3545'],
      borderWidth: 1,
    }],
  };

  const barData = {
    labels: ['Flow Duration', 'Total Fwd Packets', 'Length Fwd Packets', 'Flow Bytes/s', 'Avg Packet Size'],
    datasets: [{
      label: 'Feature Importance',
      backgroundColor: '#00c7ff',
      borderColor: '#00bcd4',
      borderWidth: 1,
      data: [85, 75, 65, 60, 55],
    }],
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 text-white bg-dark">
        <h2 className="text-center mb-4 text-light">📊 Network Traffic Insights</h2>

        <div className="row">
          <div className="col-md-6 mb-5">
            <h5 className="text-center text-warning">🧮 Normal vs Attack Distribution</h5>
            <Pie data={pieData} style={{ maxWidth: '400px', margin: '0 auto' }} />
          </div>

          <div className="col-md-6 mb-5">
            <h5 className="text-center text-warning">📌 Top Contributing Features</h5>
            <Bar
              data={barData}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>

        <div className="mt-5 p-4 rounded bg-black border border-warning">
          <h3 className="text-center text-light mb-4">🛡️ Common Network Attack Types</h3>
          <table className="table table-bordered table-light text-center ">
            <thead className="table-warning " >
              <tr>
                <th>Attack Type</th>
                <th>Goal</th>
                <th>Behavior</th>
                <th>Detection Clue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🔥 DDoS</td>
                <td>Overload victim</td>
                <td>Massive traffic flood</td>
                <td>High Flow Duration, Packets/sec</td>
              </tr>
              <tr>
                <td>🔍 PortScan</td>
                <td>Probe for open ports</td>
                <td>Many small packet flows</td>
                <td>Low duration, diverse ports/IPs</td>
              </tr>
              <tr>
                <td>📡 SATAN</td>
                <td>Find vulnerabilities</td>
                <td>Service scanning patterns</td>
                <td>Service-specific request spikes</td>
              </tr>
              <tr>
                <td>🤖 Botnet</td>
                <td>Control infected devices</td>
                <td>Regular encrypted communication</td>
                <td>Fixed C2 server flows</td>
              </tr>
              <tr>
                <td>🔐 Brute Force</td>
                <td>Guess credentials</td>
                <td>Many login attempts</td>
                <td>Frequent failed auth packets</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Insights;

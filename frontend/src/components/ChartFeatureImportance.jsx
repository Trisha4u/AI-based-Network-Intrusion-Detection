import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const data = [
  { feature: 'Flow Duration', importance: 0.15 },
  { feature: 'Total Fwd Packets', importance: 0.12 },
  { feature: 'Total Backward Packets', importance: 0.1 },
  { feature: 'Fwd Packet Length Mean', importance: 0.09 },
  { feature: 'Bwd Packet Length Max', importance: 0.08 },
  { feature: 'Flow IAT Mean', importance: 0.07 },
  { feature: 'Fwd IAT Total', importance: 0.07 },
  { feature: 'Fwd Packet Length Min', importance: 0.06 },
  { feature: 'Fwd Packet Length Std', importance: 0.05 },
  { feature: 'Bwd IAT Mean', importance: 0.05 }
];

const ChartFeatureImportance = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h4 className="text-center mb-3">🔍 Top 10 Features Used in Attack Detection</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 0.2]} />
          <YAxis type="category" dataKey="feature" />
          <Tooltip />
          <Legend />
          <Bar dataKey="importance" fill="#8884d8" name="Importance" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartFeatureImportance;
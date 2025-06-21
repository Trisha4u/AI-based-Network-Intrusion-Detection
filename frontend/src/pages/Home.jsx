import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container text-white">
      <div className="overlay">
        <div className="home-content">
          <h1 className="title">⚡ NIDS - AI Based Intrusion Detection</h1>
          <p className="subtitle">
            Detect DDoS, Port Scans, and other cyber attacks using machine learning!
          </p>

          <div className="features mt-5">
            <h3 className="feature-title text-white">🔍 Key Features: </h3>
            <ul>
              <li>📁 Upload and analyze real-time network data</li>
              <li>📊 Visualize important attack features</li>
              <li>🧠 Trained with CICIDS 2017 dataset + PCA optimization</li>
              <li>🛡️ Detect normal vs. attack traffic in seconds</li>
            </ul>
          </div>

          <Link to="/predict" className="start-btn mt-4">
            🚀 Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

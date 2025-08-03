# AI-based Network Intrusion Detection System (NIDS)

This project implements an AI-powered Network Intrusion Detection System using machine learning models trained on the CICIDS2017 dataset. It includes a React-based frontend for user interaction and a Python backend for prediction logic, with support for both bulk CSV uploads and individual row predictions.

---

## Features

- Upload CSV files containing network traffic data for bulk predictions.
- Predict intrusion types for a single row of input.
- Display prediction results in a clear tabular format.
- Visualize important features using feature importance charts.
- Uses dimensionality reduction (PCA) for improved performance.
- Trained using optimized Random Forest models on a cleaned, balanced dataset.
- React frontend with modern UI and Bootstrap styling.

---

## Technology Stack

| Component        | Technology                             |
|------------------|-----------------------------------------|
| Frontend         | React.js, Axios, Bootstrap              |
| Backend          | Python (Flask or FastAPI), scikit-learn |
| Machine Learning | PCA, Random Forest, scikit-learn        |
| Dataset          | CICIDS2017                              |
| Deployment       | Local setup (supports future cloud hosting) |

---
nids-ai/
├── backend/
│ ├── main.py # Backend API
│ ├── models/ # Trained model, scaler, and PCA
│ └── utils/ # Preprocessing and utility scripts
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── NIDSUpload.jsx
│ │ │ ├── PredictionResult.jsx
│ │ │ ├── ChartFeatureImportance.jsx
│ │ └── App.jsx
├── notebooks/
│ └── model_training.ipynb # Model training and experimentation
├── .gitignore
└── README.md

yaml
Copy
Edit

---

## Dataset: CICIDS2017

- A comprehensive intrusion detection dataset created by the Canadian Institute for Cybersecurity.
- Contains both normal and malicious network traffic including DoS, BruteForce, Botnet, PortScan, and other attack types.
- The dataset is cleaned and balanced before training for optimal performance.

---

## Model Training Summary

1. Load and preprocess the CICIDS2017 dataset.
2. Encode categorical values and handle missing data.
3. Apply PCA for dimensionality reduction.
4. Train a Random Forest classifier.
5. Save the trained model, PCA transformer, and scaler as `.pkl` files.

---

## How to Run

### Backend (Python)

```bash
cd backend
python main.py
Frontend (React with Vite)
bash
Copy
Edit
cd frontend
npm install
npm run dev
Then, open the application in your browser (usually at http://localhost:5173).




Future Improvements
Integration with real-time packet capture tools (e.g., Wireshark).

Deploy backend to cloud services like Render or Heroku.

Interactive charts for deeper analysis of attacks.

Compare multiple models (e.g., RNN, SVM, MLP).

Export prediction reports in PDF or Excel format.

License
This project is licensed under the MIT License.

Author
Developed by Trisha as part of a research and portfolio project in AI-based cybersecurity.



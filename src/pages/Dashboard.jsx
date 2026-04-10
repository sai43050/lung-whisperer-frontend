import { useState } from "react";
import axios from "axios";
import "./styles.css";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://lungwhisperer-backend-production.up.railway.app/predict/",
        formData
      );
      setResult(res.data);
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-container">
      <div className="glass-panel">
        <span className="university-tag">Vignan's Institute of Information Technology</span>
        <h1 className="title" style={{ fontSize: '2.5rem' }}>Lung Analysis Dashboard 🫁</h1>

        <input
          type="file"
          accept=".wav"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="primary-btn" onClick={handleUpload}>
          {loading ? "Analyzing..." : "Upload & Predict"}
        </button>

        {result && (
          <div className="result-box">
            <h2>{result.prediction}</h2>
            <p>{result.confidence}% Confidence</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
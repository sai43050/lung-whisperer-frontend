import { useNavigate } from "react-router-dom";
import "./styles.css";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="center-container">
      <div className="glass-panel">
        <span className="university-tag">Vignan's Institute of Information Technology</span>
        <h1 className="title">Lung Whisperer 🫁</h1>
        <p className="subtitle">
          AI-powered respiratory sound analysis for early disease detection.
        </p>

        <button className="primary-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Intro;
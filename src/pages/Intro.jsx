import { useNavigate } from "react-router-dom";
import "./styles.css";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="center-container">
      <h1 className="title">Lung Whisperer 🫁</h1>
      <p className="subtitle">
        AI-powered respiratory sound analysis for early disease detection.
      </p>

      <button className="primary-btn" onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
}

export default Intro;
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      navigate("/dashboard");
    } else {
      alert("Please enter email & password");
    }
  };

  return (
    <div className="center-container">
      <div className="glass-panel">
        <span className="university-tag">Vignan's Institute of Information Technology</span>
        <h2 className="title">Secure Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
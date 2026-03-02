import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const sendFile = async () => {
    if (!file) {
      alert("Please select an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://lung-whisperer-backend.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(
        `Prediction: ${res.data.prediction} | Confidence: ${res.data.confidence}%`
      );
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to server");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Lung Whisperer 🫁</h1>

      <input
        type="file"
        accept=".wav"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={sendFile}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Upload & Predict
      </button>

      <h3>Response:</h3>
      <p>{response}</p>
    </div>
  );
}

export default App;
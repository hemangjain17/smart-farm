import React, { useState } from 'react';
import axios from 'axios';
import './HealthMonitoring.css';

function HealthMonitoring() {
  const [predictedCropIdx, setPredictedCropIdx] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [cropInfo, setCropInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [phValue, setPhValue] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [humidity, setHumidity] = useState('');
  const [temperature, setTemperature] = useState('');

  const handlePredictCrop = async () => {
    try {
      setLoading(true);
      if (!nitrogen || !phosphorus || !potassium || !phValue) {
        alert('Please provide all values for N, P, K, and pH.');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://127.0.0.1:5000/predict', {
        nitrogen,
        phosphorus,
        potassium,
        ph: phValue,
        rainfall,
        humidity,
        temperature
      });

      setPredictedCropIdx(response.data.predicted_crop);
      setResponseMessage(JSON.stringify(response.data, null, 2));
      setLoading(false);
    } catch (error) {
      setResponseMessage('Error occurred during prediction');
      setLoading(false);
    }
  };

  const handleGenerateCropInfo = async () => {
    try {
      if (predictedCropIdx === null) {
        alert("Please enter details first!");
        return;
      }
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/generate', {  
        predicted_crop_idx: predictedCropIdx,
      });
      setCropInfo(response.data.generated_text);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="crop-prediction">
      <div className='monitoring-head'>Know Soil Health</div>
      <div className="input-container">
        <label>Nitrogen (N) <span>  : </span>
          <input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} />
        </label>
      </div>

      <div className="input-container">
        <label>Phosphorus (P) <span>  : </span>
          <input type="number" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} />
        </label>
      </div>

      <div className="input-container">
        <label>Potassium (K) <span>  : </span>
          <input type="number" value={potassium} onChange={(e) => setPotassium(e.target.value)} />
        </label>
      </div>

      <div className="input-container">
        <label>pH Value <span>  : </span>
          <input type="number" step="0.01" value={phValue} onChange={(e) => setPhValue(e.target.value)} />
        </label>
      </div>

      <div className="input-container">
        <label>Temperature <span>  : </span>
          <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
        </label>
      </div>

      <div className="input-container">
        <label>Humidity <span>  : </span>
          <input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
        </label>
      </div>

      <div className="input-container">
        <label>Rainfall (mm)<span>  : </span>
          <input type="number" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
        </label>
      </div>

      <button className= "button" onClick={handlePredictCrop} disabled={loading}>
        {loading ? "Fetching Details..." : "Get Details"}
      </button>

      {predictedCropIdx !== null && (
        <div>
          <h3>Predicted Crop Index: {predictedCropIdx}</h3>
          <button className= "button" onClick={handleGenerateCropInfo} disabled={loading}>
            {loading ? "Generating Info..." : "Generate Crop Info"}
          </button>
        </div>
      )}

      {cropInfo && (
        <div>
          <h3>Generated Crop Info:</h3>
          <p>{cropInfo}</p>
        </div>
      )}
    </div>
  );
}

export default HealthMonitoring;

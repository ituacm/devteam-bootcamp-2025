import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      setLoading(true);
      const backendUrl =
        import.meta.env.VITE_API_URL || "https://your-backend.vercel.app";
      const response = await axios.get(`${backendUrl}/api/health`);
      setApiStatus({
        status: "healthy",
        data: response.data,
      });
    } catch (error) {
      setApiStatus({
        status: "error",
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>🚀 ITU ACM DevTeam Bootcamp</h1>
        <h2>Vite + React + Vercel Demo</h2>
        <p>Modern web development with lightning-fast deployment</p>

        <div className="features">
          <div className="feature">
            <h3>⚡ Vite</h3>
            <p>Lightning fast build tool</p>
          </div>
          <div className="feature">
            <h3>⚛️ React</h3>
            <p>Modern UI library</p>
          </div>
          <div className="feature">
            <h3>🌐 Vercel</h3>
            <p>Seamless deployment</p>
          </div>
        </div>
      </div>

      <div className="api-status-section">
        <h3>🔗 Backend API Status</h3>
        {loading ? (
          <div className="loading">Checking API status...</div>
        ) : (
          <div className={`api-status ${apiStatus.status}`}>
            {apiStatus.status === "healthy" ? (
              <div>
                <p>✅ API is healthy</p>
                <details>
                  <summary>API Details</summary>
                  <pre>{JSON.stringify(apiStatus.data, null, 2)}</pre>
                </details>
              </div>
            ) : (
              <div>
                <p>❌ API is not available</p>
                <p>Error: {apiStatus.error}</p>
              </div>
            )}
            <button onClick={checkApiStatus} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        )}
      </div>

      <div className="deployment-info">
        <h3>📦 Deployment Information</h3>
        <div className="deployment-details">
          <p>
            <strong>Environment:</strong> {import.meta.env.MODE}
          </p>
          <p>
            <strong>Build Time:</strong> {new Date().toISOString()}
          </p>
          <p>
            <strong>Vite Version:</strong>{" "}
            {import.meta.env.VITE_VERSION || "Unknown"}
          </p>
          <p>
            <strong>Node Environment:</strong> {import.meta.env.NODE_ENV}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

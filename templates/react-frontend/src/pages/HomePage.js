import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.get('/health');
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data from API');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to {{APP_TITLE}}</h1>
        <p>A React application built with the Copilot Starter Kit</p>
      </div>

      <div className="content">
        <section className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>⚛️ React 18</h3>
              <p>Modern React with hooks and concurrent features</p>
            </div>
            <div className="feature-card">
              <h3>🚀 React Router</h3>
              <p>Client-side routing for single page application</p>
            </div>
            <div className="feature-card">
              <h3>📡 API Ready</h3>
              <p>Pre-configured API service with error handling</p>
            </div>
            <div className="feature-card">
              <h3>🧪 Testing Setup</h3>
              <p>Jest and React Testing Library included</p>
            </div>
          </div>
        </section>

        <section className="api-demo">
          <h2>API Connection Demo</h2>
          <p>Test connection to backend API at: <code>{{API_BASE_URL}}</code></p>
          
          <button 
            onClick={fetchData} 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Loading...' : 'Test API Connection'}
          </button>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {data && (
            <div className="alert alert-success">
              <strong>API Connected!</strong>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </section>

        <section className="next-steps">
          <h2>Next Steps</h2>
          <ul>
            <li>🎨 Customize components and styling</li>
            <li>🔌 Connect to your backend API</li>
            <li>📊 Add state management</li>
            <li>🔐 Implement authentication</li>
            <li>📱 Add more pages and features</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
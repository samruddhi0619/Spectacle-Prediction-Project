import React, { useState, useEffect } from 'react';
import { Eye, Server, CheckCircle2, AlertCircle, HelpCircle, X, ExternalLink, Moon, Sun } from 'lucide-react';

export default function Header({ currentNav, onNavChange, theme, onToggleTheme }) {
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'connected', 'offline'
  const [backendHost, setBackendHost] = useState('http://localhost:8000');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkStatus = async () => {
      try {
        let res;
        try {
          res = await fetch('/api/status', { method: 'GET', signal: AbortSignal.timeout(3500) });
        } catch {
          res = await fetch('http://localhost:8000/api/status', { method: 'GET', signal: AbortSignal.timeout(3500) });
        }

        if (res.ok && isMounted) {
          setBackendStatus('connected');
        } else if (isMounted) {
          setBackendStatus('offline');
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus('offline');
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000); // Recheck every 15s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'screen', label: 'Screen Eye' },
    { id: 'eyecare', label: 'Eye Care' },
    { id: 'visiontests', label: 'Vision Tests' },
    { id: 'history', label: 'History' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="app-header-advanced">
      <div className="header-top-row">
        {/* Brand */}
        <div className="brand-section" onClick={() => onNavChange('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <Eye size={24} />
          </div>
          <div>
            <h1 className="brand-title">AI Vision Screening System</h1>
            <p className="brand-subtitle">
              Refractive Error & Spectacle Screening via Deep Transfer Learning
            </p>
          </div>
        </div>

        {/* Right Controls: Backend Status Badge + Dark Mode Toggle */}
        <div className="header-actions-right">
          {/* Dark Mode Toggle Button */}
          <button 
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={16} className="theme-icon sun" />
                <span className="theme-label">Light</span>
              </>
            ) : (
              <>
                <Moon size={16} className="theme-icon moon" />
                <span className="theme-label">Dark</span>
              </>
            )}
          </button>

          {/* Backend Connection Status Badge */}
          <div className="backend-status-container">
            <div 
              className={`backend-status-pill ${backendStatus}`}
              onClick={() => setShowTooltip(!showTooltip)}
              title="Click to learn about backend connection status"
            >
              <div className={`status-indicator-dot ${backendStatus}`}></div>
              <span className="status-pill-text">
                {backendStatus === 'connected' && (
                  <>Backend connected — uvicorn running at <a href={backendHost} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>{backendHost}</a></>
                )}
                {backendStatus === 'checking' && 'Connecting to local AI Backend...'}
                {backendStatus === 'offline' && `Backend disconnected (${backendHost})`}
              </span>
              <button className="status-info-trigger" aria-label="Info about connection">
                <HelpCircle size={14} />
              </button>
            </div>

            {/* Status Modal/Tooltip */}
            {showTooltip && (
              <div className="status-popover">
                <div className="popover-header">
                  <span className="popover-title">
                    <Server size={15} /> Backend Server Connection Details
                  </span>
                  <button className="popover-close" onClick={() => setShowTooltip(false)}>
                    <X size={14} />
                  </button>
                </div>
                <div className="popover-body">
                  <p>
                    <strong>Server Type:</strong> Uvicorn ASGI Server running FastAPI on <code>http://localhost:8000</code>.
                  </p>
                  <p>
                    <strong>What this confirms:</strong> The React web client is communicating with the local Python backend API and receiving health responses.
                  </p>
                  <p className="popover-note">
                    <em>Note:</em> Confirms socket and HTTP reachability to the local server; individual deep-learning inference calls are executed upon submitting an ocular image.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="header-nav-bar">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-button ${currentNav === item.id ? 'active' : ''}`}
                onClick={() => onNavChange(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

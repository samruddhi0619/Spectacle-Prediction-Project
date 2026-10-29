import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ScreenEyeView from './components/ScreenEye/ScreenEyeView';
import EyeCarePage from './components/EyeCarePage';
import VisionTestsPage from './components/VisionTestsPage';
import HistoryPage from './components/HistoryPage';
import AboutPage from './components/AboutPage';
import './App.css';

export default function App() {
  const [currentNav, setCurrentNav] = useState('home');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('vision_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('vision_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {/* Global Navigation Header with Backend Status & Dark Mode Toggle */}
      <Header 
        currentNav={currentNav} 
        onNavChange={setCurrentNav} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Router */}
      <main className="app-main-content">
        {currentNav === 'home' && (
          <HomePage onNavigate={setCurrentNav} />
        )}

        {currentNav === 'screen' && (
          <ScreenEyeView 
            onNavigateToHistory={() => setCurrentNav('history')}
            onNavigateToVisionTests={() => setCurrentNav('visiontests')}
          />
        )}

        {currentNav === 'eyecare' && (
          <EyeCarePage />
        )}

        {currentNav === 'visiontests' && (
          <VisionTestsPage />
        )}

        {currentNav === 'history' && (
          <HistoryPage 
            onNavigateToScreen={() => setCurrentNav('screen')}
          />
        )}

        {currentNav === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Global Clinical Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-bold">AI-Based Vision Screening System</span>
            <span className="footer-sep">·</span>
            <span>Final Year Engineering Project</span>
            <span className="footer-sep">·</span>
            <span>Transfer Learning (ResNet-18)</span>
          </div>
          <div className="footer-right">
            <span>Preliminary Screening Tool · Not a Certified Medical Device</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Clock, Trash2, CheckCircle2, AlertTriangle, Eye, 
  Sparkles, Sliders, ChevronDown, ChevronUp, Download, ArrowRight
} from 'lucide-react';

export default function HistoryPage({ onNavigateToScreen }) {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const raw = localStorage.getItem('vision_screening_history');
      if (raw) {
        setHistory(JSON.parse(raw));
      } else {
        setHistory([]);
      }
    } catch (e) {
      console.warn('Failed to parse history:', e);
      setHistory([]);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local screening history? This cannot be undone.')) {
      localStorage.removeItem('vision_screening_history');
      setHistory([]);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="history-page-container">
      <div className="page-header-block flex-between">
        <div>
          <div className="page-badge"><Clock size={14} /> Local Audit Record</div>
          <h1 className="page-title">Screening Session History</h1>
          <p className="page-subtitle">
            Chronological audit of prior vision screening assessments stored privately in your browser storage.
          </p>
        </div>

        {history.length > 0 && (
          <div className="history-actions-top">
            <button className="btn-danger-outline" onClick={handleClearHistory}>
              <Trash2 size={16} /> Clear All Records
            </button>
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-empty-card">
          <div className="empty-icon-box">
            <Eye size={48} color="#94a3b8" />
          </div>
          <h3>No Past Screening Records Found</h3>
          <p>
            You have not performed any vision screenings in this browser session yet.
          </p>
          <button className="btn-primary" onClick={onNavigateToScreen} style={{ marginTop: 16 }}>
            <Sparkles size={16} /> Run Your First Eye Screening <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => {
            const isSpectacle = item.spectaclesNeeded;
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="history-card">
                <div className="history-card-summary" onClick={() => toggleExpand(item.id)}>
                  <div className="history-thumbnail-wrap">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt="Eye thumbnail" className="history-thumbnail" />
                    ) : (
                      <div className="history-thumb-placeholder"><Eye size={22} /></div>
                    )}
                  </div>

                  <div className="history-main-info">
                    <div className="history-date-row">
                      <span className="history-date">{formatDate(item.timestamp)}</span>
                      <span className={`history-verdict-tag ${isSpectacle ? 'warning' : 'success'}`}>
                        {isSpectacle ? '👓 Spectacles Needed' : '✅ No Spectacles Needed'}
                      </span>
                    </div>

                    <div className="history-confidence-row">
                      <span className="history-label">Confidence:</span>
                      <strong className="history-val">{item.confidence}%</strong>
                      <span className="history-prob-summary">
                        (Needed: {item.probabilities?.['Spectacles Needed'] ?? (isSpectacle ? item.confidence : 100 - item.confidence)}% · Normal: {item.probabilities?.['No Spectacles Needed'] ?? (!isSpectacle ? item.confidence : 100 - item.confidence)}%)
                      </span>
                    </div>
                  </div>

                  <div className="history-expand-btn">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="history-card-details">
                    <div className="history-advice-box">
                      <strong>Clinical Guidance:</strong>
                      <p>{item.clinicalAdvice}</p>
                    </div>

                    {item.extractedFeatures && (
                      <div className="history-features-grid">
                        <div className="feature-stat">
                          <span className="stat-label">Focal Sharpness:</span>
                          <span className="stat-val">{item.extractedFeatures.focal_sharpness_score}</span>
                        </div>
                        <div className="feature-stat">
                          <span className="stat-label">Meridional Asymmetry:</span>
                          <span className="stat-val">{item.extractedFeatures.meridional_asymmetry_index}</span>
                        </div>
                        <div className="feature-stat">
                          <span className="stat-label">Pupil Contrast:</span>
                          <span className="stat-val">{item.extractedFeatures.pupil_iris_contrast_ratio}</span>
                        </div>
                        <div className="feature-stat">
                          <span className="stat-label">Reflex Symmetry:</span>
                          <span className="stat-val">{item.extractedFeatures.reflex_symmetry_score}%</span>
                        </div>
                      </div>
                    )}

                    <div className="history-disclaimer-mini">
                      Preliminary screening record. Consult an optometrist or ophthalmologist for medical prescriptions.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

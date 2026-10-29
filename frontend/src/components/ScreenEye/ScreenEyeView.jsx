import React, { useState, useEffect } from 'react';
import StageProgress from './StageProgress';
import ImageUploader from '../ImageUploader';
import WebcamCapture from '../WebcamCapture';
import ResultCard from '../ResultCard';
import MedicalDisclaimer from '../MedicalDisclaimer';
import CaptureGuidelines from '../CaptureGuidelines';
import { 
  Upload, Camera, CheckCircle2, AlertTriangle, ArrowRight, 
  RotateCcw, Sparkles, Sliders, Shield, BookOpen, Clock, Scan
} from 'lucide-react';

export default function ScreenEyeView({ onNavigateToHistory, onNavigateToVisionTests }) {
  const [currentStage, setCurrentStage] = useState(1);
  const [activeInputTab, setActiveInputTab] = useState('upload'); // 'upload' or 'webcam'
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [screeningSteps, setScreeningSteps] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [savedToHistory, setSavedToHistory] = useState(false);
  const [qualityChecklist, setQualityChecklist] = useState({
    singleEye: true,
    pupilVisible: true,
    noGlasses: true,
    goodLighting: true,
  });

  // Handle image selected from upload or webcam
  const handleImageSelected = (base64Data, file) => {
    setSelectedImage(base64Data);
    setSelectedFile(file || null);
    setResult(null);
    setError(null);
    setSavedToHistory(false);

    // Compute basic client-side image meta for Quality Review stage
    const img = new Image();
    img.onload = () => {
      setImageMeta({
        width: img.width,
        height: img.height,
        aspectRatio: (img.width / img.height).toFixed(2),
        estimatedQuality: img.width >= 300 && img.height >= 300 ? 'Good' : 'Acceptable',
      });
      // Move immediately to Stage 2: Review Image Quality
      setCurrentStage(2);
    };
    img.src = base64Data;
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setImageMeta(null);
    setResult(null);
    setError(null);
    setSavedToHistory(false);
    setCurrentStage(1);
  };

  const executeScreening = async () => {
    if (!selectedImage && !selectedFile) {
      setError('Please provide an eye image first.');
      setCurrentStage(1);
      return;
    }

    setCurrentStage(3); // Stage 3: AI Screening
    setLoading(true);
    setError(null);
    setScreeningSteps(1);

    // Simulated stepped visual feedback for deep learning pipeline
    const stepTimer1 = setTimeout(() => setScreeningSteps(2), 500);
    const stepTimer2 = setTimeout(() => setScreeningSteps(3), 1100);
    const stepTimer3 = setTimeout(() => setScreeningSteps(4), 1600);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else if (selectedImage) {
        formData.append('image_base64', selectedImage);
      }

      let response;
      try {
        response = await fetch('/api/predict', {
          method: 'POST',
          body: formData,
        });
      } catch {
        response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error (${response.status})`);
      }

      const data = await response.json();
      setResult(data);

      // Auto-save to localStorage history
      saveToLocalHistory(data, selectedImage);

      // Transition to Stage 4: Spectacles Screening Verdict
      setCurrentStage(4);
    } catch (err) {
      console.error('Screening execution failed:', err);
      setError(err.message || 'Failed to communicate with AI Backend. Check if backend is active at http://localhost:8000');
      setCurrentStage(2); // Fallback to stage 2 so user can retry
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setLoading(false);
    }
  };

  const saveToLocalHistory = (resData, imgSrc) => {
    try {
      const historyItem = {
        id: 'screen_' + Date.now(),
        timestamp: new Date().toISOString(),
        verdict: resData.status,
        spectaclesNeeded: resData.spectacles_needed,
        confidence: resData.confidence_percentage,
        probabilities: resData.probabilities,
        clinicalAdvice: resData.clinical_advice,
        extractedFeatures: resData.extracted_features,
        refinedPreview: resData.refined_image_preview,
        thumbnail: imgSrc,
      };

      const existingRaw = localStorage.getItem('vision_screening_history');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [historyItem, ...existing].slice(0, 30); // Keep last 30
      localStorage.setItem('vision_screening_history', JSON.stringify(updated));
      setSavedToHistory(true);
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  return (
    <div className="screen-eye-container">
      {/* 4-Stage Stepper Bar */}
      <StageProgress 
        currentStage={currentStage} 
        onStageClick={(stageNum) => {
          if (stageNum === 1) handleReset();
          else if (stageNum === 2 && selectedImage) setCurrentStage(2);
          else if (stageNum === 4 && result) setCurrentStage(4);
        }} 
      />

      {/* Prominent Medical Warning Banner */}
      <MedicalDisclaimer />

      {/* Stage 1: Select Eye Image(s) */}
      {currentStage === 1 && (
        <div className="screening-stage-panel">
          <div className="stage-header-title">
            <div className="stage-badge">Stage 1 of 4</div>
            <h2>Select Eye Image(s)</h2>
            <p className="stage-subtitle">
              Acquire a single eye photograph using file upload or your webcam.
            </p>
          </div>

          <div className="stage-content-split">
            {/* Input Method Selector & Uploader */}
            <div className="stage-main-card">
              <div className="tab-switcher">
                <button
                  type="button"
                  className={`tab-btn ${activeInputTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveInputTab('upload')}
                >
                  <Upload size={16} /> Upload Image
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeInputTab === 'webcam' ? 'active' : ''}`}
                  onClick={() => setActiveInputTab('webcam')}
                >
                  <Camera size={16} /> Live Camera Snapshot
                </button>
              </div>

              {activeInputTab === 'upload' ? (
                <ImageUploader
                  selectedImage={selectedImage}
                  onImageSelected={handleImageSelected}
                  onClearImage={handleReset}
                />
              ) : (
                <WebcamCapture
                  onCapture={(base64) => handleImageSelected(base64, null)}
                  onCancel={() => setActiveInputTab('upload')}
                />
              )}
            </div>

            {/* Side Guidelines Teaser */}
            <div className="stage-side-card">
              <div className="side-card-title">
                <CheckCircle2 size={18} color="#2563eb" /> Quick Capture Essentials
              </div>
              <ul className="quick-guidelines-list">
                <li>Capture only one eye per image</li>
                <li>Keep camera centered at eye level</li>
                <li>Distance: approximately 20–30 cm</li>
                <li>Ensure bright ambient lighting (no harsh flash)</li>
                <li>Keep eye relaxed and iris clearly focused</li>
              </ul>
              <div className="side-card-footer">
                <span className="side-note">
                  Detailed 19-point capture guidelines available below.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Review Image Quality */}
      {currentStage === 2 && (
        <div className="screening-stage-panel">
          <div className="stage-header-title">
            <div className="stage-badge">Stage 2 of 4</div>
            <h2>Review Image Quality</h2>
            <p className="stage-subtitle">
              Verify optical clarity, framing, and alignment before running the AI screening pipeline.
            </p>
          </div>

          <div className="stage-content-split">
            {/* Left: Image Preview & Dimensions */}
            <div className="stage-main-card">
              <div className="quality-preview-box">
                <img src={selectedImage} alt="Eye for Review" className="quality-preview-img" />
              </div>

              {imageMeta && (
                <div className="image-metrics-row">
                  <div className="metric-tag">
                    <span>Resolution:</span>
                    <strong>{imageMeta.width} × {imageMeta.height} px</strong>
                  </div>
                  <div className="metric-tag">
                    <span>Ratio:</span>
                    <strong>{imageMeta.aspectRatio}</strong>
                  </div>
                  <div className="metric-tag">
                    <span>Clarity Index:</span>
                    <strong style={{ color: '#059669' }}>{imageMeta.estimatedQuality}</strong>
                  </div>
                </div>
              )}

              {error && (
                <div className="stage-error-banner">
                  <AlertTriangle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="stage-actions-row">
                <button className="btn-secondary" onClick={handleReset}>
                  <RotateCcw size={16} /> Choose Another Image
                </button>
                <button className="btn-primary" onClick={executeScreening}>
                  <Sparkles size={16} /> Confirm & Proceed to AI Screening <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right: Quality Checklist */}
            <div className="stage-side-card">
              <div className="side-card-title">
                <Sliders size={18} color="#2563eb" /> Quality Checklist Confirmation
              </div>
              <p className="checklist-desc">
                Ensure your photo meets standard ocular imaging quality checks:
              </p>

              <div className="checklist-items">
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    checked={qualityChecklist.singleEye}
                    onChange={(e) => setQualityChecklist({ ...qualityChecklist, singleEye: e.target.checked })}
                  />
                  <span>Single eye prominently centered in frame</span>
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    checked={qualityChecklist.pupilVisible}
                    onChange={(e) => setQualityChecklist({ ...qualityChecklist, pupilVisible: e.target.checked })}
                  />
                  <span>Pupil margin & iris border in sharp focus</span>
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    checked={qualityChecklist.noGlasses}
                    onChange={(e) => setQualityChecklist({ ...qualityChecklist, noGlasses: e.target.checked })}
                  />
                  <span>No eyeglasses or colored contacts worn</span>
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    checked={qualityChecklist.goodLighting}
                    onChange={(e) => setQualityChecklist({ ...qualityChecklist, goodLighting: e.target.checked })}
                  />
                  <span>No heavy corneal glare or dark shadow splits</span>
                </label>
              </div>

              <div className="checklist-tip">
                Tip: Higher optical sharpness directly improves convolutional neural network confidence.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 3: AI Screening In-Progress */}
      {currentStage === 3 && (
        <div className="screening-stage-panel">
          <div className="stage-header-title text-center">
            <div className="stage-badge">Stage 3 of 4</div>
            <h2>AI Screening in Progress</h2>
            <p className="stage-subtitle">
              Analyzing corneal reflection, focal sharpness, and meridional symmetry...
            </p>
          </div>

          <div className="ai-screening-card">
            <div className="screening-animation-ring">
              <div className="ring-pulse"></div>
              <Sparkles size={36} color="#2563eb" />
            </div>

            <h3 className="screening-status-title">Executing Deep Vision Pipeline</h3>
            <p className="screening-status-sub">
              Communicating with local PyTorch model on FastAPI backend...
            </p>

            {/* Stepped progress indicators */}
            <div className="pipeline-steps-container">
              <div className={`pipeline-step ${screeningSteps >= 1 ? 'active' : ''} ${screeningSteps > 1 ? 'done' : ''}`}>
                <div className="step-circle">{screeningSteps > 1 ? '✓' : '1'}</div>
                <div className="step-text">Input Normalization & Resizing (224×224)</div>
              </div>
              <div className={`pipeline-step ${screeningSteps >= 2 ? 'active' : ''} ${screeningSteps > 2 ? 'done' : ''}`}>
                <div className="step-circle">{screeningSteps > 2 ? '✓' : '2'}</div>
                <div className="step-text">Ocular ROI Localization & CLAHE Contrast Equalization</div>
              </div>
              <div className={`pipeline-step ${screeningSteps >= 3 ? 'active' : ''} ${screeningSteps > 3 ? 'done' : ''}`}>
                <div className="step-circle">{screeningSteps > 3 ? '✓' : '3'}</div>
                <div className="step-text">ResNet-18 Deep Feature Extraction (512-dim embedding)</div>
              </div>
              <div className={`pipeline-step ${screeningSteps >= 4 ? 'active' : ''}`}>
                <div className="step-circle">4</div>
                <div className="step-text">Spectacle Requirement Decision & Confidence Fusion</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 4: Spectacles Screening Verdict */}
      {currentStage === 4 && result && (
        <div className="screening-stage-panel">
          <div className="stage-header-title">
            <div className="stage-badge success">Stage 4 of 4</div>
            <h2>Spectacles Screening Verdict</h2>
            <p className="stage-subtitle">
              Preliminary screening outcome based on deep-learning ocular image analysis.
            </p>
          </div>

          <div className="stage-content-split">
            {/* Primary Result Card */}
            <div className="stage-main-card">
              <ResultCard result={result} loading={false} />

              <div className="verdict-actions-footer">
                <button className="btn-secondary" onClick={handleReset}>
                  <RotateCcw size={16} /> Screen Another Eye
                </button>
                {onNavigateToHistory && (
                  <button className="btn-secondary" onClick={onNavigateToHistory}>
                    <Clock size={16} /> View Screening History
                  </button>
                )}
                {onNavigateToVisionTests && (
                  <button className="btn-primary" onClick={onNavigateToVisionTests}>
                    Take Vision Tests <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Side Panel: Preliminary Nature Notice & Context */}
            <div className="stage-side-card">
              <div className="side-card-title">
                <Shield size={18} color="#f59e0b" /> Preliminary Screening Notice
              </div>
              <div className="verdict-disclaimer-box">
                <p>
                  <strong>Important:</strong> This result represents a <strong>preliminary screening indicator</strong> derived from optical surface patterns.
                </p>
                <p>
                  It does <strong>not</strong> constitute an official medical diagnosis, nor does it provide a precise optical prescription (dioptric power).
                </p>
                <p>
                  Regardless of the automated result, routine annual eye examinations by an optometrist or ophthalmologist are recommended to evaluate comprehensive visual acuity and internal ocular health.
                </p>
              </div>

              {savedToHistory && (
                <div className="saved-indicator">
                  <CheckCircle2 size={16} color="#059669" />
                  <span>This screening outcome has been automatically saved to your History.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Detailed Eye-Image Capture Guidelines (All 19 instructions) */}
      <div style={{ marginTop: 40 }}>
        <CaptureGuidelines />
      </div>
    </div>
  );
}

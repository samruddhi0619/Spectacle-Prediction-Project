import React from 'react';
import { 
  Eye, Sparkles, ArrowRight, ShieldCheck, Camera, Layers, 
  Activity, CheckCircle2, Sliders, Clock, FileText, Glasses
} from 'lucide-react';
import MedicalDisclaimer from './MedicalDisclaimer';

export default function HomePage({ onNavigate }) {
  return (
    <div className="home-page-container">
      {/* Medical Disclaimer Banner */}
      <MedicalDisclaimer compact={true} />

      {/* Hero Section */}
      <div className="hero-card">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} /> AI-Powered Ophthalmic Screening Prototype
          </div>
          <h1 className="hero-headline">
            Intelligent Vision Screening & Spectacle Need Determination
          </h1>
          <p className="hero-description">
            Evaluate ocular photographs for refractive error markers using Deep Transfer Learning. 
            Follow a standardized 4-stage screening workflow from your webcam or photo upload to determine 
            whether corrective spectacles may be indicated.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-lg" onClick={() => onNavigate('screen')}>
              <Eye size={20} /> Start Eye Screening <ArrowRight size={18} />
            </button>
            <button className="btn-secondary-lg" onClick={() => onNavigate('visiontests')}>
              <Activity size={18} /> Interactive Vision Tests
            </button>
            <button className="btn-secondary-lg" onClick={() => onNavigate('eyecare')}>
              <ShieldCheck size={18} /> Eye Care Guide
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-mockup-card">
            <div className="mockup-header">
              <div className="mockup-dot red"></div>
              <div className="mockup-dot yellow"></div>
              <div className="mockup-dot green"></div>
              <span className="mockup-title">4-Stage Vision Screening</span>
            </div>
            <div className="mockup-body">
              <div className="mockup-step">
                <span className="step-num">1</span>
                <div>
                  <strong>Select Eye Image</strong>
                  <p>Webcam capture or high-res photo upload</p>
                </div>
              </div>
              <div className="mockup-step">
                <span className="step-num">2</span>
                <div>
                  <strong>Review Image Quality</strong>
                  <p>Clarity check, lighting, & 19-point guidelines</p>
                </div>
              </div>
              <div className="mockup-step">
                <span className="step-num">3</span>
                <div>
                  <strong>AI Screening</strong>
                  <p>ResNet-18 Transfer Learning feature pipeline</p>
                </div>
              </div>
              <div className="mockup-step highlight">
                <span className="step-num">4</span>
                <div>
                  <strong>Screening Verdict</strong>
                  <p>Spectacles Required / Normal Vision indication</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Stage Workflow Overview Card */}
      <div className="section-block">
        <div className="section-title-wrap">
          <h2 className="section-title">The 4-Stage Screening Workflow</h2>
          <p className="section-desc">
            A guided clinical methodology ensuring consistent ocular imaging and reliable feature extraction.
          </p>
        </div>

        <div className="workflow-cards-grid">
          <div className="workflow-card" onClick={() => onNavigate('screen')}>
            <div className="workflow-step-badge">Stage 1</div>
            <div className="workflow-icon"><Camera size={24} /></div>
            <h3>Select Eye Image(s)</h3>
            <p>
              Acquire corneal and anterior segment eye imagery using either a drag-and-drop file upload or your webcam.
            </p>
          </div>

          <div className="workflow-card" onClick={() => onNavigate('screen')}>
            <div className="workflow-step-badge">Stage 2</div>
            <div className="workflow-icon"><Sliders size={24} /></div>
            <h3>Review Image Quality</h3>
            <p>
              Inspect image resolution, focus sharpness, and verify adherence to the 19 standard clinical capture guidelines.
            </p>
          </div>

          <div className="workflow-card" onClick={() => onNavigate('screen')}>
            <div className="workflow-step-badge">Stage 3</div>
            <div className="workflow-icon"><Layers size={24} /></div>
            <h3>AI Screening</h3>
            <p>
              Automated Ocular ROI localization, CLAHE contrast enhancement, and ResNet-18 convolutional feature extraction.
            </p>
          </div>

          <div className="workflow-card" onClick={() => onNavigate('screen')}>
            <div className="workflow-step-badge">Stage 4</div>
            <div className="workflow-icon"><Glasses size={24} /></div>
            <h3>Spectacles Verdict</h3>
            <p>
              Clear binary outcome: Spectacles Needed vs. No Spectacles Needed, along with confidence score and clinical guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="section-block">
        <div className="section-title-wrap">
          <h2 className="section-title">Key Capabilities & Safety Modules</h2>
          <p className="section-desc">
            Engineered with deep learning, transparent status reporting, and clinical safety guardrails.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon blue"><Layers size={22} /></div>
            <h3>Transfer Learning Core</h3>
            <p>
              Employs a deep convolutional network pre-trained on complex spatial features to examine pupil margin contrast and corneal reflections.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon green"><Activity size={22} /></div>
            <h3>Interactive Vision Tests</h3>
            <p>
              Self-check vision tests including the Astigmatism Sunburst Dial and Visual Acuity Tumbling E test.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon amber"><ShieldCheck size={22} /></div>
            <h3>Safety & Medical Disclaimer</h3>
            <p>
              Clear clinical disclaimers highlighting preliminary screening nature and necessity of professional refraction exams.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon purple"><Clock size={22} /></div>
            <h3>Screening History</h3>
            <p>
              Local tracking of prior screening sessions with timestamps, confidence ratings, and feature breakdowns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

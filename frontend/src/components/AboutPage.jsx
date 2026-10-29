import React from 'react';
import { 
  Info, Cpu, Layers, Database, ShieldCheck, CheckCircle2, 
  Sparkles, FileText, Activity, Code2, HeartHandshake
} from 'lucide-react';
import MedicalDisclaimer from './MedicalDisclaimer';

export default function AboutPage() {
  return (
    <div className="about-page-container">
      <div className="page-header-block">
        <div className="page-badge"><Info size={14} /> System Architecture & Documentation</div>
        <h1 className="page-title">About the Vision Screening System</h1>
        <p className="page-subtitle">
          AI-Based Vision Screening of Refractive Errors Using Deep Learning & Transfer Learning (ResNet-18).
        </p>
      </div>

      <MedicalDisclaimer compact={true} />

      {/* Project Abstract Card */}
      <div className="about-abstract-card">
        <h2>Engineering Abstract & Rationale</h2>
        <p>
          Uncorrected refractive errors (myopia, hyperopia, and astigmatism) constitute the leading cause of preventable visual impairment worldwide. In developing communities and remote areas, access to qualified optometrists and expensive auto-refractometers is severely limited.
        </p>
        <p>
          This engineering prototype demonstrates an automated, non-invasive screening pipeline that extracts subtle ocular geometric contours, corneal light reflex symmetry, and pupil-iris contrast ratios from accessible consumer camera imagery to evaluate whether an individual demonstrates normal visual alignment or requires corrective prescription spectacles.
        </p>
      </div>

      {/* Technical Architecture Blocks */}
      <div className="section-block">
        <div className="section-title-wrap">
          <h2 className="section-title">Technical Architecture & Deep Learning Core</h2>
          <p className="section-desc">
            End-to-end processing pipeline from consumer image acquisition to clinical verdict generation.
          </p>
        </div>

        <div className="two-col-grid">
          <div className="about-tech-card">
            <div className="tech-card-header">
              <Cpu size={22} color="#2563eb" />
              <h3>Convolutional Neural Network</h3>
            </div>
            <ul className="tech-list">
              <li><strong>Backbone:</strong> Deep ResNet-18 architecture with residual skip connections.</li>
              <li><strong>Transfer Learning:</strong> Leverages feature hierarchies pre-trained on millions of spatial gradients to eliminate overfitting on small medical cohorts.</li>
              <li><strong>Classification Head:</strong> Custom dense classification layers utilizing dropout regularization (p=0.3) and softmax probability normalization.</li>
              <li><strong>Execution Environment:</strong> Local PyTorch runtime served via FastAPI and Uvicorn.</li>
            </ul>
          </div>

          <div className="about-tech-card">
            <div className="tech-card-header">
              <Layers size={22} color="#10b981" />
              <h3>Computer Vision & Optical Refinement</h3>
            </div>
            <ul className="tech-list">
              <li><strong>Ocular ROI Localization:</strong> Automated bounding box segmentation isolating the corneal and iris circle from extraneous facial landmarks.</li>
              <li><strong>CLAHE Enhancement:</strong> Contrast Limited Adaptive Histogram Equalization prevents flash saturation and enhances corneal reflection rings.</li>
              <li><strong>Engineered Optical Features:</strong> Extracts Laplacian focal sharpness, meridional asymmetry index, and reflex symmetry percentage.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dataset & Validation */}
      <div className="section-block">
        <div className="about-dataset-card">
          <div className="tech-card-header">
            <Database size={22} color="#f59e0b" />
            <h3>Dataset Organization & Retraining Capability</h3>
          </div>
          <p>
            The training pipeline is structured into standard binary classification partitions:
          </p>
          <div className="dataset-structure-code">
            <pre>
{`backend/dataset/
├── Spectacles not required/  # Emmetropic normal vision eye imagery
│   ├── normal/
│   └── normal1/
└── spectacles needed/        # Refractive error ocular imagery
    ├── astigmatism/
    ├── hyperopia/
    └── myopia/`}
            </pre>
          </div>
          <p style={{ marginTop: 12 }}>
            The backend training pipeline seamlessly accepts additional anterior segment or fundus camera clinical cohorts via <code>python train.py</code>.
          </p>
        </div>
      </div>

      {/* Ethical AI & Safety Protocols */}
      <div className="section-block">
        <div className="ethical-card">
          <div className="tech-card-header">
            <HeartHandshake size={22} color="#8b5cf6" />
            <h3>Ethical AI & Clinical Guardrails</h3>
          </div>
          <div className="ethical-grid">
            <div className="ethical-item">
              <strong>Zero Remote Telemetry</strong>
              <p>Ocular images are processed locally on your local machine; biometric data is never transmitted to cloud servers.</p>
            </div>
            <div className="ethical-item">
              <strong>Preliminary Screening Principle</strong>
              <p>Designed solely as a triage and screening assistant, reinforcing that only licensed optometrists can prescribe diopters.</p>
            </div>
            <div className="ethical-item">
              <strong>Quality Transparency</strong>
              <p>The 19-point capture guidelines educate users on optical physics and prevent misinterpretations from blurry images.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

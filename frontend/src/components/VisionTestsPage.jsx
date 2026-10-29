import React, { useState } from 'react';
import { 
  Eye, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, 
  HelpCircle, Compass, Grid, Sparkles, Activity
} from 'lucide-react';
import MedicalDisclaimer from './MedicalDisclaimer';

export default function VisionTestsPage() {
  const [activeTest, setActiveTest] = useState('astigmatism'); // 'astigmatism', 'tumblingE', 'amsler'

  // Tumbling E test state
  const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
  const [eStep, setEStep] = useState(0); // 0 to 4
  const [eDirection, setEDirection] = useState('RIGHT');
  const [eScore, setEScore] = useState(0);
  const [eFinished, setEFinished] = useState(false);

  const eSizes = [72, 48, 32, 20, 14];
  const eLevels = ['20/70', '20/50', '20/40', '20/25', '20/20'];

  const startTumblingE = () => {
    setEStep(0);
    setEScore(0);
    setEFinished(false);
    pickRandomDirection();
  };

  const pickRandomDirection = () => {
    const nextDir = directions[Math.floor(Math.random() * directions.length)];
    setEDirection(nextDir);
  };

  const handleEAnswer = (selectedDir) => {
    if (eFinished) return;

    if (selectedDir === eDirection) {
      setEScore((prev) => prev + 1);
    }

    if (eStep < eSizes.length - 1) {
      setEStep((prev) => prev + 1);
      pickRandomDirection();
    } else {
      setEFinished(true);
    }
  };

  const getRotationDegree = (dir) => {
    switch (dir) {
      case 'UP': return -90;
      case 'RIGHT': return 0;
      case 'DOWN': return 90;
      case 'LEFT': return 180;
      default: return 0;
    }
  };

  return (
    <div className="vision-tests-container">
      <div className="page-header-block">
        <div className="page-badge"><Activity size={14} /> Interactive Screening Tests</div>
        <h1 className="page-title">Self-Administered Vision Tests</h1>
        <p className="page-subtitle">
          Interactive screening charts to quickly test astigmatism meridians, visual acuity, and central macular grid symmetry.
        </p>
      </div>

      <MedicalDisclaimer compact={true} />

      {/* Test Tabs */}
      <div className="test-nav-pills">
        <button
          className={`test-pill ${activeTest === 'astigmatism' ? 'active' : ''}`}
          onClick={() => setActiveTest('astigmatism')}
        >
          <Compass size={16} /> 1. Astigmatism Dial Test
        </button>
        <button
          className={`test-pill ${activeTest === 'tumblingE' ? 'active' : ''}`}
          onClick={() => {
            setActiveTest('tumblingE');
            if (eStep === 0 && !eFinished) startTumblingE();
          }}
        >
          <Eye size={16} /> 2. Visual Acuity (Tumbling E)
        </button>
        <button
          className={`test-pill ${activeTest === 'amsler' ? 'active' : ''}`}
          onClick={() => setActiveTest('amsler')}
        >
          <Grid size={16} /> 3. Amsler Grid Test
        </button>
      </div>

      {/* Test 1: Astigmatism Dial Test */}
      {activeTest === 'astigmatism' && (
        <div className="test-panel-card">
          <div className="test-instruction-box">
            <h3>Astigmatism Sunburst / Clock Dial Test</h3>
            <p>
              Astigmatism occurs when the cornea is curved like a rugby ball rather than a sphere, causing light rays to focus at multiple focal points.
            </p>
            <ol className="test-steps-list">
              <li>Position yourself approximately <strong>1 meter (arm's length)</strong> away from the screen.</li>
              <li>Cover your <strong>left eye</strong> with the palm of your hand and look at the center of the wheel.</li>
              <li>Observe if all spoke lines appear equally sharp, dark, and uniform.</li>
              <li>Uncover the left eye, cover the <strong>right eye</strong>, and repeat the check.</li>
            </ol>
          </div>

          <div className="test-display-area">
            {/* SVG Sunburst Dial */}
            <div className="dial-container">
              <svg width="280" height="280" viewBox="0 0 280 280" className="astigmatism-svg">
                {/* 12 radial spokes (every 15 degrees) */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 140 + 20 * Math.cos(angle);
                  const y1 = 140 + 20 * Math.sin(angle);
                  const x2 = 140 + 130 * Math.cos(angle);
                  const y2 = 140 + 130 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#0f172a"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })}
                <circle cx="140" cy="140" r="10" fill="#2563eb" />
              </svg>
            </div>

            <div className="dial-interpretation-box">
              <h4>How to Interpret Your Results:</h4>
              <div className="interp-row">
                <div className="interp-icon success"><CheckCircle2 size={18} /></div>
                <div>
                  <strong>All lines appear equally black and sharp:</strong>
                  <p>Likely indicates minimal to no corneal meridional astigmatism in that eye.</p>
                </div>
              </div>
              <div className="interp-row">
                <div className="interp-icon warning"><AlertTriangle size={18} /></div>
                <div>
                  <strong>Some lines appear significantly darker or thicker than others:</strong>
                  <p>Common indicator of astigmatism. Corrective toric spectacles or lenses may be beneficial.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test 2: Tumbling E Test */}
      {activeTest === 'tumblingE' && (
        <div className="test-panel-card">
          <div className="test-instruction-box">
            <h3>Visual Acuity (Tumbling E) Self-Test</h3>
            <p>
              Sit approximately <strong>1.5 to 2 meters</strong> away from your screen. Identify which direction the prongs of the letter "E" are pointing.
            </p>
          </div>

          {!eFinished ? (
            <div className="tumbling-e-container">
              <div className="e-step-progress">
                Level {eStep + 1} of {eSizes.length} · Target Acuity: {eLevels[eStep]}
              </div>

              <div className="tumbling-e-box">
                <span
                  className="tumbling-e-letter"
                  style={{
                    fontSize: `${eSizes[eStep]}px`,
                    transform: `rotate(${getRotationDegree(eDirection)}deg)`,
                  }}
                >
                  E
                </span>
              </div>

              <div className="e-buttons-prompt">Which direction are the prongs pointing?</div>
              <div className="e-controls-grid">
                <div></div>
                <button className="e-dir-btn" onClick={() => handleEAnswer('UP')}>▲ Up</button>
                <div></div>
                <button className="e-dir-btn" onClick={() => handleEAnswer('LEFT')}>◀ Left</button>
                <div className="e-center-dot"></div>
                <button className="e-dir-btn" onClick={() => handleEAnswer('RIGHT')}>Right ▶</button>
                <div></div>
                <button className="e-dir-btn" onClick={() => handleEAnswer('DOWN')}>▼ Down</button>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="tumbling-result-box">
              <div className="result-score-circle">
                {eScore} / {eSizes.length}
              </div>
              <h3>Visual Acuity Test Finished</h3>
              <p>
                You correctly identified {eScore} out of {eSizes.length} optotype orientations.
                {eScore >= 4 ? (
                  <span style={{ color: '#059669', display: 'block', marginTop: 8, fontWeight: 600 }}>
                    Estimated Visual Acuity: Approx. 20/20 to 20/25 (Good central distance acuity).
                  </span>
                ) : (
                  <span style={{ color: '#b45309', display: 'block', marginTop: 8, fontWeight: 600 }}>
                    Estimated Visual Acuity: Reduced (Below 20/30). A formal Snellen clinical exam is advised.
                  </span>
                )}
              </p>
              <button className="btn-primary" onClick={startTumblingE} style={{ marginTop: 16 }}>
                <RotateCcw size={16} /> Retake Acuity Test
              </button>
            </div>
          )}
        </div>
      )}

      {/* Test 3: Amsler Grid Test */}
      {activeTest === 'amsler' && (
        <div className="test-panel-card">
          <div className="test-instruction-box">
            <h3>Amsler Grid Test (Macula & Central Field)</h3>
            <p>
              Used in ophthalmology to screen for central visual field distortions, macular degeneration, and optical waviness.
            </p>
            <ol className="test-steps-list">
              <li>Wear your normal reading glasses if you currently use any.</li>
              <li>Hold screen at normal reading distance (approx. 35–40 cm).</li>
              <li>Cover one eye and stare directly at the black central dot.</li>
              <li>Observe: Are all grid lines straight and continuous? Are there missing patches or wavy lines?</li>
            </ol>
          </div>

          <div className="test-display-area">
            {/* High Contrast Amsler Grid */}
            <div className="amsler-grid-box">
              <div className="amsler-grid">
                {Array.from({ length: 144 }).map((_, idx) => (
                  <div key={idx} className="amsler-cell" />
                ))}
                <div className="amsler-center-dot" />
              </div>
            </div>

            <div className="dial-interpretation-box">
              <h4>What You Should Observe:</h4>
              <ul className="info-bullet-list">
                <li><strong>Normal:</strong> All lines remain straight, square boxes are uniform, and all four corners are visible.</li>
                <li><strong>Abnormal / Metamorphopsia:</strong> Lines appear bent, bowed, wavy, or a gray cloud/hole appears near the center. If present, consult a retina specialist.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

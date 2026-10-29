import React, { useState } from 'react';
import { Camera, CheckCircle2, AlertCircle, Sparkles, Lightbulb, ShieldCheck, HelpCircle } from 'lucide-react';

export default function CaptureGuidelines() {
  const [filter, setFilter] = useState('all');

  const guidelines = [
    { id: 1, title: 'Capture only one eye at a time', desc: 'Frame the image so that a single eye fills the center of the frame for optimal feature extraction.', cat: 'framing' },
    { id: 2, title: 'Keep the eye fully open and look directly at camera', desc: 'Maintain a direct, straight-on gaze without turning your head away or tilting upward.', cat: 'posture' },
    { id: 3, title: 'Keep the camera at eye level and the eye centred', desc: 'Align the camera lens directly horizontally with your eye height to avoid perspective distortion.', cat: 'framing' },
    { id: 4, title: 'Maintain approximately 20–30 cm distance', desc: 'Hold the camera approximately 8 to 12 inches away from the eye for sharp optical focus.', cat: 'framing' },
    { id: 5, title: 'Use sufficient, diffuse room lighting', desc: 'Ensure bright, uniform ambient lighting; avoid harsh direct flashlight directly into the pupil.', cat: 'lighting' },
    { id: 6, title: 'Keep the camera stable and avoid motion blur', desc: 'Rest your elbow on a table or steady both hands before triggering the capture button.', cat: 'clarity' },
    { id: 7, title: 'Ensure the iris and pupil margins are clearly visible', desc: 'The circular boundary between the iris, pupil, and sclera must be crisp and in sharp focus.', cat: 'clarity' },
    { id: 8, title: 'Avoid heavy cropping, tinted glasses and reflections', desc: 'Do not crop out the outer eyelid borders, and avoid strong screen glare reflected in the cornea.', cat: 'clarity' },
    { id: 9, title: 'Remove eyeglasses and contact lenses prior to capture', desc: 'Corrective lenses add external optical distortion, reflections, and artificial magnification.', cat: 'posture' },
    { id: 10, title: 'Keep eyelashes from obscuring the pupil center', desc: 'Gently open your eyelids naturally so that lashes do not cast dark shadows across the pupil.', cat: 'posture' },
    { id: 11, title: 'Avoid squinting, frowning, or straining during capture', desc: 'Keep facial muscles relaxed to preserve natural palpebral aperture and pupil aperture.', cat: 'posture' },
    { id: 12, title: 'Clean your camera lens to remove fingerprints and smudges', desc: 'Oily smears on the smartphone or webcam glass produce hazy, artificial low-contrast blur.', cat: 'clarity' },
    { id: 13, title: 'Position primary light source in front or slightly to the side', desc: 'Never sit directly with a bright sunny window behind your head (backlighting ruins contrast).', cat: 'lighting' },
    { id: 14, title: 'Blink comfortably just before holding the eye open', desc: 'A fresh, moist tear film ensures smooth corneal specular reflection without dry eye artifacts.', cat: 'posture' },
    { id: 15, title: 'Maintain uniform ambient lighting without split shadows', desc: 'Avoid half-lit rooms where one side of the eye is completely dark while the other is washed out.', cat: 'lighting' },
    { id: 16, title: 'Use a clear resolution camera sensor (at least 720p)', desc: 'Higher pixel density provides better input for deep convolutional feature extraction.', cat: 'clarity' },
    { id: 17, title: 'Avoid extreme oblique or steep angles', desc: 'Extreme top-down or bottom-up angles skew the perceived elliptical ratio of the cornea.', cat: 'framing' },
    { id: 18, title: 'Disable beautification filters and digital smoothing', desc: 'AI beautification algorithms smooth over essential optical textures needed by the screening model.', cat: 'clarity' },
    { id: 19, title: 'Allow the autofocus to lock before snapping the photo', desc: 'Wait 1–2 seconds for the camera sensor to lock its focus plane onto the pupil plane.', cat: 'clarity' },
  ];

  const filtered = filter === 'all' ? guidelines : guidelines.filter(g => g.cat === filter);

  return (
    <div className="guidelines-card">
      <div className="guidelines-header">
        <div className="guidelines-title-wrap">
          <div className="guidelines-icon-box">
            <Camera size={22} />
          </div>
          <div>
            <h2 className="guidelines-title">How to Capture a Good Eye Image</h2>
            <p className="guidelines-subtitle">
              Follow these 19 standardized clinical imaging principles for accurate AI vision screening.
            </p>
          </div>
        </div>
      </div>

      {/* Why This Feature Matters Callout */}
      <div className="why-matters-box">
        <div className="why-matters-icon">
          <Lightbulb size={20} />
        </div>
        <div>
          <div className="why-matters-title">Why image quality matters</div>
          <div className="why-matters-text">
            Deep-learning vision screening models inspect microscopic reflections, pupil margin clarity, and corneal contours. 
            Poor-quality images (motion blur, flash glare, or off-center angles) may make analysis less reliable. 
            Following these instructions ensures consistent, high-fidelity feature extraction.
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="guidelines-filter-bar">
        <button 
          className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All 19 Guidelines
        </button>
        <button 
          className={`filter-pill ${filter === 'framing' ? 'active' : ''}`}
          onClick={() => setFilter('framing')}
        >
          Framing & Distance
        </button>
        <button 
          className={`filter-pill ${filter === 'lighting' ? 'active' : ''}`}
          onClick={() => setFilter('lighting')}
        >
          Lighting & Environment
        </button>
        <button 
          className={`filter-pill ${filter === 'clarity' ? 'active' : ''}`}
          onClick={() => setFilter('clarity')}
        >
          Focus & Clarity
        </button>
        <button 
          className={`filter-pill ${filter === 'posture' ? 'active' : ''}`}
          onClick={() => setFilter('posture')}
        >
          Eye Posture & Prep
        </button>
      </div>

      {/* Guidelines Grid */}
      <div className="guidelines-grid">
        {filtered.map((item) => (
          <div key={item.id} className="guideline-item">
            <div className="guideline-num">{item.id}</div>
            <div className="guideline-content">
              <div className="guideline-item-title">{item.title}</div>
              <div className="guideline-item-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

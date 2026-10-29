import React, { useState, useEffect } from 'react';
import { 
  Heart, Clock, Eye, AlertTriangle, CheckCircle2, Play, 
  Pause, RotateCcw, Sparkles, BookOpen, Sun, ShieldCheck
} from 'lucide-react';

export default function EyeCarePage() {
  // 20-20-20 rule timer state (in seconds, default 20 minutes = 1200s, break = 20s)
  const [timerSeconds, setTimerSeconds] = useState(1200);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (!isBreak) {
        // Transition to 20-second break
        setIsBreak(true);
        setTimerSeconds(20);
      } else {
        // Break finished, reset to 20 minutes
        setIsBreak(false);
        setTimerSeconds(1200);
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds, isBreak]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimerSeconds(1200);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="eyecare-page-container">
      <div className="page-header-block">
        <div className="page-badge"><Heart size={14} /> Preventative Vision Health</div>
        <h1 className="page-title">Comprehensive Eye Care & Wellness</h1>
        <p className="page-subtitle">
          Evidence-based guidance, ergonomic practices, and interactive visual relief tools to protect your eyes.
        </p>
      </div>

      {/* Interactive 20-20-20 Rule Timer Card */}
      <div className="timer-wellness-card">
        <div className="timer-info-col">
          <div className="timer-pill">
            <Clock size={15} /> Clinical Ergonomics
          </div>
          <h2 className="timer-title">The 20-20-20 Ergonomic Rule</h2>
          <p className="timer-desc">
            To prevent digital eye strain (Computer Vision Syndrome), every <strong>20 minutes</strong>, look at an object <strong>20 feet away</strong> for at least <strong>20 seconds</strong>. This relaxes your ciliary eye muscles.
          </p>

          <div className="timer-status-box">
            <div className="timer-mode-label">
              {isBreak ? '🌿 Break Time: Look 20 Feet Away!' : '💻 Work Session Running'}
            </div>
            <div className="timer-digits">{formatTime(timerSeconds)}</div>
            <div className="timer-btn-row">
              <button className="btn-primary" onClick={toggleTimer}>
                {isRunning ? <><Pause size={16} /> Pause Timer</> : <><Play size={16} /> Start 20-Min Timer</>}
              </button>
              <button className="btn-secondary" onClick={resetTimer}>
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>

        <div className="timer-benefits-col">
          <h3 className="benefits-heading">Why This Prevents Eyestrain:</h3>
          <ul className="benefits-list">
            <li>Relieves accommodation spasm of the intraocular lens.</li>
            <li>Promotes full, complete blinks to lubricate the cornea.</li>
            <li>Reduces tension headaches associated with prolonged screen time.</li>
            <li>Decreases end-of-day burning, redness, and dry eye sensations.</li>
          </ul>
        </div>
      </div>

      {/* 5 Clinical Eye Exercises */}
      <div className="section-block">
        <div className="section-title-wrap">
          <h2 className="section-title">5 Effective Daily Eye Exercises</h2>
          <p className="section-desc">
            Simple 2-minute daily exercises to maintain ocular muscle flexibility and reduce fatigue.
          </p>
        </div>

        <div className="exercises-grid">
          <div className="exercise-card">
            <div className="exercise-num">1</div>
            <h3>Palming (Deep Relaxation)</h3>
            <p>
              Rub your palms together until warm, gently cup them over closed eyes without pressing the eyeballs. Breathe deeply in complete darkness for 1 minute.
            </p>
          </div>

          <div className="exercise-card">
            <div className="exercise-num">2</div>
            <h3>Near & Far Refocusing</h3>
            <p>
              Hold your thumb 10 inches from your face. Focus on it for 5 seconds, then switch focus to an object 15–20 feet away for 5 seconds. Repeat 10 times.
            </p>
          </div>

          <div className="exercise-card">
            <div className="exercise-num">3</div>
            <h3>Figure Eight Eye Tracking</h3>
            <p>
              Imagine a giant sideways 8 (infinity sign) 10 feet in front of you. Trace the shape slowly with your eyes only, without moving your head, for 30 seconds.
            </p>
          </div>

          <div className="exercise-card">
            <div className="exercise-num">4</div>
            <h3>Conscious Blinking Break</h3>
            <p>
              Screen users blink 60% less frequently. Close your eyes gently for 2 seconds, open them, and repeat 10 times to evenly redistribute the tear film.
            </p>
          </div>

          <div className="exercise-card">
            <div className="exercise-num">5</div>
            <h3>Multi-Directional Saccades</h3>
            <p>
              Look straight up, hold for 2 seconds, then straight down. Repeat horizontally looking far left, then far right. Relaxes extraocular rectus muscles.
            </p>
          </div>
        </div>
      </div>

      {/* Workspace Lighting & Nutrition */}
      <div className="section-block">
        <div className="two-col-grid">
          <div className="info-card">
            <div className="info-card-header">
              <Sun size={20} color="#f59e0b" />
              <h3>Optimal Screen & Lighting Setup</h3>
            </div>
            <ul className="info-bullet-list">
              <li><strong>Screen Distance:</strong> Position monitor 50–70 cm (arm's length) away.</li>
              <li><strong>Viewing Angle:</strong> The top of the screen should sit slightly below eye level (15° downward gaze).</li>
              <li><strong>Ambient Illumination:</strong> Ambient room light should be equal in brightness to the monitor; avoid working in total darkness.</li>
              <li><strong>Anti-Glare Measures:</strong> Turn screens perpendicular to sunny windows to prevent reflections.</li>
            </ul>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <ShieldCheck size={20} color="#10b981" />
              <h3>Nutrition for Long-Term Eye Health</h3>
            </div>
            <ul className="info-bullet-list">
              <li><strong>Lutein & Zeaxanthin:</strong> Dark leafy greens (spinach, kale) protect the retinal macula from blue light damage.</li>
              <li><strong>Omega-3 Fatty Acids:</strong> Flaxseed, walnuts, and oily fish maintain healthy meibomian oil glands in eyelids.</li>
              <li><strong>Vitamin A & Beta-Carotene:</strong> Carrots and sweet potatoes support rhodopsin production for low-light night vision.</li>
              <li><strong>Vitamin C & E:</strong> Citrus and almonds combat cellular oxidative stress in lens proteins.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Red-Flag Symptoms Warning */}
      <div className="urgent-warning-card">
        <div className="warning-icon-box">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3>When to See an Eye Specialist Immediately</h3>
          <p>
            Seek immediate medical attention from an ophthalmologist or hospital emergency room if you experience:
            sudden vision loss in one or both eyes, flashes of light with floating spots, dark curtain-like shadows across your field of vision, severe eye pain, or double vision.
          </p>
        </div>
      </div>
    </div>
  );
}

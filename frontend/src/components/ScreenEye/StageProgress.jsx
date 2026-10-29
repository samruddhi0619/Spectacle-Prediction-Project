import React from 'react';
import { ImagePlus, CheckSquare, Cpu, FileCheck2 } from 'lucide-react';

export default function StageProgress({ currentStage, onStageClick }) {
  const stages = [
    { number: 1, title: 'Select Eye Image(s)', icon: ImagePlus },
    { number: 2, title: 'Review Image Quality', icon: CheckSquare },
    { number: 3, title: 'AI Screening', icon: Cpu },
    { number: 4, title: 'Spectacles Screening Verdict', icon: FileCheck2 },
  ];

  return (
    <div className="stage-stepper-container">
      <div className="stage-stepper-track">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCompleted = currentStage > stage.number;
          const isCurrent = currentStage === stage.number;
          const isClickable = isCompleted || (stage.number === 2 && currentStage >= 2);

          return (
            <React.Fragment key={stage.number}>
              <div 
                className={`stepper-node ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  if (isClickable && onStageClick) {
                    onStageClick(stage.number);
                  }
                }}
                style={{ cursor: isClickable ? 'pointer' : 'default' }}
              >
                <div className="stepper-circle">
                  {isCompleted ? (
                    <span className="stepper-check">✓</span>
                  ) : (
                    <span className="stepper-number">{stage.number}</span>
                  )}
                </div>
                <div className="stepper-label-group">
                  <span className="stepper-stage-title">{stage.title}</span>
                  <span className="stepper-stage-sub">
                    {stage.number === 1 && 'Photo upload or camera'}
                    {stage.number === 2 && 'Clarity & alignment check'}
                    {stage.number === 3 && 'ResNet-18 Deep inference'}
                    {stage.number === 4 && 'Preliminary verdict'}
                  </span>
                </div>
              </div>

              {idx < stages.length - 1 && (
                <div className={`stepper-connector ${currentStage > stage.number ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import './progressbar.css';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;

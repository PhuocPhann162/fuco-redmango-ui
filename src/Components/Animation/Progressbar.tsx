import React from 'react';
import './progressbar.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="container">
      <i className="fas fa-3x fa-crown icon"></i>
      <div className="progress2 progress-moved">
        <div className="progress-bar2" style={{ width: `${progress}%` }}></div>
        <div className="loader" style={{ '--n': '1', '--f': '0' } as React.CSSProperties}></div>
      </div>
    </div>
  );
};

export default ProgressBar;

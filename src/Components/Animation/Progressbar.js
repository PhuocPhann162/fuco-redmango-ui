import React from "react";
import "./progressbar.css";
const ProgressBar = ({ progress }) => {
  const myProgress = progress;
  document.documentElement.style.setProperty("--p", myProgress);
  return (
    <div className="container mt-3">
      <div className="progress2 progress-moved">
        <div className="progress-bar2" style={{ width: `${progress}%` }} />
        <div className="row justify-content-between">
          <label className="col-xl-1 body icon fs-4"> VIP </label>
          <div className="col-xl-2 loader fs-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

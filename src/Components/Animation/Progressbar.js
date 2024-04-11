import React from "react";
import "./progressbar.css";
const ProgressBar = ({ progress }) => {
  const myProgress = progress;
  document.documentElement.style.setProperty("--p", myProgress);
  return (
    <div className="container">
      <div className="progress2 progress-moved">
        <div className="row justify-content-between">
          {/* <i className="col-xl-1 bi bi-star-fill icon " /> */}
          <label className="col-xl-1 body icon"> VIP </label>
          <div className="col-xl-2 loader"></div>
        </div>
        <div className="progress-bar2" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;

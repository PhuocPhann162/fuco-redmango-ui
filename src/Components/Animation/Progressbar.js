import React from "react";
import "./progressbar.css";

const ProgressBar = ({ progress }) => {
  document.documentElement.style.setProperty('--p', '0');
  return (
    <div className="rol justify-content-b">
      <div className="progress2 progress-moved">
        <div className="row justify-content-between">
          <i className="col-xl-1 bi bi-star-fill icon " />
          <div className="col-xl-2 loader" style={{ "--n": "1", "--f": "0" }} />
        </div>
        <div className="progress-bar2" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;

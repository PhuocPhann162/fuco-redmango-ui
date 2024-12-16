import React from "react";

function MiniLoader({ type = "warning", size = 80 }) {
  return (
    <div
      data-testid="mini-loader"
      className={`spinner-border text-${type}`}
      style={{ scale: `${size}%` }}
    >
      {" "}
    </div>
  );
}

export default MiniLoader;

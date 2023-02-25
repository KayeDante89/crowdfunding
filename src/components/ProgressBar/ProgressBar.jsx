import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ goal, total }) => {
  const progressPercentage = Math.round((total / goal) * 100) + "%";
  const remainder = Math.round(goal - total, 2);
  console.log(progressPercentage);
  const progressStyle = {
    width: progressPercentage,
  };
  return (
    <div id="progress-container">
      <div id="progress-bar">
        <div style={progressStyle} id="progress"></div>
      </div>
      <h3 className="sub-text">
        Progress: ${total} of ${goal}.
      </h3>
    </div>
  );
};

export default ProgressBar;

import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ goal, total }) => {
  const progressPercentage = Math.round((total / goal) * 100) + "%";
  const remainder = Math.round(goal - total, 2);
  // const goalPercent = goal + "%";
  console.log(progressPercentage);
  const progressStyle = {
    width: progressPercentage,
  };
  const completeGoalStyle = {
    width: "100%",
  };

  return (
    <div id="progress-container">
      <div id="progress-bar">
        {total < goal ? (
          <div style={progressStyle} id="progress"></div>
        ) : (
          <div style={completeGoalStyle} id="progress"></div>
        )}
      </div>
      {total < goal ? (
        <p className="sub-text">
          <b>${total > 0 ? total : "0"} raised</b> of ${goal} goal
        </p>
      ) : (
        <p>
          Goal reached! | ${total} raised of {goal} goal
        </p>
      )}
    </div>
  );
};

export default ProgressBar;

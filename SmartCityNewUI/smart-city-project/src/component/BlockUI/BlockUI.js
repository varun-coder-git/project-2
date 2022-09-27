import React from "react";
import './AppB.css'
const BlockUI = props => {
  if (!props.blocking) {
    return "";
  } else {
    return (
      <div className="block-ui-container">
        <div className="block-ui-overlay" />
        <div className="block-ui-message-container">
          <div className="block-ui-message">
            <div className="block-ui-title">
                <h4>{props.title}</h4>
            </div>
            <div className="loading-indicator">
              <svg id="indicator" viewBox="0 0 100 100">
                <circle id="circle" cx="50" cy="50" r="45" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
 
BlockUI.defaultProps = {
  blocking: false,
  title: "Please wait..."
};
 
export default BlockUI;

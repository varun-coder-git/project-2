import React from "react";
import "./common.css";

const AnalyticsOptions = (props) => {
  const options = [
    { text: "Web", handler: props.actionProvider.handleWeb, id: 1, },
    { text: "Social Media", handler: props.actionProvider.handleSocialMedia, id: 2 },
    { text: "Collaboration", handler: props.actionProvider.handleCollaborationList, id: 3 },
    { text: "Back to main menu", handler: props.actionProvider.handleLearningList, id: 4 }
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};


export default AnalyticsOptions;

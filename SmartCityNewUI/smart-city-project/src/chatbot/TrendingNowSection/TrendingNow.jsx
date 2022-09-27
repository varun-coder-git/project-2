import React from "react";
import "./common.css";

const TrendingNow = (props) => {
  const options = [
    { text: "Join a Community", handler: props.actionProvider.handleJoinCommunity, id: 1},
    { text: "Polls/Surveys", handler: props.actionProvider.handlePollSurvey, id: 2 },
    { text: "Discussion Forums", handler: props.actionProvider.handleDiscussionForum, id: 3 },
    { text: "Share and Discuss Idea", handler: props.actionProvider.handleShareDiscuss, id: 2 },
    { text: "Become a Volunteer", handler: props.actionProvider.handleVolunteer, id: 5 },
    { text: "Back to main menu", handler: props.actionProvider.handleLearningList, id: 6 }

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


export default TrendingNow;

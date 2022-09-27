import React from "react";
import "./common.css";

const ShareDiscussOptions = (props) => {
    const options = [
        // { text: "Polls/Surveys", handler: props.actionProvider.handleDataList, id:1},
        // { text: "Discussion Forums", handler:props.actionProvider.handleCityList , id: 2},
        // { text: "Become a Volunteer", handler:props.actionProvider.handleNearList, id: 3},
        // { text: "Join a Community",handler:props.actionProvider.handleAnalyticsList, id: 4},
         { text: "Back to main menu", handler: props.actionProvider.handleRootMainMenu, id: 4 }
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


export default ShareDiscussOptions;

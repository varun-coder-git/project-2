import React from "react";
import "./common.css";

const NearMe = (props) => {
    const options = [
        {text:"back to near me",handler:props.actionProvider.handleNearMe, id: 5 }
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


export default NearMe;

import React from "react";
import "./common.css";

const CommonReturn = (props) => {
    const options = [
        {text:"back to citizen services",handler:props.actionProvider.handleCitizenService, id: 1 }
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


export default CommonReturn;

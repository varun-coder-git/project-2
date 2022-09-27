import React from "react";
import "./common.css";

const Analytics = (props) => {
    const options = [
        {text:"back to analytics",handler:props.actionProvider.handleAnalytics, id: 1 }
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


export default Analytics;

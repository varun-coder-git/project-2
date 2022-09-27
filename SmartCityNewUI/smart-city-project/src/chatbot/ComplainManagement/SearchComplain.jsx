import React from "react";
import "./common.css";

const SearchComplain = (props) => {
    const options = [
        {text:"Back to previous menu",handler:props.actionProvider.handleComplainManagement, id: 5 }
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


export default SearchComplain;

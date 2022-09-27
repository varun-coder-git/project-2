import React from "react";
import "./common.css";

const NearMeOptions = (props) => {
  const options = [
    { text: "Blood Bank",handler: props.actionProvider.handleBloodBank,id: 1},
    { text: "Hospital", handler: props.actionProvider.handleHospital, id:2},
    { text: "PMC Office", handler:props.actionProvider.handlePMCOffice , id: 3},
    { text: "Fire Station", handler:props.actionProvider.handleFireStation, id: 4},
    { text: "Police Station",handler:props.actionProvider.handlePoliceStation, id: 5},
    { text: "Wards",handler:props.actionProvider.handleWards, id: 6},
    { text: "Garbage Bin",handler:props.actionProvider.handleGarbageBin, id: 7},
    { text: "Public Toilets",handler:props.actionProvider.handlePublicToilets, id: 8},
    { text: "Electricity Offices",handler:props.actionProvider.handleElectricityOffices, id: 9},
    { text: "Water Offices",handler:props.actionProvider.handleWaterOffices, id: 10},
    { text: "Post Offices",handler:props.actionProvider.handlePostOffices, id: 11},
    { text: "Muncipal Offices",handler:props.actionProvider.handleMuncipalOffices, id: 12},
    { text: "Income Tax Offices",handler:props.actionProvider.handleIncomeTaxOffices, id: 13},
    { text: "Govt. Offices",handler:props.actionProvider.handleGovtOffices, id: 14},
    { text: "Reported Issues",handler:props.actionProvider.handleReportedIssues, id: 15},
    { text: "Bus Stops",handler:props.actionProvider.handleBusStops, id: 16},
    { text: "Railway Station",handler:props.actionProvider.handleRailwayStation, id: 17},
    { text: "Airports",handler:props.actionProvider.handleAirports, id: 18},
    {text:"Back to main menu",handler:props.actionProvider.handleLearningList, id: 19 }

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


export default NearMeOptions;

import React from "react";
import "./Root.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = (props) => {
  const options = [
    { text: "Incident Report",handler: props.actionProvider.handleCollaborationList,id: 1},
    { text: "Complaint Management", handler: props.actionProvider.handleComplainManagement, id:2},
    { text: "Citizen Services", handler:props.actionProvider.handleCitizenService , id: 3},
    { text: "Nearby", handler:event =>
    {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to use this service.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => window.location.href='/',
        });
      }
     else{
      window.location.href='#/dashboard-nearBy'
     }}
     , id: 4},
     { text: "News", handler:event =>
     {
       if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
         toast.warn("Please Login to use this service.", {
           position: "top-center",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           onClose: () => window.location.href='/',
         });
       }
      else{
       window.location.href='#/NewsList'
      }}
      , id: 5},
    { text: "Contact Admin", handler:props.actionProvider.handleContactAdmin , id: 6},
    // { text: "News", handler:props.actionProvider.handleNearMe, id: 4},
    // { text: "Analytics",handler:props.actionProvider.handleAnalytics, id: 5},
    // { text: "Trending Now", handler:props.actionProvider.handleTrendingNow, id: 6} 
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
    {option.text}
    </button>
  ));
  
  return <div className="learning-options-container">{optionsMarkup}</div>;
};


export default Root;

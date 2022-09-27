import React from "react";
import "./common.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import CollaborationsHeadings from '../../../jsonFiles/CollaborationJson/collaborationDetails';


const CollaborationOptions = (props) => {
  const options = [
    { text: "Report An Incident", handler:event =>
      {
        if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
          toast.warn("Please Login to report incident.", {
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
        window.location.href='#/reportAnIncident'
       }}
      , id: 1, },
    { text: "View Incident Status", handler:event =>
    {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to view Incident Status.", {
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
      window.location.href='#/incident-status'
     }}
      , id: 2 },
    // { text: "Discussion Forums", handler: props.actionProvider.handleDiscussionForum, id: 3 },
    // { text: "Become a Volunteer", handler: props.actionProvider.handleVolunteer, id: 4 },
    // { text: "Join a Community", handler: props.acsstionProvider.handleJoinCommunity, id: 5 },
     { text: "Back to main menu", handler: props.actionProvider.handleRootMainMenu, id: 6 }
    
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


export default CollaborationOptions;

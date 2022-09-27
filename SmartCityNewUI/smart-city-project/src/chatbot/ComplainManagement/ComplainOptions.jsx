import React from "react";
import "./common.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComplainOptions = (props) => {
  const options = [
    { text: "Log a Complaint", handler:event => 
    {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to log a complaint.", {
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
      window.location.href='#/log-complaint'
     }}
    , id: 1, },
    // { text: "Search Complaint", handler: props.actionProvider.handleSearchComplain, id: 2 },
    { text: "View Complaint Status",handler:event => 
    {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to view a complaint Status.", {
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
      window.location.href='#/complaintStatus'
     }}
    , id: 3 },
     { text: "Back to main menu", handler: props.actionProvider.handleRootMainMenu, id: 4 }
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="option-button"
      key={option.id}
      onClick={option.handler}
      id={option.id}
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};


export default ComplainOptions;

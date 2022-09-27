import React from "react";
import "./common.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CitizenOptions = (props) => {
  const options = [
    { text: "Emergency Services", handler:event =>  {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to use the service", {
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
      window.location.href='#/emergencyServices'
     }} , id:1},
    { text: "Property Tax", handler:event => {
    if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
      toast.warn("Please Login to use the service", {
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
    window.open("https://tax.lsgkerala.gov.in/epayment/mainPage.php")
   }} ,id: 2},

   { text: "Water Connection", handler:event => {
    if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
      toast.warn("Please Login to use the service", {
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
    window.open("https://kwa.kerala.gov.in/en/service/new-water-connection/")
   }} ,id: 3},

   { text: "Electricity Connection", handler:event => {
    if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
      toast.warn("Please Login to use the service", {
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
    window.open("https://wss.kseb.in/selfservices/ncHome")
   }} ,id: 4},
    
    { text: "Birth Record", handler:event =>  {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to use the service", {
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
      window.open("https://cr.lsgkerala.gov.in/Content.php?id=B")
     }}, id: 5},
   
    // { text: "Site Plan",handler:props.actionProvider.handleSitePlan, id: 5},
    // { text: "Zone Certificate",handler:props.actionProvider.handleZoneCertificate, id: 6},
    { text: "Marriage Registraion",handler:event =>
    
    {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to use the service", {
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
      window.open("https://cr.lsgkerala.gov.in/Content.php?id=D")
     }}
    
    , id: 6},
    { text: "Death Record", handler:event => 
    {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to use the service", {
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
      window.open("https://cr.lsgkerala.gov.in/Content.php?id=B")
     }}
    , id: 7},
    { text: "Smart Trivandrum", handler:event => 
    {
      if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
        toast.warn("Please Login to use the service", {
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
      window.open("https://play.google.com/store/apps/details?id=com.smart.trivandrum&hl=en_IN&gl=US")
     }}
    , id: 8},
    // { text: "Gas Connections",handler:props.actionProvider.handleGasConnection, id: 8},
    // { text: "Electricity Connections",handler:props.actionProvider.handleElectricityConnection, id: 9},
    // { text: "Neighbourhood Crime",handler:props.actionProvider.handleNeighbourhoodCrime, id: 10},
    {text:"Back to main menu",handler:props.actionProvider.handleRootMainMenu, id: 11 }

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


export default CitizenOptions;

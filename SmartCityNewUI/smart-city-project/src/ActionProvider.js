
import React from 'react'
import  { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc,createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.state = {
      APIResponse: "",
    }
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Hello")
    this.updateChatbotState(greetingMessage)
  }

  updateChatbotState(message) {

// NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.


   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }

  handleRootMainMenu = (id) => {
    sessionStorage.removeItem("chatbot");
    const message = this.createChatBotMessage(
      "We'll be glad to help you! Please select the desired option",
      {
        widget: "rootOptions",
      }
    );
    this.updateChatbotState(message);
  };


  handleCollaborationList = () => {
    sessionStorage.removeItem("chatbot");
    const message = this.createClientMessage(
      "Incident Report has been selected",
      {
        widget: "CollaborationOptions",
      }
    );
    const message1 = this.createChatBotMessage(
      "You have selected the Incident Report. Please click on the below options",
      {
        widget: "CollaborationOptions",
      }
    );
    this.updateChatbotState(message);
    this.updateChatbotState(message1);
  };

  handleShareDiscuss = () => {
};

  handlePollSurvey = () => {
    const message = this.createChatBotMessage(
      "Polls And Survey- Thiruvananthapuram City App Connect is a platform for collaboration between corporates and the Pune Municipal Corporation (PMC). The objective is to institutionalize a forum for industry and government to work collectively along with NGOs and citizens, towards development of the city.",
      {
        widget: "PollSurvey",
      }
    );

    this.updateChatbotState(message);
  };

  handleDiscussionForum = () => {
    const message = this.createChatBotMessage(
      "Discussion Forum- Thiruvananthapuram City App Connect is a platform for collaboration between corporates and the Pune Municipal Corporation (PMC). The objective is to institutionalize a forum for industry and government to work collectively along with NGOs and citizens, towards development of the city.",
      {
        widget: "DiscussionForum",
      }
    );
    this.updateChatbotState(message);
  };

  handleVolunteer = () => {
    const message = this.createChatBotMessage(
      "Become a volunteer- Thiruvananthapuram City App Connect is a platform for collaboration between corporates and the Pune Municipal Corporation (PMC). The objective is to institutionalize a forum for industry and government to work collectively along with NGOs and citizens, towards development of the city.",
      {
        widget: "BecomeVolunteer",
      }
    );
    this.updateChatbotState(message);
  };

  handleJoinCommunity = () => {
    const message = this.createChatBotMessage(
      "Join A Community- Thiruvananthapuram City App Connect is a platform for collaboration between corporates and the Pune Municipal Corporation (PMC). The objective is to institutionalize a forum for industry and government to work collectively along with NGOs and citizens, towards development of the city.",
      {
        widget: "JoinCommunity",
      }
    );
    this.updateChatbotState(message);
  };

  handleComplainManagement = () => {
    sessionStorage.removeItem("chatbot");
    const message = this.createClientMessage(
      "Complaint Management has been selected ",
      {
        widget: "ComplainManagement",
      }
    );
    const message1 = this.createChatBotMessage(
      "You have selected the Complaint Management. Please click on the below options",
      {
        widget: "ComplainManagement",
      }
    );
    this.updateChatbotState(message);
    this.updateChatbotState(message1);
  }

  handleSearchComplain = () => {
    const message = this.createChatBotMessage(
      "Search A Complain - Pune City Connect is a platform for Manage and track complaints of PMC services and property. The objective is to Log a complaint, Search logged complaint and track a complaint status to check the progress towards development of the city.",
      {
        widget: "SearchComplain",
      }
    );
    this.updateChatbotState(message);
  };

  handleIncidentStatus = () => {
    sessionStorage.setItem("chatbot","incidentbot");
    if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
      toast.warn("Please Login to view incident status.", {
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
    const message = this.createClientMessage(
      "View Incident Status has been selected",
      {
        widget: "IncidentStatus",
      }
    );
    const message1 = this.createChatBotMessage(
      "Please type the Incident ID to view the status of the report.",
      {
        widget: "IncidentStatus",
      }
    );
   
    this.updateChatbotState(message);
    this.updateChatbotState(message1);
  }
  };
 


  handleIncidentStatusAPI = (text) => {
    if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
      toast.warn("Please Login to view incident status.", {
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
    if(text!=null && text!="" && text!=" "){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "user_id": sessionStorage.getItem("user_id"),
          "token": sessionStorage.getItem("token"),
          "incident_id": text
        }
      )
    };
    fetch(process.env.REACT_APP_API_URL+"Incident/Search", requestOptions)
    .then(response => response.json())
    .then(
      (data) => {
       if (data.message === "Incident/Search") {
          const message = this.createChatBotMessage(
            "You have requested status report for the Incident id: "+text+" Status: "+data.data[0].incident_status_type,
            {
              widget: "IncidentStatus",
            }
          );
          this.updateChatbotState(message);
       }
       else {
          const message = this.createChatBotMessage(
            "Data not found",
            {
              widget: "IncidentStatus",
            }
          );
          this.updateChatbotState(message);
       }
      },
  );}else{
    const message = this.createChatBotMessage(
      "Please enter Incident id",
      {
        widget: "ComplainStatus",
      }
    );
    this.updateChatbotState(message);

  }
}

  };


  handleComplainStatus = () => {
    sessionStorage.setItem("chatbot","complaintbot");
    if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
      toast.warn("Please Login to view complaint status.", {
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
    const message = this.createClientMessage(
      "View Complaint Status has been selected",
      {
        widget: "ComplainStatus",
      }
    );
    const message1 = this.createChatBotMessage(
      "Please type the Complaint ID to view the status of the report.",
      {
        widget: "ComplainStatus",
      }
    );
    this.updateChatbotState(message);
    this.updateChatbotState(message1);
  }
  };

  handleComplainStatusAPI = (text) => {
    if (sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined){
      toast.warn("Please Login to view complaint status.", {
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
    if(text!=null && text!="" && text!=" "){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "user_id": sessionStorage.getItem("user_id"),
          "token": sessionStorage.getItem("token"),
          "thread_id": text
        }
      )
    };
    fetch(process.env.REACT_APP_API_URL+"Complaint/Search", requestOptions)
    .then(response => response.json())
    .then(
      (data) => {
       if (data.message === "Data Found Successful") {
          const message = this.createChatBotMessage(
            "You have requested status report for the complaint id: "+text+" Status: "+data.data[0].status,
            {
              widget: "ComplainStatus",
            }
          );
          this.updateChatbotState(message);
       }
       else {
          const message = this.createChatBotMessage(
            "Data not found",
            {
              widget: "ComplainStatus",
            }
          );
          this.updateChatbotState(message);
       }
      },
  );}else{
    const message = this.createChatBotMessage(
      "Please enter Complaint id",
      {
        widget: "ComplainStatus",
      }
    );
    this.updateChatbotState(message);

  }
  }
  };
  handleCitizenService = () => {
    sessionStorage.removeItem("chatbot");
    const message = this.createClientMessage(
      "Citizen Services has been selected",
      {
        widget: "CitizenServices",
      }
    );
    const message1 = this.createChatBotMessage(
      "You have selected Citizen Services.Please click on the below options",
      {
        widget: "CitizenServices",
      }
    );
    this.updateChatbotState(message);
    this.updateChatbotState(message1);
  };


  // handlePropertyTax = () => {
  //   const message = this.createChatBotMessage(
  //     "Property Tax - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleWaterTax = () => {
  //   const message = this.createChatBotMessage(
  //     "Water Tax - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleBirthRecord = () => {
  //   const message = this.createChatBotMessage(
  //     "Birth Record - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleDeathRecord = () => {
  //   const message = this.createChatBotMessage(
  //     "Death Record - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleSitePlan = () => {
  //   const message = this.createChatBotMessage(
  //     "Site Plan - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleZoneCertificate = () => {
  //   const message = this.createChatBotMessage(
  //     "Zone Certificate - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   )
  //   this.updateChatbotState(message);
  // };

  // handleMarriageCertificate = () => {
  //   const message = this.createChatBotMessage(
  //     "Marriage Certificate - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleGasConnection = () => {
  //   const message = this.createChatBotMessage(
  //     "Gas Connection - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleElectricityConnection = () => {
  //   const message = this.createChatBotMessage(
  //     "Electricity Connection - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleNeighbourhoodCrime = () => {
  //   const message = this.createChatBotMessage(
  //     "Neighbourhood Crime - Pune City connect is a platform for various kind of services for the citizens of pune such as Property Tax, Water Tax, Birth and Death Records, Site Plan, Zone Certificate, Property Tax NOC, Ready Reckoner Rate, Open Data, Request for Self Assessment, Doorstep, DBT, Tree Cutting Services, Slum Tax Billing Services.",
  //     {
  //       widget: "CommonReturn",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleNearMe = () => {
  //   const message = this.createChatBotMessage(
  //     "Near Me - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeDetails",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleBloodBank = () => {
  //   const message = this.createChatBotMessage(
  //     "Blood Bank - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleHospital = () => {
  //   const message = this.createChatBotMessage(
  //     "Hospital - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handlePMCOffice = () => {
  //   const message = this.createChatBotMessage(
  //     "PMC Office - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleFireStation = () => {
  //   const message = this.createChatBotMessage(
  //     "Fire Station - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handlePoliceStation = () => {
  //   const message = this.createChatBotMessage(
  //     "Police Station - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleWards = () => {
  //   const message = this.createChatBotMessage(
  //     "Wards - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleGarbageBin = () => {
  //   const message = this.createChatBotMessage(
  //     "Garbage Bin - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handlePublicToilets = () => {
  //   const message = this.createChatBotMessage(
  //     "Public Toilets - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleElectricityOffices = () => {
  //   const message = this.createChatBotMessage(
  //     "Electricity Offices - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleWaterOffices = () => {
  //   const message = this.createChatBotMessage(
  //     "Water Offices - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handlePostOffices = () => {
  //   const message = this.createChatBotMessage(
  //     "Post Offices - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleMuncipalOffices = () => {
  //   const message = this.createChatBotMessage(
  //     "Muncipal Offices - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleIncomeTaxOffices = () => {
  //   const message = this.createChatBotMessage(
  //     "Income Tax Offices - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleGovtOffices = () => {
  //   const message = this.createChatBotMessage(
  //     "Govt. Offices - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleReportedIssues = () => {
  //   const message = this.createChatBotMessage(
  //     "Reported Issues - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleBusStops = () => {
  //   const message = this.createChatBotMessage(
  //     "Bus Stops - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleRailwayStation = () => {
  //   const message = this.createChatBotMessage(
  //     "Railway Station - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };

  // handleAirports = () => {
  //   const message = this.createChatBotMessage(
  //     "Airports - Pune City Connect is a platform for various kind of available PMC services near my location like Blood Bank, Hositl, PMC Office, Fire Station, Police Station, Wards, Garbage Bin, Public Toilet, Property, Government Office, Heritage Site, Restaurants, Theatres, etc.",
  //     {
  //       widget: "NearMeLink",
  //     }
  //   );
  //   this.updateChatbotState(message);
  // };


  // handleAnalytics = () => {
  //   const message = this.createChatBotMessage(
  //     "Analytics - Pune City Connect is a platform for different types of Analytics such as Web, Social Media, Collaboration for different type of articles, topics.",
  //     {
  //       widget: "AnalyticsDetails",
  //     }
  //   );

  //   this.updateChatbotState(message);
  // };

  // handleWeb = () => {
  //   const message = this.createChatBotMessage(
  //     "Web - Pune City Connect is a platform for different types of Analytics such as Web, Social Media, Collaboration for different type of articles, topics.",
  //     {
  //       widget: "WebAndMedia",
  //     }
  //   );

  //   this.updateChatbotState(message);
  // };

  // handleSocialMedia = () => {
  //   const message = this.createChatBotMessage(
  //     "Social Media - Pune City Connect is a platform for different types of Analytics such as Web, Social Media, Collaboration for different type of articles, topics.",
  //     {
  //       widget: "WebAndMedia",
  //     }
  //   );

  //   this.updateChatbotState(message);
  // };


  handleContactAdmin =()=>{
    if(sessionStorage.getItem("user_id")!=null){
    sessionStorage.setItem("chatbot","contactAdmin");
    const message = this.createClientMessage(
      "Contact Admin has been selected",
      {
        widget: "contactAdmin",
      }
    );
    const message1 = this.createChatBotMessage(
      "Please mention your query",
      {
        widget: "contactAdmin",
      }
    );
   
    this.updateChatbotState(message);
    this.updateChatbotState(message1);
    }else{
      toast.warn("Please Login for details and to contact admin", {
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
  }

  handleContactAdminAPI = (text) => {
    if(text!=null && text!="" && text!=" "){
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "user_id": sessionStorage.getItem("user_id"),
          "token": sessionStorage.getItem("token"),
          "concern_query": text
        }
      )
    };
    fetch(process.env.REACT_APP_API_URL+'Chatbot/RegisterConcern', requestOptions)
    .then(response => response.json())
    .then(
      (data) => {
       if (data.message === "Concern Register Successful") {
          const message = this.createChatBotMessage(
            "Thank you for contacting us. We will reach you on your registered phone/email soon.",
            {
              widget: "ShareDiscuss",
            }
          );
          this.updateChatbotState(message);
       }
       else {
          const message = this.createChatBotMessage(
            "Please Login for details and to contact admin",
            {
              widget: "contactAdmin",
            }
          );
          this.updateChatbotState(message);
       toast.warn("Please Login for details and to contact admin", {
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
      // ;
      },
  );}else{
    const message = this.createChatBotMessage(
      "Please enter your query",
      {
        widget: "contactAdmin",
      }
    );
    this.updateChatbotState(message);

  }

  };





  // handleTrendingNow = () => {
  //   const message = this.createChatBotMessage(
  //     "Trending Now - Pune City Connect is a platform to check which things or ideas has more trend in the current situation. All citizens can check All trending items, Polls/Survey of perticular area, discussion forums, Ideas shared and discussed by citizens,etc.",
  //     {
  //       widget: "TrendingSection",
  //     }
  //   );

  //   this.updateChatbotState(message);
  // };

  handleError = () => {
    const message = this.createChatBotMessage(
      "Oops Invalid Input.",{
        widget: "",
      }
    );
    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }
    )
    );


  }

}

export default ActionProvider;

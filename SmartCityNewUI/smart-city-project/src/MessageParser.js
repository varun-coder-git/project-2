class MessageParser {
  constructor(actionProvider,state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {


    const lowerCaseMessage = message.toLowerCase()

    if (lowerCaseMessage.includes("collaboration")) {
      this.actionProvider.handleCollaborationList();
    }
    else if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet()
    }
    else if (lowerCaseMessage.includes("share and discuss ideas")) {
      this.actionProvider.handleShareDiscuss();
    }
    else if (lowerCaseMessage.includes("polls/surveys")) {
      this.actionProvider.handlePollSurvey();
    }
    else if (lowerCaseMessage.includes("discussion forums")) {
      this.actionProvider.handleDiscussionForum();
    }
    else if (lowerCaseMessage.includes("become a volunteer")) {
      this.actionProvider.handleVolunteer();
    }
    else if (lowerCaseMessage.includes("join a community")) {
      this.actionProvider.handleJoinCommunity();
    }

    else if (lowerCaseMessage.includes("complaint management")) {
      this.actionProvider.handleComplainManagement();
    }
    else if (lowerCaseMessage.includes("search a complain")) {
      this.actionProvider.handleSearchComplain();
    }
    else if (lowerCaseMessage.includes("complaint status")) {
      this.actionProvider.handleComplainStatus(message);
    }
    else if (lowerCaseMessage.includes("incident status")) {
      this.actionProvider.handleIncidentStatus(message);
    }
    else if (lowerCaseMessage.includes("log a complain")) {
      this.actionProvider.handleLogComplain();
    }

    else if (lowerCaseMessage.includes("citizen services")) {
      this.actionProvider.handleCitizenService();
    }
    // else if (lowerCaseMessage.includes("property tax")) {
    //   this.actionProvider.handlePropertyTax();
    // }
    // else if (lowerCaseMessage.includes("water tax")) {
    //   this.actionProvider.handleWaterTax();
    // }
    // else if (lowerCaseMessage.includes("birth record")) {
    //   this.actionProvider.handleBirthRecord();
    // }
    // else if (lowerCaseMessage.includes("death record")) {
    //   this.actionProvider.handleDeathRecord();
    // }
    // else if (lowerCaseMessage.includes("site plan")) {
    //   this.actionProvider.handleSitePlan();
    // }
    // else if (lowerCaseMessage.includes("zone certificate")) {
    //   this.actionProvider.handleZoneCertificate();
    // }
    // else if (lowerCaseMessage.includes("marriage certificate")) {
    //   this.actionProvider.handleMarriageCertificate();
    // }
    // else if (lowerCaseMessage.includes("gas connection")) {
    //   this.actionProvider.handleGasConnection();
    // }
    // else if (lowerCaseMessage.includes("electricity connection")) {
    //   this.actionProvider.handleElectricityConnection();
    // }
    // else if (lowerCaseMessage.includes("neighbourhood crime")) {
    //   this.actionProvider.handleNeighbourhoodCrime();
    // }
   

    // else if (lowerCaseMessage.includes("near me")) {
    //   this.actionProvider.handleNearMe();
    // }
    // else if (lowerCaseMessage.includes("bloodbank")) {
    //   this.actionProvider.handleBloodBank();
    // }
    // else if (lowerCaseMessage.includes("hospital")) {
    //   this.actionProvider.handleHospital();
    // }
    // else if (lowerCaseMessage.includes("pmc office")) {
    //   this.actionProvider.handlePMCOffice();
    // }
    // else if (lowerCaseMessage.includes("fire station")) {
    //   this.actionProvider.handleFireStation();
    // }
    // else if (lowerCaseMessage.includes("police station")) {
    //   this.actionProvider.handlePoliceStation();
    // }
    // else if (lowerCaseMessage.includes("wards")) {
    //   this.actionProvider.handleWards();
    // }
    // else if (lowerCaseMessage.includes("garbage bin")) {
    //   this.actionProvider.handleGarbageBin();
    // }
    // else if (lowerCaseMessage.includes("public toilets")) {
    //   this.actionProvider.handlePublicToilets();
    // }
    // else if (lowerCaseMessage.includes("water offices")) {
    //   this.actionProvider.handleWaterOffices();
    // }
    // else if (lowerCaseMessage.includes("electricity offices")) {
    //   this.actionProvider.handleElectricityOffices();
    // }
    // else if (lowerCaseMessage.includes("muncipal offices")) {
    //   this.actionProvider.handleMuncipalOffices();
    // }
    // else if (lowerCaseMessage.includes("post offices")) {
    //   this.actionProvider.handlePostOffices();
    // }
    // else if (lowerCaseMessage.includes("income tax offices")) {
    //   this.actionProvider.handleIncomeTaxOffices();
    // }
    // else if (lowerCaseMessage.includes("govt. offices")) {
    //   this.actionProvider.handleGovtOffices();
    // }
    // else if (lowerCaseMessage.includes("reported issues")) {
    //   this.actionProvider.handleReportedIssues();
    // }
    // else if (lowerCaseMessage.includes("bus stops")) {
    //   this.actionProvider.handleBusStops();
    // }
    // else if (lowerCaseMessage.includes("railway station")) {
    //   this.actionProvider.handleRailwayStation();
    // }
    // else if (lowerCaseMessage.includes("airports")) {
    //   this.actionProvider.handleAirports();
    // }

    // else if (lowerCaseMessage.includes("analytics")) {
    //   this.actionProvider.handleAnalytics();
    // }
    // else if (lowerCaseMessage.includes("web")) {
    //   this.actionProvider.handleWeb();
    // }
    // else if (lowerCaseMessage.includes("social media")) {
    //   this.actionProvider.handleSocialMedia();
    // }

    // else if (lowerCaseMessage.includes("trending now")) {
    //   this.actionProvider.handleTrendingNow();
    // }

    else if (lowerCaseMessage.includes("back to main menu")) {
      this.actionProvider.handleRootMainMenu();
    }
    
    else if (lowerCaseMessage.includes("back to collaboration")) {
      this.actionProvider.handleCollaborationList();
    }
    else if (lowerCaseMessage.includes("back to citizen services")) {
      this.actionProvider.handleCitizenService();
    }
    // else if (lowerCaseMessage.includes("back to analytics")) {
    //   this.actionProvider.handleAnalytics();
    // }
    // else if (lowerCaseMessage.includes("back to near me")) {
    //   this.actionProvider.handleNearMe();
    // }
    else if ((sessionStorage.getItem("chatbot") != null && sessionStorage.getItem("chatbot") != undefined) && (sessionStorage.getItem("chatbot")=="complaintbot")) {
      if((sessionStorage.getItem("chatbot")=="complaintbot") && (!isNaN(message))){
        this.actionProvider.handleComplainStatusAPI(message);
      }
      else{
        this.actionProvider.handleError();
      }
    }
    else if ((sessionStorage.getItem("chatbot") != null && sessionStorage.getItem("chatbot") != undefined) && (sessionStorage.getItem("chatbot")=="incidentbot")) {
      if((sessionStorage.getItem("chatbot")=="incidentbot") && (!isNaN(message))){
        this.actionProvider.handleIncidentStatusAPI(message);
      }
      else{
        this.actionProvider.handleError();
      }
    }
    else if ((sessionStorage.getItem("chatbot") != null && sessionStorage.getItem("chatbot") != undefined) && (sessionStorage.getItem("chatbot")=="contactAdmin")) {
        this.actionProvider.handleContactAdminAPI(message);
    }
    else{
      this.actionProvider.handleError();
    }
  }
}

export default MessageParser;
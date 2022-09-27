import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { MDBIcon, MDBNavLink } from "../../../node_modules/mdbreact";
import "../Footer/Footer.css";
import img from "../../assets/pngegg.png";
import { Link } from "react-router-dom";
import footer_data from "../../jsonFiles/DashboardInfoJson/DashboardFooter";
import Chatbot from "react-chatbot-kit";
import config from "../../Config";
import ActionProvider from "../../ActionProvider";
import MessageParser from "../../MessageParser";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import CollaborationHeadings from "../../jsonFiles/CollaborationJson/collaborationDetails";
import {Geolocation} from '@capacitor/geolocation';
import {Capacitor} from '@capacitor/core';
import { loadModules } from "esri-loader";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import BlockUI from "../BlockUI/BlockUI";
const options = {
  url: "https://js.arcgis.com/4.20/",
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: img,
      footer: footer_data.paths,
      showChatbot: false,
      APIResponse: "",
      shareIcons: (sessionStorage.getItem("user_id") == null ||sessionStorage.getItem("user_id") == undefined)?CollaborationHeadings.Notification: CollaborationHeadings.WaitNotification,
      Blocking : false,
    };
    this.display = this.display.bind(this);
    this.SosClick = this.SosClick.bind(this);
    this.notification = this.notification.bind(this);
    this.removeSessionObject=this.removeSessionObject.bind(this);
    this.loadInfoInSession = this.loadInfoInSession.bind(this);
    this.checkAndRequestPermission = this.checkAndRequestPermission.bind(this);
    this.navigateToOpenForm = this.navigateToOpenForm.bind(this);
    
  }


  display() {
    if (this.state.showChatbot) {
      this.setState({
        showChatbot: false,
      });
      sessionStorage.removeItem("chatbot");
    } else {
      this.setState({
        showChatbot: true,
      });
    }
  }
   async loadInfoInSession(){
     var latitude, longitude;
     navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      sessionStorage.setItem("currentLatitude", latitude);
      sessionStorage.setItem("currentLongitude", longitude);
    });
    loadModules(
      [
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/tasks/Locator",
        "esri/widgets/Locate",
        "esri/widgets/Search",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        "esri/symbols/WebStyleSymbol",
        "esri/rest/locator",
      ],
      options
    ).then(
      ([
        esriConfig,
        Map,
        MapView,
        Locator,
        Locate,
        Search,
        Graphic,
        GraphicsLayer,
        Point,
        WebStyleSymbol,
        locator,
      ]) => {
        esriConfig.apiKey =
          "AAPKa808b66b329d4c20bedf21c30bfea58dkc4s6BDpyyhENXyDlewV2OAkuxnAGDz3LgnOk9Px1LWQBQNG3giBD5f5hX7aRB2R";

        const point = {
          //Create a point
          location: [longitude, latitude],
        };

        const locatorUrl =
          "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

        locator
          .locationToAddress(locatorUrl, point)
          .then((response) => {
            // If an address is successfully found, show it in the popup's content
            sessionStorage.setItem("currentAddress", response.address);
            sessionStorage.setItem("compliantLocation", response.address);
            sessionStorage.setItem("incidentLocation", response.address);
            sessionStorage.setItem("ideasLocation", response.address);
            sessionStorage.setItem("volunterLocation", response.address);
          })
          .catch(() => {
            navigator.geolocation.getCurrentPosition(function (position) {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              sessionStorage.setItem("currentLatitude", latitude);
              sessionStorage.setItem("currentLongitude", longitude);

              const point = {
                //Create a point
                location: [longitude, latitude],
              };

              locator.locationToAddress(locatorUrl, point).then((response) => {
                // If an address is successfully found, show it in the popup's content
                sessionStorage.setItem("currentAddress", response.address);
                sessionStorage.setItem("compliantLocation", response.address);
                sessionStorage.setItem("incidentLocation", response.address);
                sessionStorage.setItem("ideasLocation", response.address);
                sessionStorage.setItem("volunterLocation", response.address);
              });
            });
          });
      }
    );
  }

async checkAndRequestPermission(){
    var perm = await Geolocation.checkPermissions();
     if(perm.location=="denied" || perm.location=="prompt" || perm.location=="prompt-with-rationale"){
           var req = await Geolocation.requestPermissions();
           perm = await Geolocation.checkPermissions();
     }
     if(perm.location=="denied" || perm.location=="prompt" || perm.location=="prompt-with-rationale"){
     //  return false;
       toast.warn("You need Location and GPS permission to access this service", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
     }else{
        LocationAccuracy.canRequest().then((canRequest)=>{
            if (canRequest){
                  LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {       
                   // this.loadInfoInSession()
                   // this.props.history.push(this.state.collabIcons.Cards[0].NavigateTo);    
                     this.navigateToOpenForm()       
                  },error => {   
                     toast.warn("You need Location and GPS permission to access this service", {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  });
            }else{
                this.navigateToOpenForm();
            }
      }).catch(error=>{
           toast.warn("Error occurred while accessing GPS of your System", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      });
  }
}

 navigateToOpenForm(){
  this.setState({Blocking:true})
  this.loadInfoInSession();
  setTimeout(()=>{
      this.props.history.push("/emergencyServices");
     this.setState({Blocking:false});
  },3000)
}
  notification() {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to view notifications", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => this.props.history.push("/"),
      });
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          token: sessionStorage.getItem("token"),
        }),
      };
      fetch(
        process.env.REACT_APP_API_URL+"Notification/Notification",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.status === true) {
            var JsonDate = this.state.APIResponse.data;
            this.setState({
              shareIcons: JsonDate,
            });
          }else{
            this.setState({
              shareIcons: CollaborationHeadings.Notification
            });
          }
        });
    }
  }

 async SosClick() {
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
        onClose: () => this.props.history.push("/"),
      });
    }
   else{
      if(sessionStorage.getItem("volunteerDefaultTab")){
        sessionStorage.removeItem("volunteerDefaultTab")
      }
      if(sessionStorage.getItem("IdeaDefaultTab")){
      sessionStorage.removeItem("IdeaDefaultTab")}
      if(sessionStorage.getItem("PSDefaultTab")){
      sessionStorage.removeItem("PSDefaultTab")}
      if(sessionStorage.getItem("complaint_cat_id")){
      sessionStorage.removeItem("complaint_cat_id")
      }
      if(sessionStorage.getItem("complaint_status_id")){
        sessionStorage.removeItem("complaint_status_id")
      }
      if(sessionStorage.getItem("thread_id")){
        sessionStorage.removeItem("thread_id")
      }
      if(sessionStorage.getItem("incident_cat_id")){
      sessionStorage.removeItem("incident_cat_id")
      }
      if(sessionStorage.getItem("incident_status_id")){
        sessionStorage.removeItem("incident_status_id")
      }
      if(sessionStorage.getItem("incident_id")){
        sessionStorage.removeItem("incident_id")
      }
       if(Capacitor.getPlatform()=="web"){
        this.navigateToOpenForm();
      }else{
       await this.checkAndRequestPermission();   
      }
   }
  }

  removeSessionObject(){
    if(sessionStorage.getItem("volunteerDefaultTab")){
      sessionStorage.removeItem("volunteerDefaultTab")}
    if(sessionStorage.getItem("IdeaDefaultTab")){
      sessionStorage.removeItem("IdeaDefaultTab")}
    if(sessionStorage.getItem("PSDefaultTab")){
      sessionStorage.removeItem("PSDefaultTab")}
    if(sessionStorage.getItem("complaint_cat_id")){
      sessionStorage.removeItem("complaint_cat_id")
    }
    if(sessionStorage.getItem("complaint_status_id")){
      sessionStorage.removeItem("complaint_status_id")
    }
    if(sessionStorage.getItem("thread_id")){
      sessionStorage.removeItem("thread_id")
    }
      if(sessionStorage.getItem("incident_cat_id")){
      sessionStorage.removeItem("incident_cat_id")
      }
      if(sessionStorage.getItem("incident_status_id")){
        sessionStorage.removeItem("incident_status_id")
      }
      if(sessionStorage.getItem("incident_id")){
        sessionStorage.removeItem("incident_id")
      }
      sessionStorage.removeItem("IdeaDefaultTab");
        sessionStorage.removeItem("MrbavCardCount");
        sessionStorage.removeItem("MtbavCardCount");
        sessionStorage.removeItem("MdbavCardCount");
        sessionStorage.removeItem("MrIdeaCardCount");
        sessionStorage.removeItem("MtIdeaCardCount");
        sessionStorage.removeItem("MdIdeaCardCount");
        sessionStorage.removeItem("MtPollsCardCount");
        sessionStorage.removeItem("MrPollsCardCount");
        sessionStorage.removeItem("MdPollsCardCount");
        sessionStorage.removeItem("trendCardCount");
        sessionStorage.removeItem("trendId");
        sessionStorage.removeItem("newsCardCount");
  }

  NotificationDetails = (Card) => {
    sessionStorage.removeItem("MrbavCardCount");
    sessionStorage.removeItem("MtbavCardCount");
    sessionStorage.removeItem("MdbavCardCount");
    sessionStorage.removeItem("MrIdeaCardCount");
    sessionStorage.removeItem("MtIdeaCardCount");
    sessionStorage.removeItem("MdIdeaCardCount");
    sessionStorage.removeItem("MtPollsCardCount");
    sessionStorage.removeItem("MrPollsCardCount");
    sessionStorage.removeItem("MdPollsCardCount");
    sessionStorage.removeItem("trendCardCount");
    sessionStorage.removeItem("trendId");
    sessionStorage.removeItem("newsCardCount");
    let Templocation = window.location.href;
    const currentLocation  =Templocation.split("#/");
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to view details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => this.props.history.push("/"),
      });
    } else {
      if (Card.type_data == "idea") {
        sessionStorage.setItem("threadId", Card.ID);
        if(window.location.href.split("/#")[1]=="/collaboration-ACardDetails"){
          this.props.history.push({
            pathname:"/dashboard",
            pathtopush:"/collaboration-ACardDetails"
          })
         }else{
          sessionStorage.setItem("ideaDetailBack",currentLocation[1]);
          this.props.history.push("/collaboration-ACardDetails");
         } 
      } else if (Card.type_data == "volunteer") {
        sessionStorage.setItem("VolunteerId", Card.ID);      
        if(window.location.href.split("/#")[1]=="/volunteer-ACardDetails"){
          this.props.history.push({
            pathname:"/dashboard",
            pathtopush:"/volunteer-ACardDetails"
          })
         }else{
          sessionStorage.setItem("volunteerDetailBack", currentLocation[1]);
          this.props.history.push("/volunteer-ACardDetails");
         } 
      } else if (Card.type_data == "incident") {
        sessionStorage.setItem("incidentId", Card.ID);
        if(window.location.href.split("/#")[1]=="/IncidentDetailsByID"){
          this.props.history.push({
            pathname:"/dashboard",
            pathtopush:"/IncidentDetailsByID"
          })
         }else{
          sessionStorage.setItem("incidentDetailsIdBack",currentLocation[1]);
          this.props.history.push("/IncidentDetailsByID");
         } 
      } else if (Card.type_data == "news") {
        sessionStorage.setItem("NewsID", Card.ID);
       if(window.location.href.split("/#")[1]=="/NewsDetailsByID"){
        this.props.history.push({
          pathname:"/dashboard",
          pathtopush:"/NewsDetailsByID"
        })
       }else{
        sessionStorage.setItem("NewsDetailsIdBack",currentLocation[1]);
        this.props.history.push("/NewsDetailsByID");
       }     
      } else if (Card.type_data == "complaint") {
        sessionStorage.setItem("complaintId", Card.ID);
        if(window.location.href.split("/#")[1]=="/ComplaintsDetailsByID"){
          this.props.history.push({
            pathname:"/dashboard",
            pathtopush:"/ComplaintsDetailsByID"
          })
         }else{
          sessionStorage.setItem("complaintDetailsIdBack",currentLocation[1]);
          this.props.history.push("/ComplaintsDetailsByID");
         } 
      } else if (Card.type_data == "poll") {
        sessionStorage.setItem("poll_id", Card.ID);
        if(window.location.href.split("/#")[1]=="/collaboration-pollsSurveysDetails"){
          this.props.history.push({
            pathname:"/dashboard",
            pathtopush:"/collaboration-pollsSurveysDetails"
          })
         }else{
          sessionStorage.setItem("pollDetailBack", currentLocation[1]);
          this.props.history.push("/collaboration-pollsSurveysDetails");
         } 
      }
    }
  };
    

  render() {
    return (
      <div className="footer-style">
        <div className="row">
          <div className="col-12 fixed-bottom topmost">
            <Navbar
              expand="lg"
              sticky="bottom"
              className="fixed-bottom p-0 nav-color"
            >
              <div class="col-2 d-flex align-icon ">
                <Button onClick={this.SosClick}>
                  <img class="sos-size" src={this.state.file} alt="" />
                </Button>
              </div>
              <div class="col-2 d-flex align-icon">
                <Dropdown drop={"up"}  onClick={this.notification}>
                  <Dropdown.Toggle id="dropdown-basic">
                    <MDBIcon
                      far
                      icon={this.state.footer[0].icon}
                      size="lg"
                      className="Black-text"
                      style={{paddingTop:6}}
                    />
                    </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="Notification-text">Notification's</div>
                    <hr></hr>
                    {this.state.shareIcons.map((CardValues, index) => (
                      <Dropdown.Item onClick={() => this.NotificationDetails(CardValues)}>
                        <div className="text-wrap-style">
                          {" "}
                          <MDBIcon
                            far
                            icon={this.state.footer[0].icon}
                            size="md"
                            className="bellIcon"
                          />{" "}

                          {CardValues.subject}
                        </div>{" "}
                        
                        <hr></hr>
                        
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div class="col-4 d-flex align-icon" size="lg">
                <Link to="/dashboard" onClick={this.removeSessionObject}>
                  <HomeOutlinedIcon className="Black-text" fontSize="medium" />
                </Link>
              </div>
              <div
                class="col-4 d-flex align-icon show-position"
              >
                <MDBIcon
                  far
                  icon={this.state.footer[1].icon}
                  size="md"
                  className="Black-text"
                  onClick={this.display}
                />
              </div>
            </Navbar>
            {this.state.showChatbot && (
              <div style={{position:'relative',bottom:'20px'}}>
              <Chatbot
                toggle={this.display}
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />
               </div>
            )}
            <br />
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          className="toaster-style"
        />
        <BlockUI blocking={this.state.Blocking} />
      </div>
    );
  }
}

export default withRouter(Footer);

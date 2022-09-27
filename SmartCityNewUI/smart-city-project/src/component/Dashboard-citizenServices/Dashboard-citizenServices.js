import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Header from "../Dashboard-header";
import CollaborationHeadings from "../../jsonFiles/CollaborationTabInfoJson/collaborationtabinfo";
import DashboardIcons from "../../jsonFiles/CollaborationTabInfoJson/collaborationtabinfo";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import AppLink from "react-native-app-link";
import { Linking, Platform } from "react-native";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard-citizenServices.css";
import CollabBannerImg from "../../assets/submenu banners/Citizen Services.svg";
import citizenServices2 from "../../assets/settins3.png";

import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../assets/defaultprofile.png";
import HeaderLogo from "../../assets/HeaderLogo.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import { AppLauncher } from '@capacitor/app-launcher';
import {Capacitor} from '@capacitor/core';
import {Geolocation} from '@capacitor/geolocation';
import { loadModules } from "esri-loader";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import BlockUI from "../BlockUI/BlockUI";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
const options = {
  url: "https://js.arcgis.com/4.20/",
};

class DashboardCitizenServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collabIcons: CollaborationHeadings.CitizenServicesIcons,
      dashIcons: DashboardIcons.DashIcons,
      collabTitleImg: CollaborationHeadings.Collaboration_Title_Image,
       Blocking : false,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.SmartTrivendrumAppOpen = this.SmartTrivendrumAppOpen.bind(this);
    this.loadInfoInSession = this.loadInfoInSession.bind(this);
    this.checkAndRequestPermission = this.checkAndRequestPermission.bind(this);
    this.navigateToOpenForm = this.navigateToOpenForm.bind(this);
  }
  SmartTrivendrumAppOpen = async(url, appName, appStoreId, appStoreLocale, playStoreId)=>{
     if(Capacitor.getPlatform()=='web'){
        if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to use the service", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => this.props.history.push("/"),
      });
    } else {
      if (url != null && url != "") {
        Linking.openURL(url);
      } else if (playStoreId != null && playStoreId != "") {
        Linking.openURL(
          `https://play.google.com/store/apps/details?id=${playStoreId}`
        );
      } else {
        const locale =
          typeof appStoreLocale === "undefined" ? "us" : appStoreLocale;
        Linking.openURL(
          `https://apps.apple.com/${locale}/app/${appName}/id${appStoreId}`
        );
      }       
      }
    }else{
      if(sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined){
         toast.warn("Please Login to use the service", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => this.props.history.push("/"),
      });
      }else{
      const { value } = await AppLauncher.canOpenUrl({ url: 'com.smart.trivandrum' });
      if(value){
      await AppLauncher.openUrl({ url:'com.smart.trivandrum' });
      }else{
        if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to use the service", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => this.props.history.push("/"),
      });
    } else {
      if (url != null && url != "") {
        Linking.openURL(url);
      } else if (playStoreId != null && playStoreId != "") {
        Linking.openURL(
          `https://play.google.com/store/apps/details?id=${playStoreId}`
        );
      } else {
        const locale =
          typeof appStoreLocale === "undefined" ? "us" : appStoreLocale;
        Linking.openURL(
          `https://apps.apple.com/${locale}/app/${appName}/id${appStoreId}`
        );
      }
    }
      }
    
      }
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
  AppClick = async(url, appName, appStoreId, appStoreLocale, playStoreId) => {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to use the service", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => this.props.history.push("/"),
      });
    } else {
      if (url != null && url != "") {
        Linking.openURL(url);
      } else if (playStoreId != null && playStoreId != "") {
        Linking.openURL(
          `https://play.google.com/store/apps/details?id=${playStoreId}`
        );
      } else {
        const locale =
          typeof appStoreLocale === "undefined" ? "us" : appStoreLocale;
        Linking.openURL(
          `https://apps.apple.com/${locale}/app/${appName}/id${appStoreId}`
        );
      }
    }
  };

  componentDidMount() {
    document.body.style = "background-image: url();";
    document.body.style = "background: #F9F9F9";
    document.querySelector('body').scrollTo(0,0)
  }

 async EmergencyServices() {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to access this service.", {
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
       if(Capacitor.getPlatform()=="web"){
        this.navigateToOpenForm();
      }else{
       await this.checkAndRequestPermission();   
      }
    }
  }

  openProfileSettings() {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login", {
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
      let Templocation = window.location.href;
      const currentLocation  =Templocation.split("#/");
      sessionStorage.setItem("profileSettingBack",currentLocation[1]);
      this.props.history.push("/profile");;
    }
  }

  logout = () => {
    if (
      sessionStorage.getItem("user_id") != undefined ||
      sessionStorage.getItem("user_id") != null
    ) {
      this.setState({
        submit: true,
        logoutDialogStatus: true,
      });
    } else {
      this.setState({
        submit: false,
        logoutDialogStatus: false,
      });
    }
  };

  login = () => {
    this.props.history.push("/");
  };

  logoutDialogClose = () => {
    this.setState({
      logoutDialogStatus: false,
    });
  };

  okHomePage = async () => {
    if(sessionStorage.getItem("login_type") === "google"){
      await GoogleAuth.signOut();
    }
    if(sessionStorage.getItem("login_type") === "facebook"){
     await FacebookLogin.logout();
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };
    fetch(process.env.REACT_APP_API_URL+"Smartcity/Signout", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        APIResponse: data,
      });
      if (this.state.APIResponse.status === true) {
        sessionStorage.clear();
        this.props.history.push("/");
      }else{
        toast.error("Something went wrong, Please try again", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () =>
            this.props.history.push("/collaboration-shareDiscussIdeas"),
        });
      }
    });
   
  };

  openMenu = (e) => {
    this.setState({
      isMenuOpen: true,
      eventTarget: e.currentTarget,
    });
  };

  menuClose = () => {
    this.setState({
      isMenuOpen: false,
    });
  };

  render() {
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={true}
      toastClassName="toaster-style"
    />;
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="dashboard-tytle-allign-style_Header">
            <Col
              xs="10"
              sm="10"
              md="10"
              lg="10"
              xl="10"
              xxl="10"
              className="align-left dashboard-header-title-style_SAT pr-0"
            >
              <img
                className="forgetheader-profile-image-style"
                src={HeaderLogo}
                alt=""
              />
            </Col>
            <Col
              xs="2"
              sm="2"
              md="2"
              lg="2"
              xl="2"
              xxl="2"
              className="pl-0 pt-1"
            >
              <Dropdown menuAlign="right" className="dropdown-profile-style">
                <Dropdown.Toggle variant="info">
                  <div>
                    {(sessionStorage.getItem("login_type") === "google" ||
                      sessionStorage.getItem("login_type") === "facebook") && (
                      <div>
                        {sessionStorage.getItem("yourProfileImage") && (
                          <img
                            className="header-profile-image-style"
                            src={sessionStorage.getItem("yourProfileImage")}
                            alt=""
                          />
                        )}
                        {!sessionStorage.getItem("yourProfileImage") && (
                          <img
                            className="header-profile-image-style"
                            src={headerProfile_img}
                            alt=""
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    {sessionStorage.getItem("login_type") === "manual" && (
                      <div>
                        {sessionStorage.getItem("yourProfileImage") && (
                          <img
                            className="header-profile-image-style"
                            src={sessionStorage.getItem("yourProfileImage")}
                            alt=""
                          />
                        )}
                        {!sessionStorage.getItem("yourProfileImage") && (
                          <img
                            className="header-profile-image-style"
                            src={headerProfile_img}
                            alt=""
                          />
                        )}
                      </div>
                    )}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <div onClick={this.openProfileSettings}>
                      <PersonOutlineOutlinedIcon className="dropdown-icon-style" />
                      <label class="dropdown-font-style">
                        Profile Settings
                      </label>
                    </div>
                  </Dropdown.Item>

                  {!(
                    sessionStorage.getItem("user_id") == null ||
                    sessionStorage.getItem("user_id") == undefined
                  ) && (
                    <Dropdown.Item onClick={this.logout}>
                      <ExitToAppRoundedIcon className="dropdown-icon-style" />
                      <label class="dropdown-font-style">Logout</label>
                    </Dropdown.Item>
                  )}
                  {(sessionStorage.getItem("user_id") == null ||
                    sessionStorage.getItem("user_id") == undefined) && (
                    <Dropdown.Item onClick={this.login}>
                      <ExitToAppRoundedIcon className="dropdown-icon-style" />
                      <label class="dropdown-font-style">Login</label>
                    </Dropdown.Item>
                  )}
                  {this.state.submit && (
                    <Dialog
                      open={this.state.logoutDialogStatus}
                      onClose={this.logoutDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="simple-dialog-title">
                        Are you sure you want to Logout?
                        <DialogActions>
                          <Button onClick={this.okHomePage} color="primary">
                            Yes
                          </Button>
                          <Button
                            onClick={this.logoutDialogClose}
                            color="primary"
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </DialogTitle>
                    </Dialog>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
           <Row style={{textAlign:'center'}}>
                  <Col className="dashboard-icons-style">
                    <Link to={this.state.dashIcons[0].NavigateTo}>
                      <img
                        alt=""
                        className="dashboardImageStyle-header2"
                        src={this.state.dashIcons[0].Image}
                      />
                    </Link>
                  </Col>
                  <Col className="dashboard-icons-style">
                    <Link to={this.state.dashIcons[1].NavigateTo}>
                      <img
                        alt=""
                        className="dashboardImageStyle-header2"
                        src={this.state.dashIcons[1].Image}
                      />
                    </Link>
                  </Col>
                  <Col className="dashboard-icons-style">
                    <Link to={this.state.dashIcons[2].NavigateTo}>
                      <img
                        alt=""
                        className="dashboardImageStyle-header2 selected-tab-from-dashboard"
                        src={this.state.dashIcons[2].Image}
                      />
                    </Link>
                  </Col>
                  <Col className="dashboard-icons-style">
                    <Link to={this.state.dashIcons[3].NavigateTo}>
                      <img
                        alt=""
                        className="dashboardImageStyle-header2"
                        src={this.state.dashIcons[3].Image}
                      />
                    </Link>
                  </Col>
                  <Col className="dashboard-icons-style">
                    <Link to={this.state.dashIcons[4].NavigateTo}>
                      <img
                        alt=""
                        className="dashboardImageStyle-header2"
                        src={this.state.dashIcons[4].Image}
                      />
                    </Link>
                  </Col>
                </Row>
        </Container>
        <Row className="pb-5 pageImage-style">
          <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="2"></Col>
          <Col
            xs="12"
            sm="12"
            md="10"
            lg="10"
            xl="10"
            xxl="8"
            className="bg-container-style-opacity"
          >
            <Container fluid className="collaboration-main-div">
              <div class="body-style-height">
              </div>

              <div class="inner-container-style">
                <Row>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="12"
                    xxl="12"
                    className="banner-submenu-style-header2"
                  >
                    <img
                      src={CollabBannerImg}
                      alt=""
                      class="banner-image-style"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="2"></Col>
                  <Col
                    xs="2"
                    sm="2"
                    md="2"
                    lg="2"
                    xl="2"
                    xxl="2"
                    className="heading-image-style"
                  >
                    <img
                      alt=""
                      className="collabImageStyle"
                      src={citizenServices2}
                    />
                  </Col>
                  <Col xs="10" sm="10" md="8" lg="8" xl="8" xxl="6">
                    <label class="collab-title-text">Citizen Services</label>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="8" xl="8" xxl="2"></Col>
                </Row>

                <hr className="collab-hr pb-2"></hr>
                <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() => this.EmergencyServices()}
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[7].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[7].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                    {/* </Link> */}
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>

                <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() =>
                        this.AppClick(
                          `https://tax.lsgkerala.gov.in/epayment/mainPage.php`,
                          null,
                          null,
                          null,
                          null
                        )
                      }
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[0].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[0].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>

                <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() =>
                        this.AppClick(
                          `https://kwa.kerala.gov.in/en/service/new-water-connection/`,
                          null,
                          null,
                          null,
                          null
                        )
                      }
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[1].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[1].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>

                 <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() =>
                        this.AppClick(
                          `https://wss.kseb.in/selfservices/ncHome`,
                          null,
                          null,
                          null,
                          null
                        )
                      }
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[9].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[9].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>

                <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() =>
                        this.AppClick(
                          `https://cr.lsgkerala.gov.in/Content.php?id=B`,
                          null,
                          null,
                          null,
                          null
                        )
                      }
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[2].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[2].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>

                <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() =>
                        this.AppClick(
                          `https://cr.lsgkerala.gov.in/Content.php?id=D`,
                          null,
                          null,
                          null,
                          null
                        )
                      }
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[3].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[3].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>

                <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() =>
                        this.AppClick(
                          `https://cr.lsgkerala.gov.in/Content.php?id=B`,
                          null,
                          null,
                          null,
                          null
                        )
                      }
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[4].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[4].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>

                 <Row>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="10"
                    xxl="6"
                    className="card-left card-right card-sub-dashboard-top"
                  >
                    <Card
                      className="collaboration-card grab"
                      onClick={() =>
                        this.SmartTrivendrumAppOpen(
                          null,
                          null,
                          null,
                          null,
                          `com.smart.trivandrum&hl=en_IN&gl=US`
                        )
                      }
                    >
                      <Card.Body className="collab-text-align collaboration-card-body">
                        <Row>
                          <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                            {" "}
                            <Card.Img
                              className="collaborationImageStyle"
                              src={this.state.collabIcons.Cards[8].Image}
                            />
                          </Col>
                          <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
                            <Card.Title className="cardIconsTitleCollab">
                              {this.state.collabIcons.Cards[8].Title}
                            </Card.Title>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="3"></Col>
                </Row>


              </div>
            </Container>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="2"></Col>
        </Row>
        <Row className="pb-3"></Row>
        <Footer {...this.props} ></Footer>
        <BlockUI blocking={this.state.Blocking} />
      </div>
    );
  }
}

export default DashboardCitizenServices;

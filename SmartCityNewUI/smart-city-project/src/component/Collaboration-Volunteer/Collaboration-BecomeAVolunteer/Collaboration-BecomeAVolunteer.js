import React, { Component } from "react";
import Header from "../../Dashboard-header";
import CollaborationsHeadings from "../../../jsonFiles/CollaborationJson/collaborationVolunteer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CollaborationBAVMostRecent from "../Collaboration-bAV-MostRecent";
import CollaborationBAVMostTrending from "../Collaboration-bAV-MostTrending";
import CollaborationBAVMostDiscussed from "../Collaboration-bAV-MostDiscussed";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "react-bootstrap/Card";
import LinesEllipsis from "react-lines-ellipsis";
import Tooltip from "@material-ui/core/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import "./Collaboration-BecomeAVolunteer.css";
import {Geolocation} from '@capacitor/geolocation';
import {Capacitor} from '@capacitor/core';
import { loadModules } from "esri-loader";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import BlockUI from "../../BlockUI/BlockUI";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
const options = {
  url: "https://js.arcgis.com/4.20/",
};
class CollaborationBecomeAVolunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareIcons: CollaborationsHeadings.loadingCards,
      searchCardsValue: "",
      APIResponse: "",
      searchCardsValidate: false,
      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      isLogin: "",
      Blocking:false
    };
    this.openVolunteerForm = this.openVolunteerForm.bind(this);
    this.searchCardsValidate = this.searchCardsValidate.bind(this);
    this.search_SAT = this.search_SAT.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.loadInfoInSession = this.loadInfoInSession.bind(this);
    this.checkAndRequestPermission = this.checkAndRequestPermission.bind(this);
    this.navigateToOpenForm = this.navigateToOpenForm.bind(this);
  }

  componentDidMount() {
    document.body.style = "background-image: url();";
    document.body.style = "background: #F9F9F9";
    document.querySelector('body').scrollTo(0,0)
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
      if(sessionStorage.getItem("volunteerDefaultTab")){
        sessionStorage.removeItem("volunteerDefaultTab")
      }
      let Templocation = window.location.href;
      const currentLocation  =Templocation.split("#/");
      sessionStorage.setItem("profileSettingBack",currentLocation[1]);
      this.props.history.push("/profile");
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
      this.props.history.push("/collaboration-SubmitAVolunteer");
     this.setState({Blocking:false});
  },3000)
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

  searchCardsValidate = (e) => {
    var searchValue = e.target.value;
    if (searchValue != null && searchValue != "" && searchValue !== undefined) {
      this.setState({
        searchCardsValue: searchValue,
      });
    } else {
      this.setState({
        searchCardsValue: searchValue,
      });
    }
  };

  search_SAT = (e) => {
    this.state.searchCardsValidate = true;
    if (this.state.searchCardsValidate) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          token: sessionStorage.getItem("token"),
          search_text: this.state.searchCardsValue,
        }),
      };

      fetch(
        process.env.REACT_APP_API_URL+"Volunteer/Search",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "Data Found Successful") {
            var JsonDate = this.state.APIResponse.data;
             for(var cardValues in JsonDate)
          {
              if (JsonDate[cardValues].cardProfileImage.indexOf("http") == -1) {
                JsonDate[cardValues].cardProfileImage=process.env.REACT_APP_API_URL+JsonDate[cardValues].cardProfileImage;
              }
          }
            this.setState({
              shareIcons: JsonDate,
            });
          } else {
            toast.error("Data is not available.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            this.setState({
              shareIcons: CollaborationsHeadings.Cards,
              searchCardsValidate: false
            });
          }
        });
    } else {
    }
  };
 async openVolunteerForm() {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to add a activity", {
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
    UpdateACard = (CardID) => {
    sessionStorage.setItem("VolunteerId", CardID.volunteer_id);
    this.props.history.push("/CollaborationBAVEditVolunteer");
  };

  DeleteACard = (CardID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        volunteer_id: CardID.volunteer_id,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Volunteer/DeleteVolunteer",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.status === true) {
          this.search_SAT();
        }
      });
  };
  removesessionobj(){
    sessionStorage.removeItem("volunteerDefaultTab");
    sessionStorage.removeItem("MrbavCardCount");
    sessionStorage.removeItem("MtbavCardCount");
    sessionStorage.removeItem("MdbavCardCount");
  }
  CardDetails = (CardID) => {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login for details and to add comment.", {
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
      sessionStorage.setItem("VolunteerId", CardID.volunteer_id);
      sessionStorage.setItem(
        "volunteerDetailBack",
        "collaboration-becomeAVolunteer"
      );
      this.props.history.push("/volunteer-ACardDetails");
    }
  };

  render() {
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link to="/dashboard-collaboration" onClick={this.removesessionobj}>
                <Tooltip
                  title="Dashboard"
                  placement="top"
                  TransitionProps={{ timeout: 600 }} 
                >
                  <MDBIcon
                    icon="chevron-circle-left"
                    size="2x"
                    className="back-arrow-icon"
                  />
                </Tooltip>
              </Link>
            </Col>

            <Col
              xs="8"
              sm="8"
              md="8"
              lg="8"
              xl="8"
              xxl="8"
              className="header-title-style_SAT"
            >
              <label class="header-heading-label-style">
                Become A Volunteer
              </label>
            </Col>

            <Col
              xs="2"
              sm="2"
              md="2"
              lg="2"
              xl="2"
              xxl="2"
              className="pl-0 profile-image-align-style"
            >
              <Dropdown
                menuAlign="right"
                className="dropdown-profile-icon-style"
              >
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
        </Container>
        <Row className="pb-5 pageImage-style">
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="3"></Col>
          <Col
            xs="12"
            sm="12"
            md="10"
            lg="10"
            xl="8"
            xxl="6"
            className="bg-container-style-opacity-cards-screen"
          >
            <Row className="search-bar-allignemt-style pb-10">
              <Col xs="1" sm="1" md="4" lg="4" xl="4" xxl="6"></Col>
              <Col
                xs="10"
                sm="10"
                md="8"
                lg="8"
                xl="8"
                xxl="6"
                className="small-screen-padding"
              >
                <TextField
                  value={this.state.searchCardsValue}
                  onChange={this.searchCardsValidate}
                  placeholder="Search here..."
                  className="serach-bar-style"
                  id="outlined-search"
                  type="search"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <MDBIcon
                            icon="search"
                            className="search-bar-icon-style"
                            onClick={this.search_SAT}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Col>
              <Col xs="1" sm="1" md="0" lg="0" xl="0" xxl="0"></Col>
            </Row>

            <div className="inner-container-style-collaboration">
              <Row className="inner-container-banner-margin">
                <Col
                  xs="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                  xxl="12"
                  className="volunter-banners banner-submenu-style"
                >
                  <Row>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                      <Row className="become-a-volunteer-banner-text">
                        {" "}
                        Start your own campaigns to bring positive change in
                        your city{" "}
                      </Row>
                      <Row className="start-new-idea-btn-allignment">
                        <Button
                          className="share-discuss-button-style"
                          onClick={this.openVolunteerForm}
                        >
                          <label class="btn-color-style font-sizevolunter">
                            {
                              CollaborationsHeadings.Collaboration_BUTTON_HEADING
                            }
                          </label>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {!this.state.searchCardsValidate && (
                <div>
                  <Tabs
                    defaultActiveKey={sessionStorage.getItem("volunteerDefaultTab") ? sessionStorage.getItem("volunteerDefaultTab") : "MostRecent"}
                    id="shareIdeas-tab"
                    className="pt-4"
                    onSelect={(key)=>{sessionStorage.setItem("volunteerDefaultTab",key); sessionStorage.removeItem("MrbavCardCount"); sessionStorage.removeItem("MtbavCardCount"); sessionStorage.removeItem("MdbavCardCount");}}
                  >
                    <Tab
                      eventKey="MostRecent"
                      title="Most Recent"
                      tabClassName="share-disciss-tab-style pt-0 pr-0 pl-0"
                    >
                      <CollaborationBAVMostRecent />
                    </Tab>
                    <Tab
                      eventKey="Trending"
                      title="Trending"
                      tabClassName="share-disciss-tab-style pt-0 pr-0 pl-0"
                    >
                      <CollaborationBAVMostTrending />
                    </Tab>
                    <Tab
                      eventKey="MostDiscussed"
                      title="Most Discussed"
                      tabClassName="share-disciss-tab-style pt-0 pr-0 pl-0"
                      selected
                    >
                      <CollaborationBAVMostDiscussed />
                    </Tab>
                  </Tabs>
                </div>
              )}
              {this.state.searchCardsValidate && (
                <Container className="tab-card-container-style">
                  <Row>
                    {this.state.shareIcons.map((CardValues, index) => (
                      <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                        <Card className="tab-card-style">
                          <div class="card-top-border"></div>
                          <Row className="pt-3">
                            <Col
                              xs="8"
                              sm="8"
                              md="8"
                              lg="8"
                              xl="8"
                              xxl="8"
                              className="pl-4"
                            >
                              <Card.Title
                                id="rcorners1"
                                className="tab-card-heading-style"
                              >
                                {CardValues.cardType}
                              </Card.Title>
                            </Col>
                            <Col
                              xs="2"
                              sm="2"
                              md="2"
                              lg="2"
                              xl="2"
                              xxl="2"
                              className="editcardvolunterplacing"
                            >
                          {CardValues.cardUserId ==
                            sessionStorage.getItem("user_id") && (
                            <MDBIcon
                              far
                              icon="edit"
                              className="editcardvolunter"
                              size="sm"
                              onClick={() => this.UpdateACard(CardValues)}
                            />
                    )}
                  </Col>
                            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
                              {CardValues.cardUserId ==
                                sessionStorage.getItem("user_id") && (
                                <MDBIcon
                                  icon="trash-alt"
                                  size="sm"
                                  className="card-icon-style-delete"
                                  onClick={() => this.DeleteACard(CardValues)}
                                />
                              )}
                            </Col>
                          </Row>

                          <Card.Subtitle className="">
                            <Row className="tab-card-subject-style">
                              <Col className="p-0">
                                <LinesEllipsis
                                  text={CardValues.cardTitle}
                                  maxLine="2"
                                  ellipsis={
                                    <span
                                      style={{
                                        color: "blue",
                                        fontSize: "10px",
                                      }}
                                    >
                                      {" "}
                                      ...
                                    </span>
                                  }
                                  trimRight
                                  basedOn="letters"
                                  // onReflow = {this.handleReflow}
                                />
                              </Col>
                            </Row>
                          </Card.Subtitle>
                          <Card.Body className="p-0">
                            <Card.Text className="tab-card-body-style mb-2">
                              <LinesEllipsis
                                text={CardValues.cardDescription}
                                maxLine="3"
                                ellipsis={
                                  <span
                                    style={{ color: "blue", fontSize: "10px" }}
                                  >
                                    {" "}
                                    ...
                                  </span>
                                }
                                trimRight
                                basedOn="words"
                                // onReflow = {this.handleReflow}
                              />
                            </Card.Text>
                            <Card.Text className="tab-card-body-style">
                              {CardValues.comments === null && (
                                <p className="card-comments-style">
                                  <label id="rcorners-comment-count">
                                    0{" "}
                                    <span class="comments-count-style">
                                      Comments
                                    </span>
                                  </label>
                                </p>
                              )}
                              {CardValues.comments != null && (
                                <p className="card-comments-style">
                                  <label id="rcorners-comment-count">
                                    {CardValues.comments}{" "}
                                    <span class="comments-count-style">
                                      Comments
                                    </span>
                                  </label>
                                </p>
                              )}
                            </Card.Text>
                            <Card.Text>
                              <Row className="pt-3 card-footer__events">
                                <Col
                                  xs="3"
                                  sm="3"
                                  md="3"
                                  lg="3"
                                  xl="3"
                                  className="card-profile-image-col-style"
                                >
                                  <img
                                    src={CardValues.cardProfileImage}
                                    alt=""
                                    class="card-profile-image-style"
                                  />
                                </Col>
                                <Col
                                  xs="5"
                                  sm="5"
                                  md="5"
                                  lg="5"
                                  xl="5"
                                  className="card-image-imfo-style pr-0"
                                >
                                  <Row className="card-image-profile-name-style">
                                    <label>{CardValues.cardPostedBy}</label>
                                  </Row>
                                  <Row className="card-image-imfo-row-style">
                                    <label>{CardValues.cardPostedOn}</label>
                                  </Row>
                                </Col>
                                <Col
                                  xs="4"
                                  sm="4"
                                  md="4"
                                  lg="4"
                                  xl="4"
                                  className="p-0 card-icon-alignment"
                                >
                                  <div>
                                    <span class="">
                                      <MDBIcon
                                        far
                                        icon="eye"
                                        size="sm"
                                        className="card-icon-style"
                                        onClick={() =>
                                          this.CardDetails(CardValues)
                                        }
                                      />
                                    </span>
                                    <span class="pl-2 ">
                                      <MDBIcon
                                        icon="reply"
                                        size="sm"
                                        className="card-icon-style"
                                        onClick={() =>
                                          this.CardDetails(CardValues)
                                        }
                                      />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Row className="pb-5"></Row>
                </Container>
              )}
            </div>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="3" xxl="3"></Col>
        </Row>
        <Row className="pb-3"></Row>
        <Footer />
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
        <BlockUI blocking={this.state.Blocking}/>
      </div>
    );
  }
}
export default withRouter(CollaborationBecomeAVolunteer);

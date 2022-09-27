import React, { Component } from "react";
import DashboardMiddleMainMenu from "../Dashboard-middleMainMenu";
import Header from "../Dashboard-header";
import Footer from "../Footer";
import "./Dashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import footer_data from "../../jsonFiles/DashboardInfoJson/DashboardFooter";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { MDBIcon } from "mdbreact";
import { ToastContainer, toast } from "react-toastify";
import HeaderLogo from "../../assets/HeaderLogo.png";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openProfileSettings = this.openProfileSettings.bind(this);
  }

  componentDidMount() {
    if(this.props.location.pathtopush!=undefined && this.props.location.pathtopush!=null && this.props.location.pathtopush!=''){
      this.props.history.push(this.props.location.pathtopush);
    }
    document.body.style = "background-image: url();";
    document.body.style = "background: #F9F9F9";
    if ( sessionStorage.getItem("yourProfileImage") != null || sessionStorage.getItem("yourProfileImage") != undefined){
    if (sessionStorage.getItem("yourProfileImage").indexOf("http") !== -1) {
    } else {
      sessionStorage.setItem(
        "yourProfileImage",
        process.env.REACT_APP_API_URL +
          sessionStorage.getItem("yourProfileImage")
      );
    }
  }
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
 
      let Templocation = window.location.href;
      const currentLocation  =Templocation.split("#/");
      sessionStorage.setItem("profileSettingBack",currentLocation[1]);
      this.props.history.push("/profile");;
    }
  }

   logout = async() => {
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
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT header-dashboard-height-style_SAT">
            <Col
              xs="10"
              sm="10"
              md="10"
              lg="10"
              xl="10"
              xxl="10"
              className="align-left header-title-style_SAT"
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

        <div class="pt-5">
          <DashboardMiddleMainMenu></DashboardMiddleMainMenu>
        </div>
        <Row className="pb-5"></Row>
        <div>
          <Footer {...this.props} ></Footer>
        </div>
      </div>
    );
  }
}

export default Dashboard;

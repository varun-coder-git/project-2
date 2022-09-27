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
import "./Dashboard-nearBy.css";
import CollabBannerImg from "../../assets/submenu banners/Nearby.svg";
import Maps2 from "../../assets/map3.png";

import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../assets/defaultprofile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLogo from "../../assets/HeaderLogo.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
class DashboardNearBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collabIcons: CollaborationHeadings.NearByIcons,
      dashIcons: DashboardIcons.DashIcons,
      collabTitleImg: CollaborationHeadings.Collaboration_Title_Image,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
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

  FacilityType = (ID) => {
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
      sessionStorage.setItem("nearById", ID);
      sessionStorage.setItem(
        "nearByTitle",
        this.state.collabIcons.Cards[ID - 1].Title
      );
      this.props.history.push("/nearBy-info");
      }
  };

  render() {
    return (
      <div>
        {/* <Header></Header> */}
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
                        className="dashboardImageStyle-header2 "
                        src={this.state.dashIcons[1].Image}
                      />
                    </Link>
                  </Col>
                  <Col className="dashboard-icons-style">
                    <Link to={this.state.dashIcons[2].NavigateTo}>
                      <img
                        alt=""
                        className="dashboardImageStyle-header2"
                        src={this.state.dashIcons[2].Image}
                      />
                    </Link>
                  </Col>
                  <Col className="dashboard-icons-style">
                    <Link to={this.state.dashIcons[3].NavigateTo}>
                      <img
                        alt=""
                        className="dashboardImageStyle-header2 selected-tab-from-dashboard"
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
                    <img alt="" className="collabImageStyle" src={Maps2} />
                  </Col>
                  <Col xs="10" sm="10" md="8" lg="8" xl="8" xxl="6">
                    <label class="collab-title-text">Nearby</label>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="2"></Col>
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
                    <Link
                      onClick={() =>
                        this.FacilityType(this.state.collabIcons.Cards[0].id)
                      }
                    >
                      <Card className="collaboration-card">
                        <Card.Body className="collab-text-align collaboration-card-body">
                          <Row>
                            <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                              {" "}
                              <Card.Img
                                className="collaborationImageStyle"
                                src={this.state.collabIcons.Cards[0].Image}
                              />
                            </Col>
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              xxl="10"
                            >
                              <Card.Title className="cardIconsTitleCollab">
                                {this.state.collabIcons.Cards[0].Title}
                              </Card.Title>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
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
                    <Link
                      onClick={() =>
                        this.FacilityType(this.state.collabIcons.Cards[1].id)
                      }
                    >
                      <Card className="collaboration-card">
                        <Card.Body className="collab-text-align collaboration-card-body">
                          <Row>
                            <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                              {" "}
                              <Card.Img
                                className="collaborationImageStyle"
                                src={this.state.collabIcons.Cards[1].Image}
                              />
                            </Col>
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              xxl="10"
                            >
                              <Card.Title className="cardIconsTitleCollab">
                                {this.state.collabIcons.Cards[1].Title}
                              </Card.Title>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
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
                    <Link
                      onClick={() =>
                        this.FacilityType(this.state.collabIcons.Cards[2].id)
                      }
                    >
                      <Card className="collaboration-card">
                        <Card.Body className="collab-text-align collaboration-card-body">
                          <Row>
                            <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                              {" "}
                              <Card.Img
                                className="collaborationImageStyle"
                                src={this.state.collabIcons.Cards[2].Image}
                              />
                            </Col>
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              xxl="10"
                            >
                              <Card.Title className="cardIconsTitleCollab">
                                {this.state.collabIcons.Cards[2].Title}
                              </Card.Title>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
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
                    <Link
                      onClick={() =>
                        this.FacilityType(this.state.collabIcons.Cards[3].id)
                      }
                    >
                      <Card className="collaboration-card">
                        <Card.Body className="collab-text-align collaboration-card-body">
                          <Row>
                            <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                              {" "}
                              <Card.Img
                                className="collaborationImageStyle"
                                src={this.state.collabIcons.Cards[3].Image}
                              />
                            </Col>
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              xxl="10"
                            >
                              <Card.Title className="cardIconsTitleCollab">
                                {this.state.collabIcons.Cards[3].Title}
                              </Card.Title>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
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
                    <Link
                      onClick={() =>
                        this.FacilityType(this.state.collabIcons.Cards[4].id)
                      }
                    >
                      <Card className="collaboration-card">
                        <Card.Body className="collab-text-align collaboration-card-body">
                          <Row>
                            <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                              {" "}
                              <Card.Img
                                className="collaborationImageStyle"
                                src={this.state.collabIcons.Cards[4].Image}
                              />
                            </Col>
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              xxl="10"
                            >
                              <Card.Title className="cardIconsTitleCollab">
                                {this.state.collabIcons.Cards[4].Title}
                              </Card.Title>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
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
                    <Link
                      onClick={() =>
                        this.FacilityType(this.state.collabIcons.Cards[5].id)
                      }
                    >
                      <Card className="collaboration-card">
                        <Card.Body className="collab-text-align collaboration-card-body">
                          <Row>
                            <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                              {" "}
                              <Card.Img
                                className="collaborationImageStyle"
                                src={this.state.collabIcons.Cards[5].Image}
                              />
                            </Col>
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              xxl="10"
                            >
                              <Card.Title className="cardIconsTitleCollab">
                                {this.state.collabIcons.Cards[5].Title}
                              </Card.Title>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
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
      </div>
    );
  }
}
export default DashboardNearBy;

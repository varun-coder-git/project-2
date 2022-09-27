import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Header from "../../Dashboard-header";
import CollaborationHeadings from "../../../jsonFiles/CollaborationJson/collaborationDetails";
import DashboardIcons from "../../../jsonFiles/CollaborationTabInfoJson/collaborationtabinfo";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { MDBIcon } from "mdbreact";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import LinesEllipsis from "react-lines-ellipsis";
import "./LatestTrends.css";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import BlockUI from "../../BlockUI/BlockUI";
class LatestTrends extends Component {
  constructor(props) {
    super(props);
    this.Refforcard = React.createRef();
    this.state = {
      shareIcons: CollaborationHeadings.LoadingCardsTrends,
      APIResponse: "",
      cardCounts:sessionStorage.getItem("trendCardCount")?parseInt(sessionStorage.getItem("trendCardCount")):4,

      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      isLogin: "",
      totalTrendCount:0,
      dataAvailable:false,
      Blocking:true
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.LoadMore_SAT = this.LoadMore_SAT.bind(this);
  }

  componentDidMount() {
    document.body.style = "background-image: url();";
    document.body.style = "background: #F9F9F9";
    document.querySelector('body').scrollTo(0,0)
    this.getLatestTrends();
    if(sessionStorage.getItem("trendCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  }
  componentDidUpdate(){
    if(sessionStorage.getItem("trendCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  }
  getLatestTrends() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        offset: this.state.cardCounts,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"WhatsTrending/GetWhatsTrending",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.status === true) {
          this.setState({
            dataAvailable:true
          })
          var JsonDate = this.state.APIResponse.data;
          this.setState({
            shareIcons: JsonDate,
            totalTrendCount:this.state.APIResponse.total_rows
          });
          this.setState({Blocking:false});
        }else{
          this.setState({
            shareIcons: CollaborationHeadings.CardsTrends
          })
          this.setState({Blocking:false});
        }
      });
  }

  LoadMore_SAT() {
    sessionStorage.removeItem("trendCardCount");
    if (this.state.cardCounts <= 100) {
      var currentCount = this.state.cardCounts + 4;
      this.state.cardCounts = currentCount;
      this.getLatestTrends();
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

  CardDetails = (Card) => {
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
      sessionStorage.setItem("trendCardCount",this.state.cardCounts);
      sessionStorage.setItem("trendId", Card.id);
      if (Card.type_data == "idea") {
        sessionStorage.setItem("threadId", Card.id);
        sessionStorage.setItem("ideaDetailBack", "LatestTrends");
        this.props.history.push("/collaboration-ACardDetails");
      } else if (Card.type_data == "volunteer") {
        sessionStorage.setItem("VolunteerId", Card.id);
        sessionStorage.setItem("volunteerDetailBack", "LatestTrends");
        this.props.history.push("/volunteer-ACardDetails");
      } else if (Card.type_data == "poll") {
        sessionStorage.setItem("admin_id", Card.admin_id);
        sessionStorage.setItem("poll_id", Card.id);
        sessionStorage.setItem("poll_options_id", Card.poll_options_id);
        sessionStorage.setItem("pollDetailBack", "LatestTrends");
        this.props.history.push("/collaboration-pollsSurveysDetails");
      }
    }
  };

  render() {
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link to="/dashboard" onClick={()=>{sessionStorage.removeItem("trendCardCount");sessionStorage.removeItem("trendId");}}>
                <Tooltip
                  title="Dashboard"
                  placement="top"
                  TransitionProps={{ timeout: 600 }}
                >
                  <MDBIcon
                    icon="chevron-circle-left"
                    className="back-arrow-icon pt-1"
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
              <label class="header-heading-label-style">What's Trending</label>
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
        <Row className="pageImage-style pt-3">
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="2"></Col>
          <Col
            xs="12"
            sm="12"
            md="10"
            lg="10"
            xl="8"
            xxl="8"
            className="bg-container-style-opacity"
          >
            <Row className="mt-5 ml-3 mr-3 pt-2">
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                xxl="12"
                className="trends-banners banner-submenu-style"
              >
                <Row>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <Row className="pl-3 collaboration-trend-banner-text3">
                      Get quick access to the most engaging
                      discussions, activities and polls
                    </Row>
                    <Row className="start-new-idea-btn-allignment"></Row>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="pb-3 pr-3 pl-3">
            <div ref={this.Refforcard}></div>
              {this.state.shareIcons.map((CardValues, index) => (
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Card className="tab-card-style-trends tab-card-subject-style-trends" ref={(sessionStorage.getItem("trendId")==CardValues.id) ? this.Refforcard:""}>
                    <Card.Body
                      className="cursor-style p-3"
                      onClick={() => this.CardDetails(CardValues)}
                    >
                      <Card.Text>
                        <Row className=" card-footer__events_trend">
                          <Col
                            xs="3"
                            sm="3"
                            md="3"
                            lg="3"
                            xl="3"
                            className="card-profile-image-col-style pl-0"
                          >
                            {CardValues.type_data == "volunteer" && (
                              <MDBIcon
                                icon="hand-pointer"
                                className="icon-style-trends volunteerTrends-style"
                              />
                            )}
                            {CardValues.type_data == "idea" && (
                              <MDBIcon
                                far
                                icon="lightbulb"
                                className="icon-style-trends ideaTrends-style"
                              />
                            )}
                            {CardValues.type_data == "poll" && (
                              <MDBIcon
                                icon="vote-yea"
                                className="icon-style-trends pollsTrends-style"
                              />
                            )}
                             {CardValues.type_data == "NoData" && (
                              <MDBIcon icon="exclamation-circle" size='2x'/>
                            )}
                          </Col>
                          <Col
                            xs="8"
                            sm="8"
                            md="8"
                            lg="8"
                            xl="8"
                            className="card-image-imfo-style pr-0 pl-0"
                          >
                            <Row className="card-image-profile-name-style line-height-card pr-1">
                              <Col>
                                {
                                  <div className="trend-title-div-ellipsis ">
                                    <span className="trend-title-ellipsis">
                                      {CardValues.title}
                                    </span>
                                </div>
                                }
                                <Row className="card-image-imfo-row-style pl-3">
                                  <label className="cursor-style">{CardValues.created_date}</label>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          <Col
                            xs="1"
                            sm="1"
                            md="1"
                            lg="1"
                            xl="1"
                            className="p-0 mt-2"
                          >
                            <div>
                              <span class="pl-0 ">
                              { this.state.dataAvailable &&
                                <MDBIcon
                                  icon="angle-right"
                                  size="sm"
                                  className="card-icon-style-trend"
                                />}
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

            <Row className="pb-2"></Row>
            <Row style={{paddingLeft:20,paddingRight:20}}>
              <Col xs="0" sm="0" md="2" lg="2" xl="2" xxl="2"></Col>
              <Col xs="12" sm="12" md="8" lg="8" xl="8" xxl="8">
                {((this.state.totalTrendCount > this.state.cardCounts) && (100 > this.state.cardCounts)) && (
                  <Button
                    className="login-button-style"
                    onClick={this.LoadMore_SAT}
                  >
                    Load More
                  </Button>
                )}
              </Col>
              <Col xs="0" sm="0" md="2" lg="2" xl="2" xxl="2"></Col>
            </Row>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="2"></Col>
          <Row className="pb-5"></Row>
        </Row>
        <Row className="pb-5"></Row>
        <Footer {...this.props} ></Footer>
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

export default LatestTrends;

import React, { Component } from "react";
import "./Collaboration-pollsSurveys.css";
import Header from "../../Dashboard-header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CollaborationsHeadings from "../../../jsonFiles/CollaborationJson/collaborationDetails";
import CollaborationPSMostRecent from "../CollaborationPSMostRecent";
import CollaborationPSMostTrending from "../CollaborationPSMostTrending";
import CollaborationPSMostDiscussed from "../CollaborationPSMostDiscussed";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
import Tooltip from "@material-ui/core/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import Button from "@material-ui/core/Button";
import headerProfile_img from "../../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import { MDBIcon } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "react-bootstrap/Card";
import LinesEllipsis from "react-lines-ellipsis";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
class CollaborationPollsSurveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollsBinding: CollaborationsHeadings.loadingPollsCard,
      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      isLogin: "",
      searchCardsValue: "",
      searchCardsValidate: false,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.searchCardsValidate = this.searchCardsValidate.bind(this);
    this.search_SAT = this.search_SAT.bind(this);
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
       if(sessionStorage.getItem("PSDefaultTab")){
        sessionStorage.removeItem("PSDefaultTab")
      }
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
  removesessionobj() {
    sessionStorage.removeItem("PSDefaultTab")
    sessionStorage.removeItem("MtPollsCardCount");
    sessionStorage.removeItem("MrPollsCardCount");
    sessionStorage.removeItem("MdPollsCardCount");
  }
  CardDetails = (CardValues) => {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to Vote", {
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
      sessionStorage.setItem("admin_id", CardValues.admin_id);
      sessionStorage.setItem("poll_id", CardValues.poll_id);
      sessionStorage.setItem("poll_options_id", CardValues.poll_options_id);
      sessionStorage.setItem("pollDetailBack", "collaboration-pollsSurveys");
      this.props.history.push("/collaboration-pollsSurveysDetails");
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

      fetch(process.env.REACT_APP_API_URL+"poll/Search", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "Data Found Successful") {
            var JsonDate = this.state.APIResponse.data;
            this.setState({
              pollsBinding: JsonDate,
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
              searchCardsValidate: false,
              pollsBinding: CollaborationsHeadings.PollsCard
            });
          }
        });
    } else {
    }
  };

  render() {
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link to={CollaborationsHeadings.NavigateTo} onClick={this.removesessionobj}>
                <Tooltip
                  title="Polls"
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
              {/* </div> */}
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
                {CollaborationsHeadings.Collaboration_POLLS_SURVEYS_HEADING}
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
            <Row className="search-bar-allignemt-style">
              <Col xs="1" sm="1" md="4" lg="6" xl="6" xxl="6"></Col>
              <Col
                xs="10"
                sm="10"
                md="8"
                lg="6"
                xl="6"
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
            <div class="inner-container-style-collaboration">
              <Row className="inner-container-banner-margin">
                <Col
                  xs="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                  xxl="12"
                  className="polls-banners banner-submenu-style"
                >
                  <Row>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                      <Row className="banner-textpadding collaboration-banner-text3">
                        Vote to share your views with the civic authorities{" "}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {!this.state.searchCardsValidate && (
                <div>
                  <Tabs
                    defaultActiveKey={sessionStorage.getItem("PSDefaultTab") ? sessionStorage.getItem("PSDefaultTab") : "MostRecent"}
                    id="shareIdeas-tab"
                    className="pt-4"
                    onSelect={(key)=>{sessionStorage.setItem("PSDefaultTab",key);}}
                  >
                    <Tab
                      eventKey="MostRecent"
                      title="Most Recent"
                      tabClassName="pollsSurveys-tab-style"
                    >
                      <CollaborationPSMostRecent />
                    </Tab>
                    <Tab
                      eventKey="Trending"
                      title="Trending"
                      tabClassName="pollsSurveys-tab-style"
                    >
                      <CollaborationPSMostTrending />
                    </Tab>
                    <Tab
                      eventKey="MostDiscussed"
                      title="Most Discussed"
                      tabClassName="pollsSurveys-tab-style"
                    >
                      <CollaborationPSMostDiscussed />
                    </Tab>
                  </Tabs>
                </div>
              )}
              {this.state.searchCardsValidate && (
                <Container className="tab-card-container-style">
                  <Row>
                    {this.state.pollsBinding.map((CardValues, index) => (
                      <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                        <Card className="tab-card-style ">
                          <div class="card-top-border"></div>
                          <Row className="pt-3">
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              xxl="10"
                              className="pl-4"
                            >
                              <Card.Title
                                id="rcorners1"
                                className="tab-card-heading-style"
                              >
                                {CardValues.poll_category_name}
                              </Card.Title>
                            </Col>
                            <Col
                              xs="2"
                              sm="2"
                              md="2"
                              lg="2"
                              xl="2"
                              xxl="2"
                            ></Col>
                          </Row>

                          <Card.Subtitle className="">
                            <Row className="tab-card-subject-style">
                              <Col className="p-0">
                                <LinesEllipsis
                                  text={CardValues.poll_subject}
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
                                />
                              </Col>
                            </Row>
                          </Card.Subtitle>

                          <Card.Body className="p-0">
                            <Card.Text className="tab-card-body-style  mb-2">
                              <span className="pollDates">Start Date :</span>{" "}
                              {CardValues.d_start_date}
                              <p>
                                {" "}
                                <span className="pollDates">
                                  End Date :
                                </span>{" "}
                                {CardValues.d_end_date}
                              </p>
                              <p className="card-comments-style">
                                <label id="rcorners-comment-count">
                                  {CardValues.votes}{" "}
                                  <span class="comments-count-style">
                                    Votes
                                  </span>
                                </label>
                              </p>
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
                                    src={
                                      process.env.REACT_APP_API_URL+
                                      CardValues.cardProfileImage
                                    }
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
                                    <label className="pl-1 pt-2">
                                      {CardValues.full_name}
                                    </label>
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
                                        icon="vote-yea"
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
          <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="3"></Col>
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
      </div>
    );
  }
}

export default CollaborationPollsSurveys;

import React, { Component } from "react";
import Header from "../../Dashboard-header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ComplaintDetails from "../../../jsonFiles/CollaborationJson/complaintDetails";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "react-bootstrap/Card";
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
import CallMadeIcon from "@material-ui/icons/CallMade";
import CancelIcon from "@material-ui/icons/Cancel";
import DraftsIcon from "@material-ui/icons/Drafts";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ReplayIcon from "@material-ui/icons/Replay";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Footer from "../../Footer";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
class IncidentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIResponse: "",
      CardsData: "",
      incidentId: null,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      isLogin: "",
    };
    this.statusClickFunc = this.statusClickFunc.bind(this);
    this.incidentIdValidate = this.incidentIdValidate.bind(this);
    this.submit = this.submit.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      this.props.history.push("/");
    } else {
      document.body.style = "background-image: url();";
      document.body.style = "background: #F9F9F9";
      this.getComplaintStatus();
      document.querySelector('body').scrollTo(0,0)
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

  getComplaintStatus() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Incident/IncidentStatus",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        })
        if (this.state.APIResponse.status === true) {
          var JsonDate = this.state.APIResponse.data[0];
          this.setState({
            CardsData: JsonDate,
          });
        }
      });
  }

  incidentIdValidate = (e) => {
    var title = e.target.value;
    this.setState({
      incidentId: e.target.value,
    });
  };

  submit = () => {
    if (this.state.incidentId !== null && this.state.incidentId !== "") {
      var incidentId_SAT = this.state.incidentId;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          token: sessionStorage.getItem("token"),
          incident_cat_id: null,
          incident_status_id: null,
          incident_id: incidentId_SAT,
        }),
      };

      fetch(
        process.env.REACT_APP_API_URL+"Incident/Search",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "Data Found Successful") {
            sessionStorage.setItem("incident_id", incidentId_SAT);
            this.props.history.push("/My-incident-list");
          } else {
            toast.warn("Data is not available", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    }
  };

  statusClickFunc = (params) => {
    var incidentId_SAT = null;
    if (this.state.incidentId !== null && this.state.incidentId !== "") {
      incidentId_SAT = this.state.incidentId;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        incident_cat_id: null,
        incident_status_id: params,
        incident_id: incidentId_SAT,
      }),
    };

    fetch(
      process.env.REACT_APP_API_URL+"Incident/Search",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message ==="Data Found Successful") {
          sessionStorage.setItem("incident_status_id", params);
          sessionStorage.setItem("incident_back", "incident-Status");
          this.props.history.push("/My-incident-list");
        } else {
          toast.warn("Data is not available", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  render() {
    const ComplaintType = [
      { label: "Road blockage", value: 1 },
      { label: "Fire", value: 2 },
      { label: "Blocked Drainage/Leakage", value: 3 },
      { label: "Trespassing", value: 4 },
      { label: "Animal Assault ", value: 5 },
      { label: "Illegal activity", value: 6 },
      { label: "Cyber attack", value: 7 },
      { label: "Violence", value: 8 },
      { label: "Public obscenity", value: 9 },
      { label: "Threatening/Abusive Treatment", value: 10 },
      { label: "Theft/Loss/Harm", value: 11 },
      { label: "Garden/Greenary issues", value: 12 },
      { label: "Smoking Violation", value: 13 },
      { label: "Sexual Exploitation", value: 14 },
      { label: "Other", value: 15 },
    ];

    return (
      <div className="min-height-class">
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link to="/incidentReport">
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
                {" "}
                My Incident Status
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
                  value={this.state.incidentId}
                  onChange={this.incidentIdValidate}
                  placeholder="Incident ID"
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
                            onClick={() => this.submit()}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Col>
              <Col xs="1" sm="1" md="0" lg="0" xl="0" xxl="0"></Col>
            </Row>

            <Row className="mt-3 ml-3 mr-3">
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                xxl="12"
                className="complaintStatus-banners banner-submenu-style"
              >
                <Row>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <Row className="collaboration-banner-text3">
                      View status report of incidents reported by you
                    </Row>
                    <Row className="start-new-idea-btn-allignment"></Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Container className="tab-card-container-style">
              <div className="statusList">
                <Row
                  className="mb-3 mt-3 card-style"
                  onClick={() => this.statusClickFunc()}
                >
                  <Col xs="2" sm="2" md="2" lg="2" xl="2" className="pr-0">
                    <PlaylistAddIcon className="icon-style total-style" />
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" className="pt-2 pl-3">
                    <label className="statusLabel">Total</label>
                  </Col>
                  <Col
                    xs="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="4"
                    className="pt-2 numberCol"
                  >
                    <label>{this.state.CardsData.total}</label>
                  </Col>
                </Row>
                <Row
                  className="mb-3 mt-3 card-style"
                  onClick={() => this.statusClickFunc(1)}
                >
                  <Col xs="2" sm="2" md="2" lg="2" xl="2" className="pr-0">
                    <DraftsIcon className="icon-style open-style" />
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" className="pt-2 pl-3">
                    <label className="statusLabel">Open</label>
                  </Col>
                  <Col
                    xs="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="4"
                    className="pt-2 numberCol"
                  >
                    <label>{this.state.CardsData.open}</label>
                  </Col>
                </Row>
                <Row
                  className="mb-3 mt-3 card-style"
                  onClick={() => this.statusClickFunc(3)}
                >
                  <Col xs="2" sm="2" md="2" lg="2" xl="2" className="pr-0">
                    <CallMadeIcon className="icon-style inprogress-style" />
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" className="pt-2 pl-3">
                    <label className="statusLabel">Inprogress</label>
                  </Col>
                  <Col
                    xs="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="4"
                    className="pt-2 numberCol"
                  >
                    <label>{this.state.CardsData.in_progress}</label>
                  </Col>
                </Row>
                <Row
                  className="mb-3 mt-3 card-style"
                  onClick={() => this.statusClickFunc(4)}
                >
                  <Col xs="2" sm="2" md="2" lg="2" xl="2" className="pr-0">
                    <CancelIcon className="icon-style rejected-style" />
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" className="pt-2 pl-3">
                    <label className="statusLabel">Rejected</label>
                  </Col>
                  <Col
                    xs="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="4"
                    className="pt-2 numberCol"
                  >
                    <label>{this.state.CardsData.rejected}</label>
                  </Col>
                </Row>
                <Row
                  className="mt-3 card-style last-card"
                  onClick={() => this.statusClickFunc(2)}
                >
                  <Col xs="2" sm="2" md="2" lg="2" xl="2" className="pr-0">
                    <DoneAllIcon className="icon-style closed-style" />
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" className="pt-2 pl-3">
                    <label className="statusLabel">Closed</label>
                  </Col>
                  <Col
                    xs="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="4"
                    className="pt-2 numberCol"
                  >
                    <label>{this.state.CardsData.closed}</label>
                  </Col>
                </Row>
                <Footer {...this.props} ></Footer>
              </div>
            </Container>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="3"></Col>
        </Row>
      </div>
    );
  }
}

export default IncidentStatus;

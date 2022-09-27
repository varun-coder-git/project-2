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
import Footer from "../../Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBIcon } from "mdbreact";
import "./SearchIncident.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import Tooltip from "@material-ui/core/Tooltip";
import footer_data from "../../../jsonFiles/DashboardInfoJson/DashboardFooter";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
class SearchIncident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedType: null,
      SelectedTypeValidate: false,
      complaintId: null,
      complaintIdValidate: false,
      complaintStatusValue: null,
      complaintStatusValidate: false,
      APIResponse: "",
      SubmitAlert: false,
      dialogBoxStatus: false,
      CategoryList: "",
      StatusList: "",
      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      footer: footer_data.paths,
      isLogin: "",
    };
    this.Submit = this.Submit.bind(this);
    this.complaintIdValidate = this.complaintIdValidate.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
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

      this.getCategoryList();
      this.getComplaintStatusList();
    }
    document.querySelector('body').scrollTo(0,0)
  }

  getCategoryList() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };

    fetch(
      process.env.REACT_APP_API_URL+"Incident/GetCategory",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          const options = this.state.APIResponse.data.map((d) => ({
            value: d.incident_cat_id,
            label: d.incident_cat_type,
          }));
          this.setState({ CategoryList: options });
        } else {
          toast.error("Something went wrong, Please try again", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => this.props.history.push("/incidentReport"),
          });
        }
      });
  }

  getComplaintStatusList() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };

    fetch(
      process.env.REACT_APP_API_URL+"Incident/GetStatus",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          const options = this.state.APIResponse.data.map((d) => ({
            value: d.incident_status_id,
            label: d.incident_status_type,
          }));
          this.setState({ StatusList: options });
        } else {
          toast.error("Something went wrong, Please try again", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => this.props.history.push("/incidentReport"),
          });
        }
      });
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

  CategoryTypeValidate = (Selected_option) => {
    this.setState({
      SelectedType: Selected_option,
      SelectedTypeValidate: true,
    });
  };

  complaintIdValidate = (e) => {
    var title = e.target.value;
    this.setState({
      complaintId: e.target.value,
      complaintIdValidate: true,
    });
  };

  StatusTypeValidate = (Selected_option) => {
    this.setState({
      complaintStatusValue: Selected_option,
      complaintStatusValidate: true,
    });
  };

  handleClose() {
    this.setState({
      SubmitAlert: false,
      dialogBoxStatus: false,
    });
  }

  Submit() {
    var SelectedType_SAT = null;
    if (this.state.SelectedType !== null && this.state.SelectedType !== "") {
      SelectedType_SAT = this.state.SelectedType.value;
    }

    var complaintId_SAT = null;
    if (this.state.complaintId !== null && this.state.complaintId !== "") {
      complaintId_SAT = this.state.complaintId;
    }

    var complaintStatusValue_SAT = null;
    if (
      this.state.complaintStatusValue !== null &&
      this.state.complaintStatusValue !== ""
    ) {
      complaintStatusValue_SAT = this.state.complaintStatusValue.value;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        incident_cat_id: SelectedType_SAT,
        incident_status_id: complaintStatusValue_SAT,
        incident_id: complaintId_SAT,
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
          sessionStorage.setItem("incident_cat_id", SelectedType_SAT);
          sessionStorage.setItem(
            "incident_status_id",
            complaintStatusValue_SAT
          );
          sessionStorage.setItem("incident_id", complaintId_SAT);
          sessionStorage.setItem("incident_back", "search-incident");
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

    // According to API
    const ComplaintStatus = [
      { label: "Open", value: 1 },
      { label: "Closed", value: 2 },
      { label: "In Progress", value: 3 },
      { label: "Rejected", value: 4 },
    ];
    return (
      <div>
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
                {ComplaintDetails.Incident_Search_HEADING}
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
            <div class="details-container-style inner-container-style-collaboration">
              <Row className="ml-3 mt-3 mr-3">
                <Col
                  xs="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                  xxl="12"
                  className="search-complaint-banners banner-submenu-style"
                >
                  <Row>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                      <Row className="search-incident-banner-text">
                        Filter the search for incidents reported by you.
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Container className="pl-4 pb-2 pr-4">
                <Row>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="10"
                    lg="10"
                    xl="10"
                    xxl="10"
                    className="pt-4"
                  >
                    <Select
                      placeholder="Select Category"
                      maxMenuHeight={200}
                      options={this.state.CategoryList}
                      isSearchable={false}
                      className="category-drop-style-search"
                      value={this.state.SelectedType}
                      onChange={this.CategoryTypeValidate}
                      menuPlacement="top"
                    />
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pb-3">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="10"
                    lg="10"
                    xl="10"
                    xxl="10"
                    className="pt-3"
                  >
                    <TextField
                      id="standard-required"
                      label="Incident ID"
                      value={this.state.complaintId}
                      onChange={this.complaintIdValidate}
                    />
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pt-2">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="10"
                    lg="10"
                    xl="10"
                    xxl="10"
                    className="pt-1"
                  >
                    <Select
                      placeholder="Select Status"
                      options={this.state.StatusList}
                      isSearchable={false}
                      className="category-drop-style-search "
                      value={this.state.complaintStatusValue}
                      onChange={this.StatusTypeValidate}
                      menuPlacement="top"
                    />
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pt-3">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="10"
                    lg="10"
                    xl="10"
                    xxl="10"
                    className="pt-4"
                  >
                    <Button
                      className="login-button-style"
                      type="submit"
                      onClick={this.Submit}
                    >
                      SUBMIT
                    </Button>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="3"></Col>
        </Row>
        <Row className="pb-3"></Row>
        <Footer />
      </div>
    );
  }
}

export default SearchIncident;

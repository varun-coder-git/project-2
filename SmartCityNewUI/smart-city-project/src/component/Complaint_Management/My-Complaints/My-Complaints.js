import React, { Component } from "react";
import Header from "../../Dashboard-header";
import Footer from "../../Footer";
import ComplaintDetails from "../../../jsonFiles/CollaborationJson/complaintDetails";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import "./My-Complaints.css";
import LinesEllipsis from "react-lines-ellipsis";
import { MDBIcon } from "mdbreact";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import footer_data from "../../../jsonFiles/DashboardInfoJson/DashboardFooter";
import { ToastContainer, toast } from "react-toastify";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
class MyComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIResponse: "",
      SearchData: ComplaintDetails.Search_data,
      AttachmentAvailable: false,
      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      footer: footer_data.paths,
      isLogin: "",
    };
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
    }

    this.getAPIListSearchedList();
    document.querySelector('body').scrollTo(0,0)
  }

  getAPIListSearchedList() {
    var complaint_cat_id_SAT = Number(
      sessionStorage.getItem("complaint_cat_id")
    );
    if (complaint_cat_id_SAT == 0) {
      complaint_cat_id_SAT = null;
    }

    var complaint_status_id_SAT = Number(
      sessionStorage.getItem("complaint_status_id")
    );
    if (complaint_status_id_SAT == 0) {
      complaint_status_id_SAT = null;
    }

    var thread_id_SAT = Number(sessionStorage.getItem("thread_id"));
    if (thread_id_SAT == 0) {
      thread_id_SAT = null;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        complaint_cat_id: complaint_cat_id_SAT,
        complaint_status_id: complaint_status_id_SAT,
        thread_id: thread_id_SAT,
      }),
    };

    fetch(
      process.env.REACT_APP_API_URL+"Complaint/Search",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          var JsonDate = this.state.APIResponse.data;
          this.setState({
            SearchData: JsonDate,
          });
        }
      });
  }

  CardDetails = (search_data) => {
    let Templocation = window.location.href;
    const currentLocation  =Templocation.split("#/");
    sessionStorage.setItem("complaintId", search_data.complaint_id);
    sessionStorage.setItem("complaintDetailsIdBack",currentLocation[1]);
    this.props.history.push("/ComplaintsDetailsByID");
  };

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
    sessionStorage.removeItem("complaint_cat_id");
    sessionStorage.removeItem("complaint_status_id");
    sessionStorage.removeItem("thread_id");
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
    console.log("isMenuOpen = ", e.currentTarget);

    this.setState({
      isMenuOpen: true,
      eventTarget: e.currentTarget,
    });
  };

  menuClose = () => {
    // console.log("isMenuOpen = ", isMenuOpen);
    this.setState({
      isMenuOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link to={sessionStorage.getItem("complaint_back")} onClick={()=>{
                sessionStorage.removeItem("complaint_cat_id");
                sessionStorage.removeItem("complaint_status_id");
                sessionStorage.removeItem("thread_id");
              }}>
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
                My Complaint List
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
              <Container className="p-4">
                <div class="table-responsive">
                  <table class="table table-container-style">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="table-font-style table-heading-style"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          class="table-font-style table-heading-style"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          class="table-font-style table-heading-style"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="table-font-style table-heading-style"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.SearchData.map((search_data, index) => (
                        <tr>
                          <th scope="row" class="table-font-style">
                            {search_data.complaint_id}
                          </th>
                          <td class="table-font-style">
                                <div className="table-title-div-ellipsis">
                                <span className="table-title-ellipsis">
                                  {search_data.complaint_subject}
                                </span>
                              </div>
                          </td>
                          <td class="table-font-style table-status-width">
                            {search_data.status === "Open" && (
                              <MDBIcon
                                icon="circle"
                                size="sm"
                                className="circle-icon-style circle-icon-style-open"
                              />
                            )}
                            {search_data.status === "In Progress" && (
                              <MDBIcon
                                icon="circle"
                                size="sm"
                                className="circle-icon-style circle-icon-style-inProgress"
                              />
                            )}
                            {search_data.status === "Rejected" && (
                              <MDBIcon
                                icon="circle"
                                size="sm"
                                className="circle-icon-style circle-icon-style-regected"
                              />
                            )}
                            {search_data.status === "Closed" && (
                              <MDBIcon
                                icon="circle"
                                size="sm"
                                className="circle-icon-style circle-icon-style-closed"
                              />
                            )}
                            {search_data.status === "Reopen" && (
                              <MDBIcon
                                icon="circle"
                                size="sm"
                                className="circle-icon-style circle-icon-style-reopen"
                              />
                            )}
                            {search_data.status}
                          </td>
                          <td class="table-font-style">
                            <MDBIcon
                              far
                              icon="eye"
                              size="sl"
                              className="complaint-view-details-eye-icon"
                              onClick={() => this.CardDetails(search_data)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

export default MyComplaints;

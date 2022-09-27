import React, { Component } from "react";
import Header from "../../Dashboard-header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CollaborationPSDetails.css";
import CollaborationsHeadings from "../../../jsonFiles/CollaborationJson/collaborationDetails";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Footer from "../../Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "@material-ui/core/Tooltip";
import { MDBIcon } from "mdbreact";
import Dropdown from "react-bootstrap/Dropdown";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import footer_data from "../../../jsonFiles/DashboardInfoJson/DashboardFooter";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import BlockUI from "../../BlockUI/BlockUI";
class CollaborationPSDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollsBinding: CollaborationsHeadings.PollsCardDetails,
      APIResponse: "",
      APIResponseSucess: false,
      OptionSelected: "",
      CheckboxOptionLength: [],
      CheckboxOptionData: [],
      VoteData: [],
      VoteResponse: "",
      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      footer: footer_data.paths,
      isLogin: "",
      optionsLengthfromAPI: 0,
      Counter: 0,
      Blocking:true
    };

    this.handleChange = this.handleChange.bind(this);
    this.Submit = this.Submit.bind(this);
    this.Cancel = this.Cancel.bind(this);
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
      this.getpollid();
    }
    document.querySelector('body').scrollTo(0,0)
  }

  componentDidUpdate() {
    if (this.state.Counter <= 1) {
      this.getpollid();
    }
  }

  getpollid() {
    this.state.Counter = this.state.Counter + 1;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        admin_id: sessionStorage.getItem("admin_id"),
        poll_id: sessionStorage.getItem("poll_id"),
        poll_options_id: sessionStorage.getItem("poll_options_id"),
      }),
    };
    fetch(process.env.REACT_APP_API_URL+"Poll/GetPollById", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.status === true) {
          var JsonDate = this.state.APIResponse.data;
          this.setState({
            pollsBinding: JsonDate,
            APIResponseSucess: true,
          });
          var optionLength = this.state.pollsBinding.d_option_name.length;
          this.state.optionsLengthfromAPI = this.state.pollsBinding.voted_answer.length;
          for (var i = 0; i < optionLength; i++) {
            if (this.state.pollsBinding.voted_answer.length != 0) {
              for (
                var j = 0;
                j < this.state.pollsBinding.voted_answer.length;
                j++
              ) {
                if (this.state.pollsBinding.voted_answer[j]) {
                  if (
                    this.state.pollsBinding.voted_answer[j] ===
                    this.state.pollsBinding.d_option_name[i].option_name
                  ) {
                    this.state.CheckboxOptionLength[i] = true;
                    break;
                  } else {
                    this.state.CheckboxOptionLength[i] = false;
                  }
                } else {
                  this.state.CheckboxOptionLength[i] = false;
                }
              }
            } else {
              this.state.CheckboxOptionLength[i] = false;
            }
          }
          this.setState({Blocking:false});
        } else {
          this.setState({Blocking:false});
          toast.error("Something went wrong, Please try again", {
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
      });
  }
  handleChange = (index, OptionValues) => {
    this.setState({
      OptionSelected: OptionValues,
    });
  };

  handleChangeCheckbox = (index, OptionValues) => {
    if(this.state.APIResponse.data.voted_answer.length==0){
    if (this.state.CheckboxOptionLength[index] == true) {
      this.state.CheckboxOptionLength[index] = false;
    } else {
      this.state.CheckboxOptionLength[index] = true;
    }
  }
  };

  Cancel() {
    this.props.history.push(sessionStorage.getItem("pollDetailBack"));
  }

  Submit() {
    var arrOption = [];
    for (var j = 0; j < this.state.pollsBinding.d_option_name.length; j++) {
      if (this.state.CheckboxOptionLength[j] == true) {
        arrOption.push(this.state.pollsBinding.d_option_name[j]);
      }
    }
    if (arrOption.length > 0) {
      this.state.VoteData = arrOption;
    } else {
      this.state.VoteData.push(this.state.OptionSelected);
    }
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        poll_vote: this.state.VoteData,
        poll_id: sessionStorage.getItem("poll_id"),
      }),
    };
    fetch(process.env.REACT_APP_API_URL+"Poll/VotePoll", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          VoteResponse: data,
        });
        if (this.state.VoteResponse.message === "Vote Added Successful") {
          toast.success("Your vote successfully submitted", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () =>
              this.props.history.push(sessionStorage.getItem("pollDetailBack")),
          });
        } else if (this.state.VoteResponse.message === "Already Voted") {
          toast.success("You have already Voted", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Please select an option to vote.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          this.state.VoteData=[];
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

  render() {
    const question_type = !this.state.pollsBinding.d_question_type;
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col
              xs="2"
              sm="2"
              md="2"
              lg="2"
              xl="2"
              xxl="2"
              className="back-icon-div-allignemnt"
            >
              <Link to={sessionStorage.getItem("pollDetailBack")}>
                <Tooltip
                  title="Dashboard"
                  placement="top"
                  TransitionProps={{ timeout: 600 }}
                >
                  <MDBIcon
                    icon="chevron-circle-left"
                    size="2x"
                    className="back-arrow-icon pt-1"
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
                {
                  CollaborationsHeadings.Collaboration_POLLS_SURVEYS_DETAILSHEADING
                }
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
            className="bg-container-style-opacity"
          >
            <div class="details-container-style inner-container-style-collaboration">
              <Row className="m-3">
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
                      <Row className="become-a-volunteer-banner-text">
                        Please submit your vote because your opinion counts.
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Container className="">
                <Row>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="10"
                    lg="10"
                    xl="10"
                    xxl="10"
                    className="card-details-title-style"
                  >
                    <label>{this.state.pollsBinding.poll_subject}</label>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                {this.state.APIResponseSucess && (
                  <Row>
                    <Col xs="0" sm="0" md="1" lg="1" xl="1"></Col>
                    <Col xs="12" sm="12" md="10" lg="10" xl="10">
                      {this.state.pollsBinding.voted_answer.length != 0 && (
                        <div className="flexcloumnflow">
                          {question_type
                            ? this.state.pollsBinding.d_option_name.map(
                                (OptionValues, index) => (
                                  <div class="pt-1 pb-1 cursor-style">
                                    <input
                                      type="radio"
                                      checked={
                                        this.state.CheckboxOptionLength[index]
                                      }
                                      value={OptionValues.option_name}
                                      name="polloptions"
                                      className="cursor-style"
                                      onChange={() =>
                                        this.handleChange(index, OptionValues)
                                      }
                                    />{" "}
                                    {OptionValues.option_name}
                                  </div>
                                )
                              )
                            : this.state.pollsBinding.d_option_name.map(
                                (OptionValues, index) => (
                                  <div>
                                  <FormControlLabel
                                    className="radiowidth"
                                    control={
                                      <Checkbox
                                        style={{ color: "#EF7A2D" }}
                                        checked={
                                          !!this.state.CheckboxOptionLength[
                                            index
                                          ]
                                        }
                                        onChange={() =>
                                          this.handleChangeCheckbox(
                                            index,
                                            OptionValues
                                          )
                                        }
                                        name={OptionValues.option_name}
                                      />
                                    }
                                    label={OptionValues.option_name}
                                  />
                                  </div>
                                ) 
                              )}
                        </div>
                      )}
                      {this.state.pollsBinding.voted_answer.length == 0 && (
                        <div className="flexcloumnflow">
                          {question_type
                            ? this.state.pollsBinding.d_option_name.map(
                                (OptionValues, index) => (
                                  <div class="pt-1 pb-1 cursor-style">
                                    <input
                                      type="radio"
                                      value={OptionValues.option_name}
                                      name="polloptions"
                                      className="cursor-style"
                                      onChange={() =>
                                        this.handleChange(index, OptionValues)
                                      }
                                    />{" "}
                                    {OptionValues.option_name}
                                  </div>
                                )
                              )
                            : this.state.pollsBinding.d_option_name.map(
                                (OptionValues, index) => (
                                  <div>
                                  <FormControlLabel
                                    className="radiowidth"
                                    control={
                                      <Checkbox
                                        style={{ color: "#EF7A2D" }}
                                        checked={this.checked}
                                        onChange={() =>
                                          this.handleChangeCheckbox(
                                            index,
                                            OptionValues
                                          )
                                        }
                                        name={OptionValues.option_name}
                                      />
                                    }
                                    label={OptionValues.option_name}
                                  />
                                  </div>
                                )
                              )}
                        </div>
                      )}
                    </Col>
                    <Col xs="0" sm="0" md="0" lg="1" xl="1"></Col>
                  </Row>
                )}
                <Row className="card-details-title-row-style pt-2">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="10"
                    lg="10"
                    xl="10"
                    xxl="10"
                    className="card-details-description-style"
                  >
                    <p className="endDateColor pt-3">
                      Poll open till:{this.state.pollsBinding.end_date}
                    </p>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>
                {!this.state.Blocking && (<Row className="pt-4 pb-5">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="6" sm="6" md="5" lg="5" xl="5" xxl="5">
                    <Button className="skip-button-style" onClick={this.Cancel}>
                      CANCEL
                    </Button>
                  </Col>
                  <Col xs="6" sm="6" md="5" lg="5" xl="5" xxl="5">
                    <Button
                      className="login-button-style"
                      onClick={this.Submit}
                    >
                      SUBMIT
                    </Button>
                  </Col>
                  <Col xs="0" sm="0" md="10" lg="1" xl="1" xxl="1"></Col>
                </Row>)}
              </Container>
            </div>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="3"></Col>
        </Row>

        <Row className="pb-3"></Row>
        <Footer />
        <BlockUI blocking={this.state.Blocking}/>
      </div>
    );
  }
}

export default withRouter(CollaborationPSDetails);

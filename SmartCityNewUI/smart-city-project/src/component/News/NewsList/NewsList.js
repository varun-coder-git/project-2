import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Header from "../../Dashboard-header";
import CollaborationHeadings from "../../../jsonFiles/CollaborationTabInfoJson/collaborationtabinfo";
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
import "./NewsList.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import {faMessage} from "@fortawesome/fontawesome-free";
class NewsList extends Component {
  constructor(props) {
    super(props);
    this.Refforcard = React.createRef();
    this.state = {
      shareIcons:CollaborationHeadings.BreakingNews.loadingNewsJson,
      APIResponse: "",
      cardCounts:sessionStorage.getItem("newsCardCount")?parseInt(sessionStorage.getItem("newsCardCount")):4,
      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      isLogin: "",
      totalNewsCount:0,
      dataAvailable:false,
      isBreakingNews:true
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
  this.getLatestNews();
  document.querySelector('body').scrollTo(0,0)
  if(sessionStorage.getItem("newsCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  }
  componentDidUpdate(){
    if(sessionStorage.getItem("newsCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  }
  getLatestNews() {
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
      process.env.REACT_APP_API_URL+"News/GetNewsOCM",
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
          for(var newsrecord in JsonDate){
            if(JsonDate[newsrecord].image_path==" " || JsonDate[newsrecord].image_path=="" || JsonDate[newsrecord].image_path==null){
              JsonDate[newsrecord].image_path=CollaborationHeadings.BreakingNews.BreakingNewsDefaultImage;
            }else{
              JsonDate[newsrecord].image_path=process.env.REACT_APP_API_URL+JsonDate[newsrecord].image_path;
            }
          }
          this.setState({
            shareIcons: JsonDate,
            totalNewsCount:this.state.APIResponse.total_rows
          });
        }else{
          this.setState({
            shareIcons:CollaborationHeadings.BreakingNews.NewsJson
          })
        }
      });
  }

  LoadMore_SAT() {
    sessionStorage.removeItem("newsCardCount");
    if (this.state.cardCounts <= 100) {
      var currentCount = this.state.cardCounts + 4;
      this.state.cardCounts = currentCount;
      this.getLatestNews();
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
    } else if(!(this.state.shareIcons[0].title=="No Data available")) {
      sessionStorage.setItem("newsCardCount",this.state.cardCounts);
      let Templocation = window.location.href;
      const currentLocation  =Templocation.split("#/");
      sessionStorage.setItem("NewsDetailsIdBack",currentLocation[1]);
        sessionStorage.setItem("NewsID",Card.ID);
        this.props.history.push("/NewsDetailsByID");
      }
   
  };

  render() {
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link to="/dashboard" onClick={()=>{sessionStorage.removeItem("newsCardCount");}}>
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
              <label class="header-heading-label-style">News</label>
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
           
            <Row className="pb-3 pr-3 pl-3 pt-5">
            <div ref={this.Refforcard}></div>
              {this.state.shareIcons.map((CardValues, index) => (
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Card className="tab-card-style-News tab-card-subject-style-News " ref={(sessionStorage.getItem("NewsID")==CardValues.ID) ? this.Refforcard:""}>
                  {CardValues.is_breaking && (
                    <Card.Body
                      className="pb-3 pr-3 pt-1 vertical-bar-breaking-news"
                      onClick={() =>{this.CardDetails(CardValues)}}
                    >
                      <Card.Text>
                        <Row className=" card-footer__events_trend pl-0 ">
                          <Col
                            xs="4"
                            sm="4"
                            md="4"
                            lg="4"
                            xl="4"
                            className="pl-0 padding_news_banner"
                          >
                          <img src={CardValues.image_path} class="news-banner pl-0" alt="" /> 
                          </Col>
                          <Col
                            xs="8"
                            sm="8"
                            md="8"
                            lg="8"
                            xl="8"
                            className="card-image-imfo-style pr-0 pl-0"
                          >
                            <Row className="card-image-profile-name-style line-height-card">
                              <Col>
                              <Row className="card-image-imfo-row-style pl-3">
                                  <label className="cursor-style">Uploaded on {CardValues.uploaded_on}</label>
                                </Row>
                                {
                                  <div className="News-title-div-ellipsis ">
                                    <span className="News-title-ellipsis">
                                      {CardValues.title}
                                    </span>
                                </div>
                                }
                                <Row className="card-image-imfo-row-style pl-3">
                                <Col
                                  xs="9"
                                  sm="9"
                                  md="7"
                                  lg="9"
                                  xl="9"
                                  className="read_more_style pl-0"
                                >
                                  <label className="read_more_style">Read more</label>
                                  </Col>
                                  <Col
                                  xs="3"
                                  sm="3"
                                  md="5"
                                  lg="3"
                                  xl="3"
                                  className="read_more_style"
                                >
                                <Row style={{justifyContent:'right'}}>
                                <div style={{marginRight:'20px'}}>
                                <MDBIcon 
                                far 
                                icon="comment-alt"
                                className="message-icon" />
                                <label>{CardValues.comment_count}</label>
                                </div>
                                </Row>
                                
                                </Col>
                                 
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        
                        </Row>
                      </Card.Text>
                   
                    </Card.Body>)}
                    {!CardValues.is_breaking && (
                    <Card.Body
                      className="pb-3 pr-3 pt-1 vertical-bar-news"
                      onClick={() => {this.CardDetails(CardValues)}}
                    >
                      <Card.Text>
                        <Row className=" card-footer__events_trend pl-0 ">
                          <Col
                            xs="4"
                            sm="4"
                            md="4"
                            lg="4"
                            xl="4"
                            className="pl-0 padding_news_banner"
                          >
                          <img src={CardValues.image_path} class="news-banner pl-0" alt="" /> 
                          </Col>
                          <Col
                            xs="8"
                            sm="8"
                            md="8"
                            lg="8"
                            xl="8"
                            className="card-image-imfo-style pr-0 pl-0"
                          >
                            <Row className="card-image-profile-name-style line-height-card">
                              <Col>
                              <Row className="card-image-imfo-row-style pl-3">
                                  <label className="cursor-style" >Uploaded on {CardValues.uploaded_on}</label>
                                </Row>
                                {
                                  <div className="News-title-div-ellipsis ">
                                    <span className="News-title-ellipsis">
                                      {CardValues.title}
                                    </span>
                                </div>
                                }
                                <Row className="card-image-imfo-row-style pl-3">
                                <Col
                                  xs="9"
                                  sm="9"
                                  md="7"
                                  lg="9"
                                  xl="9"
                                  className="read_more_style pl-0"
                                >
                                  <label className="read_more_style">Read more</label>
                                  </Col>
                                  <Col
                                  xs="3"
                                  sm="3"
                                  md="5"
                                  lg="3"
                                  xl="3"
                                  className="read_more_style"
                                >
                                <Row style={{justifyContent:'right'}}>
                                <div style={{marginRight:'20px'}}>
                                <MDBIcon 
                                far 
                                icon="comment-alt"
                                className="message-icon" />
                                <label>{CardValues.comment_count}</label>
                                </div>
                                </Row>
                                
                                </Col>
                                 
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        
                        </Row>
                      </Card.Text>
                   
                    </Card.Body>)}

                  </Card>
                </Col>
              ))}
            </Row>
            <Row className="pb-2"></Row>
            <Row style={{paddingLeft:25,paddingRight:25,paddingBottom:25}}>
              <Col xs="0" sm="0" md="2" lg="2" xl="2" xxl="2"></Col>
              <Col xs="12" sm="12" md="8" lg="8" xl="8" xxl="8">
                {((this.state.totalNewsCount > this.state.cardCounts) && (100 > this.state.cardCounts)) && (
                  <Button
                    className="login-button-style"
                    onClick={this.LoadMore_SAT}
                    style={{}}
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
      </div>
    );
  }
}

export default NewsList;

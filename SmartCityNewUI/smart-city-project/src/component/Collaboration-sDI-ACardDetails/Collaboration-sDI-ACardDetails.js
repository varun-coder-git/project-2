import React, { Component } from "react";
import CollaborationsHeadings from "../../jsonFiles/CollaborationJson/collaborationDetails";
import Header from "../Dashboard-header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import "./Collaboration-sDI-ACardDetails.css";
import Card from "react-bootstrap/Card";
import { MDBIcon } from "../../../node_modules/mdbreact";
import TextField from "@material-ui/core/TextField";
import Footer from "../Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import "./Header-style.css";
import Dropdown from "react-bootstrap/Dropdown";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import footer_data from "../../jsonFiles/DashboardInfoJson/DashboardFooter";
import UserGeoMapComponent from "../UserGeoMapComponent";
import axios from 'axios';
import fileDownload from 'js-file-download';
import {Capacitor} from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {FileOpener} from '@ionic-native/file-opener';
import LoadingOverlay from 'react-loading-overlay';
import { confirm } from "react-confirm-box";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import BlockUI from "../BlockUI/BlockUI";
class CollaborationSDIACardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalCardsData: CollaborationsHeadings.ACardDetails,
      APIResponse: "",
      ACardComments: CollaborationsHeadings.ACardDetails[0].Comment,
      description: "",
      descriptionValidate: false,
      commentsCounts: 3,
      AttachmentAvailable: false,
      isOpen: false,
      submit: false,
        mimeType:'',
      extension:'',
      isActive:false,
      progressbarVisible:false,
      progress:0,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      footer: footer_data.paths,
      isLogin: "",
      DeleteSubmit: false,
      temp:"",
      DeleteDialogStatus: false,
      ACardAttachments: CollaborationsHeadings.ACardDetails[0].attachment,
      displayMapFlag: true,
      deteledID: "",
      IdeaCommentCount:0,
      Blocking:true
    };
    this.sendComment = this.sendComment.bind(this);
    this.LoadMore_SAT = this.LoadMore_SAT.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.Delete = this.Delete.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.getTruncatedName=this.getTruncatedName.bind(this);
      this.getMimeType = this.getMimeType.bind(this);
    this.downloadAttachmentFile = this.downloadAttachmentFile.bind(this);
   
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
      this.getParticularIdeaDetails();
    }
    document.querySelector('body').scrollTo(0,0);
  }

  getParticularIdeaDetails() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        offset: this.state.commentsCounts,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Ideas/GetIdeaSummary/" +
        sessionStorage.getItem("threadId") +
        "/false",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.status === true) {
          var JsonDate = this.state.APIResponse.Details[0];
           if(!JsonDate.Image || JsonDate.Image.indexOf('http')!== -1 || JsonDate.Image==""){
          
          }
          else{
              JsonDate.Image=process.env.REACT_APP_API_URL+JsonDate.Image
          }
          for(var commentobject in JsonDate.Comment)
          {
            if(!JsonDate.Comment[commentobject].Image || JsonDate.Comment[commentobject].Image.indexOf('http')!== -1 || JsonDate.Comment[commentobject].Image==""){
            
          }
          else{
              JsonDate.Comment[commentobject].Image=process.env.REACT_APP_API_URL+JsonDate.Comment[commentobject].Image;
          }

          }
          this.setState({
            LocalCardsData: JsonDate,
            ACardComments: JsonDate.Comment,
            ACardAttachments: JsonDate.attachment,
            displayMapFlag: JsonDate.share_location_flag,
            IdeaCommentCount: JsonDate.CommentCount
          });
          if (this.state.LocalCardsData.attachment == null) {
            this.state.AttachmentAvailable = false;
          } else {
            this.state.AttachmentAvailable = true;
          }
          this.setState({Blocking:false});
        } else {
          this.setState({Blocking:false});
          toast.error(
            "Something went wrong due to internet connection, Please try again",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => this.props.history.push("/"),
            }
          );
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
      this.props.history.push("/profile");
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

  sendComment() {
    if (this.state.descriptionValidate) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_Id: sessionStorage.getItem("user_id"),
          token: sessionStorage.getItem("token"),
          description: this.state.description,
          idea_cat_id: this.state.LocalCardsData.category_id,
          parent_thread_id: sessionStorage.getItem("threadId"),
        }),
      };
      fetch(
        process.env.REACT_APP_API_URL+"Ideas/AddIdeaResponse",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (
            this.state.APIResponse.message ===
            "Response Added Successful"
          ) {
            this.getParticularIdeaDetails();
            this.setState({
              description: "",
              descriptionValidate: false,
            });
          } else if (
            this.state.APIResponse.message === "Failed to authenticate token."
          ) {
            toast.error("Please login, your session has expired", {
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
            toast.error("Unable to add comment, please try again", {
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
  }

  DeleteACard = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        response_Id: this.state.deteledID,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Ideas/DeleteIdeaResponse",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (
          this.state.APIResponse.message ===
          "Data Deleted Successful"
        ) {
          this.DeleteDialogClose();
          this.getParticularIdeaDetails();
        }
      });
  };

  description = (e) => {
    if (e.target.value != null || e.target.value != " ") {
      this.setState({
        description: e.target.value,
        descriptionValidate: true,
      });
    } else {
      this.setState({
        description: e.target.value,
        descriptionValidate: false,
      });
    }
  };

  LoadMore_SAT() {
    if (this.state.commentsCounts <= 100) {
      var currentCount = this.state.commentsCounts + 3;
      this.state.commentsCounts = currentCount;
      this.getParticularIdeaDetails();
    }
  }
   getMimeType=(file_path)=>{
    var splited_arrey=file_path.substr(file_path.lastIndexOf("/") + 1).split('.');
     var extension=splited_arrey[splited_arrey.length-1]
    if(extension=='jpg' || extension=='jpeg' || extension=='jfif'){
      return 'image/jpeg';
    }else if(extension=='png'){
      return 'image/jpeg';
    }else if(extension=='gif'){
      return 'image/gif';
    }else if(extension=='pdf'){
      return 'application/pdf';
    }else if(extension=='doc'){
      return 'application/msword';
    }else if(extension=='docx'){
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }else if(extension=='xlsx'){
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }else if(extension=='xls'){
      return 'application/vnd.ms-excel';
    }else if(extension=='txt'){
      return 'text/plain';
    }else if(extension=='ppt'){
      return 'application/vnd.ms-powerpoint';
    }else if(extension=='pptx'){
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }else if(extension=='mp3'){
      return 'audio/mpeg';
    }else if(extension=='mp4'){
      return 'video/mp4';
    }
  }
  getTruncatedName=(attachmentname)=>{
    if(attachmentname.length>25)
    {
      var truncatename= attachmentname.substr(0,10)+'...'+attachmentname.substr(attachmentname.length-8,attachmentname.length-1)
      return truncatename;
    }
    else{
    return(attachmentname);
    }
  }
  downloadAttachmentFile = (AttachmentDetails) => {
    var file_path=process.env.REACT_APP_API_URL+ AttachmentDetails.attachment;
        var splited_arrey=file_path.substr(file_path.lastIndexOf("/") + 1).split('.');
        var extension=splited_arrey[splited_arrey.length-1]
        var mime = this.getMimeType(file_path);
        this.setState({progressbarVisible:true})
        axios.get(file_path, {responseType: 'blob',onDownloadProgress: (progressEvent) => {
        this.setState({progress:Math.round((progressEvent.loaded * 100) / progressEvent.total)})  
  }}).then((res) => {
           this.setState({progress:0})
           this.setState({progressbarVisible:false})
          if(Capacitor.getPlatform()=='web')
          {
          fileDownload(res.data,'SmartCityIdeaAttachment.'+extension);
          }else
          {
            var date = new Date();
           var reader = new FileReader();
            reader.readAsDataURL(res.data);
            reader.onloadend = async function () {
            var base64String = reader.result;
            const savedFile = await Filesystem.writeFile({
              path :'SmartCityIdeaAttachment'+Math.floor(date.getTime() + date.getSeconds() / 2) +'.'+extension,
              data : base64String,
              directory : Directory.Documents,
            })
            alert("Your file is stored into DOCUMENTS directory of your device")
            const path =savedFile.uri;   
            const mimeType =mime;
            FileOpener.showOpenWithDialog(path,mimeType).then(()=>console.log('File is opened')).catch(error=>console.log('error while opening File : ',error));
            }
          }
          });  
  };
          

  Delete = (CardID) => {
    this.setState({
      DeleteSubmit: true,
      DeleteDialogStatus: true,
      deteledID: CardID.IdeaNumber,
    });
  };

  DeleteDialogClose = () => {
    this.setState({
      DeleteDialogStatus: false,
    });
  };

  render() {
    return (
      <div>
        {/* Header */}
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
              <Link to={sessionStorage.getItem("ideaDetailBack")}>
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
              <label class="header-heading-label-style">Idea Details</label>
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
           {this.state.progressbarVisible && <Row>
           <div style={{height:15,backgroundColor:'rgba(0,0,0,0.2)',width:this.state.progress+'%',color:'white',fontWeight:'600',fontSize:12,textAlign:'center',borderRadius:5}}>
              {this.state.progress==0 ? '' : this.state.progress+'%'}
            </div>
          </Row>}
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
            <hr></hr>
            <div class="details-container-style inner-container-style-collaboration">
              <Container className="p-4">
              {!this.state.Blocking &&( <Row className="card-details-title-row-style">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <div
                      id="card-details-category"
                      class="tab-card-heading-style"
                    >
                      <label>{this.state.LocalCardsData.category_name}</label>
                    </div>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>)}
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
                    <label>{this.state.LocalCardsData.Title}</label>
                    <label>{this.state.temp} </label>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>
                <Row className="card-details-title-row-style">
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
                    <label>{this.state.LocalCardsData.IdeaDescription}</label>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <div>
                  {this.state.displayMapFlag && (
                    <Row className="card-details-title-row-style">
                      <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                      <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                        <Row>
                          <Col
                            xs="1"
                            sm="1"
                            md="1"
                            lg="1"
                            xl="1"
                            xxl="1"
                            className="pr-0"
                          >
                          {!this.state.Blocking &&(<MDBIcon
                              icon="map-marker-alt"
                              className="red-text"
                              size="lg"
                            />)}
                          </Col>
                          <Col
                            xs="11"
                            sm="11"
                            md="11"
                            lg="11"
                            xl="11"
                            xxl="11"
                            className=""
                          >
                            <label class="card-details-description-style">
                              {this.state.LocalCardsData.address}
                            </label>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                            <UserGeoMapComponent
                              long={this.state.LocalCardsData.longitude}
                              lat={this.state.LocalCardsData.latitude}
                              address={this.state.LocalCardsData.address}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                    </Row>
                  )}
                </div>

                <div>
                  {this.state.ACardAttachments.length !== 0 && (
                    <Row className="card-details-title-row-style attachment-row-style">
                      <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                      <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                        {this.state.ACardAttachments.map((Attachment) => (
                          <Row className="  pt-1 pb-1" id="downloadFile">
                            <Button
                              color="transparent"
                              onClick={()=>{this.downloadAttachmentFile(Attachment)}}
                            >
                              <Col
                                xs="2"
                                sm="2"
                                md="1"
                                lg="1"
                                xl="1"
                                xxl="1"
                                className="pl-3"
                              >
                                {(Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "png" ||
                                  Attachment.attachment
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop() == "jpg" ||
                                    Attachment.attachment
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop() == "gif" ||
                                    Attachment.attachment
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop() == "jfif" ||
                                  Attachment.attachment
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop() == "jpeg") && (
                                  <MDBIcon
                                    far
                                    icon="image"
                                    size="lg"
                                    className="image-file-icon-style"
                                  />
                                )}
                                {Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "pdf" && (
                                  <MDBIcon
                                    icon="file-pdf"
                                    size="lg"
                                    className="doc-file-icon-style"
                                  />
                                )}
                                 {Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "csv" && (
                                  <FontAwesomeIcon
                                    icon={faFileCsv}
                                    color="green"
                                    size="lg">
                                </FontAwesomeIcon>
                                )}
                                {(Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "doc" ||
                                  Attachment.attachment
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop() == "docx") && (
                                  <MDBIcon
                                    icon="file-word"
                                    size="lg"
                                    className="word-file-icon-style"
                                  />
                                )}
                                {Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "xlsx" && (
                                  <MDBIcon
                                    icon="file-excel"
                                    size="lg"
                                    className="xlsx-file-icon-style"
                                  />
                                )}
                                {Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "txt" && (
                                  <MDBIcon
                                    icon="file-alt"
                                    size="lg"
                                    className="txt-file-icon-style"
                                  />
                                )}
                                {(Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "mp3" ||
                                  Attachment.attachment
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop() == "mp4") && (
                                  <MDBIcon
                                    icon="video"
                                    size="lg"
                                    className="media-file-icon-style"
                                  />
                                )}
                                {(Attachment.attachment
                                  .split("/")
                                  .pop()
                                  .split(".")
                                  .pop() == "ppt" ||
                                  Attachment.attachment
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop() == "pptx") && (
                                  <MDBIcon
                                    icon="file-powerpoint"
                                    size="lg"
                                    className="ppt-file-icon-style"
                                  />
                                )}
                              </Col>
                              <Col
                                xs="10"
                                sm="10"
                                md="11"
                                lg="11"
                                xl="11"
                                xxl="11"
                              >
                                {this.getTruncatedName(Attachment.attachment.split("/").pop())}
                              </Col>
                            </Button>
                          </Row>
                        ))}
                      </Col>
                      <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                    </Row>
                  )}
                </div>

                <Row className="pt-3 pb-3">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <Row>
                      <Col
                        xs="2"
                        sm="2"
                        md="2"
                        lg="2"
                        xl="2"
                        className="details-profile-image-col-style"
                      >
                        <img
                          src={this.state.LocalCardsData.Image}
                          alt=""
                          class="details-profile-image-style"
                        />
                      </Col>
                      <Col
                        xs="10"
                        sm="10"
                        md="10"
                        lg="10"
                        xl="10"
                        className="details-image-imfo-style pr-0"
                      >
                        <Row className="details-image-profile-name-style">
                          <label>{this.state.LocalCardsData.Name}</label>
                        </Row>
                        <Row className="card-image-imfo-row-style">
                          <label>
                            {this.state.LocalCardsData.SubmissionDate}
                          </label>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <hr></hr>

                <Row className="details-comment-count-row-style">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <Row>
                      <Col
                        xs="1"
                        sm="1"
                        md="1"
                        lg="1"
                        xl="1"
                        xxl="1"
                        className="pr-0"
                      >
                       {!this.state.Blocking &&( <MDBIcon
                          icon="comment"
                          className="add-comment-style"
                          size="lg"
                        />)}
                      </Col>
                      <Col
                        xs="11"
                        sm="11"
                        md="11"
                        lg="11"
                        xl="11"
                        xxl="11"
                        className=""
                      >
                        <p className="card-comments-style">
                          <label>
                            <span>
                              {this.state.LocalCardsData.CommentCount}
                            </span>{" "}
                           {!this.state.Blocking &&(<span class="comments-count-style">Comments</span>)}
                          </label>
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="">
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
                    {this.state.ACardComments.map((AComent) => (
                      <Container className="comment-cards-row-style pt-2 pb-0 pl-0 pr-0">
                        <Card className="comment-cards-row-style">
                          <Row className="pt-3">
                            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
                              <img
                                src={AComent.Image}
                                alt=""
                                class="card-profile-image-style"
                              />
                            </Col>
                            <Col xs="9" sm="9" md="9" lg="9" xl="9" xxl="9">
                              <label class="mb-0 cards-lable-style">
                                {AComent.Name}
                                <span class="commet-postedOnn-date">
                                  {" "}
                                  - {AComent.DateOfComment}
                                </span>
                              </label>
                              <p class="card-comment-description-style">
                                {AComent.CommentDescription}
                              </p>
                            </Col>
                            <Col
                              xs="1"
                              sm="1"
                              md="1"
                              lg="1"
                              xl="1"
                              xxl="1"
                              className="pl-0"
                            >
                              {AComent.commentUserId ==
                                sessionStorage.getItem("user_id") && (
                                <div>
                                  <MDBIcon
                                    icon="trash"
                                    onClick={() => this.Delete(AComent)}
                                  />
                                  {this.state.DeleteSubmit && (
                                    <Dialog
                                      open={this.state.DeleteDialogStatus}
                                      onClose={this.DeleteDialogClose}
                                      aria-labelledby="alert-dialog-title"
                                      aria-describedby="alert-dialog-description"
                                    >
                                      <DialogTitle id="simple-dialog-title">
                                        Are you sure you want to delete comment?
                                        <DialogActions>
                                          <Button
                                            onClick={this.DeleteACard}
                                            color="primary"
                                          >
                                            Yes
                                          </Button>
                                          <Button
                                            onClick={this.DeleteDialogClose}
                                            color="primary"
                                            autoFocus
                                          >
                                            No
                                          </Button>
                                        </DialogActions>
                                      </DialogTitle>
                                    </Dialog>
                                  )}
                                </div>
                              )}
                            </Col>
                          </Row>
                        </Card>
                      </Container>
                    ))}
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pt-2">
                  <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="2"></Col>
                  <Col xs="12" sm="12" md="12" lg="9" xl="9" xxl="9">
                    <Row className="">
                      <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                      <Col
                        xs="6"
                        sm="6"
                        md="6"
                        lg="6"
                        xl="6"
                        xxl="6"
                        className="load-more-comments-text-style"
                      >
                        <label>
                          {this.state.IdeaCommentCount >
                            this.state.commentsCounts && (
                            <Link onClick={this.LoadMore_SAT}>
                              Load more comments...                            </Link>
                          )}
                        </label>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <Row className="card-details-title-row-style">
                      <Col
                        xs="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        xxl="12"
                        className="card-details-title-style"
                      >
                        <TextField
                          id="outlined-textarea"
                          label="Comment"
                          value={this.state.description}
                          onChange={this.description}
                          multiline
                         // variant="outlined"
                          rows={2}
                          onInput={(e) =>
                            (e.target.value = e.target.value.slice(0, 250))
                          }
                          className="p-0 start-new-idea-description-box"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" className="p-0">
                                <IconButton>
                                  <i
                                    class="fas fa-paper-plane fa-xs add-comment-style"
                                    onClick={this.sendComment}
                                  ></i>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="3" xxl="3"></Col>
        </Row>
        <Row className="pb-3"></Row>
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
        <Footer />
        <BlockUI blocking={this.state.Blocking}/>
      </div>
    );
  }
}

export default CollaborationSDIACardDetails;

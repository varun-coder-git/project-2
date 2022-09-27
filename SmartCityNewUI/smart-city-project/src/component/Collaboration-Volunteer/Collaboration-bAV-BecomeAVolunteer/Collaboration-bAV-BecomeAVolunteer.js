import React, { Component } from "react";
import Header from "../../Dashboard-header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CollaborationsHeadings from "../../../jsonFiles/CollaborationJson/collaborationVolunteer";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { MDBIcon } from "mdbreact";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./Collaboration-bAV-BecomeAVolunteer.css";
import Footer from "../../Footer";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublishUpload from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";
import DialogActions from "@material-ui/core/DialogActions";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import headerProfile_img from "../../../assets/defaultprofile.png";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import Tooltip from "@material-ui/core/Tooltip";
import footer_data from "../../../jsonFiles/DashboardInfoJson/DashboardFooter";
import Checkbox from "@material-ui/core/Checkbox";
import BlockUI from "../../BlockUI/BlockUI";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import { FilePicker } from '@robingenz/capacitor-file-picker';
class CollaborationBAVBecomeAVolunteer extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      newTitle: "",
      newTitleValidate: false,
      description: "",
      descriptionValidate: false,
      tag: "",
      tagValidate: false,
      SelectedType: "",
      start_date: "",
      startDateValidate: "",
      end_date: "",
      endDateValidate: "",
      file_upload1: null,
      file_upload2: null,
      file_upload3: null,
      tooManyFiles: false,
      largeFileSize: false,
      dialogBoxStatus: false,
      currentDate: "",
      CategoryList: "",
      isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus: false,
      isMenuOpen: false,
      eventTarget: "",
      footer: footer_data.paths,
      isLogin: "",
      file_upload: [],
      fileName: [],
      fileNameData: [],
      shareLocationflag: false,
      buttonDisabled : false,
      Blocking : false,
    };
    this.newTitleValidate = this.newTitleValidate.bind(this);
    this.Submit = this.Submit.bind(this);
    this.descriptionValidate = this.descriptionValidate.bind(this);
    this.startDateValidate = this.startDateValidate.bind(this);
    this.UploadAttachedFiles = this.UploadAttachedFiles.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.volunterBack = this.volunterBack.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.getTruncatedName=this.getTruncatedName.bind(this);
    this.onChangeFile=this.onChangeFile.bind(this);
    this.getMimeType=this.getMimeType.bind(this);
    this.urltoFile=this.urltoFile.bind(this);
    this.ShareLocationCheckboxToggle_SAT = this.ShareLocationCheckboxToggle_SAT.bind(
      this
    );
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
      if (sessionStorage.getItem("volunterCatgValue")) {
        var tempObj = {
          value: sessionStorage.getItem("volunterCatgValue"),
          label: sessionStorage.getItem("volunterCatglabel"),
        };
        this.setState({
          SelectedType: tempObj,
          SelectedTypeValidate: true,
        });
      }
      this.setState({
        newTitle: sessionStorage.getItem("volunterTitle"),
        newTitleValidate: true,
        description: sessionStorage.getItem("volunterDesc"),
        descriptionValidate: true,
        start_date: sessionStorage.getItem("volunterSdate"),
        startDateValidate: "",
        end_date: sessionStorage.getItem("volunterEdate"),
        endDateValidate: "",
      });
      if (sessionStorage.getItem("BAV_shareLocationflag")) {
        this.setState({
          shareLocationflag: sessionStorage.getItem("BAV_shareLocationflag"),
        });
      } else {
        this.setState({
          shareLocationflag: false,
        });
      }

      this.getCategoryList();
    }
    this.state.currentDate = new Date();
    document.querySelector('body').scrollTo(0,0);
  }

  volunterBack() {
    sessionStorage.removeItem("volunterBack");
    sessionStorage.setItem(
      "volunterLocation",
      sessionStorage.getItem("currentAddress")
    );
    sessionStorage.removeItem("mapsBack");
    sessionStorage.removeItem("volunterTemplong");
    sessionStorage.removeItem("volunterTemplat");
    sessionStorage.removeItem("volunterTempLocation");
    sessionStorage.removeItem("volunterlong");
    sessionStorage.removeItem("volunterlat");

    sessionStorage.removeItem("volunterTitle");
    sessionStorage.removeItem("volunterDesc");
    sessionStorage.removeItem("volunterCatgValue");
    sessionStorage.removeItem("volunterCatglabel");
    sessionStorage.removeItem("volunterSdate");
    sessionStorage.removeItem("volunterEdate");
    sessionStorage.removeItem("BAV_shareLocationflag");
  }
  ShareLocationCheckboxToggle_SAT = (e) => {
    var temp;
    if (this.state.shareLocationflag == false) {
      this.setState({
        shareLocationflag: true,
        
      });
      temp=true;
    } else {
      this.setState({
        shareLocationflag: false,
        
      });
      temp=false;
    }
    sessionStorage.setItem("BAV_shareLocationflag",temp);
  };

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
      process.env.REACT_APP_API_URL+"Volunteer/GetCategory",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          const options = this.state.APIResponse.data.map((d) => ({
            value: d.volunteer_cat_id,
            label: d.category_name,
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
            onClose: () =>
              this.props.history.push("/collaboration-shareDiscussIdeas"),
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
  getMimeType(file_path){
    var splited_arrey=file_path.substr(file_path.lastIndexOf("/") + 1).split('.');
    var extension=splited_arrey[splited_arrey.length-1]
    if(extension=='jpg' || extension=='jpeg' || extension=='jfif' ){
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
  urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){
          var file1=new Blob([buf],{type:mimeType, lastModified:new Date(0)});
          file1.name=filename;
          return file1;
        })
    );
}
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

 async onChangeFile() {
   try{
    const result = await FilePicker.pickFiles({
      types: ['*'],
      multiple:true,
    });
    if(result.files.length>0){
    var totalSelectedCount = result.files.length + this.state.fileName.length;
    if (result.files.length < 4 && totalSelectedCount < 4) {
      for (var i = 0; i < result.files.length; i++) {
        if (result.files[i].size / 1024 / 1024 > 5) {
          this.state.largeFileSize = true;
          break;
        }
      }

      if (this.state.largeFileSize === false) {
        var test = [];
        for (var j = 0; j < this.state.fileName.length; j++) {
          test[j] = this.state.fileName[j];
        }
        for (var i = 0; i < result.files.length; i++) {
          var mimeTypeupload=""
          if(result.files[i].mimeType=="" || result.files[i].mimeType==" " || result.files[i].mimeType==null ){
            mimeTypeupload=this.getMimeType(result.files[i].name)
          }else{
            mimeTypeupload=result.files[i].mimeType;
          }
         var file=await this.urltoFile('data:text/plain;base64,'+result.files[i].data,result.files[i].name,mimeTypeupload);
         let file_present_flag=false;
         for(var k=0;k<this.state.fileName.length;k++){
          if(file.name===this.state.fileName[k].name && file.type===this.state.fileName[k].type ){
            file_present_flag=true;
          }
         }
         if(file_present_flag==false){
         test[j]=file;
          j++;
         }
        }
        this.setState({ test });

        this.setState({
          fileName: test,
        });
      } else {
        toast.warn("The file size should not be greater than 5 MB.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
         this.state.largeFileSize = false;
         this.myRef.current.value="" ;
      }
    } else {
      toast.error("Only 3 files are allowed to upload.", {
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
  }
}catch(error){}
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
  cancelUpload(num) {
    var array = [...this.state.fileName]; // make a separate copy of the array
    var index = num;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ fileName: array });
    }
  }

  newTitleValidate = (e) => {
    var title = e.target.value;
    if (title != "") {
      this.setState({
        newTitle: e.target.value,
        newTitleValidate: true,
      });
      sessionStorage.setItem("volunterTitle", title);
    } else {
      this.setState({
        newTitle: e.target.value,
        newTitleValidate: false,
      });
    }
  };

  descriptionValidate = (e) => {
    this.setState({
      description: e.target.value,
      descriptionValidate: true,
    });
    sessionStorage.setItem("volunterDesc", e.target.value);
  };

  startDateValidate = (e) => {
    this.setState({
      start_date: e.target.value,
      startDateValidate: "",
    });
    sessionStorage.setItem("volunterSdate", e.target.value);
  };

  endDateValidate = (e) => {
    this.setState({
      end_date: e.target.value,
      endDateValidate: "",
    });
    sessionStorage.setItem("volunterEdate", e.target.value);
  };

  CategoryTypeValidate = (Selected_option) => {
    this.setState({
      SelectedType: Selected_option,
      SelectedTypeValidate: true,
    });
    sessionStorage.setItem("volunterCatgValue", Selected_option.value);
    sessionStorage.setItem("volunterCatglabel", Selected_option.label);
  };

  UploadAttachedFiles = (e) => {
    if (e.currentTarget.files.length < 4) {
      for (var i = 0; i < e.currentTarget.files.length; i++) {
        if (e.currentTarget.files[i].size / 1024 / 1024 > 5) {
          this.state.largeFileSize = true;
          break;
        }
      }

      if (this.state.largeFileSize === false) {
        this.setState({
          file_upload1: e.currentTarget.files[0],
          file_upload2: e.currentTarget.files[1],
          file_upload3: e.currentTarget.files[2],
        });
        toast.success("File Successfully Uploaded", {
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
        toast.warn("The file size should not be greater than 5 MB.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
         this.state.largeFileSize = false;
         this.myRef.current.value="" ;
      }
    } else {
      toast.error("Only 3 files are allowed to upload.", {
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
  };

  handleClose() {
    this.setState({
      largeFileSize: false,
      tooManyFiles: false,
      dialogBoxStatus: false,
    });
  }

  Submit() {
    if(this.state.newTitle != '' && this.state.newTitle != null && this.state.newTitle != undefined && this.state.start_date != null && this.state.end_date != null && this.state.end_date!='' && this.state.start_date!='') {
     // this.refs.btn.setAttribute("disabled", "disabled");
     this.setState({
        buttonDisabled : true
      });
      let formData = new FormData();
      formData.append("token", sessionStorage.getItem("token"));
      formData.append("user_id", sessionStorage.getItem("user_id"));
      formData.append("category", this.state.SelectedType.value);
      formData.append("title", this.state.newTitle);
      formData.append("start_date", this.state.start_date);
      formData.append("end_date", this.state.end_date);
      formData.append("share_location_flag", this.state.shareLocationflag);
      if (
        this.state.description == null ||
        this.state.description == undefined ||
        this.state.description == "null"
      ) {
        formData.append("description", " ");
      } else {
        formData.append("description", this.state.description);
      }

      for (var i = 1; i <= this.state.fileName.length; i++) {
        formData.append("file" + i, this.state.fileName[i - 1],this.state.fileName[i - 1].name);
      }

      if (sessionStorage.getItem("volunterlong")) {
        formData.append("longitude", sessionStorage.getItem("volunterlong"));
        formData.append("latitude", sessionStorage.getItem("volunterlat"));
        formData.append("address", sessionStorage.getItem("volunterLocation"));
      } else {
        formData.append(
          "longitude",
          sessionStorage.getItem("currentLongitude")
        );
        formData.append("latitude", sessionStorage.getItem("currentLatitude"));
        formData.append("address", sessionStorage.getItem("currentAddress"));
      }
      const requestOptions = {
        method: "POST",
        body: formData,
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(
        //   {
        //     "user_id": sessionStorage.getItem("user_id"),
        //     "token": sessionStorage.getItem("token"),
        //     "title": this.state.newTitle,
        //     "start_date": this.state.start_date,
        //     "end_date": this.state.end_date,
        //     "category": this.state.SelectedType.value,
        //     "description": this.state.description,
        //     "longitude": "",
        //     "latitude": ""
        //   }
        // )
      };
      this.setState({Blocking:true});
      fetch(
        process.env.REACT_APP_API_URL+"Volunteer/RegisterVolunteer",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
            Blocking:false
          });
          if (this.state.APIResponse.message === "Volunteer Registered Successful") {
            toast.success("Volunteer activity registered successfully.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () =>
                this.props.history.push("/collaboration-becomeAVolunteer"),
            });
            sessionStorage.removeItem("volunterBack");
            sessionStorage.setItem(
              "volunterLocation",
              sessionStorage.getItem("currentAddress")
            );
            sessionStorage.removeItem("mapsBack");
            sessionStorage.removeItem("volunterTemplong");
            sessionStorage.removeItem("volunterTemplat");
            sessionStorage.removeItem("volunterTempLocation");
            sessionStorage.removeItem("volunterlong");
            sessionStorage.removeItem("volunterlat");
            sessionStorage.removeItem("volunterTitle");
            sessionStorage.removeItem("volunterDesc");
            sessionStorage.removeItem("volunterCatgValue");
            sessionStorage.removeItem("volunterCatglabel");
            sessionStorage.removeItem("volunterSdate");
            sessionStorage.removeItem("volunterEdate");
            sessionStorage.removeItem("BAV_shareLocationflag");
          }else if(this.state.APIResponse.message === "start_date cannot be less than current_date"){
             toast.error(
              "start_date cannot be less than current_date",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () =>{
                this.setState({
                    buttonDisabled : false
                });},
              }
            );
          }else if(this.state.APIResponse.message === "start_date cannot be greater than end_date"){
             toast.error(
              "End Date cannot be earlier than start date",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () =>{
                this.setState({
                    buttonDisabled : false
                });},
              }
            );
          }else if(this.state.APIResponse.message === "start_date cannot be less than end_date"){
            toast.error(
             "Start or End date cannot be earlier than current date",
             {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               onClose: () =>{
               this.setState({
                   buttonDisabled : false
               });},
             }
           );
         }else if (this.state.APIResponse.message === 'Please select category') {
            toast.error("Please select category", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () =>{
                this.setState({
                    buttonDisabled : false
                });},
            });
          }else {
            toast.error(
              "Activity is not added, something went wrong. Please try again",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () =>{
                this.setState({
                    buttonDisabled : false
                });},
              }
            );
          }
        });
    } else {
      toast.error("Please fill all mandatory fields.", {
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
  }

  BackButton() {
    this.props.history.push("/collaboration-becomeAVolunteer");
  }

  changeLocation() {
    sessionStorage.setItem("volunterBack", "collaboration-SubmitAVolunteer");
    sessionStorage.setItem("VolunteerFileAttachment",JSON.stringify(this.state.fileName[0]));
  }

  render() {
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link
                onClick={this.volunterBack}
                to="/collaboration-becomeAVolunteer"
              >
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
                Start A Volunteer Activity
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
          <Col xs="0" sm="0" md="1" lg="1" xl="3" xxl="3"></Col>
          <Col
            xs="12"
            sm="12"
            md="10"
            lg="10"
            xl="6"
            xxl="6"
            className="bg-container-style-opacity-cards-screen"
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
                  className="become-volunter-banners banner-submenu-style"
                >
                  <Row>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                      <Row className="become-a-volunteer-banner-text">
                        Share details of your initiative with supporting media
                        and location to involve other citizens.
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Container className="">
                <Row>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <TextField
                      id="standard-required"
                      label="Title"
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 250))
                      }
                      value={this.state.newTitle}
                      onChange={this.newTitleValidate}
                      required
                    />
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pt-4">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <TextField
                      id="date"
                      label={
                        <label>
                          Start Date<span class="select-astric-red"> *</span>
                        </label>
                      }
                      type="date"
                      value={this.state.start_date}
                      onChange={this.startDateValidate}
                      defaultValue={new Date()}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: new Date() },
                      }}
                    />
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pt-4">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <TextField
                      id="date"
                      label={
                        <label>
                          End Date<span class="select-astric-red"> *</span>
                        </label>
                      }
                      type="date"
                      defaultValue={new Date()}
                      value={this.state.end_date}
                      onChange={this.endDateValidate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: this.state.start_date },
                      }}
                    />
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>
                <Row>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <Select
                      placeholder={
                        <label>
                          Select Category
                          <span class="select-astric-red"> *</span>
                        </label>
                      }
                      options={this.state.CategoryList}
                      isSearchable={false}
                      className="category-drop-style"
                      value={this.state.SelectedType}
                      onChange={this.CategoryTypeValidate}
                      maxMenuHeight={170}
                    />
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

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
                    <TextField
                      id="outlined-textarea"
                      label="Describe your Activity here..."
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 500))
                      }
                      multiline
                     // variant="outlined"
                      rows={3}
                      className="start-new-idea-description-box"
                      value={this.state.description}
                      onChange={this.descriptionValidate}
                    />
                    <label class="max-char-count-text-display">
                      Max 500 characters
                    </label>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pt-2">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="10">
                    <Row className="">
                      <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                        <Checkbox
                          checked={this.state.shareLocationflag}
                          size="small"
                          className="login-checkbox-style"
                          inputProps={{
                            "aria-label": "checkbox with default color",
                          }}
                          onChange={this.ShareLocationCheckboxToggle_SAT}
                        />
                        <label class="keep-me-log-in-style">
                          Share my Location
                        </label>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <div>
                  {this.state.shareLocationflag && (
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
                        <Row>
                          <Col
                            xs="7"
                            sm="7"
                            md="7"
                            lg="7"
                            xl="7"
                            xxl="7"
                            className="geolocation-font-style"
                          >
                            <label>
                              {sessionStorage.getItem("volunterLocation")}
                            </label>
                          </Col>
                          <Col
                            xs="5"
                            sm="5"
                            md="5"
                            lg="5"
                            xl="5"
                            xxl="5"
                            className="text-align-right pl-0"
                          >
                            <Link
                              className="geolocation-button-style"
                              onClick={this.changeLocation}
                              to="/Maps"
                            >
                              <MDBIcon icon="map-marker-alt" />
                              <label class="geolocation-button-font-style">
                                Change Location
                              </label>
                            </Link>
                          </Col>
                        </Row>
                        <hr className="bold-hr"></hr>
                      </Col>
                      <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                    </Row>
                  )}
                </div>

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
                    <Row className="pt-3 pl-3">
                      <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                        <Row>
                          <Col
                            xs="4"
                            sm="4"
                            md="4"
                            lg="4"
                            xl="4"
                            xxl="4"
                            className="Attachment-font-style pl-0"
                          >
                            Attachment
                          </Col>

                          <Col
                            xs="8"
                            sm="8"
                            md="8"
                            lg="8"
                            xl="8"
                            xxl="8"
                            className="text-align-right"
                          >
                            <label
                              htmlFor="myInput"
                              className="uploadbuttonstyle"
                              onClick={this.onChangeFile} 
                            >
                              Upload
                              <PublishUpload fontSize="small"/>
                            </label>
                          </Col>
                        </Row>
                        <Row className="max-size-font-style">
                          Attach Image/Video/Document <i>(max size 5MB)</i>
                        </Row>
                        <Row className="max-size-font-style">
                          Maximum 3 attachments allowed
                        </Row>
                        <Row className="pt-3">
                          <Col
                            xs="10"
                            sm="10"
                            md="10"
                            lg="10"
                            xl="10"
                            xxl="10"
                            className="pl-0"
                          >
                            {this.state.fileName.map((file, index) => (
                              <div className="file1upload">{this.getTruncatedName(file.name)}</div>
                            ))}
                          </Col>
                          <Col
                            xs="2"
                            sm="2"
                            md="2"
                            lg="2"
                            xl="2"
                            xxl="2"
                            className="pl-0"
                          >
                            {this.state.fileName.map((file, index) => (
                              <div className="file1upload">
                                <CancelIcon
                                  color="secondary"
                                  fontSize="small"
                                  onClick={() => this.cancelUpload(index)}
                                />
                              </div>
                            ))}
                          </Col>
                        </Row>
                      </Col>

                      <Col xs="4" sm="4" md="4" lg="4" xl="4" xxl="4"></Col>
                    </Row>
                  </Col>
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                </Row>

                <Row className="pt-4 pb-5">
                  <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="1"></Col>
                  <Col xs="6" sm="6" md="5" lg="5" xl="5" xxl="5">
                    <Button
                      className="login-button-style"
                      onClick={this.Submit}
                      disabled={this.state.buttonDisabled}
                    >
                      SUBMIT
                    </Button>
                  </Col>
                  <Col xs="6" sm="6" md="5" lg="5" xl="5" xxl="5">
                    <Link
                      onClick={this.volunterBack}
                      to="/collaboration-becomeAVolunteer"
                    >
                      <Button className="skip-button-style">CANCEL</Button>
                    </Link>
                  </Col>
                  <Col xs="0" sm="0" md="10" lg="1" xl="1" xxl="1"></Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="3" xxl="3"></Col>
        </Row>
        <Row className="pb-3"></Row>
        <Footer />
        <BlockUI blocking={this.state.Blocking} />
      </div>
    );
  }
}

export default CollaborationBAVBecomeAVolunteer;

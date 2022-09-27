import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LoginHeadings from "../../jsonFiles/UserInfoJson/userLogin";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import OpacityIcon from "@material-ui/icons/Opacity";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import "./Profile-myProfile.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import CategoryListOfAPI from "../../jsonFiles/UserInfoJson/categoryList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FilePicker } from '@robingenz/capacitor-file-picker';
import { Plugins } from '@capacitor/core'; 
import {Capacitor} from '@capacitor/core';
import {useHistory} from "react-router-dom";

class ProfileMyProfile extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      full_name: "",
      image_path: "",
      phonenumber: "",
      dob: "",
      gender: "",
      email: "",
      emergency_number: "",
      emergencyNumberValidate_SAT: false,
      blood_group_id: "",
      address: "",
      city: "",
      cityValidate: false,
      state: "",
      pincode: "",
      pinCodeValue: null,
      pinCodeValidate_SAT: false,
      full_nameValidate_HMD: false,
      SelectedType: "",
      SelectedTypeValidate: false,
      BloogGroupList: CategoryListOfAPI.BloodGroup,
      AgeValidate_SAT: false,
      addressValidate_SAT: false,
      pinCodeList: CategoryListOfAPI.PinCodeList,
      file: "",
      ward_id: "",
      ward_name: "",
      emailValue_SAT: "",
      emailValidate_SAT:false,
      phone_numberValue_SAT: "",
      phone_numberValidate_SAT:false,
  
    };
    this.full_nameValidate_HMD = this.full_nameValidate_HMD.bind(this);
    this.bloodGroupValidate_SAT = this.bloodGroupValidate_SAT.bind(this);
    this.AgeValidate_SAT = this.AgeValidate_SAT.bind(this);
    this.addressValidate_SAT = this.addressValidate_SAT.bind(this);
    this.Submit_SAT = this.Submit_SAT.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateSessionStorage = this.updateSessionStorage.bind(this);
    this.getMimeType=this.getMimeType.bind(this);
    this.urltoFile=this.urltoFile.bind(this);
    this.phone_numberValidate_SAT = this.phone_numberValidate_SAT.bind(this);
    this.emailValidate_SAT = this.emailValidate_SAT.bind(this);

  }

  bloodGroupValidate_SAT = (Selected_option) => {
    this.setState({
      SelectedType: Selected_option,
      SelectedTypeValidate: true,
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
  async handleChange() {
    try{
      const result = await FilePicker.pickFiles({
        types: ['image/png','image/jpg','image/jpeg','images/webp'],
        multiple:false,
      });
      if(result.files.length>0){
        if (result.files[0].size / 1024 / 1024 > 5) {
          toast.warn("Profile picture size should be less than 5 mb", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
        }else{
          var mimeTypeupload=""
          if(result.files[0].mimeType=="" || result.files[0].mimeType==" " || result.files[0].mimeType==null ){
            mimeTypeupload=this.getMimeType(result.files[0].name)
          }else{
            mimeTypeupload=result.files[0].mimeType;
          }
          var fileobj=await this.urltoFile('data:text/plain;base64,'+result.files[0].data,result.files[0].name,mimeTypeupload);
          this.setState({
               image_path: URL.createObjectURL(fileobj),
               file:fileobj,
             });
        }
      }}catch(error){}
  };
 
  emailValidate_SAT = (e) => {
    var email = e.target.value.trim();
    if (email != null || email !== "") {
      this.setState({
        emailValidate_SAT: true,
        emailValue_SAT: email,
      });
    }
  };
  pinCodeValidate_SAT = (Selected_option) => {
    this.setState({
      pincode: Selected_option,
      pinCodeValidate_SAT: true,
      ward_id: Selected_option.ward_id,
    });
  };
 

  full_nameValidate_HMD = (e) => {
    if (e.target.value != null) {
      this.setState({
        full_name: e.target.value,
        full_nameValidate_HMD: true,
      });
    } else {
      this.setState({
        full_name: e.target.value,
        full_nameValidate_HMD: false,
      });
    }
  };

  AgeValidate_SAT = (e) => {
    if (e.target.value != null) {
      this.setState({
        dob: e.target.value,
        AgeValidate_SAT: true,
      });
    } else {
      this.setState({
        dob: e.target.value,
        AgeValidate_SAT: false,
      });
    }
  };

  cityValidate = (e) => {
    if (e.target.value != null) {
      this.setState({
        city: e.target.value,
        cityValidate: true,
      });
    } else {
      this.setState({
        city: e.target.value,
        cityValidate: false,
      });
    }
  };

  emergencyNumberValidate_SAT = (e) => {
    if (e.target.value != null) {
      this.setState({
        emergency_number: e.target.value,
        emergencyNumberValidate_SAT: true,
      });
    } else {
      this.setState({
        emergency_number: e.target.value,
        emergencyNumberValidate_SAT: false,
      });
    }
  };

  addressValidate_SAT = (e) => {
    if (e.target.value != null || e.target.value != " ") {
      this.setState({
        address: e.target.value,
        addressValidate_SAT: true,
      });
    } else {
      this.setState({
        address: e.target.value,
        addressValidate_SAT: false,
      });
    }
  };

  updateSessionStorage() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };
    fetch(process.env.REACT_APP_API_URL + "Smartcity/Profile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          if (
            this.state.APIResponse.data[0]["image_path"].indexOf("http") !== -1
          ) {
            sessionStorage.setItem(
              "yourProfileImage",
              this.state.APIResponse.data[0]["image_path"]
            );
          } else {
            sessionStorage.setItem(
              "yourProfileImage",
              process.env.REACT_APP_API_URL +
                this.state.APIResponse.data[0]["image_path"]
            );
          }
        } else {
          toast.error("updating session storage failed", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => this.props.history.push("/dashboard"),
          });
        }
      });
  }

  Submit_SAT() {
    let formData = new FormData();
    if(this.state.file==""){
      formData.append("file",this.state.file);
    }else{
    formData.append("file", this.state.file,this.state.file.name);
    }
    formData.append("user_id", sessionStorage.getItem("user_id"));
    formData.append("token", sessionStorage.getItem("token"));
    
    if (
      this.state.emailValidate_SAT &&
      this.state.phone_numberValidate_SAT
    ) {
    if (
      this.state.SelectedType.value == "undefined" ||
      this.state.SelectedType.value == undefined
    ) {
      formData.append("blood_group", null);
    } else {
      formData.append("blood_group", this.state.SelectedType.value);
    }
    if (this.state.emailValue_SAT == " " || this.state.emailValue_SAT == null) {
      formData.append("email", null);
    } else {
      formData.append("email",this.state.emailValue_SAT);
    } if (this.state.phone_numberValue_SAT == " " || this.state.phone_numberValue_SAT == null) {
      formData.append("phoneNumber", null);
    } else {
      formData.append("phoneNumber",this.state.phone_numberValue_SAT);
    }
    if (this.state.dob == " " || this.state.dob == null) {
      formData.append("dob", null);
    } else {
      formData.append("dob", this.state.dob);
    }
    if (
      this.state.emergency_number == " " ||
      this.state.emergency_number == null
    ) {
      formData.append("emergency_number", null);
    } else {
      formData.append("emergency_number", this.state.emergency_number);
    }
    formData.append("address", this.state.address);
    formData.append("city", this.state.city);
    formData.append("pincode", this.state.pincode.value);
    formData.append("ward_id", this.state.ward_id);
    const requestOptions = {
      method: "PUT",
      body: formData,
    };
    this.props.handler();
    fetch(
      process.env.REACT_APP_API_URL + "Smartcity/UpdateProfile",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        this.props.handler();
        if (this.state.APIResponse.message === "Data Update Successful") {
          this.updateSessionStorage();
          sessionStorage.setItem("ward_id",this.state.ward_id);
          toast.success("Profile Updated Successfully.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => this.props.history.push(sessionStorage.getItem("profileSettingBack"))
          });
        }else 
        if(this.state.APIResponse.message ==="OTP Send Successful") {
          sessionStorage.setItem("ward_id",this.state.ward_id);
          this.updateSessionStorage();
          sessionStorage.setItem(
            "phoneNumber",
            this.state.phone_numberValue_SAT
          );
          toast.success("OTP sent On your Updated Mobile Number", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => this.props.history.push("/verifyotp"),
          });
        }else 
        if(this.state.APIResponse.message ==="Phone number already exists") {
          this.updateSessionStorage();
          sessionStorage.setItem(
            "phoneNumber",
            this.state.phone_numberValue_SAT
          );
          toast.warn("Entered Mobile Number already registered with another Account", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }else  if (
          this.state.APIResponse.data.phoneNumber ===
          "phoneNumber should be 10 characters."
        ) {
          toast.error("Please enter valid phone Number ", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }else  if (
          this.state.APIResponse.data.emergency_number==="phoneNumber should be 10 characters."
        ) {
          toast.error("Please enter valid emergency Number ", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }else  if (
          this.state.APIResponse.data.email ===
          "Email is required."
        ) {
          toast.error("Please enter email address", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }else  if (
          this.state.APIResponse.data.email ===
          "Email should be between 2 and 50 characters."
        ) {
          toast.error("Please enter correct email address", {
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
         else {
          toast.error("Something went wrong, Please try again", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => this.props.history.push("/dashboard"),
          });
        }
      });
  }else {
    toast.error("Please fill all mandatory fields", {
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

  componentDidMount() {
    document.body.style =
      "background-image: url(../../assets/headerImage.png);";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };

    fetch(process.env.REACT_APP_API_URL + "Smartcity/Profile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          this.getBloodList();
          this.getPinCodeList();
          this.setState({
            full_name: this.state.APIResponse.data[0]["full_name"],
            dob: this.state.APIResponse.data[0]["dob"],
            phonenumber: this.state.APIResponse.data[0]["phonenumber"],
            emailValue_SAT:this.state.APIResponse.data[0]["email"],
            phone_numberValue_SAT: this.state.APIResponse.data[0]["phonenumber"],
            email: this.state.APIResponse.data[0]["email"],
            emergency_number: this.state.APIResponse.data[0][
              "emergency_number"
            ],
            blood_group_id: this.state.APIResponse.data[0]["blood_group_id"],
            address: this.state.APIResponse.data[0]["address"],
            city: this.state.APIResponse.data[0]["city"],
            state: this.state.APIResponse.data[0]["state"],
            pinCodeValue: this.state.APIResponse.data[0]["pincode"],
            ward_name: this.state.APIResponse.data[0]["ward_name"],
            ward_id: this.state.APIResponse.data[0]["ward_id"],
          });
          if (this.state.emailValue_SAT != null || this.state.emailValue_SAT !== "") {
            this.setState({
              emailValidate_SAT: true,
            });
          }
          if (this.state.phone_numberValue_SAT != null || this.state.phone_numberValue_SAT !== "") {
            this.setState({
              phone_numberValidate_SAT: true,
            });
          }
          if (
            this.state.APIResponse.data[0]["image_path"].indexOf("https") === -1
          ) {
            this.setState({
              image_path:
                process.env.REACT_APP_API_URL +
                this.state.APIResponse.data[0]["image_path"],
            });
          } else {
            this.setState({
              image_path: this.state.APIResponse.data[0]["image_path"],
            });
          }
          if (this.state.address === " ") {
            this.state.address = null;
          }
          if (this.state.dob === 0 || this.state.dob === "0") {
            this.state.dob = null;
          }
          if (
            this.state.emergency_number === 0 ||
            this.state.emergency_number === "0"
          ) {
            this.state.emergency_number = null;
          }
          const temp = {
            value: this.state.pinCodeValue,
            label: this.state.ward_name + " - " + this.state.pinCodeValue,
          };
          this.setState({ pincode: temp });
          document.querySelector('body').scrollTo(0,0)
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
            onClose: () => this.props.history.push("/dashboard"),
          });
        }
      });
  }

  getBloodList() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };

    fetch(process.env.REACT_APP_API_URL+"Smartcity/BloodGroup", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          const options = this.state.APIResponse.data.map((d) => ({
            value: d.blood_group_id,
            label: d.blood_group,
          }));
          this.setState({ BloogGroupList: options });
          if (this.state.blood_group_id != " ") {
            const tempBloodGrp = {
              value: this.state.blood_group_id,
              label: this.state.BloogGroupList[
                parseInt(this.state.blood_group_id) - 1
              ].label,
            };
            this.setState({ SelectedType: tempBloodGrp });
          } else {
            const tempBloodGrp = {
              value: "",
              label: "Blood Group",
            };
            this.setState({ SelectedType: tempBloodGrp });
          }
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
            onClose: () => this.props.history.push("/dashboard"),
          });
        }
      });
  }
  phone_numberValidate_SAT = (e) => {
    var phone_number = e.target.value.trim();
  if (phone_number != null || phone_number !== "") {
    this.setState({
      phone_numberValue_SAT: phone_number,
      phone_numberValidate_SAT: true,
    });
  }
  };

  getPinCodeList() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(process.env.REACT_APP_API_URL+"Smartcity/Pincode", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          const options = this.state.APIResponse.data.map((d) => ({
            value: d.pincode,
            label: d.ward_name + " - " + d.pincode,
            ward_id: d.ward_id,
          }));
          this.setState({ pinCodeList: options });
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
            onClose: () => this.props.history.push("/dashboard"),
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Container>
          <Container className="pt-4 pb-4">
            <Row className="top-margin">
              <Col xs lg="3"></Col>
              <Col className="profileimage" md="auto" lg="6">
                <label for="userImage"  onClick={this.handleChange}>
                  <Row style={{ position: "relative" }}>
                    <img src={this.state.image_path} class="round-img pointer-cursor" alt="" />
                    <div className="cameraIconStyle">
                      <FontAwesomeIcon
                        icon={faCamera}
                        color="white"
                        size="lg"
                      />
                    </div>
                  </Row>
                </label>
              </Col>
              <Col xs lg="3"></Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <PermIdentityIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      id="input-with-icon-grid"
                      label="Full Name"
                      value={this.state.full_name}
                      onChange={this.full_nameValidate_HMD}
                      required
                      disabled
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <PermIdentityIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      id="input-with-icon-grid"
                      type="number"
                      inputmode="numeric"
                      label="Age"
                      maxLength="3"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      value={this.state.dob == " " ? "" : this.state.dob}
                      onChange={this.AgeValidate_SAT}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 3))
                      }
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <CallOutlinedIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      type="number"
                      inputmode="numeric"
                      id="input-with-icon-grid"
                      maxLength="10"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      label="Phone Number"
                      value={this.state.phone_numberValue_SAT}
                      onChange={this.phone_numberValidate_SAT}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 10))
                      }
                      required
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <MailOutlineIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      id="input-with-icon-grid"
                      label="Email"
                      value={this.state.emailValue_SAT}
                      onChange={this.emailValidate_SAT}
                      required
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <OpacityIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <Select
                      placeholder="Blood Group"
                      isSearchable={false}
                      className="category-drop-style  category-drop-style-profile"
                      value={this.state.SelectedType}
                      onChange={this.bloodGroupValidate_SAT}
                      options={this.state.BloogGroupList}
                      menuPlacement="top"
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountBoxIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      id="input-with-icon-grid"
                      label="Address"
                      value={this.state.address}
                      onChange={this.addressValidate_SAT}
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LocationCityIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      id="input-with-icon-grid"
                      label="City"
                      value={this.state.city}
                      onChange={this.cityValidate}
                      required
                      disabled
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>
          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <RoomOutlinedIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <Select
                      placeholder={
                        <label>
                          Pincode
                          <span class="select-astric-red"> *</span>
                        </label>
                      }
                      isSearchable={true}
                      className="category-drop-style drop-down-style-z-index category-drop-style-profile"
                      value={this.state.pincode}
                      onChange={this.pinCodeValidate_SAT}
                      options={this.state.pinCodeList}
                      menuPlacement="top"
                    />
                  </Grid>
                </Grid>
              </Col>
            </Row>
          </Container>

          <Container className="pt-3">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="6" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <CallOutlinedIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      type="number"
                      inputmode="numeric"
                      id="input-with-icon-grid"
                      label="Emergency Number"
                      value={this.state.emergency_number}
                      onChange={this.emergencyNumberValidate_SAT}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 10))
                      }
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="3" xxl="3"></Col>
            </Row>
          </Container>

          <Container className="pt-5">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="2"></Col>
              <Col
                xs="6"
                sm="6"
                md="6"
                lg="5"
                xl="4"
                xxl="4"
                className="signup-text-message-style"
              >
                <Button
                  className="signup-button-style"
                  onClick={this.Submit_SAT}
                >
                  {LoginHeadings.Profile_SUBMIT_HMD}
                </Button>
              </Col>
              <Col
                xs="6"
                sm="6"
                md="6"
                lg="5"
                xl="4"
                xxl="4"
                className="signup-text-message-style"
              >
              <Link to= {sessionStorage.getItem("profileSettingBack")} className="cancle-button-style">
                <Button className="skip-button-style">
                    {LoginHeadings.Profile_CANCEL_HMD}
                </Button>
                </Link>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="2"></Col>
            </Row>
          </Container>
        </Container>
       
      </div>
    );
  }
}

export default withRouter(ProfileMyProfile);

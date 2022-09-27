import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { MDBIcon } from "../../../node_modules/mdbreact";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../Footer";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import Select from "react-select";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import OpacityIcon from "@material-ui/icons/Opacity";
import LoginHeadings from "../../jsonFiles/UserInfoJson/userLogin";
import CategoryListOfAPI from "../../jsonFiles/UserInfoJson/categoryList";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import BlockUI from "../BlockUI/BlockUI";
import { FilePicker } from '@robingenz/capacitor-file-picker';
class ProfileFirstLogin extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      full_name: "",
      image_path: "",
      phonenumber: "",
      dob: null,
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
      phone_numberValue_SAT: "",
      phone_numberValidate_SAT: false,
      Blocking : false,
    };
    // this.displayCards = this.displayCards.bind(this);
    // this.CardDetails = this.CardDetails.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.full_nameValidate_HMD = this.full_nameValidate_HMD.bind(this);
    this.bloodGroupValidate_SAT = this.bloodGroupValidate_SAT.bind(this);
    this.AgeValidate_SAT = this.AgeValidate_SAT.bind(this);
    this.addressValidate_SAT = this.addressValidate_SAT.bind(this);
    this.submit_SAT = this.submit_SAT.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getMimeType=this.getMimeType.bind(this);
    this.urltoFile=this.urltoFile.bind(this);
    this.phone_numberValidate_SAT = this.phone_numberValidate_SAT.bind(this);
  }

  callGoogleProfile() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };

    fetch(
      process.env.REACT_APP_API_URL+"Social/SocialProfile",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        console.log("this.state.APIResponse = ", this.state.APIResponse);
        if (this.state.APIResponse.message === "Data Found Successful") {
          // sessionStorage.setItem("user_id", this.state.APIResponse.data.user_id);
          // sessionStorage.setItem("token", this.state.APIResponse.data.token);
          // console.log(this.state.APIResponse.data.[0]['image_path'])
          this.getBloodList();
          this.getPinCodeList();
          this.setState({
            full_name: this.state.APIResponse.data[0]["full_name"],
            image_path:
              process.env.REACT_APP_API_URL +
              this.state.APIResponse.data[0]["image_path"],
            //  dob: this.state.APIResponse.data[0]['dob'],
            //  gender: this.state.APIResponse.data[0]['gender'],
            //  phonenumber:this.state.APIResponse.data[0]['phonenumber'],
            email: this.state.APIResponse.data[0]["email"],
            //  emergency_number: this.state.APIResponse.data[0]['emergency_number'],
            //  blood_group_id: this.state.APIResponse.data[0]['blood_group_id'],
            //  address: this.state.APIResponse.data[0]['address'],
            city: this.state.APIResponse.data[0]["city"],
            //  state: this.state.APIResponse.data[0]['state'],
            //  pincode: this.state.APIResponse.data[0]['pincode'],
            //  pinCodeValue : (this.state.APIResponse.data[0]['pincode']),
            //  ward_name : this.state.APIResponse.data[0]['ward_name'],
            //  ward_id : this.state.APIResponse.data[0]['ward_id']
          });

          if (sessionStorage.getItem("login_type") === "google" || sessionStorage.getItem("login_type") === "facebook") {
            this.setState({
              image_path: sessionStorage.getItem("yourProfileImage"),
            });
          } else {
            this.setState({
              image_path: headerProfile_img,
            });
          }

          // if(this.state.address === " "){
          //   this.state.address = null;
          // }
          // if(this.state.dob === 0 || this.state.dob === '0'){
          //   this.state.dob = null
          // }
          // if(this.state.emergency_number === 0 || this.state.emergency_number === '0'){
          //   this.state.emergency_number = null
          // }
          // const temp = {
          //   "value" : this.state.pinCodeValue,
          //   "label" : this.state.ward_name +" - "+ this.state.pinCodeValue
          // }
          // this.setState({pincode: temp})
          // }
          // this.state.pinCodeValue = ((Number)(this.state.pinCodeValue));
          // console.log("pinCodeValue = ", typeof((Number)(this.state.pinCodeValue)))
          // (Number)(this.state.pincode).label = (Number)(this.state.pinCodeValue);
          // this.state.pincode.value = (Number)(this.state.pinCodeValue);
          //
          console.log(this.state.APIResponse);
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

  callNormalProfile() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
      }),
    };

    fetch(process.env.REACT_APP_API_URL+"Smartcity/Profile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Data Found Successful") {
          // sessionStorage.setItem("user_id", this.state.APIResponse.data.user_id);
          // sessionStorage.setItem("token", this.state.APIResponse.data.token);
          // console.log(this.state.APIResponse.data.[0]['image_path'])
          this.getBloodList();
          this.getPinCodeList();
          this.setState({
            full_name: this.state.APIResponse.data[0]["full_name"],
            image_path:
              process.env.REACT_APP_API_URL +
              this.state.APIResponse.data[0]["image_path"],
            dob: this.state.APIResponse.data[0]["dob"],
            //  gender: this.state.APIResponse.data[0]['gender'],
            phone_numberValue_SAT: this.state.APIResponse.data[0][
              "phonenumber"
            ],
            email: this.state.APIResponse.data[0]["email"],
            emergency_number: this.state.APIResponse.data[0][
              "emergency_number"
            ],
            blood_group_id: this.state.APIResponse.data[0]["blood_group_id"],
            address: this.state.APIResponse.data[0]["address"],
            city: this.state.APIResponse.data[0]["city"],
            state: this.state.APIResponse.data[0]["state"],
            //  pincode: this.state.APIResponse.data[0]['pincode'],
            pinCodeValue: this.state.APIResponse.data[0]["pincode"],
            ward_name: this.state.APIResponse.data[0]["ward_name"],
            ward_id: this.state.APIResponse.data[0]["ward_id"],
          });
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

          // }
          // this.state.pinCodeValue = ((Number)(this.state.pinCodeValue));
          // console.log("pinCodeValue = ", typeof((Number)(this.state.pinCodeValue)))
          // (Number)(this.state.pincode).label = (Number)(this.state.pinCodeValue);
          // this.state.pincode.value = (Number)(this.state.pinCodeValue);
          //
          //  console.log(this.state.APIResponse)
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

  componentDidMount() {
    document.body.style =
      "background-image: url(../../assets/headerImage.png);";

    if (
      sessionStorage.getItem("login_type") === "google" ||
      sessionStorage.getItem("login_type") === "facebook"
    ) {
      this.callGoogleProfile();
    } else if (sessionStorage.getItem("login_type") === "manual") {
      this.callNormalProfile();
    }
    document.querySelector('body').scrollTo(0,0)
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
          // if(this.state.blood_group_id !=" ") {
          //   const tempBloodGrp = {
          //     "value" : this.state.blood_group_id,
          //     "label" : this.state.BloogGroupList[(parseInt(this.state.blood_group_id) - 1)].label
          //   }
          //   this.setState({SelectedType: tempBloodGrp})
          //   }
          //   else{
          //     const tempBloodGrp = {
          //       "value" : "",
          //       "label" :""
          //     }
          //     this.setState({SelectedType: tempBloodGrp})
          //   }
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

async signOut(){
   await GoogleAuth.signOut();
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
  //   if (event.currentTarget.files[0].size / 1024 / 1024 > 5) {
  //     this.myRef.current.value=""
  //     toast.warn("Profile picture size should be less than 5 mb", {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }else{
  //   this.setState({
  //     image_path: URL.createObjectURL(event.target.files[0]),
  //     file: event.currentTarget.files[0],
  //   });
  // }
  };
  pinCodeValidate_SAT = (Selected_option) => {
    this.setState({
      pincode: Selected_option,
      pinCodeValidate_SAT: true,
      ward_id: Selected_option.ward_id,
    });
    console.log("Selected_option = ", Selected_option.ward_id);
  };

  full_nameValidate_HMD = (e) => {
    if (e.target.value != null) {
      this.setState({
        full_name: e.target.value,
        full_nameValidate_HMD: true,
      });
      // console.log("full_nameValue_SAT ", this.state.full_nameValue_SAT);
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

  phone_numberValidate_SAT = (e) => {
    var phone_number = e.target.value.trim();
    phone_number = phone_number.slice(0, 10);
    if (phone_number != null || phone_number !== "") {
      this.setState({
        phone_numberValue_SAT: phone_number,
        phone_numberValidate_SAT: true,
      });
    } else {
      this.setState({
        phone_numberValue_SAT: phone_number,
        phone_numberValidate_SAT: false,
      });
    }
  };

  submit_SAT() {
    if (
      sessionStorage.getItem("login_type") === "google" ||
      sessionStorage.getItem("login_type") === "facebook"
    ) {
      this.updateGoogleProfile();
    } else if (sessionStorage.getItem("login_type") === "manual") {
      this.updateManualProfile();
    }
  }

  updateManualProfile() {
    if (this.state.pincode.value != null) {
      let formData = new FormData();
      if(this.state.file==""){
        formData.append("file",this.state.file);
      }else{
      formData.append("file", this.state.file,this.state.file.name);
      }
      formData.append("token", sessionStorage.getItem("token"));
      formData.append("user_id", sessionStorage.getItem("user_id"));
      if (
        this.state.SelectedType.value == "undefined" ||
        this.state.SelectedType.value == undefined ||
        this.state.SelectedType.value == ""
      ) {
        formData.append("blood_group", null);
      } else {
        formData.append("blood_group", this.state.SelectedType.value);
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

      formData.append("is_profile_complete", true);
      formData.append("address", this.state.address);
      formData.append("city", this.state.city);
      formData.append("pincode", this.state.pincode.value);
      formData.append("ward_id", this.state.ward_id);

      const requestOptions = {
        method: "PUT",
        body: formData,
      };
      this.setState({
        Blocking:true
      });
      fetch(
        process.env.REACT_APP_API_URL+"Smartcity/UpdateProfile",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          this.setState({
            Blocking:false
          });
          if (this.state.APIResponse.message === "Data Update Successful") {
            toast.success("Profile Updated Successfully.", {
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
              onClose: () => this.props.history.push("/"),
            });
          }
        });
    } else {
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

  updateGoogleProfile() {
    if(this.state.phone_numberValue_SAT.length==10){
    if (this.state.pincode.value != null && this.state.phone_numberValue_SAT !="") {
      let formData = new FormData();
      if(this.state.file==""){
        formData.append("file",this.state.file);
      }else{
      formData.append("file", this.state.file,this.state.file.name);
      }
      formData.append("token", sessionStorage.getItem("token"));
      formData.append("user_id", sessionStorage.getItem("user_id"));
      if (
        this.state.SelectedType.value == "undefined" ||
        this.state.SelectedType.value == undefined
      ) {
        formData.append("blood_group", " ");
      } else {
        formData.append("blood_group", this.state.SelectedType.value);
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
      formData.append("phone_number", this.state.phone_numberValue_SAT);
      //formData.append('dob', this.state.dob);
      // formData.append('emergency_number', this.state.emergency_number);
      formData.append("address", this.state.address);
      formData.append("city", this.state.city);
      formData.append("pincode", this.state.pincode.value);
      formData.append("ward_id", this.state.ward_id);
      formData.append("is_profile_complete", true);

      const requestOptions = {
        method: "PUT",
        body: formData,
      };
      this.setState({
        Blocking:true
      });
      fetch(
        process.env.REACT_APP_API_URL+"Social/UpdateSocialProfile",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          this.setState({
            Blocking:false
          });
          if (this.state.APIResponse.message === "Data Updated Successful") {
            toast.success("Profile Updated Successfully.", {
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
          }else if(this.state.APIResponse.message ==="Phone number already exists") {
          
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
              onClose: () => this.props.history.push("/"),
            });
          }
        });
    } else {
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
  else{
    toast.error("Phone number should be 10 digits", {
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

  render() {
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
              {/* <div class="back-icon-circle-style"> */}
              {/* <Link to = "collaboration-shareDiscussIdeas">
                  <Tooltip title="Dashboard" placement="top" TransitionProps={{ timeout: 600 }}>
                    <MDBIcon icon="chevron-circle-left" className="back-arrow-icon pt-1"/>
                  </Tooltip>
                </Link> */}
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
              <label class="header-heading-label-style">Profile</label>
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
                  {/* <Dropdown.Item>
                    <div onClick={this.openProfileSettings}>
                      <PersonOutlineOutlinedIcon className="dropdown-icon-style" />
                      <label class="dropdown-font-style">
                        Profile Settings
                      </label>
                    </div>
                  </Dropdown.Item> */}

                  {!(
                    sessionStorage.getItem("user_id") == null ||
                    sessionStorage.getItem("user_id") == undefined
                  ) && (
                    <Dropdown.Item onClick={this.logout} style={{marginTop:-10,marginBottom:-10}}>
                      <ExitToAppRoundedIcon className="dropdown-icon-style" />
                      <label class="dropdown-font-style">Logout</label>
                    </Dropdown.Item>
                  )}
                  {(sessionStorage.getItem("user_id") == null ||
                    sessionStorage.getItem("user_id") == undefined) && (
                    <Dropdown.Item onClick={this.login} style={{marginTop:-10,marginBottom:-10}}>
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
          <Col xs="0" sm="0" md="1" lg="2" xl="2" xxl="2"></Col>
          <Col
            xs="12"
            sm="12"
            md="10"
            lg="8"
            xl="8"
            xxl="8"
            className="bg-container-style-opacity"
          >
            <Container className="pt-5 pb-5">
              <Container className="pt-4 pb-4">
                <Row className="top-margin">
                  <Col xs lg="3"></Col>
                  <Col className="profileimage" md="auto" lg="6">
                    <label for="userImage"  onClick={this.handleChange}>
                      <img
                        src={this.state.image_path}
                        class="round-img pointer-cursor"
                        alt=""
                      />
                    </label>
                  </Col>
                  <Col xs lg="3"></Col>
                </Row>
              </Container>

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
                          value={this.state.dob}
                          onChange={this.AgeValidate_SAT}
                          onInput={(e) =>
                            (e.target.value = e.target.value.slice(0, 3))
                          }
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
                          required
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <MailOutlineIcon className="login-icon-color" />
                      </Grid>
                      <Grid item className="login-field-width-style">
                        <TextField
                          id="input-with-icon-grid"
                          label="Email"
                          value={this.state.email}
                          onChange={this.emailValidate_SAT}
                          required
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <OpacityIcon className="login-icon-color" />
                      </Grid>
                      <Grid item className="login-field-width-style">
                        {/* <TextField id="input-with-icon-grid" label="Blood Group" value={this.state.blood_group_id} onChange={this.emailValidate_SAT} /> */}
                        <Select
                          placeholder="Blood Group"
                          isSearchable={false}
                          className="category-drop-style  category-drop-style-profile"
                          value={this.state.SelectedType}
                          onChange={this.bloodGroupValidate_SAT}
                          // labelKey='blood_group'
                          // valueKey='blood_group_id'
                          options={this.state.BloogGroupList}
                          menuPlacement="top"
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              {/* <Container>
  <Row>
    <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
    <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <RoomOutlinedIcon className="login-icon-color" />
        </Grid>
        <Grid item className="login-field-width-style">
          <TextField id="input-with-icon-grid" label="City" value={this.state.city} onChange={this.cityValidate_HMD} required />
        </Grid>
      </Grid>
    </Col>
    <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
  </Row>
</Container> */}

              <Container className="pt-3">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <RoomOutlinedIcon className="login-icon-color" />
                      </Grid>
                      <Grid item className="login-field-width-style">
                        <Select
                          placeholder={
                            <label>
                              Pincode<span class="select-astric-red"> *</span>
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
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
                  <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
                </Row>
              </Container>

              <Container className="pt-5">
                <Row>
                  <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="2"></Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="8"
                    xl="8"
                    xxl="8"
                    className="signup-text-message-style"
                  >
                    <Button
                      className="signup-button-style"
                      onClick={this.submit_SAT}
                    >
                      {LoginHeadings.Profile_SUBMIT_HMD}
                    </Button>
                  </Col>
                  {/* <Col xs="6" sm="6" md="6" lg="4" xl="4" xxl="4" className="signup-text-message-style">
          <Button className="skip-button-style">
          <Link to='/dashboard' className="cancle-button-style">
            {LoginHeadings.Profile_CANCEL_HMD}
            </Link>
          </Button>
        </Col> */}
                  <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="2"></Col>
                </Row>
              </Container>
            </Container>

            <Row className="pt-5 pb-5" />
          </Col>
          <Col xs="0" sm="0" md="1" lg="2" xl="2" xxl="2"></Col>
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
        {/* <Footer /> */}
        <BlockUI blocking={this.state.Blocking} />
      </div>
    );
  }
}
export default ProfileFirstLogin;

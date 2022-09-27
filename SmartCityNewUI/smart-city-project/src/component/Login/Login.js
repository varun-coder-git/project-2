import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginHeadings from "../../jsonFiles/UserInfoJson/userLogin";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import fb_img from "../../assets/fb.png";
import tweet_img from "../../assets/tweet.png";
import googlePlus_img from "../../assets/gplus.png";
import { Navbar } from "react-bootstrap";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Background from "../../assets/curvebg2.png";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { MDBIcon } from "mdbreact";
import { loadModules } from "esri-loader";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import HeaderLogo from "../../assets/HeaderLogo.png";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";

const options = {
  url: "https://js.arcgis.com/4.20/",
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue_SAT: "",
      emailValidate_SAT: false,
      phone_numberValue_SAT: "",
      phone_numberValidate_SAT: false,
      passValue_SAT: "",
      keepMeLogInValue_SAT: false,
      passwordValidate_SAT: false,
      APIResponse: "",
      SubmitAlert: false,
      dialogBoxStatus: false,
      accountIsDisable: false,
      emptyFields: false,
      passwordVisible: false,
    };
    this.emailValidate_SAT = this.emailValidate_SAT.bind(this);
    this.phone_numberValidate_SAT = this.phone_numberValidate_SAT.bind(this);
    this.passwordValidate_SAT = this.passwordValidate_SAT.bind(this);
    this.submit_SAT = this.submit_SAT.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.CheckboxToggle_SAT = this.CheckboxToggle_SAT.bind(this);
    this.passwordVisible = this.passwordVisible.bind(this);
    
  }
  async signIn() {
    const result = await GoogleAuth.signIn();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: result.email,
        familyName: result.familyName,
        givenName: result.givenName,
        Id: result.id,
        imageUrl: result.imageUrl,
        name: result.name,
        login_type: "google",
        longitude: sessionStorage.getItem("currentLongitude"),
        latitude: sessionStorage.getItem("currentLatitude"),
        address: sessionStorage.getItem("currentAddress")
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Social/SocialLogin",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Logged In Successful") {
          var JsonData = this.state.APIResponse.data;
          if (this.state.keepMeLogInValue_SAT) {
            sessionStorage.setItem("email", JsonData.email);
          }
          sessionStorage.setItem("user_id", JsonData.user_id);
          sessionStorage.setItem("ward_id", JsonData.ward_id);
          sessionStorage.setItem("token", JsonData.token);
          sessionStorage.setItem("login_type", JsonData.login_type);
          sessionStorage.setItem("yourProfileImage", JsonData.image);
          if(!sessionStorage.getItem("yourProfileImage") || sessionStorage.getItem("yourProfileImage").indexOf('http')!== -1 || sessionStorage.getItem("yourProfileImage")==""){
            console.log("https present");
          }
          else{
            console.log("https absent");
            sessionStorage.setItem(
              "yourProfileImage",process.env.REACT_APP_API_URL +
              sessionStorage.getItem("yourProfileImage")
            );
          }
          sessionStorage.setItem("keepLoginFlag", JsonData.user_id);
          sessionStorage.setItem(
            "is_profile_complete",
            JsonData.is_profile_complete
          );
          if (JsonData.is_profile_complete === false) {
            this.props.history.push("/ProfileFirstLogin");
          } else {
            this.props.history.push("/Dashboard");
          }
        }
      });
  }

  async facebooksignIn() {
    const FACEBOOK_PERMISSIONS = ["public_profile", "email"];
    const result = await FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });
    console.log("Result = ", result);
    const response = await fetch(
      `https://graph.facebook.com/v12.0/me?fields=id,name,first_name,last_name,email,picture&access_token=${result.accessToken.token}`
    );
    const myJson = await response.json();
    console.log(myJson);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: myJson.email,
        familyName: myJson.last_name,
        givenName: myJson.first_name,
        Id: myJson.id,
        imageUrl: myJson.picture.data.url,
        name: myJson.name,
        login_type: "facebook",
        longitude: sessionStorage.getItem("currentLongitude"),
        latitude: sessionStorage.getItem("currentLatitude"),
        address: sessionStorage.getItem("currentAddress")
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Social/SocialLogin",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.message === "Logged In Successful") {
          var JsonData = this.state.APIResponse.data;
          console.log(
            "my facebook login credential :" + JSON.stringify(JsonData)
          );
          if (this.state.keepMeLogInValue_SAT) {
            sessionStorage.setItem("email", JsonData.email);
          }
          sessionStorage.setItem("user_id", JsonData.user_id);
          sessionStorage.setItem("ward_id", JsonData.ward_id);
          sessionStorage.setItem("token", JsonData.token);
          sessionStorage.setItem("login_type", JsonData.login_type);
          sessionStorage.setItem("yourProfileImage", JsonData.image);
          if(!sessionStorage.getItem("yourProfileImage")|| sessionStorage.getItem("yourProfileImage").indexOf('http')!== -1 || sessionStorage.getItem("yourProfileImage")==""){
            console.log("https present");
          }
          else{
            console.log("https absent");
            sessionStorage.setItem(
              "yourProfileImage",process.env.REACT_APP_API_URL +
              sessionStorage.getItem("yourProfileImage")
            );
          }
          sessionStorage.setItem("keepLoginFlag", JsonData.user_id);
          sessionStorage.setItem(
            "is_profile_complete",
            JsonData.is_profile_complete
          );

          if (JsonData.is_profile_complete === false) {
            // Profile
            console.log(JSON.stringify(sessionStorage));
            this.props.history.push("/ProfileFirstLogin");
          } else {
            this.props.history.push("/Dashboard");
          }
        } else if (
          this.state.APIResponse.message ===
          "Please update your email id in your Facebook account to login. Or please login using your Gmail ID or register as new user."
        ) {
          toast.error(
            "Please update your email id in your Facebook account to login. Or please login using your Gmail ID or register as new user.",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      });
  }

  componentDidMount() {
    var latitude, longitude;
    document.body.style = "background: none";

    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      sessionStorage.setItem("currentLatitude", latitude);
      sessionStorage.setItem("currentLongitude", longitude);
    });
    loadModules(
      [
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/tasks/Locator",
        "esri/widgets/Locate",
        "esri/widgets/Search",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        "esri/symbols/WebStyleSymbol",
        "esri/rest/locator",
      ],
      options
    ).then(
      ([
        esriConfig,
        Map,
        MapView,
        Locator,
        Locate,
        Search,
        Graphic,
        GraphicsLayer,
        Point,
        WebStyleSymbol,
        locator,
      ]) => {
        esriConfig.apiKey =
          "AAPKa808b66b329d4c20bedf21c30bfea58dkc4s6BDpyyhENXyDlewV2OAkuxnAGDz3LgnOk9Px1LWQBQNG3giBD5f5hX7aRB2R";

        const point = {
          //Create a point
          location: [longitude, latitude],
        };

        const locatorUrl =
          "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

        locator
          .locationToAddress(locatorUrl, point)
          .then((response) => {
            // If an address is successfully found, show it in the popup's content
            sessionStorage.setItem("currentAddress", response.address);
            sessionStorage.setItem("compliantLocation", response.address);
            sessionStorage.setItem("incidentLocation", response.address);
            sessionStorage.setItem("ideasLocation", response.address);
            sessionStorage.setItem("volunterLocation", response.address);
          })
          .catch(() => {
            navigator.geolocation.getCurrentPosition(function (position) {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              sessionStorage.setItem("currentLatitude", latitude);
              sessionStorage.setItem("currentLongitude", longitude);

              const point = {
                //Create a point
                location: [longitude, latitude],
              };

              locator.locationToAddress(locatorUrl, point).then((response) => {
                // If an address is successfully found, show it in the popup's content
                sessionStorage.setItem("currentAddress", response.address);
                sessionStorage.setItem("compliantLocation", response.address);
                sessionStorage.setItem("incidentLocation", response.address);
                sessionStorage.setItem("ideasLocation", response.address);
                sessionStorage.setItem("volunterLocation", response.address);
              });
            });
          });
      }
    );

    var KeepMeLogIn = sessionStorage.getItem("keepLoginFlag");
    if (KeepMeLogIn === "true") {
      this.props.history.push("/Dashboard");
    }
  }

  

  emailValidate_SAT = (e) => {
    var email = e.target.value.trim();
    if (email != null || email !== "") {
      this.setState({
        emailValidate_SAT: true,
        emailValue_SAT: email,
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

  passwordValidate_SAT = (e) => {
    var passwordCurrent_SAT = e.target.value;
    if (passwordCurrent_SAT != null || passwordCurrent_SAT != "") {
      this.setState({
        passValue_SAT: passwordCurrent_SAT,
        passwordValidate_SAT: true,
      });
    } else {
      this.setState({
        passValue_SAT: passwordCurrent_SAT,
        passwordValidate_SAT: false,
      });
    }
  };

  CheckboxToggle_SAT = (e) => {
    if (this.state.keepMeLogInValue_SAT == false) {
      this.setState({
        keepMeLogInValue_SAT: true,
      });
    } else {
      this.setState({
        keepMeLogInValue_SAT: false,
      });
    }
  };

  passwordVisible = (e) => {
    if (this.state.passwordVisible == false) {
      this.setState({
        passwordVisible: true,
      });
    } else {
      this.setState({
        passwordVisible: false,
      });
    }
  };

  LoginSucessToasterClose() {
    this.props.history.push("/Dashboard");
  }

  submit_SAT() {
    if (sessionStorage.getItem("phonenumber")) {
      this.state.phone_numberValue_SAT = sessionStorage.getItem("phonenumber");
      this.state.passValue_SAT = sessionStorage.getItem("password");
    }
    if (this.state.phone_numberValue_SAT && this.state.passwordValidate_SAT) {
      if(this.state.phone_numberValue_SAT.length< 10){
        toast.error("Please enter correct mobile number", {
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
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: this.state.phone_numberValue_SAT,
          password: this.state.passValue_SAT,
          longitude: sessionStorage.getItem("currentLongitude"),
          latitude: sessionStorage.getItem("currentLatitude"),
          address: sessionStorage.getItem("currentAddress"),
        }),
      };
      console.log(process.env.REACT_APP_API_URL);
      fetch(process.env.REACT_APP_API_URL+"Smartcity/Login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "Logged in Successful") {
            if (this.state.keepMeLogInValue_SAT) {
              sessionStorage.setItem("email", this.state.emailValue_SAT);
              sessionStorage.setItem("password", this.state.passValue_SAT);
            }
            sessionStorage.setItem(
              "user_id",
              this.state.APIResponse.data.user_id
            );
            sessionStorage.setItem(
              "ward_id",
              this.state.APIResponse.data.ward_id
            );
            sessionStorage.setItem("token", this.state.APIResponse.data.token);
            sessionStorage.setItem(
              "yourProfileImage",
              this.state.APIResponse.data.image
            );
            if(!sessionStorage.getItem("yourProfileImage") || sessionStorage.getItem("yourProfileImage").indexOf('http')!== -1 || sessionStorage.getItem("yourProfileImage")==""){
              
            }
            else{
              console.log("https absent");
              sessionStorage.setItem(
                "yourProfileImage",process.env.REACT_APP_API_URL +
                sessionStorage.getItem("yourProfileImage")
              );
            }
            sessionStorage.setItem(
              "keepLoginFlag",
              this.state.keepMeLogInValue_SAT
            );
            sessionStorage.setItem(
              "login_type",
              this.state.APIResponse.data.login_type
            );
            sessionStorage.setItem(
              "is_profile_complete",
              this.state.APIResponse.data.is_profile_complete
            );
            if (this.state.APIResponse.data.is_profile_complete === false) {
              // Profile
              this.props.history.push("/ProfileFirstLogin");
            } else {
              this.props.history.push("/Dashboard");
            }
          } else if (
            this.state.APIResponse.message ===
            "Inactive account,please verify mobile number first!!"
          ) {
            sessionStorage.setItem(
              "phoneNumber",
              this.state.phone_numberValue_SAT
            );
            toast.warn("Your account is not activated please verify OTP", {
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
          } else if (
            this.state.APIResponse.message ===
            "Data Not Found/Account is disable"
          ) {
            toast.warn(
              "You are not registered user or your account is deleted, please register again",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          } else if (
            this.state.APIResponse.message === "Sorry!! You are not a user!!!"
          ) {
            toast.warn("You are not an authorised user.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if( this.state.APIResponse.message ==="Invalid credentials.") {
            if(this.state.APIResponse.data.password==="Passcode is required."){
              toast.error("Please enter your password", {
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
              toast.error("please enter correct credentials", {
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
          }else{
            toast.error("please enter correct credentials", {
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
        })
        .catch(function () {
          toast.error("Server is down. please try again after sometime", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      }
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

  handleClose() {
    this.setState({
      dialogBoxStatus: false,
      emptyFields: false,
    });
  }

  responseFacebook = (response) => {
    console.log(response);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: response.email,
        imageUrl: response.picture.data.url,
        name: response.name,
        login_type: response.graphDomain,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Social/SocialLogin",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        console.log("this.state.APIResponse = ", this.state.APIResponse);
        if (this.state.APIResponse.message === "Logged In Successful") {
          var JsonData = this.state.APIResponse.data;
          if (this.state.keepMeLogInValue_SAT) {
            sessionStorage.setItem("email", JsonData.email);
          }
          sessionStorage.setItem("user_id", JsonData.user_id);
          sessionStorage.setItem("ward_id", JsonData.ward_id);
          sessionStorage.setItem("token", JsonData.token);
          sessionStorage.setItem("yourProfileImage", JsonData.image);
          sessionStorage.setItem("keepLoginFlag", JsonData.user_id);
          sessionStorage.setItem(
            "is_profile_complete",
            JsonData.is_profile_complete
          );
          sessionStorage.setItem("login_type", JsonData.login_type);

          if (JsonData.is_profile_complete === false) {
            // Profile
            this.props.history.push("/ProfileFirstLogin");
          } else {
            this.props.history.push("/Dashboard");
          }
        }
      });
  };

  responseGoogle = (response) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: response.profileObj.email,
        familyName: response.profileObj.familyName,
        givenName: response.profileObj.givenName,
        googleId: response.profileObj.googleId,
        imageUrl: response.profileObj.imageUrl,
        name: response.profileObj.name,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Social/SocialLogin",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        console.log("this.state.APIResponse = ", this.state.APIResponse);
        if (this.state.APIResponse.message === "Logged In Successful") {
          var JsonData = this.state.APIResponse.data;
          if (this.state.keepMeLogInValue_SAT) {
            sessionStorage.setItem("email", JsonData.email);
          }
          sessionStorage.setItem("user_id", JsonData.user_id);
          sessionStorage.setItem("ward_id", JsonData.ward_id);
          sessionStorage.setItem("token", JsonData.token);
          sessionStorage.setItem("login_type", JsonData.login_type);
          sessionStorage.setItem("yourProfileImage", JsonData.image);
          sessionStorage.setItem("keepLoginFlag", JsonData.user_id);
          sessionStorage.setItem(
            "is_profile_complete",
            JsonData.is_profile_complete
          );

          if (JsonData.is_profile_complete === false) {
            // Profile
            this.props.history.push("/ProfileFirstLogin");
          } else {
            this.props.history.push("/Dashboard");
          }
        }
      });
  };

  render() {
    const styles = (theme) => ({
      asterisk: {
        color: "red",
      },
    });

    return (
      <div class="pageImage-style">
        <Container className="bgImage-style">
          <Row>
            <Col xs="0" sm="0" md="4" lg="4" xl="4" xxl="4"></Col>
            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
              <Row className="login-title-style-row_SAT">
                <Col xs="1" sm="1" md="4" lg="4" xl="4" xxl="4"></Col>
                <Col
                  xs="10"
                  sm="10"
                  md="4"
                  lg="4"
                  xl="4"
                  xxl="4"
                  className="p-5"
                >
                  <img
                    className="forgetheader-profile-image-style"
                    src={HeaderLogo}
                    alt=""
                  />
                </Col>
                <Col xs="1" sm="1" md="4" lg="4" xl="4" xxl="4"></Col>
              </Row>
            </Col>
            <Col xs="0" sm="0" md="4" lg="4" xl="4" xxl="4"></Col>
          </Row>
          <div class="content-container">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="10"
                xl="10"
                xxl="6"
                className="login-welcome-text-style"
              >
                <label>{LoginHeadings.Login_WELCOME_SAT}</label>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>

            <Row className="pb-3">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="10"
                xl="10"
                xxl="6"
                className="login-text-message-style"
              >
                <label>{LoginHeadings.Login_MESSAGE_SAT}</label>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>

            <Row className="pt-3 input-row">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="10" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <PhoneOutlinedIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="dashboard-login-field-width-style" >
                    <TextField
                      type="number"
                      inputmode="numeric"
                      id="input-with-icon-grid"
                      maxLength="10"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      label="Phone Number"
                      value={this.state.value}
                      onChange={this.phone_numberValidate_SAT}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 10))
                      }
                      required
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>

            <Row className="pt-3 input-row">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="10" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LockOutlinedIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="dashboard-login-password-field-width-style">
                    {!this.state.passwordVisible && (
                      <TextField
                        type="password"
                        id="input-with-icon-grid"
                        label="Password"
                        minlength="6"
                        maxLength="15"
                        value={this.state.passValue_SAT}
                        onChange={this.passwordValidate_SAT}
                        autofocus
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" className="p-0">
                              <IconButton>
                                <VisibilityOffIcon
                                  className="login-icon-color"
                                  onClick={this.passwordVisible}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {this.state.passwordVisible && (
                      <TextField
                        type="text"
                        id="input-with-icon-grid"
                        label="Password"
                        minlength="6"
                        maxLength="15"
                        value={this.state.passValue_SAT}
                        onChange={this.passwordValidate_SAT}
                        autofocus
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" className="p-0">
                              <IconButton>
                                <VisibilityIcon
                                  className="login-icon-color"
                                  onClick={this.passwordVisible}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>

            <Row className="pt-2">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="10" xxl="6">
                <Row className="">
                  <Col
                    xs="6"
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    xxl="6"
                    className="pr-0"
                  >
                  </Col>
                  <Col
                    xs="6"
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    xxl="6"
                    className="login-forgetPassword-text-style"
                  >
                    <label>
                      <Link
                        className="login-forgetPassword-text-style"
                        to="/forgotPassword"
                      >
                        {LoginHeadings.Login_FORGOT_PASSWORD_TEXT_SAT}
                      </Link>
                    </label>
                  </Col>
                </Row>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>

            <Row className="pt-3">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="10"
                xl="10"
                xxl="6"
                className="login-text-message-style"
              >
                <Button
                  className="login-button-style"
                  onClick={this.submit_SAT}
                >
                  {LoginHeadings.Login_BUTTON_SAT}
                </Button>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>

            <Row className="OR-Login-with">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="10"
                xl="10"
                xxl="6"
                className="Login-option-lable"
              >
                <label>
                  <strong>OR Login with</strong>
                </label>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>
                <Row className="social-login-icon-row">
                  <Col xs="12" sm="12" md="12" lg="12" xl="12" className="pl-0" style={{textAlign:'center'}}>
                    <img
                      src={fb_img}
                      alt=""
                      onClick={() => this.facebooksignIn()}
                      style={{marginRight:50}}
                    />
                    <img
                      src={googlePlus_img}
                      alt=""
                      onClick={() => this.signIn()}
                    />
                  </Col>
                </Row>
            <Row className="pt-4 button-row">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="10" xxl="6">
                <Link to="/dashboard">
                  <Button className="skip-button-style">SKIP LOGIN</Button>
                </Link>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>

            <Row className="login-registration-button-style">
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="10" xxl="6">
                <Navbar
                  expand="lg"
                  sticky="bottom"
                  className="login-navbar-style"
                >
                  <Row className="register-button-style">
                    <Col className="Reg-text-alignment">
                      <label>
                        <span class="Question-reg-login-style">
                          {LoginHeadings.Login_REGISTRATION_SAT}
                        </span>
                        <Link to="/Registration">
                          <span class="register-login-style">REGISTER</span>
                        </Link>
                      </label>
                    </Col>
                  </Row>
                </Navbar>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="1" xxl="3"></Col>
            </Row>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={true}
            toastClassName="toaster-style"
          />
          <Row className="last-line-style"></Row>
        </Container>
      </div>
    );
  }
}

export default Login;

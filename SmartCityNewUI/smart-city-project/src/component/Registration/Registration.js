import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoginHeadings from "../../jsonFiles/UserInfoJson/userLogin";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import "./Registration.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "react-select";
import CategoryListOfAPI from "../../jsonFiles/UserInfoJson/categoryList";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import HeaderLogo from "../../assets/HeaderLogo.png";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue_SAT: "",
      emailValidate_SAT: false,
      full_nameValue_SAT: "",
      full_nameValidate_SAT: false,
      phone_numberValue_SAT: "",
      phone_numberValidate_SAT: false,
      cityValue_HMD: "",
      cityValidate_HMD: false,
      pincode_Value_HMD: "",
      pincode_Validate_HMD: false,
      passValue_SAT: "",
      passValidate_SAT: false,
      confpassValue_SAT: "",
      confpassValidate_SAT: false,
      APIResponse: "",
      SubmitAlert: false,
      dialogBoxStatus: false,
      pincode: "",
      pinCodeValue: null,
      pinCodeValidate_SAT: false,
      pinCodeList: CategoryListOfAPI.PinCodeList,
      passwordVisible: false,
      conPasswordVisible: false,
      ward_id: "",
      countrycode:"+91",
      countrycodeList :null
    };
    this.emailValidate_SAT = this.emailValidate_SAT.bind(this);
    this.full_nameValidate_SAT = this.full_nameValidate_SAT.bind(this);
    this.phone_numberValidate_SAT = this.phone_numberValidate_SAT.bind(this);
    this.cityValidate_HMD = this.cityValidate_HMD.bind(this);
    this.pincode_Validate_HMD_HMD = this.pincode_Validate_HMD.bind(this);
    this.passValidate_SAT = this.passValidate_SAT.bind(this);
    this.confpassValidate_SAT = this.confpassValidate_SAT.bind(this);
    this.submit_SAT = this.submit_SAT.bind(this);
    this.passwordVisible = this.passwordVisible.bind(this);
    this.conPasswordVisible = this.conPasswordVisible.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    document.body.style = "background: #d6e2e6";
    document.body.style =
      "#f3f3f3 url('../../assets/curvebg2.png') no-repeat right top height : 100%";
    document.querySelector('body').scrollTo(0,0)
    this.getPinCodeList();
  }
  pinCodeValidate_SAT = (Selected_option) => {
    this.setState({
      pincode: Selected_option,
      pinCodeValidate_SAT: true,
      ward_id: Selected_option.ward_id,
    });
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
            onClose: () => this.props.history.push("/"),
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
  customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
    }),
    control: () => ({
      width: '100%',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
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

  cityValidate_HMD = (e) => {
    var city = e.target.value.trim();
    if (city != null || city !== "") {
      this.setState({
        cityValidate_HMD: true,
        cityValue_HMD: city,
      });
    }
  };

  pincode_Validate_HMD = (e) => {
    var pincode = e.target.value.trim();
    if (pincode != null || pincode !== "") {
      this.setState({
        pincode_Validate_HMD: true,
        pincode_Value_HMD: pincode,
      });
    }
  };

  full_nameValidate_SAT = (e) => {
    var full_name = e.target.value;
    if (full_name != null || full_name !== "" || full_name != undefined) {
      this.setState({
        full_nameValue_SAT: full_name,
        full_nameValidate_SAT: true,
      });
    } else {
      this.setState({
        full_nameValue_SAT: full_name,
        full_nameValidate_SAT: false,
      });
    }
  };

  phone_numberValidate_SAT = (e) => {
    var phone_number = e.target.value.trim();
    this.setState({
      phone_numberValue_SAT: phone_number,
      phone_numberValidate_SAT: true,
    });
  };

  passValidate_SAT = (e) => {
    var password = e.target.value.trim();
    if (password != null || password !== "") {
      this.setState({
        passValue_SAT: password,
        passValidate_SAT: true,
      });
    } else {
      this.setState({
        passValue_SAT: password,
        passValidate_SAT: false,
      });
    }
  };

  confpassValidate_SAT = (e) => {
    var confirm_password = e.target.value.trim();
    if (confirm_password != null || confirm_password !== "") {
      this.setState({
        confpassValue_SAT: confirm_password,
        confpassValidate_SAT: true,
      });
    } else {
      this.setState({
        confpassValue_SAT: confirm_password,
        confpassValidate_SAT: false,
      });
    }
  };

  conPasswordVisible = (e) => {
    if (this.state.conPasswordVisible == false) {
      this.setState({
        conPasswordVisible: true,
      });
    } else {
      this.setState({
        conPasswordVisible: false,
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

  submit_SAT() {
    if (this.state.passValue_SAT === this.state.confpassValue_SAT) {
      if (
        this.state.full_nameValidate_SAT &&
        this.state.emailValidate_SAT &&
        this.state.passValidate_SAT &&
        this.state.confpassValidate_SAT &&
        this.state.phone_numberValidate_SAT &&
        this.state.pincode.value
      ) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: this.state.full_nameValue_SAT,
            phonenumber: this.state.phone_numberValue_SAT,
            // "last_name": this.state.LastNameValue,
            email: this.state.emailValue_SAT,
            password: this.state.passValue_SAT,
            pincode: this.state.pincode.value,
            ward_id: this.state.ward_id,
          }),
        };
        fetch(
          process.env.REACT_APP_API_URL+"Smartcity/Register",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              APIResponse: data,
            });
            if (
              this.state.APIResponse.message ===
              "Registration Successful"
            ) {
              sessionStorage.setItem(
                "phoneNumber",
                this.state.phone_numberValue_SAT
              );
              this.props.history.push("/verifyotp");
            } else if (
              this.state.APIResponse.message ===
              "Email or Phone Number already exist"
            ) {
              if (
                this.state.APIResponse.account_verification_flag === "inactive"
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
                this.state.APIResponse.account_verification_flag === "active"
              ) {
                toast.warn("Already registered user, please login", {
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
            } else {
              if (
                this.state.APIResponse.data.passcode ===
                "Passcode should be at least 8 characters."
              ) {
                toast.error("Password should be at least 8 characters,should contain atleast one lowercase, one uppercase, one number,one special charcter", {
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
              if (this.state.APIResponse.data.email === "Email is required.") {
                toast.error("Email Id is required.", {
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
              if (
                this.state.APIResponse.data.email ===
                "Email should be between 2 and 50 characters."
              ) {
                toast.error("Please enter valid Email Id.", {
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
              if (
                this.state.APIResponse.data.full_name ===
                "Username should be between 2 and 30 characters."
              ) {
                toast.error("Please enter valid Name ", {
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
              if (
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
              }
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
    } else {
      toast.error("Passwords does not match", {
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
    });
  }

  render() {
    return (
      <div class="pageImage-style">
        <Container className="reg-bgImage-style">
          <Row>
            <Col xs="0" sm="0" md="4" lg="4" xl="4" xxl="4"></Col>
            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="4">
              <Row className="login-title-style-row_SAT">
                <Col xs="1" sm="1" md="2" lg="2" xl="2" xxl="2"></Col>
                <Col
                  xs="10"
                  sm="10"
                  md="8"
                  lg="8"
                  xl="8"
                  xxl="8"
                  className="p-5"
                  style={{textAlign:'center'}}
                >
                  <img
                    className="forgetheader-profile-image-style"
                    src={HeaderLogo}
                    alt=""
                  />
                </Col>
                <Col xs="1" sm="1" md="2" lg="2" xl="2" xxl="2"></Col>
              </Row>
            </Col>
            <Col xs="0" sm="0" md="4" lg="4" xl="4" xxl="4"></Col>
          </Row>

          <div class="reg-content-container pl-0 pr-0">
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="10"
                xl="8"
                xxl="6 "
                className=" pt-4 login-welcome-text-style "
              >
                <label class="signup-title">{LoginHeadings.Sign_UP_HMD}</label>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>

            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="10"
                xl="8"
                xxl="6"
                className="login-text-message-style"
              >
                <label class="sign-up-sub-title">
                  {LoginHeadings.Sign_UPMESSAGE_HMD}
                </label>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>

            <Row className="pt-3 input-row">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <PermIdentityIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    {/* <Tooltip title="Please enter your full name" placement="bottom" TransitionProps={{ timeout: 600 }} arrow> */}
                    <TextField
                      id="input-with-icon-grid"
                      label="Full Name"
                      value={this.state.value}
                      onChange={this.full_nameValidate_SAT}
                      required
                    />
                    {/* </Tooltip> */}
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>

            <Row className="pt-3 input-row">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
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
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>
            <Row className="pt-3 input-row">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <MailOutlineIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      id="input-with-icon-grid"
                      label="Email"
                      value={this.state.value}
                      onChange={this.emailValidate_SAT}
                      required
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>

            <Row className="pt-3 input-row">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LocationCityIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-field-width-style">
                    <TextField
                      id="input-with-icon-grid"
                      label="City"
                      value="Thiruvananthapuram"
                      onChange={this.cityValidate_HMD}
                      disable
                      required
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>
            <Row>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
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
                      className="category-drop-style"
                      value={this.state.pincode}
                      onChange={this.pinCodeValidate_SAT}
                      options={this.state.pinCodeList}
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
              </Col>
            </Row>
           
            <Row className="pt-3">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LockOutlinedIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-password-field-width-style">
                    <Tooltip
                      title={
                        <div>
                          <label class="pb-1 pt-3">Password Must :</label>
                          <ul class="pr-4">
                            <li class="pb-2">Contain 8 characters or more</li>
                            <li class="pb-2">
                              Contain at least one lowercase character
                            </li>
                            <li class="pb-2">
                              Contain at least one uppercase character
                            </li>
                            <li class="pb-2">Contain at least one number</li>
                            <li class="pb-2">
                              Contain at least one symbol (like !@#$%^)
                            </li>
                          </ul>
                        </div>
                      }
                      placement="bottom"
                      TransitionProps={{ timeout: 600 }}
                      arrow
                      className="tooltip-style"
                    >
                      <div>
                        {!this.state.passwordVisible && (
                          <TextField
                            type="password"
                            id="input-with-icon-grid"
                            label="Password"
                            value={this.state.passValue_SAT}
                            onChange={this.passValidate_SAT}
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
                            value={this.state.passValue_SAT}
                            onChange={this.passValidate_SAT}
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
                      </div>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>

            <Row className="pt-3">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LockOutlinedIcon className="login-icon-color" />
                  </Grid>
                  <Grid item className="login-password-field-width-style">
                    <Tooltip
                      title={
                        <div>
                          <label class="pb-1 pt-3">Password Must :</label>
                          <ul class="pr-4">
                            <li class="pb-2">Contain 8 characters or more</li>
                            <li class="pb-2">
                              Contain at least one lowercase character
                            </li>
                            <li class="pb-2">
                              Contain at least one uppercase character
                            </li>
                            <li class="pb-2">Contain at least one number</li>
                            <li class="pb-2">
                              Contain at least one symbol (like !@#$%^)
                            </li>
                          </ul>
                        </div>
                      }
                      placement="bottom"
                      TransitionProps={{ timeout: 600 }}
                      arrow
                      classes="tooltip-style p-0 m-0"
                    >
                      <div>
                        {!this.state.conPasswordVisible && (
                          <TextField
                            type="password"
                            id="input-with-icon-grid"
                            label="Confirm Password"
                            value={this.state.confpassValue_SAT}
                            onChange={this.confpassValidate_SAT}
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" className="p-0">
                                  <IconButton>
                                    <VisibilityOffIcon
                                      className="login-icon-color"
                                      onClick={this.conPasswordVisible}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                        {this.state.conPasswordVisible && (
                          <TextField
                            type="text"
                            id="input-with-icon-grid"
                            label="Confirm Password"
                            value={this.state.confpassValue_SAT}
                            onChange={this.confpassValidate_SAT}
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" className="p-0">
                                  <IconButton>
                                    <VisibilityIcon
                                      className="login-icon-color"
                                      onClick={this.conPasswordVisible}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      </div>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>

            <Row className="pt-5 pb-3">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="10"
                xl="8"
                xxl="6"
                className="signup-text-message-style"
              >
                <Button
                  className="signup-button-style"
                  onClick={this.submit_SAT}
                >
                  {LoginHeadings.Sign_UP_HMD}
                </Button>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
            </Row>

            <Row className="login-registration-button-style">
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="8" xxl="6">
                <Navbar
                  expand="lg"
                  sticky="bottom"
                  className="signup-navbar-style"
                >
                  <Row>
                    <Col className="Reg-text-alignment">
                      <label>
                        <span class="Question-reg-login-style">
                          {LoginHeadings.Sign_UPMESSAGE_BOTTOM_HMD}
                        </span>
                        <Link to="/">
                          <span class="register-login-style">LOGIN</span>
                        </Link>
                      </label>
                    </Col>
                  </Row>
                </Navbar>
              </Col>
              <Col xs="0" sm="0" md="0" lg="1" xl="2" xxl="3"></Col>
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
            className="toaster-style"
          />
        </Container>
      </div>
    );
  }
}

export default Registration;

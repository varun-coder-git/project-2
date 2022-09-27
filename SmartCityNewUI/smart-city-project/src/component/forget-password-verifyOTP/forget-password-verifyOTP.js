import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import passwordwindow from "../../assets/passwordwindow.png";
import LoginHeadings from "../../jsonFiles/UserInfoJson/userLogin";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HeaderLogo from "../../assets/HeaderLogo.png";
import "./forget-password-verifyOTP.css";
import { ToastContainer, toast } from "react-toastify";

class ForgetPasswordVerifyOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpValue: "",
      otpValidate: false,
      APIResponse: "",
      dialogBoxStatus: false,
      SubmitAlert: false,
      OTPDoesNotMatch: false,
      resendOTP: false,
      ResentOTPAPIResponse: "",
    };

    this.otpValidate = this.otpValidate.bind(this);
    this.submit_SAT = this.submit_SAT.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.resendOTP_SAT = this.resendOTP_SAT.bind(this);
  }

  otpValidate = (e) => {
    var otp = e.target.value.trim();
    if (otp != null || otp !== "") {
      this.setState({
        otpValidate: true,
        otpValue: otp,
      });
    }
  };

  submit_SAT() {
    if (this.state.otpValue) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phonenumber: sessionStorage.getItem("phoneNumber"),
          otp: this.state.otpValue,
        }),
      };
      fetch(process.env.REACT_APP_API_URL+"Smartcity/MobileOTP", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "OTP match") {
            this.props.history.push("/ResetPassword");
          } else if (
            this.state.APIResponse.message === "OTP doesn't match!!!"
          ) {
            toast.warn("OTP  doesn't match, please re-enter your OTP", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (this.state.APIResponse.message === "OTP expired") {
            this.setState({
              resendOTP: true,
              dialogBoxStatus: true,
            });
          }
        });
    } else {
      toast.error("Please enter your OTP", {
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
      SubmitAlert: false,
      OTPDoesNotMatch: false,
      resendOTP: false,
    });
  }

  resendOTP_SAT() {
    if (sessionStorage.getItem("phoneNumber")) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phonenumber: sessionStorage.getItem("phoneNumber"),
        }),
      };
      fetch(process.env.REACT_APP_API_URL+"Smartcity/ResendOTP", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "OTP Resend Successful") {
            toast.success("OTP has been resent", {
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
    } else {
      this.setState({
        SubmitAlert: true,
        dialogBoxStatus: true,
      });
    }
  }

  render() {
    return (
      <div class="pageImage-style">
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

        <Container fluid className="header-style">
          <Row className="forget-password-header-height-style_SAT">
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
              xxl="12"
              className="header-title-style_SAT"
            >
              <img
                className="forgetheader-profile-image-style"
                src={HeaderLogo}
                alt=""
              />
            </Col>
          </Row>
        </Container>

        <Row className="pt-5">
          <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="6"
            xl="6"
            xxl="6"
            className="verifyotp-welcome-text-style "
          >
            <label>Verify OTP</label>
          </Col>
          <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
        </Row>

        <Container>
          <Row className="">
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="6"
              xl="6"
              xxl="6"
              className="verifyotp-text-style"
            >
              <label>Code is sent to your registered mobile number</label>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Grid
                container
                spacing={1}
                alignItems="flex-center"
                className="VerifyOTPMuiGrid-spacing-xs-1 > .MuiGrid-item"
              >
                <Grid item>
                  <img src={passwordwindow} alt="Logo" />
                </Grid>
              </Grid>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item className="otp-field-width-style">
                  <TextField
                    id="textfieldOtp"
                    type="number"
                    inputmode="numeric"
                    variant="outlined"
                    maxLength="4"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    label="OTP"
                    value={this.state.value}
                    onChange={this.otpValidate}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 4))
                    }
                    required
                  />
                </Grid>
              </Grid>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-4">
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="6"
              xl="6"
              xxl="6"
              className="signup-text-message-style"
            >
              <Button className="signup-button-style" onClick={this.submit_SAT}>
                {LoginHeadings.VerifyOTP_HMD}
              </Button>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Row className="">
                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                <Col
                  xs="6"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                  xxl="6"
                  className="resendOTP-text-style"
                >
                  <label onClick={this.resendOTP_SAT} className="resendOTP-cursor-style">Resend OTP</label>
                </Col>
              </Row>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-4 pb-5">
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Row>
                <Col className="click-here-to-login">
                  <label>
                    <span class="Question-style">Click here to go back to</span>
                    <Link to="/">
                      <span class="Login-style pl-2">Login</span>
                    </Link>
                  </label>
                </Col>
              </Row>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgetPasswordVerifyOTP;

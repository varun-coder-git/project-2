import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Forget-password.css";
import HeaderLogo from "../../assets/HeaderLogo.png";
import passwordwindow from "../../assets/passwordwindow.png";
import Grid from "@material-ui/core/Grid";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import TextField from "@material-ui/core/TextField";
import { MDBIcon } from "mdbreact";
import Button from "@material-ui/core/Button";
import ClientCaptcha from "react-client-captcha";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { withRouter } from "react-router-dom";
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_numberValue_SAT: "",
      phone_numberValidate_SAT: false,
      captchaValue_SAT: "",
      captchaValidate_SAT: false,
      captcha: "",
      value: "",
      refreshflag: false,
      EmailValidate: false,
    };
    this.RefreshCaptcha = this.RefreshCaptcha.bind(this);
    this.captchaValidate_SAT = this.captchaValidate_SAT.bind(this);
    this.GetCaptcha = this.GetCaptcha.bind(this);
    this.Submit = this.Submit.bind(this);
    this.phone_numberValidate_SAT = this.phone_numberValidate_SAT.bind(this);
  }

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

  captchaValidate_SAT = (e) => {
    var Captcha = e.target.value;
    if (Captcha != null || Captcha !== "") {
      this.setState({
        captchaValue_SAT: Captcha,
        captchaValidate_SAT: true,
      });
    } else {
      this.setState({
        captchaValue_SAT: Captcha,
        captchaValidate_SAT: false,
      });
    }
  };

  Submit() {
    if (this.state.captchaValue_SAT === this.state.captcha) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phonenumber: this.state.phone_numberValue_SAT,
        }),
      };

      fetch(
        process.env.REACT_APP_API_URL+"Smartcity/ForgetPassword",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "OTP Send Successful") {
            sessionStorage.setItem("user_id", this.state.APIResponse.data);
            sessionStorage.setItem(
              "phoneNumber",
              this.state.phone_numberValue_SAT
            );
            this.props.history.push("/ForgotPasswordVerifyOTP");
          }else if (this.state.APIResponse.message === "You are not user") {
            toast.error("This mobile Number is registered with admin account", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }else if(this.state.phone_numberValue_SAT==""){
             toast.error("Please enter mobile Number", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (this.state.APIResponse.message === "Data Not Found") {
            toast.error("Please enter registered phone number", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }  else if (this.state.APIResponse.message === "Invalid credentials.") {
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
          }
        });
    } else 
    { if (!this.state.captchaValidate_SAT) {
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
      } else {
        toast.error("Please verify the captcha", {
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
  }

  GetCaptcha(text) {
    this.setState({
      captcha: text,
    });
  }

  RefreshCaptcha() {
    if (this.state.refreshflag) {
      this.setState({
        refreshflag: true,
      });
    } else {
      this.setState({
        refreshflag: false,
      });
    }
  }

  check() {
  }

  render() {
    return (
      <div class="pageImage-style">
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
            <label>Forgot Password ?</label>
          </Col>
          <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
        </Row>

        <Container>
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

          <Row className="pt-3">
            <Col xs="0" sm="0" md="3" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <PhoneOutlinedIcon className="login-icon-color" />
                </Grid>
                <Grid item className="forgetpassword-phone-width-style">
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
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-5">
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col
              xs="10"
              sm="10"
              md="10"
              lg="6"
              xl="6"
              xxl="6"
              className="pl-0 ml-0"
            >
              <Row>
                <Col
                  className="captcha-style ml-3 pr-0"
                  xs="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                  xxl="12"
                >
                  <ClientCaptcha
                    captchaCode={this.GetCaptcha}
                    charsCount="6"
                    fontColor="#4833FF"
                    backgroundColor="#e9e9e9"
                    width="300"
                  />
                </Col>
              </Row>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-4">
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item className="forgetpassword-width-style ">
                  <TextField
                    id="input-with-icon-grid"
                    label="Enter Captcha here"
                    value={this.state.captchaValue_SAT}
                    onChange={this.captchaValidate_SAT}
                    required
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-5 pb-4">
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
              <Button className="forgot-button-style" onClick={this.Submit}>
                Submit
              </Button>
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
              {/* </Navbar> */}
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>
        </Container>
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
      </div>
    );
  }
}

export default withRouter(ForgetPassword);

import React, { Component } from "react";
import OtpInput from "react-otp-input";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import passwordwindow from '../../assets/passwordwindow.png';
import LoginHeadings from '../../jsonFiles/UserInfoJson/userLogin';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './VerifyOTP.css'
import HeaderLogo from "../../assets/HeaderLogo.png";
import { textAlign } from "@material-ui/system";


class VerifyOTP extends Component {
  componentDidMount() {
    document.body.style = 'background-image: url(../../assets/headerImage.png);'
    document.querySelector('body').scrollTo(0,0)

  }

  constructor(props) {
    super(props);
    this.state = {
      otpValue: '',
      otpValidate: false,
      APIResponse: '',
      dialogBoxStatus: false,
      SubmitAlert : false,
      OTPDoesNotMatch : false,
      resendOTP : false,
      ResentOTPAPIResponse : ''
    };
    
    this.otpValidate = this.otpValidate.bind(this);
    this.submit_SAT = this.submit_SAT.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };



  otpValidate = (e) => {
    var otp = e.target.value.trim();
    if (otp != null || otp !== "") {
      this.setState({
        otpValidate: true,
        otpValue: otp
      });
    }
  }

  submit_SAT() {
    if (this.state.otpValue) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "phonenumber": sessionStorage.getItem("phoneNumber"),
            "otp": this.state.otpValue
          }
        )
      };
      fetch(process.env.REACT_APP_API_URL+"Smartcity/MobileOTP", requestOptions)
        .then(response => response.json())
        .then(
          (data) => {
            this.setState({
              APIResponse: data
            });
            if(this.state.APIResponse.message === "OTP match"){
              this.props.history.push("/"); 
            }
            else if(this.state.APIResponse.message === "OTP doesn't match!!!"){
              this.setState({
                OTPDoesNotMatch: true,
                dialogBoxStatus: true,
              });
            }
            else if(this.state.APIResponse.message === "OTP expired"){
              this.setState({
                resendOTP: true,
                dialogBoxStatus: true,
              });
            }
          },
      );

    }
    else {
      this.setState({
        SubmitAlert: true,
        dialogBoxStatus: true
      });
    }
  }


  handleClose() {
    this.setState({
      dialogBoxStatus: false,
      SubmitAlert : false,
      OTPDoesNotMatch : false,
      resendOTP : false
    });
  }

  resendOTP_SAT() {

    if (sessionStorage.getItem("phoneNumber")) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "phonenumber": sessionStorage.getItem("phoneNumber")
          }
        )
      };
      fetch(process.env.REACT_APP_API_URL+"Smartcity/ResendOTP", requestOptions)
        .then(response => response.json())
        .then(
          (data) => {
          },
      );

    }
    else {
      this.setState({
        SubmitAlert: true,
        dialogBoxStatus: true
      });
    }
  }


render() {
    return <div class="pageImage-style">
        <Container fluid className="header-style">
          <Row className="forget-password-header-height-style_SAT">
            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="header-title-style_SAT">
              <img className="forgetheader-profile-image-style" src={HeaderLogo} alt="" />
            </Col>
          </Row>
        </Container>

        <Container className="profile-header-space"></Container>
        
          <Container>
            <Row>
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="8" xl="8" xxl="6" className="verifyotp-welcome-text-style ">

                <label>{LoginHeadings.VerifyOTP_HMD}</label>
              </Col>
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
            </Row>

            <Row>
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="8" xl="8" xxl="6" className="verifyotp-text-message-style">
                <label>{LoginHeadings.VerifyOTP_MESSAGE_HMD}</label>
              </Col>
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
            </Row>
            <Container>
              <Row>
                <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
                <Col xs="12" sm="12" md="12" lg="8" xl="8" xxl="6">
                  <Grid container spacing={1} alignItems="flex-center" className="VerifyOTPMuiGrid-spacing-xs-1 > .MuiGrid-item"  >
                    <Grid item >
                       <img src={passwordwindow}  alt="Logo" />
                    </Grid>
                  </Grid>
                </Col>
                <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
              </Row>
              <Row>
          <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
          <Col xs="12" sm="12" md="12" lg="8" xl="8" xxl="6">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item className="otp-field-width-style">
                <TextField id="textfieldOtp" type="number" inputmode="numeric"  variant="outlined" maxLength="4" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" label="OTP" value={this.state.value} onChange={this.otpValidate} onInput={(e) => e.target.value = e.target.value.slice(0, 4)} required />
              </Grid>
            </Grid>
          </Col>
          <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
        </Row>       
            </Container>
            <Row className="pt-4">
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="8" xl="8" xxl="6" className="signup-text-message-style">
                <Button className="signup-button-style" onClick={this.submit_SAT}>
                  {LoginHeadings.VerifyOTP_HMD}
                </Button>
                {
                  (this.state.SubmitAlert) &&
                  <Dialog open={this.state.dialogBoxStatus} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="simple-dialog-title">Invalid OTP</DialogTitle>
                  </Dialog>
                }
                {
                  (this.state.OTPDoesNotMatch) &&
                  <Dialog open={this.state.dialogBoxStatus} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="simple-dialog-title">OTP does not Match</DialogTitle>
                  </Dialog>
                }
                 {
                  (this.state.resendOTP) &&
                  <Dialog open={this.state.dialogBoxStatus} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="simple-dialog-title">Your OTP has been expired. Please click on resend  OTP</DialogTitle>
                  </Dialog>
                }
              </Col>
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
            </Row>

            <Row>
          <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
          <Col xs="12" sm="12" md="12" lg="8" xl="8" xxl="6">
          <Row className="">
            <Col xs="6" sm="6" md="6" lg="2" xl="6" xxl="6">
            </Col>
            <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" className="resendOTP-text-style">
              <label onClick={this.resendOTP_SAT} className="resendOTP-cursor-style">
                Resend OTP
              </label>
            </Col>
          </Row>
          </Col>
          <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
        </Row>


            <Row className="login-registration-button-style">
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="8" xl="8" xxl="6">
                <Navbar expand="lg" sticky="bottom" className="signup-navbar-style">
                  <Row>
                    <Col className="Reg-text-alignment">
                      <label>
                        <span class="Question-style">{LoginHeadings.VerifyOTP_MESSAGE_BOTTOM}</span>
                        <Link to='/'><span class="Login-style">Login</span></Link>
                      </label>
                    </Col>
                  </Row>
                </Navbar>
              </Col>
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="3"></Col>
            </Row>
          </Container>
    </div>;
  }
}
export default VerifyOTP;

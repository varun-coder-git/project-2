import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import passwordwindow from "../../assets/cityappim_1.png";
import LoginHeadings from "../../jsonFiles/UserInfoJson/userLogin";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HeaderLogo from "../../assets/HeaderLogo.png";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ToastContainer, toast } from "react-toastify";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      newPasswordValidate_SAT: false,
      conPassword: "",
      conPasswordValidate_SAT: false,
      newPasswordVisible: false,
      confirmPasswordVisible: false,
      APIResponse: "",
    };
    this.newPasswordValidate_SAT = this.newPasswordValidate_SAT.bind(this);
    this.conPasswordValidate_SAT = this.conPasswordValidate_SAT.bind(this);
    this.Submit = this.Submit.bind(this);
    this.newPasswordVisible = this.newPasswordVisible.bind(this);
    this.confirmPasswordVisible = this.confirmPasswordVisible.bind(this);
  }

  newPasswordVisible = (e) => {
    if (this.state.newPasswordVisible == false) {
      this.setState({
        newPasswordVisible: true,
      });
    } else {
      this.setState({
        newPasswordVisible: false,
      });
    }
  };

  confirmPasswordVisible = (e) => {
    if (this.state.confirmPasswordVisible == false) {
      this.setState({
        confirmPasswordVisible: true,
      });
    } else {
      this.setState({
        confirmPasswordVisible: false,
      });
    }
  };

  newPasswordValidate_SAT = (e) => {
    var newPassword = e.target.value;
    if (newPassword != null || newPassword !== "") {
      this.setState({
        newPasswordValidate_SAT: true,
        newPassword: newPassword,
      });
    } else {
      this.setState({
        newPasswordValidate_SAT: false,
        newPassword: newPassword,
      });
    }
  };

  conPasswordValidate_SAT = (e) => {
    var conPassword = e.target.value;
    if (conPassword != null || conPassword !== "") {
      this.setState({
        conPasswordValidate_SAT: true,
        conPassword: conPassword,
      });
    } else {
      this.setState({
        conPasswordValidate_SAT: false,
        conPassword: conPassword,
      });
    }
  };

  Submit() {
    if (this.state.newPassword === this.state.conPassword) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          new_password: this.state.newPassword,
        }),
      };

      fetch(
        process.env.REACT_APP_API_URL+"Smartcity/ResetPassword",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            APIResponse: data,
          });
          if (this.state.APIResponse.message === "Password Set Successful") {
            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("phoneNumber");
            this.props.history.push("/");
          }else if (this.state.APIResponse.message.new_password === "new_password should be at least 8 characters") {
            toast.warn("Password does not satisfies all conditions.", {
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
            toast.warn("Password was not able to set, please try again.", {
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
          // Code to handle navigation
        });
      // API call
    } else {
      toast.warn("Password do not match", {
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
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          className="toaster-style"
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

        <Container>
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
              <label>Reset Password</label>
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
                  <img src={passwordwindow} class="page-img-style" alt="Logo" />
                </Grid>
              </Grid>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-4 pb-2">
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <LockOutlinedIcon className="login-icon-color" />
                </Grid>
                <Grid item className="login-password-field-width-style">
                  <Tooltip
                    // title="Password should contain at least 1 captial alphabet, 1 small alphabet, 1 numeric, 1 special symbol and minimum length 8 charecter"
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
                    // arrow
                    className="tooltip-style"
                  >
                    <div>
                      {!this.state.newPasswordVisible && (
                        <TextField
                          type="password"
                          id="input-with-icon-grid2"
                          label="New Password"
                          minlength="6"
                          maxLength="15"
                          required
                          value={this.state.newPassword}
                          onChange={this.newPasswordValidate_SAT}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" className="p-0">
                                <IconButton>
                                  <VisibilityOffIcon
                                    className="login-icon-color"
                                    onClick={this.newPasswordVisible}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      {this.state.newPasswordVisible && (
                        <TextField
                          type="text"
                          id="input-with-icon-grid2"
                          label="New Password"
                          minlength="6"
                          maxLength="15"
                          required
                          value={this.state.newPassword}
                          onChange={this.newPasswordValidate_SAT}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" className="p-0">
                                <IconButton>
                                  <VisibilityIcon
                                    className="login-icon-color"
                                    onClick={this.newPasswordVisible}
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
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-4 pb-2">
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <LockOutlinedIcon className="login-icon-color" />
                </Grid>
                <Grid item className="login-password-field-width-style">
                  <Tooltip
                    // title="Password should contain at least 1 captial alphabet, 1 small alphabet, 1 numeric, 1 special symbol and minimum length 8 charecter"
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
                    // arrow
                    className="tooltip-style"
                  >
                    <div>
                      {!this.state.confirmPasswordVisible && (
                        <TextField
                          type="password"
                          id="input-with-icon-grid3"
                          label="Confirm Password"
                          value=""
                          minlength="6"
                          maxLength="15"
                          required
                          value={this.state.conPassword}
                          onChange={this.conPasswordValidate_SAT}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" className="p-0">
                                <IconButton>
                                  <VisibilityOffIcon
                                    className="login-icon-color"
                                    onClick={this.confirmPasswordVisible}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      {this.state.confirmPasswordVisible && (
                        <TextField
                          type="text"
                          id="input-with-icon-grid3"
                          label="Confirm Password"
                          value=""
                          minlength="6"
                          maxLength="15"
                          required
                          value={this.state.conPassword}
                          onChange={this.conPasswordValidate_SAT}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" className="p-0">
                                <IconButton>
                                  <VisibilityIcon
                                    className="login-icon-color"
                                    onClick={this.confirmPasswordVisible}
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
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-3 pb-3">
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
              <Button className="signup-button-style" onClick={this.Submit}>
                Reset Password
              </Button>
            </Col>
            <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
          </Row>

          <Row className="pt-3 pb-5">
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
      </div>
    );
  }
}

export default ResetPassword;

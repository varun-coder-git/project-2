import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Grid from "@material-ui/core/Grid";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TextField from "@material-ui/core/TextField";
import LoginHeadings from "../../jsonFiles/UserInfoJson/userLogin";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import ChangePassowrdBannerImg from "../../assets/passwordwindow.png";
import "./Profile-changePassword.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";

class ProfileChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      oldPasswordValidate_SAT: false,
      newPassword: "",
      newPasswordValidate_SAT: false,
      conPassword: "",
      conPasswordValidate_SAT: false,
      oldPasswordVisible: false,
      newPasswordVisible: false,
      confirmPasswordVisible: false,
    };
    this.oldPasswordValidate_SAT = this.oldPasswordValidate_SAT.bind(this);
    this.newPasswordValidate_SAT = this.newPasswordValidate_SAT.bind(this);
    this.conPasswordValidate_SAT = this.conPasswordValidate_SAT.bind(this);
    this.Submit = this.Submit.bind(this);
    this.oldPasswordVisible = this.oldPasswordVisible.bind(this);
    this.newPasswordVisible = this.newPasswordVisible.bind(this);
    this.confirmPasswordVisible = this.confirmPasswordVisible.bind(this);
  }

  oldPasswordVisible = (e) => {
    if (this.state.oldPasswordVisible == false) {
      this.setState({
        oldPasswordVisible: true,
      });
    } else {
      this.setState({
        oldPasswordVisible: false,
      });
    }
  };

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

  oldPasswordValidate_SAT = (e) => {
    var oldPassword = e.target.value;
    if (oldPassword != null || oldPassword !== "") {
      this.setState({
        oldPasswordValidate_SAT: true,
        oldPassword: oldPassword,
      });
    } else {
      this.setState({
        oldPasswordValidate_SAT: false,
        oldPassword: oldPassword,
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
    if(this.state.newPassword!="" && this.state.oldPassword!="" && this.state.conPassword!="" ){
    if (this.state.newPassword === this.state.conPassword) {
      if (this.state.newPassword != this.state.oldPassword) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            token: sessionStorage.getItem("token"),
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
          }),
        };

        fetch(
          process.env.REACT_APP_API_URL+"Smartcity/ChangePassword",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              APIResponse: data,
            });
            if (
              this.state.APIResponse.message === "Password Set Successful"
            ) {
              sessionStorage.clear();
              toast.success("Password Changed Successfully", {
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
            } else if (
              this.state.APIResponse.message === "Old Password doesn't match"
            ) {
              toast.warn("Enter correct old password.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }else if (this.state.newPassword=="" || this.state.oldPassword=="" || this.state.conPassword=="" ) {
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
              toast.error("Password does not satisfies all conditions", {
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
      } else if (this.state.oldPassword == "" && this.state.newPassword == "") {
        toast.error("Password fields are empty.", {
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
        toast.error("New Password and Old Password should not be same", {
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
      toast.error("New Password and Confirm Password does not match", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }}else{
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

  render() {
    return (
      <div>
        <Container className="pt-4">
          <Row className="top-margin">
            <Col xs lg="3"></Col>
            <Col className="profileimage" md="auto" lg="6">
              <img
                src={ChangePassowrdBannerImg}
                class="round-changePassowrd-img"
                alt=""
              />
            </Col>
            <Col xs lg="3"></Col>
          </Row>
        </Container>

        <Container className="">
          <Container>
          <TextField type="password" id="fakePass" name="fake" style={{display:'none'}}></TextField>
            <Row>
              <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
                      // arrow
                      className="tooltip-style"
                    >
                      <div>
                        {!this.state.oldPasswordVisible && (
                          <TextField
                            type="password"
                            id="input-with-icon-grid1"
                            label="Old Password"
                            minlength="6"
                            maxLength="15"
                            required
                            value={this.state.oldPassword}
                            onChange={this.oldPasswordValidate_SAT}
                            autocomplete="new-password"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" className="p-0">
                                  <IconButton>
                                    <VisibilityOffIcon
                                      className="login-icon-color"
                                      onClick={this.oldPasswordVisible}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                        {this.state.oldPasswordVisible && (
                          <TextField
                            type="text"
                            id="input-with-icon-grid1"
                            label="Old Password"
                            minlength="6"
                            maxLength="15"
                            required
                            value={this.state.oldPassword}
                            onChange={this.oldPasswordValidate_SAT}
                            autocomplete="new-password"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" className="p-0">
                                  <IconButton>
                                    <VisibilityIcon
                                      className="login-icon-color"
                                      onClick={this.oldPasswordVisible}
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
          </Container>
          <Container>
            <Row>
              <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
          </Container>
          <Container>
            <Row>
              <Col xs="0" sm="0" md="0" lg="3" xl="3" xxl="3"></Col>
              <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
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
          </Container>

          <Container className="pt-5">
            <Row >
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="2"></Col>
              <Col
                xs="6"
                sm="6"
                md="6"
                lg="4"
                xl="4"
                xxl="4"
                className="signup-text-message-style"
              >
                <Button className="signup-button-style" onClick={this.Submit}>
                  {LoginHeadings.Profile_SUBMIT_HMD}
                </Button>
              </Col>
              <Col
                xs="6"
                sm="6"
                md="6"
                lg="4"
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
              <Col xs="0" sm="0" md="0" lg="2" xl="2" xxl="2"></Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default withRouter(ProfileChangePassword);

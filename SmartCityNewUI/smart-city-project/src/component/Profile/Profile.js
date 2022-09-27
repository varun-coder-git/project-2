import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import "./Profile.css";
import MyProfile from "../Profile-myProfile";
import ChangePassword from "../Profile-changePassword";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { MDBIcon } from "mdbreact";
import { withRouter } from 'react-router-dom';
import HeaderLogo from "../../assets/HeaderLogo.png";
import BlockUI from "../BlockUI/BlockUI";
class Profile extends Component {
  constructor(props) {
  super(props);
  this.state = {
    Blocking:false,
  }
  if(sessionStorage.getItem("login_type") === "google" || sessionStorage.getItem("login_type") === "facebook"){
       this.state = {
        changePasswordDisabled:true
      } 
     }else{
       this.state = {
        changePasswordDisabled:false
      }  
     }
     this.handler = this.handler.bind(this);
   } ;
       
   handler(){
     if(this.state.Blocking==true){
       this.setState({
         Blocking:false
       });
     }else{
      this.setState({
        Blocking:true
      });
     }
   }
     
  render() {

    return <div>

      <Container fluid className="header-style">
          <Row className="forget-password-header-height-style_SAT">
            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="header-title-style_SAT">
              <img className="forgetheader-profile-image-style" src={HeaderLogo} alt="" />
            </Col>
          </Row>
        </Container>
        <Container className="profile-header-space"></Container>
        <Row className="pb-5 pageImage-style">
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="2"></Col>
          <Col xs="12" sm="12" md="10" lg="10" xl="8" xxl="8" className="bg-container-style-opacity-cards-screen">
            <Tabs defaultActiveKey="MyProfile" id="Profile-tab" className="pt-1">
              <Tab eventKey="MyProfile"  title={<span><MDBIcon icon="address-book" className="profile-tabs-icon-style" /> Profile Information </span>} tabClassName="my-profile-tab-style pt-0 pr-0 pl-0 ">
                <MyProfile handler={this.handler} />
              </Tab>
              <Tab eventKey="ChangePassword"  disabled={this.state.changePasswordDisabled} title={<span><MDBIcon icon="user-lock" className="profile-tabs-icon-style" /> Change Password </span>} tabClassName="my-profile-tab-style pt-0 pr-0 pl-0">
                <ChangePassword />
              </Tab>
            </Tabs>
            <Row className="pt-5 pb-5"/>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="2"></Col>
        </Row>
        <Row className="pb-3"></Row>
        <Footer {...this.props} ></Footer>
      <BlockUI blocking={this.state.Blocking} />
    </div>
  }
}

export default withRouter(Profile);

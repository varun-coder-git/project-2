import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import DashboardHeadings from '../../../jsonFiles/DashboardInfoJson/dashboardInfo';
import "./Sos-Component.css";
import Button from '@material-ui/core/Button';
import Footer from "../../Footer";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Linking, Platform } from 'react-native';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CallIcon from '@material-ui/icons/Call';
import ContactsIcon from '@material-ui/icons/Contacts';
import { MDBIcon } from "../../../../node_modules/mdbreact";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import MenuIcon from '@material-ui/icons/Menu';
import footer_data from '../../../jsonFiles/DashboardInfoJson/DashboardFooter';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import headerProfile_img from '../../../assets/defaultprofile.png';
import { ToastContainer, toast } from 'react-toastify';


class SosComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      submit:"",
       isClicked : false,
       addDialogStatus: false,
       isOpen: false,
      submit: false,
      logoutDialogStatus: false,
      logStatus:false,
      isMenuOpen : false,
      eventTarget : '',
      footer: footer_data.paths
    }
    this.openDialScreen = this.openDialScreen.bind(this);
    this.logout = this.logout.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
  }

  componentDidMount() {
    document.body.style = 'background-image: url();';
  document.body.style = 'background: #F9F9F9';
  document.querySelector('body').scrollTo(0,0)
  }

   openDialScreen = (callNo) => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${callNo}`;
    } else {
      number = `tel:${callNo}`;
    }
    Linking.openURL(number);
  };

  onAddClick = () => {

    if(sessionStorage.getItem("user_id") != undefined || sessionStorage.getItem("user_id") != null) {
      this.setState({
        submit: true,
        addDialogStatus: true
      });
    }
    else {
      this.setState({
        submit: false,
        addDialogStatus: false
      });
    }
  }

  addDialogClose = () => {
    this.setState({
      addDialogStatus: false

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

  logout = () => {

    if(sessionStorage.getItem("user_id") != undefined || sessionStorage.getItem("user_id") != null) {
      this.setState({
        submit: true,
        logoutDialogStatus: true
      });
    }
    else {
      this.setState({
        submit: false,
        logoutDialogStatus: false
      });
    }
  }

  logoutDialogClose = () => {
    this.setState({
      logoutDialogStatus: false
    });
  }
  okHomePage =()=> {
      sessionStorage.clear();
      this.props.history.push("/");    
    }

    
    openMenu = (e) => {   
      this.setState({
        isMenuOpen: true,
        eventTarget : e.currentTarget
      });
    }

    menuClose = () => {
      this.setState({
        isMenuOpen: false
      });
    }




  render() {
    return ( 
      <div >
              <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
        
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
                <Link to = "/dashboard-citizenServices">
                  <Tooltip title="Nearby" placement="top" TransitionProps={{ timeout: 600 }}>
                    <MDBIcon icon="chevron-circle-left" size="2x" className="back-arrow-icon"/>
                  </Tooltip>
                </Link>
            </Col>

            <Col xs="8" sm="8" md="8" lg="8" xl="8" xxl="8" className="header-title-style_SAT">
              <label class="header-heading-label-style">Emergency Services</label>
            </Col>

            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2" className="pl-0 profile-image-align-style">
            <Dropdown menuAlign="right" className="dropdown-profile-icon-style">
                <Dropdown.Toggle variant="info">
                <div>
                {
                  sessionStorage.getItem("login_type") === "google" &&
                  <div>
                     {
                        (sessionStorage.getItem("yourProfileImage")) &&
                      <img className="header-profile-image-style" src={sessionStorage.getItem("yourProfileImage")} alt="" />
                      }
                      {
                        (!(sessionStorage.getItem("yourProfileImage"))) &&
                      <img className="header-profile-image-style" src={headerProfile_img} alt="" />
                      }
                    </div>
                }
                </div>
                <div>
                {
                  sessionStorage.getItem("login_type") === "manual" &&
                  <div>
                     {
                        (sessionStorage.getItem("yourProfileImage")) &&
                      <img className="header-profile-image-style" src={sessionStorage.getItem("yourProfileImage")} alt="" />
                      }
                      {
                        (!(sessionStorage.getItem("yourProfileImage"))) &&
                      <img className="header-profile-image-style" src={headerProfile_img} alt="" />
                      }
                    </div>
                }
                </div>
                
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <div onClick={this.openProfileSettings}>
                <PersonOutlineOutlinedIcon className="dropdown-icon-style"/>
                <label class="dropdown-font-style">Profile Settings</label>
                </div>
              </Dropdown.Item>   
              {
                (!((sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined))) &&
                <Dropdown.Item onClick={this.logout}>
              
                <ExitToAppRoundedIcon className="dropdown-icon-style"/>
                <label class="dropdown-font-style">Logout</label>
      
                </Dropdown.Item>
              }
              {
                ((sessionStorage.getItem("user_id") == null || sessionStorage.getItem("user_id") == undefined)) &&
                <Dropdown.Item onClick={this.login}>
              
                <ExitToAppRoundedIcon className="dropdown-icon-style"/>
                <label class="dropdown-font-style">Login</label>
      
                </Dropdown.Item>
              }
              {
                      (this.state.submit) &&
                      <Dialog open={this.state.logoutDialogStatus} onClose={this.logoutDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="simple-dialog-title">Are you sure you want to Logout?
                         <DialogActions>
                        <Button onClick={this.okHomePage} color="primary">
                          Yes
                        </Button>
                        <Button onClick={this.logoutDialogClose} color="primary" autoFocus>
                          No
                        </Button>
                      </DialogActions> 
                      </DialogTitle>
                      </Dialog>
                    }
            </Dropdown.Menu>
          </Dropdown>
            </Col>

          </Row>
        </Container>

   <Container className="pt-5">
   <Row className="pb-5 pageImage-style">
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="3"></Col>
          <Col xs="12" sm="12" md="10" lg="10" xl="8" xxl="6" className="bg-container-style-opacity">
   <div class="pt-3 inner-container-style-collaboration">
            <Row className="mt-3 ml-3 mr-3">
              <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="Emergency-banners banner-submenu-style">
                <Row>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6"></Col>
                  <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <Row className="pl-3 collaboration-emergency-banner-text3">Tap to contact the desired emergency service.</Row>
                    <Row className="start-new-idea-btn-allignment"> 
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            </div>
        <div className="pl-3 pr-3 pb-3">
               <Row className="pt-0">
          <Col  xs="6" sm="6" md="6" lg="6" xl="6" className="p-2">
          <Card id="108" className="cardAbulance-style colorWhite pb-2 pt-1" onClick={() => this.openDialScreen(108)} >
          <Card.Title className="cardStatusNamestyle colorWhite textalignCenter">
          108
          </Card.Title>
          
          <Card.Subtitle >
            <Row className="cardNumberValueStyle textalignCenter">
            <Col  xs="12" sm="12" md="12" lg="12" xl="12" className="labelFontSize" >
            Ambulance
            </Col>
            </Row>
          </Card.Subtitle>
        </Card>
          </Col> 


          <Col  xs="6" sm="6" md="6" lg="6" xl="6" className="p-2">
          <Card className="cardFire-style colorWhite pb-2 pt-1"  onClick={() => this.openDialScreen(101)} >
          <Card.Title className="cardStatusNamestyle colorWhite textalignCenter">
         101
          </Card.Title>
          
          <Card.Subtitle >
            <Row className="cardNumberValueStyle textalignCenter">
            <Col  xs="12" sm="12" md="12" lg="12" xl="12" className="labelFontSize">
            Fire Brigade
            </Col>
            </Row>
          </Card.Subtitle>
        </Card>
          </Col>
     
                  <Col  xs="6" sm="6" md="6" lg="6" xl="6" className="p-2">
          <Card className="cardPolice-style colorWhite pb-2 pt-1" onClick={() => this.openDialScreen(100)}>
          <Card.Title className="cardStatusNamestyle colorWhite textalignCenter">
          100
          </Card.Title>
          
          <Card.Subtitle >
            <Row className="cardNumberValueStyle textalignCenter">
            <Col  xs="12" sm="12" md="12" lg="12" xl="12" className="labelFontSize">
            Police
            </Col>
            </Row>
          </Card.Subtitle>
        </Card>
          </Col> 


          <Col  xs="6" sm="6" md="6" lg="6" xl="6" className="p-2">
          <Card className="cardWomen-style colorWhite pb-2 pt-1" onClick={() => this.openDialScreen(1091)}>
          <Card.Title className="cardStatusNamestyle colorWhite textalignCenter">
          1091
          </Card.Title>
          
          <Card.Subtitle >
            <Row className="cardNumberValueStyle textalignCenter">
            <Col  xs="12" sm="12" md="12" lg="12" xl="12" className="labelFontSize">
            Women Helpline
            </Col>
            </Row>
          </Card.Subtitle>
        </Card>
          </Col>
          </Row>  

                    <Row className="pt-0">
          <Col  xs="6" sm="6" md="6" lg="6" xl="6" className="p-2" onClick={() => this.openDialScreen(1098)}>
          <Card className="cardChild-style colorWhite pb-2 pt-1">
          <Card.Title className="cardStatusNamestyle colorWhite textalignCenter">
          1098
          </Card.Title>
          
          <Card.Subtitle >
            <Row className="cardNumberValueStyle textalignCenter">
            <Col  xs="12" sm="12" md="12" lg="12" xl="12" className="labelFontSize">
            Child Helpline
            </Col>
            </Row>
          </Card.Subtitle>
        </Card>
          </Col> 


          <Col  xs="6" sm="6" md="6" lg="6" xl="6" className="p-2">
          <Card className="cardSenior-style colorWhite pb-2 pt-1" onClick={() => this.openDialScreen(14567)}>
          <Card.Title className="cardStatusNamestyle colorWhite textalignCenter">
          14567
          </Card.Title>
          
          <Card.Subtitle >
            <Row className="cardNumberValueStyle textalignCenter">
            <Col  xs="12" sm="12" md="12" lg="12" xl="12" className="labelFontSize">
            Senior Citizens
            </Col>
            </Row>
          </Card.Subtitle>
        </Card>
          </Col>
     
                  <Col  xs="6" sm="6" md="6" lg="6" xl="6" className="p-2" onClick={() => this.openDialScreen(1962)}>
          <Card className="cardAnimal-style colorWhite pb-2 pt-1">
          <Card.Title className="cardStatusNamestyle colorWhite textalignCenter">
          1962
          </Card.Title>
          
          <Card.Subtitle >
            <Row className="cardNumberValueStyle textalignCenter">
            <Col  xs="12" sm="12" md="12" lg="12" xl="12" className="labelFontSize">
            Animal Helpline
            </Col>
            </Row>
          </Card.Subtitle>
        </Card>
          </Col> 
          </Row>  
          </div>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" xl="2" xxl="3"></Col>
        </Row>
     </Container>
     <Row className="pt-5 pb-5"></Row>
          <Footer />
      </div>
      );
  }
}

export default SosComponent;

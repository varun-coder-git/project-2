import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import DashboardHeadings from '../../jsonFiles/DashboardInfoJson/dashboardInfo';
import CollaborationHeadings from "../../jsonFiles/CollaborationTabInfoJson/collaborationtabinfo";
import './Dashboard-middleMainMenu.css';
import {Link} from 'react-router-dom';
import Carousel from "react-bootstrap/Carousel";


class DashboardMiddleMainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashIcons: DashboardHeadings.DashIcons,
      NewsJson:CollaborationHeadings.BreakingNews.NewsdashboardJson,
      APIResponse: "",
      breaking_state:true,
      carousalActiveIndex:0
    }
  }

  componentDidUpdate() {
    window.scrollTo(90, 0);
  }


  componentDidMount() {
    document.body.style = 'background: #d6e2e6';
    window.scrollTo(90, 0);
    this.getBreakingNewsList();
  }
  handleSelect = (selectedIndex, e) => {
   this.setState({
     carousalActiveIndex:selectedIndex
   });
  };

 getBreakingNewsList() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      process.env.REACT_APP_API_URL+"News/BreakingNews" ,requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        for(var newsrecord in data.data){
          if(data.data[newsrecord].image_path==" " || data.data[newsrecord].image_path=="" || data.data[newsrecord].image_path==null){
          data.data[newsrecord].image_path=CollaborationHeadings.BreakingNews.BreakingNewsDefaultImage;
          }else{
          data.data[newsrecord].image_path=process.env.REACT_APP_API_URL+data.data[newsrecord].image_path;
          }
        }
        if (this.state.APIResponse.status === true) {
          this.setState({
             NewsJson:data.data
           })
        }
      });
    }

  render() {
    return (
      <Container fluid className="dashboard-main-div-curve pageImage-style">
      <div class="inner-container-style">
      <Row >
        <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="2"></Col>
        <Col xs="12" sm="12" md="10" lg="10" xl="10" xxl="8" className="bg-container-style-opacity">
          <Row className="dashboard-tytle-allign-style_SAT ">
            
            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="pt-4 dashboard-title-style_SAT">
              <label>{DashboardHeadings.Dashboard_MIDDLE_HEADING_SAT}</label>
            </Col>
            
          </Row>
          <Row className="pb-5"> 
          <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="pl-6" style={{paddingLeft:'10%',paddingRight:'10%'}}>
         
          <Carousel activeIndex={this.state.carousalActiveIndex} onSelect={this.handleSelect}>
          {this.state.NewsJson.map((newsAttachment) =>{
            if(newsAttachment.uploaded_on==""){
              return(<Carousel.Item>
                <Link to ="/NewsList">
               <div className="caption">
                <Row>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" style={{textAlign:'center'}}>
                 <label className="read_more_default_dashboard_style news-banner-top-padding">Click here for News Section..</label>
                </Col>
                </Row>
               </div>
               </Link>
               <div class="backgroud-image-div-breaking"></div>
             </Carousel.Item>)
            }else if(newsAttachment.uploaded_on!="" && newsAttachment.image_path!=CollaborationHeadings.BreakingNews.BreakingNewsDefaultImage){
              return(<Carousel.Item>
                <Link to ="/NewsList">
               <div className="caption">
                <Row>
                 <label className="news-title">Uploaded on {newsAttachment.uploaded_on}</label>
                </Row>
                <Row >
                  <label className="news-description">
                  <div className="news-title-body-div-ellipsis">
                  <span className="news-title-body-ellipsis">
                  {newsAttachment.title}
                  </span>
                  </div>
                  </label>
                </Row>
                <Row>
                 <label className="read_more_dashboard_style">Read more..</label>
                </Row>
               </div>
               </Link>
               <div class="backgroud-image-div" style={{backgroundImage:"url('"+newsAttachment.image_path+"')"}}></div>
             </Carousel.Item>)
            }else if(newsAttachment.uploaded_on!="" && newsAttachment.image_path==CollaborationHeadings.BreakingNews.BreakingNewsDefaultImage){
              return(<Carousel.Item>
                <Link to ="/NewsList">
               <div className="caption">
                <Row>
                 <label className="news-title">Uploaded on {newsAttachment.uploaded_on}</label>
                </Row>
                <Row >
                  <label className="news-description">
                  <div className="news-title-body-div-ellipsis">
                  <span className="news-title-body-ellipsis">
                  {newsAttachment.title}
                  </span>
                  </div>
                  </label>
                </Row>
                <Row>
                 <label className="read_more_dashboard_style">Read more..</label>
                </Row>
               </div>
               </Link>
               <div class="backgroud-image-div-default"></div>
             </Carousel.Item>)
            }
           })}
        </Carousel>
        
        </Col>
          </Row>
          <Row className="pb-2 large-screen-padding">
          <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="2"></Col>
          <Col xs="6" sm="6" md="6" lg="6" xl="5" xxl="4" className="card-left">
            <Link to = {this.state.dashIcons.Cards[0].NavigateTo}>
            <Card className="dashboard-card">
              <Card.Body className="text-align">
                  <Card.Img className="dasboardImageStyle" variant="top" src={this.state.dashIcons.Cards[0].Image} />
                  <Card.Title className="cardIconsTitle">{this.state.dashIcons.Cards[0].Title}</Card.Title>
                </Card.Body>
              </Card>
              </Link>
            </Col>
            <Col xs="6" sm="6" md="6" lg="6" xl="5" xxl="4" className="card-right">
            <Link to = {this.state.dashIcons.Cards[1].NavigateTo}>
            <Card className="dashboard-card">
            <Card.Body className="text-align">
                  <Card.Img className="dasboardImageStyle" variant="top" src={this.state.dashIcons.Cards[1].Image} />
                  <Card.Title className="cardIconsTitle">{this.state.dashIcons.Cards[1].Title}</Card.Title>
                </Card.Body>
              </Card>
              </Link>
            </Col>
            <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="2"></Col>
          </Row> 

          <Row className="pt-3 pb-2 large-screen-padding">
         <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="2"></Col>
          <Col xs="6" sm="6" md="6" lg="6" xl="5" xxl="4" className="card-left" >
            <Link to = {this.state.dashIcons.Cards[2].NavigateTo}>
            <Card className="dashboard-card">
            <Card.Body className="text-align" >
                  <Card.Img className="dasboardImageStyle" variant="top" src={this.state.dashIcons.Cards[2].Image} />
                  <Card.Title className="cardIconsTitle card-citizen-align">{this.state.dashIcons.Cards[2].Title}</Card.Title>
                </Card.Body >
              </Card>
              </Link>
            </Col>
            <Col xs="6" sm="6" md="6" lg="6" xl="5" xxl="4" className="card-right">
            <Link to = {this.state.dashIcons.Cards[3].NavigateTo}>
            <Card className="dashboard-card">
            <Card.Body className="text-align">
                  <Card.Img className="dasboardImageStyle" variant="top" src={this.state.dashIcons.Cards[3].Image} />
                  <Card.Title className="cardIconsTitle">{this.state.dashIcons.Cards[3].Title}</Card.Title>
                </Card.Body>
              </Card>
              </Link>
            </Col>
            <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="2"></Col>
          </Row>

          <Row className="pt-3 pb-2 large-screen-padding">
         <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="2"></Col>
         <Col xs="6" sm="6" md="6" lg="6" xl="5" xxl="4" className="card-left" >
          <Link to = {this.state.dashIcons.Cards[4].NavigateTo}>
          <Card className="dashboard-card">
          <Card.Body className="text-align" >
                <Card.Img className="dasboardImageStyle" variant="top" src={this.state.dashIcons.Cards[4].Image} />
                <Card.Title className="cardIconsTitle card-citizen-align">{this.state.dashIcons.Cards[4].Title}</Card.Title>
              </Card.Body >
            </Card>
            </Link>
          </Col>
          <Col xs="6" sm="6" md="6" lg="6" xl="5" xxl="4" className="card-right">
          <Link to = {this.state.dashIcons.Cards[5].NavigateTo}>
          <Card className="dashboard-card">
          <Card.Body className="text-align">
                <Card.Img className="dasboardImageStyle" variant="top" src={this.state.dashIcons.Cards[5].Image} />
                <Card.Title className="cardIconsTitle">{this.state.dashIcons.Cards[5].Title}</Card.Title>
              </Card.Body>
            </Card>
            </Link>
          </Col>
            <Col xs="0" sm="0" md="0" lg="0" xl="1" xxl="2"></Col>
          </Row>
          <Row className="sm-md-xs-padding"></Row>
      

        </Col>
        <Col xs="0" sm="0" md="1" lg="1" xl="1" xxl="2"></Col>
      </Row>
      

      </div>
      </Container>
    );;
  }
}

export default DashboardMiddleMainMenu;

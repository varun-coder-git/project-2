import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CollaborationsHeadings from "../../../jsonFiles/CollaborationJson/collaborationDetails";
import { MDBIcon } from "../../../../node_modules/mdbreact";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinesEllipsis from "react-lines-ellipsis";

class CollaborationPSMostDiscussed extends Component {
  constructor(props) {
    super(props);
    this.Refforcard = React.createRef();
    this.state = {
      pollsBinding: CollaborationsHeadings.loadingPollsCard,
      APIResponse: "",
      cardCounts: sessionStorage.getItem("MdPollsCardCount")?parseInt(sessionStorage.getItem("MdPollsCardCount")):4,
      count: 0,
      totalDiscussedCardCount:0
    };
    this.LoadMore_SAT = this.LoadMore_SAT.bind(this);
  
  }

  componentDidMount() {
    this.getAllPolls();
    if(sessionStorage.getItem("MdPollsCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  }
  componentDidUpdate(){
    if(sessionStorage.getItem("MdPollsCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  }
  getAllPolls() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        offset: this.state.cardCounts,
      }),
    };
    fetch(process.env.REACT_APP_API_URL+"Poll/MostDiscussed", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.status === true) {
          var JsonDate = this.state.APIResponse.data;
          this.setState({
            pollsBinding: JsonDate,
            totalDiscussedCardCount:this.state.APIResponse.total_rows
          });
        }else{
          this.setState({
            pollsBinding: CollaborationsHeadings.PollsCard
          });
        }
      });
  }

  CardDetails = (CardValues) => {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login to Vote", {
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
      sessionStorage.setItem("admin_id", CardValues.admin_id);
      sessionStorage.setItem("poll_id", CardValues.poll_id);
      sessionStorage.setItem("poll_options_id", CardValues.poll_options_id);
      sessionStorage.setItem("pollDetailBack", "collaboration-pollsSurveys");
      sessionStorage.setItem("MdPollsCardCount",this.state.cardCounts);
      this.props.history.push("/collaboration-pollsSurveysDetails");
    }
  };

  LoadMore_SAT() {
    sessionStorage.removeItem("MdPollsCardCount");
    if (this.state.cardCounts <= 100) {
      var currentCount = this.state.cardCounts + 4;
      this.state.cardCounts = currentCount;
      this.getAllPolls();
    }
  }

  render() {
    return (
      <Container className="tab-card-container-style">
        <Row>
        <div ref={this.Refforcard}></div>
          {this.state.pollsBinding.map((CardValues, index) => (
            <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6" className="">
              <Card className="tab-card-style" ref={(sessionStorage.getItem("poll_id")==CardValues.poll_id) ? this.Refforcard:""}>
                <div class="card-top-border"></div>
                <Row className="pt-3">
                  <Col
                    xs="10"
                    sm="10"
                    md="10"
                    lg="10"
                    xl="10"
                    xxl="10"
                    className="pl-4"
                  >
                    <Card.Title
                      id="rcorners1"
                      className="tab-card-heading-style"
                    >
                      {CardValues.poll_category_name}
                    </Card.Title>
                  </Col>
                  <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2"></Col>
                </Row>

                <Card.Subtitle className="">
                  <Row className="tab-card-subject-style">
                    <Col className="p-0">
                      <div className="tab-title-div-ellipsis">
                        <span className="tab-title-ellipsis">
                          {CardValues.poll_subject}
                      </span>
                     </div>
                    </Col>
                  </Row>
                </Card.Subtitle>
                <Card.Body className="p-0">
                  <Card.Text className="tab-card-body-style mb-2">
                    <Row>
                      <Col
                        Col
                        xs="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        className=""
                      >
                        <span className="pollDates pr-2">Start Date :</span>
                        <span>{CardValues.d_start_date}</span>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        Col
                        xs="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        className=""
                      >
                        <span className="pollDates pr-2">
                          End Date &nbsp;&nbsp;:
                        </span>
                        <span>{CardValues.d_end_date}</span>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        Col
                        xs="4"
                        sm="4"
                        md="4"
                        lg="4"
                        xl="4"
                        className=" pr-0 pt-4"
                      >
                        <p className="card-comments-style">
                          <label id="rcorners-comment-count">
                            {CardValues.votes}{" "}
                            <span class="comments-count-style">Votes</span>
                          </label>
                        </p>
                      </Col>
                      <Col
                        Col
                        xs="8"
                        sm="8"
                        md="8"
                        lg="8"
                        xl="8"
                        className=""
                      ></Col>
                    </Row>
                  </Card.Text>
                  <Card.Text>
                    <Row className="pt-3 card-footer__events">
                      <Col
                        xs="3"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                        className="card-profile-image-col-style"
                      >
                        <img
                          src={
                            process.env.REACT_APP_API_URL+
                            CardValues.cardProfileImage
                          }
                          alt=""
                          class="card-profile-image-style"
                        />
                      </Col>
                      <Col
                        xs="5"
                        sm="5"
                        md="5"
                        lg="5"
                        xl="5"
                        className="card-image-imfo-style pr-0"
                      >
                        <Row className="card-image-profile-name-style">
                          <label>{CardValues.full_name}</label>
                        </Row>
                      </Col>
                      <Col
                        xs="4"
                        sm="4"
                        md="4"
                        lg="4"
                        xl="4"
                        className="p-0 card-icon-alignment"
                      >
                        <div>
                          <span class="">
                            <MDBIcon
                              far
                              icon="eye"
                              size="sm"
                              className="card-icon-style"
                              onClick={() => this.CardDetails(CardValues)}
                            />
                          </span>
                          <span class="pl-2 ">
                            <MDBIcon
                              icon="vote-yea"
                              size="sm"
                              className="card-icon-style"
                              onClick={() => this.CardDetails(CardValues)}
                            />
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="pb-5"></Row>
        <Row>
          <Col xs="0" sm="0" md="2" lg="2" xl="2" xxl="2"></Col>
          <Col xs="12" sm="12" md="8" lg="8" xl="8" xxl="8">
        {((this.state.totalDiscussedCardCount > this.state.cardCounts) && (100 > this.state.cardCounts)) &&
        <Button className="login-button-style" onClick={this.LoadMore_SAT}>
          Load More
        </Button>
        }
        </Col>
        <Col xs="0" sm="0" md="2" lg="2" xl="2" xxl="2"></Col>
        </Row>
        <Row className="pb-5 pt-2"></Row>
      </Container>
    );
  }
}

export default withRouter(CollaborationPSMostDiscussed);

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CollaborationsHeadings from "../../../jsonFiles/CollaborationJson/collaborationVolunteer";
import { MDBIcon } from "../../../../node_modules/mdbreact";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinesEllipsis from "react-lines-ellipsis";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

class CollaborationBAVMostDiscussed extends Component {
  constructor(props) {
    super(props);
    this.Refforcard = React.createRef();
    this.state = {
      shareIcons: CollaborationsHeadings.loadingCards,
      APIResponse: "",
      cardCounts:sessionStorage.getItem("MdbavCardCount")?parseInt(sessionStorage.getItem("MdbavCardCount")):4,
      DeleteSubmit: false,
      DeleteDialogStatus: false,
      deteledID: "",
      totalDiscussedCardCount:0
    };
    this.LoadMore_SAT = this.LoadMore_SAT.bind(this);
    this.Delete = this.Delete.bind(this);
  }

  componentDidMount() {
    this.getAllIdeas();
    if(sessionStorage.getItem("MdbavCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  } componentDidUpdate(){
    if(sessionStorage.getItem("MdbavCardCount"))
    {
    this.Refforcard.current.scrollIntoView();
    }
  }
  getAllIdeas() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        recordId: 1,
        offset: this.state.cardCounts,
        is_admin: false,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Volunteer/MostDiscussed",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        
        if (this.state.APIResponse.status === true) {
          var JsonDate = this.state.APIResponse.data;
           this.setState({
            totalDiscussedCardCount:this.state.APIResponse.total_rows
          });
           for(var cardValues in JsonDate)
          {
              if (JsonDate[cardValues].cardProfileImage.indexOf("http") == -1) {
                JsonDate[cardValues].cardProfileImage=process.env.REACT_APP_API_URL+JsonDate[cardValues].cardProfileImage;
              }
          }
          this.setState({
            shareIcons: JsonDate,
          });
        }else{
          this.setState({
            shareIcons: CollaborationsHeadings.Cards
          });
        }
      });
  }

  DeleteACard = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("token"),
        volunteer_id: this.state.deteledID,
      }),
    };
    fetch(
      process.env.REACT_APP_API_URL+"Volunteer/DeleteVolunteer",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          APIResponse: data,
        });
        if (this.state.APIResponse.status === true) {
          this.DeleteDialogClose();
          this.getAllIdeas();
        }
      });
  };

  CardDetails = (CardID) => {
    if (
      sessionStorage.getItem("user_id") == null ||
      sessionStorage.getItem("user_id") == undefined
    ) {
      toast.warn("Please Login for details and to add comment.", {
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
      sessionStorage.setItem("VolunteerId", CardID.volunteer_id);
      sessionStorage.setItem(
        "volunteerDetailBack",
        "collaboration-becomeAVolunteer"
      );
      sessionStorage.setItem("MdbavCardCount",this.state.cardCounts);
      this.props.history.push("/volunteer-ACardDetails");
    }
  };

  UpdateACard = (CardID) => {
    sessionStorage.setItem("VolunteerId", CardID.volunteer_id);
    this.props.history.push("/CollaborationBAVEditVolunteer");

  };

  LoadMore_SAT() {
    sessionStorage.removeItem("MdbavCardCount");
    if (this.state.cardCounts <= 100) {
      var currentCount = this.state.cardCounts + 4;
      this.state.cardCounts = currentCount;
      this.getAllIdeas();
    }
  }

  Delete = (CardID) => {
    this.setState({
      DeleteSubmit: true,
      DeleteDialogStatus: true,
      deteledID: CardID.volunteer_id,
    });
  };

  DeleteDialogClose = () => {
    this.setState({
      DeleteDialogStatus: false,
    });
  };

  render() {
    return (
      <Container className="tab-card-container-style">
        <Row>
        <div ref={this.Refforcard}></div>
          {this.state.shareIcons.map((CardValues, index) => (
            <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6" className="" ref={(sessionStorage.getItem("VolunteerId")==CardValues.volunteer_id) ? this.Refforcard:""}>
              <Card className="tab-card-style">
                <div class="card-top-border"></div>
                <Row className="pt-3">
                  <Col
                    xs="8"
                    sm="8"
                    md="8"
                    lg="8"
                    xl="8"
                    xxl="8"
                    className="pl-4"
                  >
                    <Card.Title
                      id="rcorners1"
                      className="tab-card-heading-style"
                    >
                      {CardValues.cardType}
                    </Card.Title>
                  </Col>
                  <Col
                    xs="2"
                    sm="2"
                    md="2"
                    lg="2"
                    xl="2"
                    xxl="2"
                    className="editcardvolunterplacing"
                  >
                    {CardValues.cardUserId ==
                      sessionStorage.getItem("user_id") && (
                      <MDBIcon
                        far
                        icon="edit"
                        className="editcardvolunter"
                        size="sm"
                        onClick={() => this.UpdateACard(CardValues)}
                      />
                    )}
                  </Col>
                  <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
                    {CardValues.cardUserId ==
                      sessionStorage.getItem("user_id") && (
                      <div>
                        <MDBIcon
                          icon="trash-alt"
                          size="sm"
                          className="card-icon-style-delete"
                          onClick={() => this.Delete(CardValues)}
                        />
                        {this.state.DeleteSubmit && (
                          <Dialog
                            open={this.state.DeleteDialogStatus}
                            onClose={this.DeleteDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="simple-dialog-title">
                              Are you sure you want to delete post?
                              <DialogActions>
                                <Button
                                  onClick={this.DeleteACard}
                                  color="primary"
                                >
                                  Yes
                                </Button>
                                <Button
                                  onClick={this.DeleteDialogClose}
                                  color="primary"
                                  autoFocus
                                >
                                  No
                                </Button>
                              </DialogActions>
                            </DialogTitle>
                          </Dialog>
                        )}
                      </div>
                    )}
                  </Col>
                </Row>

               <Card.Subtitle className="">
                  <Row className="tab-card-subject-style">
                    <Col className="p-0">
                      <div className="tab-title-div-ellipsis">
                        <span className="tab-title-ellipsis">
                          {CardValues.cardTitle}
                      </span>
                     </div>
                    </Col>
                  </Row>
                </Card.Subtitle>

                <Card.Body className="p-0">
                  <Card.Text className="tab-card-body-style mb-2">
                    <div className="tab-card-body-div-ellipsis">
                      <span className="tab-card-body-ellipsis">
                        {CardValues.cardDescription}
                     </span>
                    </div> 
                  </Card.Text>
                  <Card.Text className="tab-card-body-style">
                    {CardValues.comments === null && (
                      <p className="card-comments-style">
                        <label id="rcorners-comment-count">
                          0 <span class="comments-count-style">Comments</span>
                        </label>
                      </p>
                    )}
                    {CardValues.comments != null && (
                      <p className="card-comments-style">
                        <label id="rcorners-comment-count">
                          {CardValues.comments}{" "}
                          <span class="comments-count-style">Comments</span>
                        </label>
                      </p>
                    )}
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
                          src={CardValues.cardProfileImage}
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
                          <label>{CardValues.cardPostedBy}</label>
                        </Row>
                        <Row className="card-image-imfo-row-style">
                          <label>{CardValues.cardPostedOn}</label>
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
                              icon="reply"
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
            {((this.state.totalDiscussedCardCount > this.state.cardCounts) && (100 > this.state.cardCounts)) && (
              <Button
                className="login-button-style"
                onClick={this.LoadMore_SAT}
              >
                Load More
              </Button>
            )}
          </Col>
          <Col xs="0" sm="0" md="2" lg="2" xl="2" xxl="2"></Col>
        </Row>
        <Row className="pb-5 pt-2"></Row>
      </Container>
    );
  }
}

export default withRouter(CollaborationBAVMostDiscussed);

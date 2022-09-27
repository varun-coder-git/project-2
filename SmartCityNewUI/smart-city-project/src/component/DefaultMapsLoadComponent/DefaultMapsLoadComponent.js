import React, { Component } from "react";
import Header from "../Dashboard-header";
import Container from "react-bootstrap/Container";
import Footer from "../Footer";
import LoadMaps from "../LoadMaps";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import "./DefaultMapsLoadComponent.css";

class DefaultMapsLoadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.backButton = this.backButton.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  backButton() {
    if (
      sessionStorage.getItem("complaintLogBack") != null ||
      sessionStorage.getItem("complaintLogBack") != undefined
    ) {
      sessionStorage.setItem("mapsBack", "log-complaint");
    }
    if (
      sessionStorage.getItem("incidentBack") != null ||
      sessionStorage.getItem("incidentBack") != undefined
    ) {
      sessionStorage.setItem("mapsBack", "reportAnIncident");
    }
    if (
      sessionStorage.getItem("ideasBack") != null ||
      sessionStorage.getItem("ideasBack") != undefined
    ) {
      sessionStorage.setItem("mapsBack", "collaboration-StartANewIdea");
    }
    if (
      sessionStorage.getItem("volunterBack") != null ||
      sessionStorage.getItem("volunterBack") != undefined
    ) {
      sessionStorage.setItem("mapsBack", "collaboration-SubmitAVolunteer");
    }
    if (
      sessionStorage.getItem("volunterEditBack") != null ||
      sessionStorage.getItem("volunterEditBack") != undefined
    ) {
      sessionStorage.setItem("mapsBack", "CollaborationBAVEditVolunteer");
    }
    this.props.history.push("/" + sessionStorage.getItem("mapsBack"));
  }
  Submit() {
    if (
      sessionStorage.getItem("complaintLogBack") != null ||
      sessionStorage.getItem("complaintLogBack") != undefined
    ) {
      if (
        sessionStorage.getItem("compliantTempLocation") != null ||
        sessionStorage.getItem("compliantTempLocation") != undefined
      ) {
        sessionStorage.setItem(
          "compliantLocation",
          sessionStorage.getItem("compliantTempLocation")
        );
        sessionStorage.setItem(
          "complaintlong",
          sessionStorage.getItem("complaintTemplong")
        );
        sessionStorage.setItem(
          "complaintlat",
          sessionStorage.getItem("complaintTemplat")
        );
      } else {
        sessionStorage.setItem(
          "compliantLocation",
          sessionStorage.getItem("currentAddress") 
        );
        sessionStorage.setItem(
          "complaintlong",
          sessionStorage.getItem("currentLongitude")
        );
        sessionStorage.setItem(
          "complaintlat",
          sessionStorage.getItem("currentLatitude")
        );
      }
      sessionStorage.setItem("mapsBack", "log-complaint");
    }
    if (
      sessionStorage.getItem("incidentBack") != null ||
      sessionStorage.getItem("incidentBack") != undefined
    ) {
      if (
        sessionStorage.getItem("incidentTempLocation") != null ||
        sessionStorage.getItem("incidentTempLocation") != undefined
      ) {
        sessionStorage.setItem(
          "incidentLocation",
          sessionStorage.getItem("incidentTempLocation")
        );
        sessionStorage.setItem(
          "incidentlong",
          sessionStorage.getItem("incidentTemplong")
        );
        sessionStorage.setItem(
          "incidentlat",
          sessionStorage.getItem("incidentTemplat")
        );
      } else {
        sessionStorage.setItem(
          "incidentLocation",
          sessionStorage.getItem("currentAddress")
        );
        sessionStorage.setItem(
          "incidentlong",
          sessionStorage.getItem("currentLongitude")
        );
        sessionStorage.setItem(
          "incidentlat",
          sessionStorage.getItem("currentLatitude")
        );
      }
      sessionStorage.setItem("mapsBack", "reportAnIncident");
    }
    if (
      sessionStorage.getItem("ideasBack") != null ||
      sessionStorage.getItem("ideasBack") != undefined
    ) {
      if (
        sessionStorage.getItem("ideasTempLocation") != null ||
        sessionStorage.getItem("ideasTempLocation") != undefined
      ) {
        sessionStorage.setItem(
          "ideasLocation",
          sessionStorage.getItem("ideasTempLocation")
        );
        sessionStorage.setItem(
          "ideaslong",
          sessionStorage.getItem("ideasTemplong")
        );
        sessionStorage.setItem(
          "ideaslat",
          sessionStorage.getItem("ideasTemplat")
        );
      } else {
        sessionStorage.setItem(
          "ideasLocation",
          sessionStorage.getItem("currentAddress")
        );
        sessionStorage.setItem(
          "ideaslong",
          sessionStorage.getItem("currentLongitude")
        );
        sessionStorage.setItem(
          "ideaslat",
          sessionStorage.getItem("currentLatitude")
        );
      }
      sessionStorage.setItem("mapsBack", "collaboration-StartANewIdea");
    }
    if (
      sessionStorage.getItem("volunterBack") != null ||
      sessionStorage.getItem("volunterBack") != undefined
    ) {
      if (
        sessionStorage.getItem("volunterTempLocation") != null ||
        sessionStorage.getItem("volunterTempLocation") != undefined
      ) {
        sessionStorage.setItem(
          "volunterLocation",
          sessionStorage.getItem("volunterTempLocation")
        );
        sessionStorage.setItem(
          "volunterlong",
          sessionStorage.getItem("volunterTemplong")
        );
        sessionStorage.setItem(
          "volunterlat",
          sessionStorage.getItem("volunterTemplat")
        );
      } else {
        sessionStorage.setItem(
          "volunterLocation",
          sessionStorage.getItem("currentAddress")
        );
        sessionStorage.setItem(
          "volunterlong",
          sessionStorage.getItem("currentLongitude")
        );
        sessionStorage.setItem(
          "volunterlat",
          sessionStorage.getItem("currentLatitude")
        );
      }
      sessionStorage.setItem("mapsBack", "collaboration-SubmitAVolunteer");
    }
    if (
      sessionStorage.getItem("volunterEditBack") != null ||
      sessionStorage.getItem("volunterEditBack") != undefined
    ) {
      if (
        sessionStorage.getItem("volunterEditTempLocation") != null ||
        sessionStorage.getItem("volunterEditTempLocation") != undefined
      ) {
        sessionStorage.setItem(
          "volunterEditLocation",
          sessionStorage.getItem("volunterEditTempLocation")
        );
        sessionStorage.setItem(
          "volunterEditlong",
          sessionStorage.getItem("volunterEditTemplong")
        );
        sessionStorage.setItem(
          "volunterEditlat",
          sessionStorage.getItem("volunterEditTemplat")
        );
      } else {
        sessionStorage.setItem(
          "volunterEditLocation",
          sessionStorage.getItem("currentAddress")
        );
        sessionStorage.setItem(
          "volunterEditlong",
          sessionStorage.getItem("currentLongitude")
        );
        sessionStorage.setItem(
          "volunterEditlat",
          sessionStorage.getItem("currentLatitude")
        );
      }
      sessionStorage.setItem("mapsBack", "CollaborationBAVEditVolunteer");
    }
    this.props.history.push("/" + sessionStorage.getItem("mapsBack"));
  }

  render() {
    return (
      <div>
        <Container fluid className="header-style">
          <Row className="header-height-style_SAT">
            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2">
              <Link
                onClick={this.backButton}
                to={sessionStorage.getItem("mapsBack")}
              >
                <MDBIcon
                  icon="chevron-circle-left"
                  size="2x"
                  className="back-arrow-icon"
                />
              </Link>
              {/* </div> */}
            </Col>

            <Col
              xs="8"
              sm="8"
              md="8"
              lg="8"
              xl="8"
              xxl="8"
              className="header-title-style_SAT"
            >
              <label class="header-heading-label-style">Select Location</label>
            </Col>

            <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2" className="pl-0">
              <label onClick={this.Submit} className="Save-Geo">
                Done
              </label>
            </Col>
          </Row>
        </Container>
        <LoadMaps />

        <Footer />
      </div>
    );
  }
}

export default DefaultMapsLoadComponent;

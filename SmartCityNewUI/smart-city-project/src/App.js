import './App.css';
import { Route,HashRouter } from "react-router-dom";
import Login from "./component/Login";
import ForgetPassword from "./component/Forget-password";
import Registration from "./component/Registration";
import VerifyOTP from './component/VerifyOTP';
import Profile from './component/Profile';
import Dashboard from "./component/Dashboard";
import Footer from "./component/Footer";
import CollaborationShareDiscussIdeas from "./component/Collaboration-shareDiscussIdeas";
import CollaborationPollsSurveys from "./component/Polls_Surveys/Collaboration-pollsSurveys";
import DashboardCollaboration from "./component/Dashboard-collaboration";
import CollaborationBecomeAVolunteer from "./component/Collaboration-Volunteer/Collaboration-BecomeAVolunteer";
import CollaborationPSDetails from "./component/Polls_Surveys/CollaborationPSDetails";
import DashboardComplaintManagement from "./component/Dashboard-complaintManagement";
import SoS from "./component/Sos/Sos-Component";
import DashboardCitizenServices from "./component/Dashboard-citizenServices";
import DashboardNearBy from "./component/Dashboard-nearBy";
import SearchComplaint from "./component/Complaint_Management/Search-Complaint";
import MyComplaintStatus from "./component/Complaint_Management/My-Complaint-Status";
import CollaborationSDIStartANewIdea from "./component/Collaboration-sDI-StartANewIdea";
import CollaborationBAVBecomeAVolunteer from "./component/Collaboration-Volunteer/Collaboration-bAV-BecomeAVolunteer";
import CollaborationSDIACardDetails from "./component/Collaboration-sDI-ACardDetails";
import CollaborationBAVACardDetails from "./component/Collaboration-Volunteer/Collaboration-bAV-ACardDetails";
import LogAComplaint from "./component/Complaint_Management/Log-A-Complaint";
import MyComplaints from "./component/Complaint_Management/My-Complaints";
import ComplaintsDetailsByID from "./component/Complaint_Management/Complaints-Details-By-ID";
import DashboardIncidentReport from "./component/Dashboard-IncidentReport";
import ReportAnIncident from "./component/IncidentReport/Report-An-Incident";
import IncidentStatus from "./component/IncidentReport/IncidentStatus";
import SearchIncident from "./component/IncidentReport/SearchIncident";
import MyIncidentList from "./component/IncidentReport/my-Incident-list";
import IncidentDetailsByID from "./component/IncidentReport/Incident-Details-By-ID";
import DefaultMaps from "./component/DefaultMapsLoadComponent";
import NearByInfo from "./component/NearBy/nearBy-info";
import DefaultMapNearby from "./component/NearBy/defaultMapNearby";
import LatestTrends from "./component/Trends/LatestTrends";
import ForgetPasswordVerifyOTP from "./component/forget-password-verifyOTP";
import ResetPassword from "./component/reset-password";
import CollaborationBAVEditVolunteer from "./component/Collaboration-Volunteer/Collaboration-bAV-EditVolunteer";
import ProfileFirstLogin from "./component/Profile-FirstLogin";
import NewsList from "./component/News/NewsList/NewsList.js";
import NewsDetailsByID from "./component/News/News-Details-By-ID/News-Details-By-ID";
function App() {
  return (
    <div>
      <HashRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/forgotPassword" component={ForgetPassword} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/verifyotp" component={VerifyOTP} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/collaboration-shareDiscussIdeas" component={CollaborationShareDiscussIdeas} />
        <Route exact path="/collaboration-pollsSurveys" component={CollaborationPollsSurveys} />
        <Route exact path="/collaboration-pollsSurveysDetails" component={CollaborationPSDetails} />
        <Route exact path="/dashboard-collaboration" component={DashboardCollaboration} />
        <Route exact path="/collaboration-becomeAVolunteer" component={CollaborationBecomeAVolunteer} />
        <Route exact path="/footer" component={Footer} />
        <Route exact path="/emergencyServices" component={SoS} />
        <Route exact path="/dashboard-complaintManagement" component={DashboardComplaintManagement} />
        <Route exact path="/dashboard-citizenServices" component={DashboardCitizenServices} />
        <Route exact path="/dashboard-nearBy" component={DashboardNearBy} />
        <Route exact path="/search-complaint" component={SearchComplaint} />
        <Route exact path="/complaintStatus" component={MyComplaintStatus} />
        <Route exact path="/collaboration-StartANewIdea" component={CollaborationSDIStartANewIdea} />
        <Route exact path="/collaboration-SubmitAVolunteer" component={CollaborationBAVBecomeAVolunteer} />
        <Route exact path="/collaboration-ACardDetails" component={CollaborationSDIACardDetails} />
        <Route exact path="/volunteer-ACardDetails" component={CollaborationBAVACardDetails} />
        <Route exact path="/log-complaint" component={LogAComplaint} />
        <Route exact path="/my-complaints" component={MyComplaints} />
        <Route exact path="/ComplaintsDetailsByID" component={ComplaintsDetailsByID} />
        <Route exact path="/incidentReport" component={DashboardIncidentReport} />
        <Route exact path="/reportAnIncident" component={ReportAnIncident} />
        <Route exact path="/incident-status" component={IncidentStatus} />
        <Route exact path="/search-incident" component={SearchIncident} />
        <Route exact path="/My-incident-list" component={MyIncidentList} />
        <Route exact path="/IncidentDetailsByID" component={IncidentDetailsByID} />
        <Route exact path="/Maps" component={DefaultMaps} />
        <Route exact path="/nearBy-info" component={DefaultMapNearby} />
        <Route exact path="/LatestTrends" component={LatestTrends} />
        <Route exact path="/ForgotPasswordVerifyOTP" component={ForgetPasswordVerifyOTP} />
        <Route exact path="/ResetPassword" component={ResetPassword} />
        <Route exact path="/CollaborationBAVEditVolunteer" component={CollaborationBAVEditVolunteer} />
        <Route exact path="/ProfileFirstLogin" component={ProfileFirstLogin} />
        <Route exact path="/NewsList" component={NewsList} />
        <Route exact path="/NewsDetailsByID" component={NewsDetailsByID} />
      </HashRouter>
    </div>
  );
}

export default App;

import Collaboration from '../../assets/idea2.png';
import Complaint_Management from '../../assets/fileedit2.png';
import Citizen_Services from '../../assets/settins2 (1) (1).png';
import Near_by from '../../assets/map2.png';
import incident_by from '../../assets/incidentReport.png';
import LatestTrend from '../../assets/LatestTrend.png';
import DashboardLogout from '../../assets/Group 1133.png';
import SOSHeaderIcon from '../../assets/pngegg.png';
// import SOSHeaderIcon from '../../assets/pngegg.png';



const dashboardInfo = {
    "Dashboard_HEADING_SAT":"THIRUVANANTHAPURAM CONNECT",
    "Dashboard_MIDDLE_HEADING_SAT":"A single stop solution for all your civic amenities",
    "Dashboard_Header_Image":DashboardLogout,
    "SOS_Icon_Header":SOSHeaderIcon,
    "DashIcons": {
        "Cards": [
            {
                "Title": "Collaboration",
                "Image": Collaboration,
                "NavigateTo": "/dashboard-collaboration"
            },
            {
                "Title": "Complaint Management",
                "Image": Complaint_Management,
                "NavigateTo": "/dashboard-complaintManagement" 
            },
            {
                "Title": "Citizen Services",
                "Image": Citizen_Services,
                "NavigateTo": "/dashboard-citizenServices" 
            },
            {
                "Title": "Nearby",
                "Image": Near_by,
                "NavigateTo": "/dashboard-nearBy" 
            },
            {
                "Title": "Incident Report",
                "Image": incident_by,
                "NavigateTo": "/incidentReport" 
            },
            {
                "Title": "What's Trending",
                "Image": LatestTrend,
                "NavigateTo": "/LatestTrends" 
            }
            ]
        }

};


export default dashboardInfo;
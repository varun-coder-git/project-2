import Collaboration from '../../assets/idea2.png';
import Complaint_Management from '../../assets/fileedit2.png';
import Citizen_Services from '../../assets/settins2 (1) (1).png';
import Incident_Report from '../../assets/incidentReport.png';
import Near_by from '../../assets/map2.png';
import ShareDiscuss from '../../assets/cityappsicon/collaboration/idea.png';
import Poll from '../../assets/cityappsicon/collaboration/poll.png';
import Volunteer from '../../assets/cityappsicon/collaboration/volunteer.png';
import CollabTitleImg from '../../assets/idea3.png';
import LogComplainImg from '../../assets/cityappsicon/complaint/log complain.png';
import ComplainStatusImg from '../../assets/cityappsicon/complaint/complaint status.png';
import SearchComplainImg from '../../assets/cityappsicon/complaint/search complaint.png';

import PropertyTaxImg from '../../assets/cityappsicon/cityzenservices/propertytax.png';
import WaterTaxImg from '../../assets/cityappsicon/cityzenservices/watertax.png';
import BirthRecordImg from '../../assets/cityappsicon/cityzenservices/newborn.png';
import MarriageRecordImg from '../../assets/cityappsicon/cityzenservices/marriage.png';
import DeathRecordImg from '../../assets/cityappsicon/cityzenservices/deathrecord.png';
import SitePlanImg from '../../assets/cityappsicon/cityzenservices/siteplan.png';
import ZoneCertificateImg from '../../assets/cityappsicon/cityzenservices/certificate.png';

// import BloodBankImg from '../../assets/cityappsicon/nearme/bloodbank.png';
import HospitalImg from '../../assets/cityappsicon/nearme/Hospitals.png';
// import PmcofficeImg from '../../assets/cityappsicon/nearme/pmcoffice.png';
import BloodBank from '../../assets/cityappsicon/nearme/Blood_Bank.png';
import PolicestationImg from '../../assets/cityappsicon/nearme/Police_Station.png';
import GasStation from '../../assets/cityappsicon/nearme/Gas_Station.png';
import BinImg from '../../assets/cityappsicon/nearme/Aerobic_Bins.png';
import ToiletImg from '../../assets/cityappsicon/nearme/Public_Toilets.png';
import EmergencyImg from '../../assets/cityappsicon/cityzenservices/emergency.png';
import SmartTrivandrum from '../../assets/cityappsicon/cityzenservices/SmartTrivandrum.png';
import Electricity from '../../assets/cityappsicon/cityzenservices/electricityconnection.png';
import default_dashboard_News from "../../assets/new_home_default.png";
import breaking_news_default from "../../assets/breaking_news_Default.png"


const collabTabInfo = {
    "Dashboard_HEADING_SAT":"THIRUVANANTHAPURAM CONNECT",
    "Collaboration_Title_Image":CollabTitleImg,
    "DashIcons":[
        {
           
            "Image": Collaboration,
            "NavigateTo" : "/dashboard-collaboration"
        },
        {
            
            "Image": Complaint_Management,
            "NavigateTo" : "/dashboard-complaintManagement"
        },
        {
            
            "Image":Citizen_Services,
            "NavigateTo" : "/dashboard-citizenServices"
        },
        {
            
            "Image": Near_by,
            "NavigateTo" : "/dashboard-nearBy"
        },
        {
            
            "Image": Incident_Report,
            "NavigateTo" : "/incidentReport"
        },
        ],
    "CollabIcons": {
        "Cards": [
            {
               
                "Image": ShareDiscuss,
                "Title":"Share & Discuss Idea",
                "NavigateTo" : "/collaboration-shareDiscussIdeas"
            },
            {
                
                "Image": Poll,
                "Title":"Poll/Surveys",
                "NavigateTo":"/collaboration-pollsSurveys"
            },
            {
                
                "Image": Volunteer,
                "Title":"Become a volunteer",
                "NavigateTo" : "/collaboration-becomeAVolunteer"
            }
            ]
        },
        "ComplaintManagemnetIcons": {
            "Cards": [
                {
                   
                    "Image": LogComplainImg,
                    "Title":"Log A Complaint",
                    "NavigateTo" : "/log-complaint"
                },
                {
                    
                    "Image": SearchComplainImg,
                    "Title":"Search Complaint",
                    "NavigateTo":"/search-complaint"
                },
                {
                    
                    "Image": ComplainStatusImg,
                    "Title":"My Complaint Status",
                    "NavigateTo" : "/complaintStatus"
                }
                ]
            },
            "IncidentReportIcons": {
                "Cards": [
                    {
                       
                        "Image": LogComplainImg,
                        "Title":"Report An Incident",
                        "NavigateTo" : "/reportAnIncident"
                    },
                    {
                        
                        "Image": SearchComplainImg,
                        "Title":"Search Incident",
                        "NavigateTo":"/search-incident"
                    },
                    {
                        
                        "Image": ComplainStatusImg,
                        "Title":"My Incident Status",
                        "NavigateTo" : "/incident-status"
                    }
                    ]
                },
            "CitizenServicesIcons": {
                "Cards": [
                    {
                       
                        "Image": PropertyTaxImg,
                        "Title":"Property Tax",
                        "NavigateTo" : ""
                    },
                    {
                        
                        "Image": WaterTaxImg,
                        "Title":"Water Connection",
                        "NavigateTo":""
                    },
                    {
                        
                        "Image": BirthRecordImg,
                        "Title":"Birth Record",
                        "NavigateTo" : ""
                    },
                    {
                        
                        "Image": MarriageRecordImg,
                        "Title":"Marriage Registration",
                        "NavigateTo" : ""
                    },
                    {
                        
                        "Image": DeathRecordImg,
                        "Title":"Death Record",
                        "NavigateTo" : ""
                    },
                    {
                        
                        "Image": SitePlanImg,
                        "Title":"Site Plan",
                        "NavigateTo" : ""
                    },
                    {
                        
                        "Image": ZoneCertificateImg,
                        "Title":"Zone Certificate",
                        "NavigateTo" : ""
                    },
                    {
                        
                        "Image": EmergencyImg,
                        "Title":"Emergency Services",
                        "NavigateTo" : ""
                    },
                    {
                        "Image": SmartTrivandrum,
                        "Title":"Smart Trivandrum",
                        "NavigateTo" : "" 
                    },
                    {
                        "Image": Electricity,
                        "Title":"Electricity Connection",
                        "NavigateTo" : "" 
                    }
                    ]
                },
                "NearByIcons": {
                    "Cards": [
                        {
                           
                            "Image":GasStation,
                            "Title":"Gas Station",
                            "id":"1",
                        },
                        {
                            
                            "Image":PolicestationImg ,
                            "Title":"Police Station",
                            "id":"2"
                        },
                        {
                            
                            "Image": BloodBank,
                            "Title":"Blood Bank",
                            "id" : "3"
                        },
                        {
                            
                            "Image":ToiletImg,
                            "Title":"Public Toilets",
                            "id" : "4"
                        },
                        {
                            
                            "Image": BinImg,
                            "Title":"Aerobic Bin",
                            "id" : "5"
                        },
                        {
                            
                            "Image": HospitalImg,
                            "Title":"Hospital",
                            "id" : "6"
                        }
                        ]
                    },
                    "BreakingNews":{
                        "NewsJson":[
                            {
                                news_id: 44,
                                image_path:default_dashboard_News,
                                title:"No Data available",
                                description:"",
                                uploaded_on: "",
                              }
                        ],
                        "loadingNewsJson":[
                            {
                                news_id: 44,
                                image_path:default_dashboard_News,
                                title:"Please wait...",
                                description:"",
                                uploaded_on: "",
                              }
                        ],
                        "NewsdashboardJson":[
                            {
                                news_id: 44,
                                image_path:breaking_news_default,
                                title:"News",
                                description:"",
                                uploaded_on: "",
                              }
                        ],
                        "BreakingNewsDefaultImage":default_dashboard_News
                    }
    
};


export default collabTabInfo;
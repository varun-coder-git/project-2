import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createChatBotMessage } from "react-chatbot-kit";
 import RootChatOptions from "../src/chatbot/RootOptions/Root";
 import BotAvatar from "../src/chatbot/BotAvatar/BotAvatar";
 import CollaborationOptions from "../src/chatbot/CollaborationComponent/CollaborationOptions";
 import ShareDiscuss from "../src/chatbot/CollaborationComponent/ShareDiscuss";
// import PollSurvey from "../src/chatbot/CollaborationComponent/PollSurvey";
// import DiscussionForums from "../src/chatbot/CollaborationComponent/DiscussionForums";
// import BecomeVolunteer from "../src/chatbot/CollaborationComponent/BecomeVolunteer";
// import JoinCommunity from "../src/chatbot/CollaborationComponent/JoinCommunity";
import ComplainOptions from "../src/chatbot/ComplainManagement/ComplainOptions";
import LogComplain from "../src/chatbot/ComplainManagement/LogComplain";
import SearchComplain from "../src/chatbot/ComplainManagement/SearchComplain";
import ComplainStatus from "../src/chatbot/ComplainManagement/ComplainStatus";
import CitizenOptions from "../src/chatbot/CitizenServices/CitizenOptions";
import Button from '@material-ui/core/Button';
import Footer from "./component/Footer";

const config = {


  chatbottest:false,
//  botName: "Welcome to the Thiruvananthapuram Support",
  initialMessages: [
   createChatBotMessage("We'll be glad to help you! Please select the desired option", {
       widget: "rootOptions",
       delay: 100,
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  customComponents: {
    // Replaces the default header
   header: () =><div>
     <Row>
     <Col  xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
     <div style={{ color: '#9150ff', padding: "5px",fontWeight:"500"}}>Welcome to the Smart City<br/> support </div>
     </Col>
     <Col  xs="2" sm="2" md="2" lg="2" xl="2" xxl="2" className="pt-3">
     {/* <Button onClick={() => { alert('clicked') }}>close</Button> */}
     <i style={{ color: '#9150ff'}} onClick={() => {  
       sessionStorage.removeItem("chatbot");
       window.location.reload();
      }} class="fas fa-times"></i>
     </Col>
     
     </Row>
     <hr></hr>
   </div>
  },
  widgets: [

    {
      widgetName: "rootOptions",
      widgetFunc: (props) => <RootChatOptions {...props} />,
    },


    {
      widgetName: "CollaborationOptions",
      widgetFunc: (props) => <CollaborationOptions {...props} />,
      
    },

    {
      widgetName: "ShareDiscuss",
      widgetFunc: (props) => <ShareDiscuss {...props} />,
      
    },

  //   {
  //     widgetName: "PollSurvey",
  //     widgetFunc: (props) => <PollSurvey {...props} />,
      
  //   },

  //   {
  //     widgetName: "DiscussionForum",
  //     widgetFunc: (props) => <DiscussionForums {...props} />,
      
  //   },

  //   {
  //     widgetName: "BecomeVolunteer",
  //     widgetFunc: (props) => <BecomeVolunteer {...props} />,
      
  //   },

  //   {
  //     widgetName: "JoinCommunity",
  //     widgetFunc: (props) => <JoinCommunity {...props} />,
      
  //   },
    {
      widgetName: "ComplainManagement",
      widgetFunc: (props) => <ComplainOptions {...props} />,
      
    },

    {
      widgetName: "LogComplain",
      widgetFunc: (props) => <LogComplain {...props} />,
      
    },

    {
      widgetName: "SearchComplain",
      widgetFunc: (props) => <SearchComplain {...props} />,
      
    },
    {
      widgetName: "ComplainStatus",
      widgetFunc: (props) => <ComplainStatus {...props} />,
      
    },
    {
      widgetName: "CitizenServices",
      widgetFunc: (props) => <CitizenOptions {...props} />,
      
    },
  //   {
  //     widgetName: "CommonReturn",
  //     widgetFunc: (props) => <CommonReturn {...props} />,
      
  //   },
  //   {
  //     widgetName: "NearMeLink",
  //     widgetFunc: (props) => <NearMe {...props} />,
      
  //   },
  //   {
  //     widgetName: "NearMeDetails",
  //     widgetFunc: (props) => <NearMeOptions {...props} />,
      
  //   },
  //   {
  //     widgetName: "AnalyticsDetails",
  //     widgetFunc: (props) => <AnalyticsOptions {...props} />,
      
  //   },
  //   {
  //     widgetName: "WebAndMedia",
  //     widgetFunc: (props) => <Analytics {...props} />,
      
  //   },
  //   {
  //     widgetName: "TrendingSection",
  //     widgetFunc: (props) => <TrendingNow {...props} />,
      
  //   }
   ]

}

export default config;

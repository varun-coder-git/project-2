import collaborationIdeaImage from "../../assets/cityappsicon/collaboration/idea.png";
import collaborationPollImage from "../../assets/cityappsicon/collaboration/poll.png";
import collaborationBackButton from "../../assets/backIcon.png";
import cardsProfileDefault from "../../assets/defaultprofile.png";

const collaborationDetails = {
    "Collaboration_BACK_ICON":collaborationIdeaImage,
    "Collaboration_SHARE_DISCUSS_HEADING":"Share & Discuss Idea",
    "Collaboration_SHARE_A_IDEA_HEADING":"Idea Details",
    "Collaboration_BUTTON_HEADING":"START A NEW IDEA",
    "Collaboration_POll_ICON":collaborationPollImage,
    "Collaboration_POLLS_SURVEYS_HEADING":"Polls/Surveys",
    "Collaboration_BACK_BUTTTON":collaborationBackButton,
    "Collaboration_NavigateTo_POlls":"/collaboration-pollsSurveys",
    "Collaboration_POLLS_SURVEYS_DETAILSHEADING":"Please Vote",
    "NavigateTo" : "/dashboard-collaboration",
    "Cards" : [
        {
            "cardType": "No data Available",
            "cardTitle": "",
            "cardDescription": "",
            "cardPostedOn": "",
            "cardLastCommentedOn": "",
            "cardPostedBy": "",
            "cardPlace": "",
            "cardProfileImage": cardsProfileDefault,
            "threadId" : "",
            "status" : "",
            "cardUserId" : ""
        }
    ],
    "loadingCards" : [
        {
            "cardType": "Please wait..",
            "cardTitle": "",
            "cardDescription": "",
            "cardPostedOn": "",
            "cardLastCommentedOn": "",
            "cardPostedBy": "",
            "cardPlace": "",
            "cardProfileImage": cardsProfileDefault,
            "threadId" : "",
            "status" : "",
            "cardUserId" : ""
        }
    ],
    "CardsDiscussion" : [
        {
            "cardType": "No data Available",
			"cardTitle": "",
			"cardDescription": "",
			"cardPostedOn": "",
			"cardLastCommentedOn": "",
			"cardPostedBy": "",
			"cardPlace": "",
			"cardProfileImage": cardsProfileDefault,
			"threadId": "",
			"status": "",
			"cardUserId": "",
			"wardName": "",
			"CommentCount": ""
        }
    ],
    "WaitNotification":[{
        "subject":"Please Wait.."
    }],
    "Notification":[{
        "subject":"Please Login to view notifications"
    }],
    "CardsTrends" : [
        {
            "id": "",
			"count": "",
			"title": "No data Available",
			"description": "",
			"created_date": "",
			"type_data": "NoData"
        }
    ],
    "LoadingCardsTrends" : [
        {
            "id": "",
			"count": "",
			"title": "Please wait..",
			"description": "",
			"created_date": "",
			"type_data": "NoData"
        }
    ],
    "ACardDetails" : [
        {
            "Image": cardsProfileDefault,
		    "Name": "Suraj Nikam",
		    "IdeaDescription": "There is a need for crossfit workout fitness setup to be installed.",
		    "IdeaNumber": 11,
		    "Title": "Need of CrossFit workout setup",
		    "SubmissionDate": "01 Jun 2021 11:48 AM",
		    "Comment": [
			    {
				    "Image": cardsProfileDefault,
				    "PerconCommentId": 0,
				    "Name": "",
				    "CommentDescription": "",
				    "IdeaNumber": 0,
				    "DateOfComment": ""
			    }
            ],
            "attachment": [
				{
					"attachment_id": 2131,
					"attachment": ""
				}
            ]
        }
    ],
    "PollsCard":[
        {
            "admin_id": 0,
            "cardType":"",
            "poll_id":"0",
            "poll_options_id":"0",
            "poll_subject": "No Data Found",
            "full_name" : "",
            "d_submission_date" : "",
            "d_start_date" : " - ",
            "d_end_date" : " - ",
            "poll_status" : "",
            "poll_category_name" :"",
            "cardPostedOn": "",
            "cardLastCommentedOn" : "",
            "cardProfileImage" : cardsProfileDefault 
        }
    ],
    "loadingPollsCard":[
        {
            "admin_id": 0,
            "cardType":"",
            "poll_id":"0",
            "poll_options_id":"0",
            "poll_subject": "please wait..",
            "full_name" : "",
            "d_submission_date" : "",
            "d_start_date" : " - ",
            "d_end_date" : " - ",
            "poll_status" : "",
            "poll_category_name" :"",
            "cardPostedOn": "",
            "cardLastCommentedOn" : "",
            "cardProfileImage" : cardsProfileDefault 
        }
    ],
    "PollsVotes":[
        {
			"votes": 0,
			"poll_id": 0
		}
    ],
    "PollsCardDetails":[
        {
            "cardType":"",
            "admin_id": "",
            "poll_id": 0,
            "image_path": "public/UserImage/CardsProfileDefaultImage.png",
            "full_name": "Rupali Choube",
            "poll_subject": "ADDED1 pole for past date with multiple answer value",
            "start_date": "2021-05-31T18:30:00.000Z",
            "end_date": "2021-06-08T18:30:00.000Z",
            "d_question_type": "multiple",
            "option_name": [
                "2e3",
                "er32r"
            ],
            "d_option_name": [
                {
                    "poll_options_id": 155,
                    "option_index": 1,
                    "option_name": "op1"
                },
                {
                    "poll_options_id": 155,
                    "option_index": 2,
                    "option_name": "op2"
                }
            ],
            "is_disable": true
        }
    ]



};


export default collaborationDetails;
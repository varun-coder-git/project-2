import LogComplaintBackButton from "../../assets/backIcon.png";
// import cardsProfileDefault from "../../assets/defaultprofile.png";
import SearchComplainImg from '../../assets/cityappsicon/complaint/search complaint.png';
// import ComplainStatusImg from '../../assets/cityappsicon/complaint/complaint status.png';
import ComplainLogImg from '../../assets/cityappsicon/complaint/log complain.png';

const complaintDetails = {
    "Complaint_NavigateTo_COMPLAINTS":"/dashboard-complaintManagement",
    "Complaint_Search_ICON":SearchComplainImg,
	"Complaint_Search_HEADING":"Search Complaint",
	"Incident_Search_HEADING":"Search Incident",
    "Complaint_Status_ICON":SearchComplainImg,
	"Complaint_Status_HEADING":"My Complaint Status",
	"Incident_Status_HEADING":"Incident Status",
    "Complaint_Status_TOTAL":"TOTAL",
    "Complaint_Status_INPROGRESS":"IN PROGRESS",
    "Complaint_Status_CLOSED":"CLOSED",
    "Complaint_log_HEADING_IMG" : ComplainLogImg,
	"Complaint_log_HEADING" : "Log A Complaint",
	"Incident_log_HEADING" : "Report An Incident",
    "Search_data" : [
        {
            "complaint_subject": "",
			"full_name": "",
			"submission_date": "2021-08-18T10:29:00.000Z",
			"complaint_type": "",
			"status": "Open",
			"complaint_id": (Number),
			"complaint_cat_id": 4,
			"ward_id": 1,
			"ward_name": "Test"
        }
    ],
    "Search_Complaint_Details" : [
        {
			"image": "public/UserImage/CardsProfileDefaultImage.png",
			"user_id": 70,
			"full_name": "",
			"ComplaintTitle": "",
			"ComplaintDescription": "",
			"complaint_id": 308,
			"complaint_type": "",
			"ComplaintPostdedDate": "",
			"ComplaintStatus": "",
			"ComplaintStatusId": 1,
			"ComplaintCategoryID": 7,
			"ComplaintCategoryName": "",
			"WardId": 1,
			"WardName": "",
			"is_admin": false,
			"complaint_media": [
				{
					"complaint_media_file": "public/assests/complaint/thread3081/tam0127u.pdf"
				},
				{
					"complaint_media_file": "public/assests/complaint/thread3081/tpx0326y.pdf"
				}
			],
			"comment_count": "1",
			"comments": [
				{
					"complaint_thread_id": 81,
					"image_path": "public/UserImage/CardsProfileDefaultImage.png",
					"full_name": ".",
					"comments": ".",
					"user_id": 9,
					"submission_date": ""
				}
			],
			"incident_media": [
				{
					"IncidentMedia_file": "",
					"media_id": 63
				}
			],
			"complaint_media": [
				{
					"complaint_media_file": "",
					"media_id": 63
				}
			]
		}
	],
	"Search_incident_Details" : [
        {
			"User_id": 70,
			"Full_name": "",
			"Incident_Title": "",
			"Incident_Description": "",
			"Incident_Id": 96,
			"Incident_Type": "",
			"Incident_PostdedDate": "",
			"Incident_Status": "",
			"Incident_StatusId": 1,
			"Incident_CategoryID": 1,
			"Incident_CategoryName": "",
			"Ward_Name": "",
			"is_admin": false,
			"comment_count": "1",
			"incident_media": [
				{
					"incident_media_file": null,
					"media_id": null
				}
			],
			"comments": [
				{
					"comment_incident_id": 97,
					"image_path": "public/UserImage/CardsProfileDefaultImage.png",
					"full_name": "",
					"comments": "",
					"user_id": 70,
					"is_admin": false,
					"submission_date": ""
				}
			]
		}
    ],
}

export default complaintDetails;
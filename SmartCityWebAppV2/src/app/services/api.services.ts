import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
@Injectable({
    providedIn: 'root'
})

export class ApiService {
    expressApiUrl = "https://scity.gmmspl.com:3000";
   //expressApiUrl = "https://api.smarttvm.in:4435";
   
    invokeFirstComponentFunction = new EventEmitter();
    //subsVar: Subscription;
    constructor(private http: HttpClient) { }

    httpOptions :any= {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': ''
         
        })
    };

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
           // console.log("my error",error)
           errorMessage = error.error.message;
        }
        return throwError(errorMessage);
    }
    login(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Smartcity/AdminLogin', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    registerAdmin(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/Register', formData,{headers: new HttpHeaders({'content-type':'application/json'})}).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    authenticateCitizenUser(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/authenticateUser', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

       verifyOTP(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/verifyOTP', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    resendOTP(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/resendOTP', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getHeaderInfo(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/AdminProfileInfo', formData,this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    
    forgotPassword(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/ForgetPassword', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    verifyOTPProfile(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/VerifyAdminChangePassword', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    changePassword(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/ChangePassword', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    resetPassword(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/Admin/ResetPassword', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getPincodeList(): Observable<any> {
        return this.http.get(this.expressApiUrl + '/Smartcity/Pincode', this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateAdminDetails(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/Admin/UpdateProfile', formData).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getAdminDetails(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Admin/Profile', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getBloodGroupList(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Smartcity/BloodGroup', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getCitizenCount(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizen/GetCitizenCount', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFacilityCount(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/getfacilitycount', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFacility(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/getFacility', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFacilityCategory(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/GetFacilityCategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFacilityId(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/facilitybyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addFacility(formData:any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/facility/registerFacility',formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    updateFacility(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/facility/updateFacility', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    deleteFacility(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facility/deleteFacility', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getFacilityByID(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/facilitytype/getFacilityType', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    GetIdeas(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/GetIdeas', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteIdea(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/DeleteIdea', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    GetIdeaSummary(formData: any,id:any,is_admin:boolean): Observable<any> {
        
        return this.http.post(this.expressApiUrl + '/ideas/GetIdeaSummary/'+id+'/'+is_admin, formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    DeleteIdeaComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/DeleteIdeaResponse', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    AddIdeaComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/ideas/AddIdeaResponse', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getPoll(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/getPolls', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getPollById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/getpollbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getPollCategory(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/getcategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addPoll(formData:any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/poll/RegisterPoll',formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    updatePoll(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/poll/updatePoll', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deletePoll(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/deletepoll', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addComplaint(formData:any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/Complaint/Admin/RegisterComplaint',formData).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
 
    assignComplaint(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/assignComplaint', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
        
    }
    getComplaintCount(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaintCount', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaintByID(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaintCategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaint(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaint', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getDuplicateComplaint(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getDuplicateComplaint', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }  
    getComplaintCategory(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Complaint/Category', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaintStatus(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaintStatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaintById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/getComplaintSummarybyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    AddComplaintComment(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/complaint/addcomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    DeleteComplaintComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/deletecomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateComplaintStatus(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/Complaint/UpdateStatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateComplaintCategory(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/Complaint/UpdateCategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteComplaint(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/complaint/deleteComplaint', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getTopComplaintCategoryIssues(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/donut/topIssueDetails', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getTopWard(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/smartcity/gettopward', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getLessWard(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/smartcity/getlessward', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getCitizenByID(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizenreport/getcitizenbyid/', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
 
    getCitizensReport(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizenreport/getcitizenreport/', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteCitizen(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/citizenreport/deletecitizen', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncidentCount(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getIncidentCount', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
        
    }
    getIncidentByID(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getIncidentCategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncident(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getincidents', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteIncident(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/deleteincident', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncidentById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getincidentbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncidentStatus(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getstatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateIncidentStatus(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/incident/updatestatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getDuplicateIncident(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/getDuplicateIncidents', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }  
    updateIncidentCategory(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/incident/updateCategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    AddIncidentComment(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/incident/addincidentcomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    DeleteIncidentComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/incident/deleteincidentcomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getIncidentCategory(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Incident/getCategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getFeedback(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/feedback/getfeedback', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteFeedback(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/feedback/deletefeedback', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getFeedbackById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/feedback/getFeedbackbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getDonutDetails(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/Donut/DonutDetails', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    saveHelpQuery(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/help/helpemail', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getPollAnalyticsById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/poll/pollanalytics', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getVolunteer(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/volunteer/getvolunteer', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteVolunteer(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/volunteer/deletevolunteer', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getVolunteerById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/volunteer/getvolunteerbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteVolunteerComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/volunteer/deletecomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addVolunteerComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/volunteer/addcomment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getTopWardPerformingChart(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/smartcity/gettopwardchart', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getLessPerformingWardChart(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/smartcity/getlesswardchart', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaintIncidentHotspot(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/dashboard/dashboard', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getChatbot(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/chatbot/getchatbot', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteChatbot(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/chatbot/deletechatbot', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getChatbotById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/chatbot/getchatbotbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateChatbotStatus(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/chatbot/updatestatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getChatbotStatus(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/chatbot/getstatus', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    getNews(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/news/getNews', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getNewsById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/news/getnewsbyid', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getNewsCategory(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/news/GetNewsCategory', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addNews(formData:any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/news/RegisterNews',formData).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteNews(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/news/deleteNews', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    AddNewsComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/news/addNewsComment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteNewsComment(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/news/deleteNewsComment', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    editNewsById(formData: any): Observable<any> {
        return this.http.post(this.expressApiUrl + '/news/editNewsById', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    updateNews(formData: any): Observable<any> {
        return this.http.put(this.expressApiUrl + '/news/updateNews', formData).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
}

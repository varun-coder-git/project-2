import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFacilityComponent } from './Components/add-facility/add-facility.component';
import { AddNewsComponent } from './Components/add-news/add-news.component';
import { AddPollComponent } from './Components/add-poll/add-poll.component';
import { ChatBotComponent } from './Components/chat-bot/chat-bot.component';
import { ChatbotDetailsComponent } from './Components/chatbot-details/chatbot-details.component';
import { CitizenDetailsComponent } from './Components/citizen-details/citizen-details.component';
import { CitizenReportComponent } from './Components/citizen-report/citizen-report.component';
import { CitizenServicesComponent } from './Components/citizen-services/citizen-services.component';
import { ComplaintReportComponent } from './Components/complaint-report/complaint-report.component';
import { ComplaintSummaryComponent } from './Components/complaint-summary/complaint-summary.component';
import { ConfirmDeleteComponent } from './Components/confirm-delete/confirm-delete.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EditFacilityComponent } from './Components/edit-facility/edit-facility.component';
import { FacilityMapComponent } from './Components/facility-map/facility-map.component';
import { FacilityOverviewComponent } from './Components/facility-overview/facility-overview.component';
import { FeedbackDetailsComponent } from './Components/feedback-details/feedback-details.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { HelpComponent } from './Components/help/help.component';
import { IdeaSubmissionDetailsComponent } from './Components/idea-submission-details/idea-submission-details.component';
import { IdeaSubmissionReportComponent } from './Components/idea-submission-report/idea-submission-report.component';
import { IncidentDetailComponent } from './Components/incident-detail/incident-detail.component';
import { IncidentReportComponent } from './Components/incident-report/incident-report.component';
import { LoginComponent } from './Components/login/login.component';
import { NewsDetailComponent } from './Components/news-detail/news-detail.component';
import { NewsReportComponent } from './Components/news-report/news-report.component';
import { PollAnalyticsReportComponent } from './Components/poll-analytics-report/poll-analytics-report.component';
import { PollReportComponent } from './Components/poll-report/poll-report.component';
import { SideBarComponent } from './Components/sideBar/side-bar.component';
import { TopPerformingWardComponent } from './Components/top-performing-ward/top-performing-ward.component';
import { VolunteerDetailComponent } from './Components/volunteer-detail/volunteer-detail.component';
import { VolunteerReportComponent } from './Components/volunteer-report/volunteer-report.component';
import { WardNeedImprovementComponent } from './Components/ward-need-improvement/ward-need-improvement.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { AdminProfileComponent } from './Components/admin-profile/admin-profile.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { VerifyOtpComponent } from './Components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AddComplaintComponent } from './Components/add-complaint/add-complaint.component';
import { ComplaintChangeLocationMapComponent } from './Components/complaint-change-location-map/complaint-change-location-map.component';
import { TopComplaintCategoryIssuesComponent } from './Components/top-complaint-category-issues/top-complaint-category-issues.component';
import { ComplaintConfiguarationScreenComponent } from './Components/complaint-configuaration-screen/complaint-configuaration-screen.component';
import { ComplaintMapComponent } from './Components/complaint-map/complaint-map.component';
import { IncidentMapComponent } from './Components/incident-map/incident-map.component';

const routes: Routes = [
  { path:'',component:LoginComponent},
  { path:'Login',component:LoginComponent},
  { path:'EditFacility',component:EditFacilityComponent},
  { path:'AddFacility',component:AddFacilityComponent},
  { path:'HomePage',component:SideBarComponent,canActivate: [AuthGuard]},
  { path:'Dashboard',component:DashboardComponent},
  {path:'IdeaDetails',component:IdeaSubmissionDetailsComponent},
  {path:'IdeaReport',component:IdeaSubmissionReportComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'verify-otp',component:VerifyOtpComponent},
  {path:'admin-profile',component:AdminProfileComponent},
  {path:'complaint-configuration',component:ComplaintConfiguarationScreenComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
                                IdeaSubmissionDetailsComponent,
                                SideBarComponent,
                                IdeaSubmissionDetailsComponent,
                                DashboardComponent,
                                FacilityOverviewComponent,
                                CitizenServicesComponent,
                                IdeaSubmissionReportComponent,
                                PollReportComponent,
                                AddPollComponent,
                                ChatBotComponent,
                                CitizenReportComponent,
                                ComplaintReportComponent,
                                HelpComponent,
                                LoginComponent,
                                EditFacilityComponent,
                                AddFacilityComponent,
                                ConfirmDeleteComponent,
                                AddPollComponent,
                                FacilityMapComponent,
                                ComplaintSummaryComponent,
                                CitizenDetailsComponent,
                                IncidentReportComponent,
                                IncidentDetailComponent,
                                FeedbackComponent,
                                FeedbackDetailsComponent,
                                PollAnalyticsReportComponent,
                                VolunteerDetailComponent,
                                VolunteerReportComponent,
                                TopPerformingWardComponent,
                                WardNeedImprovementComponent,
                                ChatbotDetailsComponent,
                                NewsReportComponent,
                                AddNewsComponent,
                                NewsDetailComponent,
                                ChangePasswordComponent,
                                ForgotPasswordComponent,
                                AdminProfileComponent,
                                SignUpComponent,
                               VerifyOtpComponent,
                               ResetPasswordComponent,
                               AddComplaintComponent,
                               ComplaintChangeLocationMapComponent,
                              TopComplaintCategoryIssuesComponent,
                              ComplaintConfiguarationScreenComponent,
                             ComplaintMapComponent,
                             IncidentMapComponent
                              ]
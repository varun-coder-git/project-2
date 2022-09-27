import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import CitizensPopulation from '../../jsonFiles/populationCitizens'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // CitizensPopulation=CitizensPopulation;
  user_id: any;
  token: any;
  DATA: any;

  citizenCountList: any;
  total:any;
  registered:any;
  onlineCitizen:any;
  constructor(private service: ApiService, private messageService:ParentChildCommunicationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    // localStorage.setItem('selectedTabIndex','0');
    this.DATA = {
      'user_Id': this.user_id,
      'token': this.token
    }
    this.getCitizenCount();
  }

  getCitizenCount() {
    this.service.getCitizenCount(this.DATA).subscribe((res) => {


      if(res.status==true || res.message == "Data Found"){
        this.citizenCountList = res.data[0];
        //this.total=this.citizenCountList.totalCitizen;
        this.registered=this.citizenCountList.registeredCitizen;
        this.onlineCitizen=this.citizenCountList.onlineCitizen;
      }
     
    }
    // },
    // err=>{

    //   if(err=="Failed to authenticate token.")
    //   this.toastr.error("Session expired...plz login again!");

    //   else
    //   this.toastr.error("Oops....Something went wrong!");
    
    // }
    );
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);

  }
}

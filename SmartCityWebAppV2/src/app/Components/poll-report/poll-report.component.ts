import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddPollComponent } from '../add-poll/add-poll.component';
import PollReport, { PollColoumnNames } from 'src/app/jsonFiles/pollReport';
import { ApiService } from 'src/app/services/api.services';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PollService } from 'src/app/jsonFiles/poll.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { PollAnalyticsReportComponent } from '../poll-analytics-report/poll-analytics-report.component';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-poll-report',
  templateUrl: './poll-report.component.html',
  styleUrls: ['./poll-report.component.css']
})
export class PollReportComponent implements OnInit {
  //PollReport = this.pollService.onGet();
  id = '';
  
  user_id: any;
  token: any;
  DATA: any;
  pollList:any;
  searchText:any;



  pollColumns = ['poll_category_name','poll_id','poll_subject', 'full_name' ,'submission_date','poll_status','A']
  pollTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
    private service: ApiService,
    private toastr:ToastrService,
    private pollService:PollService,
    private messageService: ParentChildCommunicationService,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getPoll();
    
    
  }


  applyFilter() {
    this.pollTableDataSource.filter = this.searchText.trim().toLowerCase();
    this.methodFilterPredicate();
  }
  addPoll(idArg: any) {
 

      let dialogRef = this.dialog.open(AddPollComponent, {
        width: '60%',
        data: idArg
      });
  
      dialogRef.afterClosed().subscribe(s => {
     
        this.getResultWithSearchFilter();
      });

    
  }
  getResultWithSearchFilter(){
    this.service.getPoll(this.DATA).subscribe((res) => {
     // console.log(res);

       this.pollList = res.data;
   
      this.pollTableDataSource = new MatTableDataSource<any>(this.pollList);
        
      this.pollTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
     
      this.pollTableDataSource.sort = this.sort;
      this.pollTableDataSource.paginator = this.paginator;
      this.applyFilter();
 
    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.pollList=undefined;
        this.pollTableDataSource = new MatTableDataSource<any>(this.pollList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.pollTableDataSource.sort = this.sort;
        this.pollTableDataSource.paginator = this.paginator;
        this.applyFilter();
      }
      else
      this.toastr.warning("Oops...Something went wrong!")
      // this.error = err.message;
     // console.log("message",err.message);
       
     });
  
  }
  methodFilterPredicate(){
    this.pollTableDataSource.filterPredicate =

    (data: Element, filters: string) => {
     // console.log("inside filterPredicate")
      const matchFilter:any = [];
      const filterArray = filters.split(' ');
      const columns = (<any>Object).values(data);
     // console.log('array', filterArray);
    
      filterArray.forEach(filter => {
        const customFilter:any = [];
       // console.log('column', columns);
        // columns.forEach((column:any) => customFilter.push(column.includes(filter)));
        columns.forEach((column:any) => { 
         // console.log("column", column)
          customFilter.push(column && column.toString().toLowerCase().includes(filter))
      });
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND toLowerCase()
    }
  }
  getPoll() {
    this.spinner.show();
    this.service.getPoll(this.DATA).subscribe((res) => {
      this.spinner.hide();

       this.pollList = res.data;
   
      this.pollTableDataSource = new MatTableDataSource<any>(this.pollList);
      this.pollTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.pollTableDataSource.sort = this.sort;
      this.pollTableDataSource.paginator = this.paginator;

 

    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.spinner.hide();
        this.pollList=undefined;
        this.pollTableDataSource = new MatTableDataSource<any>(this.pollList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
       
        this.pollTableDataSource.sort = this.sort;
        this.pollTableDataSource.paginator = this.paginator;
        this.applyFilter();
      }
      else{
        this.spinner.hide();
        this.toastr.warning("Oops...Something went wrong!");
      }
    

       
     });
  }
  // ngAfterViewChecked() {
  //   window.scrollTo(0, 0);
  //   }

  deletePoll(poll_id: any,admin_id: any) {
    if(this.user_id==admin_id){
      const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
        data:'Are you sure you want to delete?'
      })
      dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
        if (showSnackBar) this.requestDelete(poll_id);
      })
    }
    else
        this.toastrService.warning("Sorry! You cannot delete other Admin's poll!");
  }

  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'poll_id': id
    }
  //  console.log("obj",data);
    this.service.deletePoll(data).subscribe((res) => {
      this.toastr.success('Poll Deleted!');
      this.getResultWithSearchFilter();
    });
  }

  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i = 0;
    this.messageService.OnSelect(i);

  }
  viewPollAnalytics(idArg: any) {
 

    let dialogRef = this.dialog.open(PollAnalyticsReportComponent, {
      width: '60%',
      height:'95vh',
      data: idArg
    });

    dialogRef.afterClosed().subscribe(s => {
   
      this.getResultWithSearchFilter();
    });

  
}
}

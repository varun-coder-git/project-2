import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddPollComponent } from '../add-poll/add-poll.component';
import PollReport, { PollColoumnNames } from 'src/app/jsonFiles/pollReport';
import { ApiService } from 'src/app/services/api.services';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PollService } from 'src/app/jsonFiles/poll.service';
import { ComplaintSummaryComponent } from '../complaint-summary/complaint-summary.component';
import { ComplaintService } from 'src/app/jsonFiles/complaint.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AddComplaintComponent } from '../add-complaint/add-complaint.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.css']
})
export class ComplaintReportComponent implements OnInit {


  id = '';

  user_id: any;
  token: any;
  DATA: any;
  complaintList: any;
  searchText: any;
  searchValue: any;

  complaintColumns = ['full_name','ward_name', 'complaint_subject', 'complaint_id',"citizen_type", 'complaint_type', 'submission_date', 'status', 'A']
  complaintTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private service: ApiService,
    private toastr: ToastrService,
    private complaintService: ComplaintService,
    private messageService: ParentChildCommunicationService,
    private router: Router, private spinner: NgxSpinnerService,public datepipe: DatePipe) { }
 
  ngOnInit(): void {
    window.scrollTo(0, 0);
   
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getComplaint();

  }


  openDialog(ComplaintObject: any): void {

    const dialogRef = this.dialog.open(ComplaintSummaryComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ComplaintObject
    });

    dialogRef.afterClosed().subscribe(result => {

    this.getResultWithSearchFilter();
    });
 
  }
  getResultWithSearchFilter(){
    this.service.getComplaint(this.DATA).subscribe((res) => {
      console.log("test");
      this.complaintList = res.data;
      this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
      this.complaintTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      
      this.complaintTableDataSource.sort = this.sort;
      this.complaintTableDataSource.paginator = this.paginator;
      this.applyFilter();

      //this.spinner.hide();
    }
    ,
  
(err ) =>
 {
  if(err == "Data Not Found"){
    this.complaintList=undefined;
    this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
    let searchText = (<HTMLInputElement>document.getElementById("search")).value;
    this.complaintTableDataSource.sort = this.sort;
    this.complaintTableDataSource.paginator = this.paginator;
    this.applyFilter();
  }
  else
  this.toastr.warning("Oops...Something went wrong!");     
 }
    
    );

  }
  methodFilterPredicate() {
    this.complaintTableDataSource.filterPredicate =

      (data: Element, filters: string) => {
      

        const matchFilter: any = [];
        const filterArray = filters.split(' ');
        const columns = (<any>Object).values(data);


        filterArray.forEach(filter => {
          const customFilter: any = [];

          columns.forEach((column: any) => {
  
            customFilter.push(column.toString().toLowerCase() && column.toString().toLowerCase().includes(filter))
          });
          matchFilter.push(customFilter.some(Boolean)); 
        });
        return matchFilter.every(Boolean); 
      }
  }
  getComplaint() {
   
    this.spinner.show();
    this.service.getComplaint(this.DATA).subscribe((res) => {
      this.spinner.hide();
      this.complaintList = res.data;
      this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
      this.complaintTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
    this.complaintTableDataSource.sort = this.sort;
   
      this.complaintTableDataSource.paginator = this.paginator;

    }
    ,
    
  (err ) =>
   {

    if(err == "Data Not Found"){
           this.spinner.hide();
      this.complaintList=undefined;
      this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.complaintTableDataSource.sort = this.sort;
      this.complaintTableDataSource.paginator = this.paginator;
      this.applyFilter();
    }
    else{
           this.spinner.hide();
         this.toastr.warning("Oops...Something went wrong!");
    }
    
  
     
   });

  }

  sortComplaintTable(){
    
  }
  addComplaint(idArg: any) {
 

    let dialogRef = this.dialog.open(AddComplaintComponent, {
      width: '60%',
      data: idArg
    });

    dialogRef.afterClosed().subscribe(result => {

      this.getResultWithSearchFilter();
      });

  
}
  deleteComplaint(idArg: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(idArg);
    })
  }

  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'complaint_id': id
    }
   
    this.service.deleteComplaint(data).subscribe((res) => {
      this.toastr.success('Complaint Deleted!');
      // this.getComplaint();

      this.service.getComplaint(this.DATA).subscribe((res) => {
        this.complaintList = res.data;
        this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
        this.complaintTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
        
          return data[sortHeaderId];
        };
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        
        this.complaintTableDataSource.sort = this.sort;
        this.complaintTableDataSource.paginator = this.paginator;
        this.applyFilter();

        //this.spinner.hide();
      });
    });
  }

  applyFilter() {
    this.complaintTableDataSource.filter = this.searchText.trim().toLowerCase();
    this.methodFilterPredicate();
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i = 0;
    this.messageService.OnSelect(i);
  }

}

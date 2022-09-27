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
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { IncidentDetailComponent } from '../incident-detail/incident-detail.component';
@Component({
  selector: 'app-complaint-configuaration-screen',
  templateUrl: './complaint-configuaration-screen.component.html',
  styleUrls: ['./complaint-configuaration-screen.component.css']
})
export class ComplaintConfiguarationScreenComponent implements OnInit {


  selectedIndex:any;
  id = '';
  submitted: any;
  user_id: any;
  token: any;
  DATA: any;
  complaintList: any;
  incidentList: any;
  searchText: any;
  searchTextIncident: any;
  searchValue: any;
  complaintDuplicateForm: FormGroup;
  complaintStartDate:any;complaintEndDate:any;
  incidentStartDate:any;incidentEndDate:any;
  complaintColumns = ['full_name','ward_name', 'complaint_subject', 'complaint_id',"citizen_type", 'complaint_type', 'submission_date', 'status', 'A']
  complaintTableDataSource = new MatTableDataSource<Element>();

  incidentDuplicateForm: FormGroup;
  incidentColumns = ['user_name_incident','ward_name_incident', 'incident_subject', 'incident_id', 'incident_type', 'submission_date', 'status_incident', 'actions']
  incidentTableDataSource = new MatTableDataSource<Element>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', {read: MatSort}) sort1: MatSort;
  @ViewChild('paginator1', { static: true }) paginator1: MatPaginator;
  constructor(private dialog: MatDialog,
    private service: ApiService,  public datepipe: DatePipe,
    private toastr: ToastrService,
    private complaintService: ComplaintService,
    private messageService: ParentChildCommunicationService,
    private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
   
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    } 
    
    this.initForm();
    this.initFormIncident();
    this.getComplaint();
    this.getIncident();
  

  }
  initForm() {
    this.complaintDuplicateForm = new FormGroup({
      'user_name': new FormControl({ value:true, disabled: false }),
      'complaint_type': new FormControl({ value:true, disabled:false}),
      'location': new FormControl({ value:true, disabled: false }),
      'date_range': new FormControl({ value:true, disabled: false }),
      'start_date': new FormControl({ value:'', disabled: false }),
      'end_date': new FormControl({ value: '', disabled: false }),

    },



    );
   
  }
  initFormIncident() {
    this.incidentDuplicateForm = new FormGroup({
      'user_name': new FormControl({ value:true, disabled: false }),
      'incident_type': new FormControl({ value:true, disabled:false}),
      'location': new FormControl({ value:true, disabled: false }),
      'date_range': new FormControl({ value:true, disabled: false }),
      'start_date': new FormControl({ value:'', disabled: false }),
      'end_date': new FormControl({ value: '', disabled: false }),

    },



    );
   
  }
  get f() { return this.complaintDuplicateForm.controls; }
  get f1() { return this.incidentDuplicateForm.controls; }
  get today() { return new Date() }
  selectionChange(event:MatCheckboxChange){
   
    if (event.checked == true){
      this.complaintDuplicateForm.controls['start_date'].reset({ value: this.complaintStartDate, disabled: false });
      this.complaintDuplicateForm.controls['end_date'].reset({ value: this.complaintEndDate, disabled: false });
 
    }
    else{
      this.complaintDuplicateForm.controls['start_date'].reset({ value: "", disabled: true });
      this.complaintDuplicateForm.controls['end_date'].reset({ value: "", disabled: true });

    }
  }
  selectionChangeIncident(event:MatCheckboxChange){
 
    if (event.checked == true){
      this.incidentDuplicateForm.controls['start_date'].reset({ value: this.incidentStartDate, disabled: false });
      this.incidentDuplicateForm.controls['end_date'].reset({ value: this.incidentEndDate
        
        
        
        
        
        
        , disabled: false });
      this.incidentDuplicateForm.patchValue({
       
        start_date: this.datepipe.transform(this.incidentList.start_date, 'yyyy-MM-dd'),
        end_date: this.datepipe.transform(this.incidentList.end_date, 'yyyy-MM-dd'),
       

      });

    }
    else{
      this.complaintDuplicateForm.controls['start_date'].reset({ value: "", disabled: true });
      this.complaintDuplicateForm.controls['end_date'].reset({ value: "", disabled: true });

    }
  }
  clearFilters(){
    this.complaintDuplicateForm.controls['user_name'].reset({ value: false, disabled: false});
    this.complaintDuplicateForm.controls['complaint_type'].reset({ value: false, disabled: false });
    this.complaintDuplicateForm.controls['location'].reset({ value: false, disabled: false });
    this.complaintDuplicateForm.controls['date_range'].reset({ value: false, disabled: false });
    this.complaintDuplicateForm.controls['start_date'].reset({ value: "", disabled: true });
    this.complaintDuplicateForm.controls['end_date'].reset({ value: "", disabled: true });
    this.checkDuplicate();
  }
  clearFiltersIncident(){
    this.incidentDuplicateForm.controls['user_name'].reset({ value: false, disabled: false});
    this.incidentDuplicateForm.controls['incident_type'].reset({ value: false, disabled: false });
    this.incidentDuplicateForm.controls['location'].reset({ value: false, disabled: false });
    this.incidentDuplicateForm.controls['date_range'].reset({ value: false, disabled: false });
    this.incidentDuplicateForm.controls['start_date'].reset({ value: "", disabled: true });
    this.incidentDuplicateForm.controls['end_date'].reset({ value: "", disabled: true });
    this.checkDuplicateIncident();
  }
  checkDuplicate(){
 
    let obj2 = {

      "is_Category_selected": this.complaintDuplicateForm.controls.complaint_type.value,
      "is_user_selected": this.complaintDuplicateForm.controls.user_name.value,
      "is_location_selected": this.complaintDuplicateForm.controls.location.value,
      "start_date": this.complaintDuplicateForm.controls.start_date.value,
      "end_date": this.complaintDuplicateForm.controls.end_date.value,
    }
    let obj3 = {
      ...this.DATA, ...obj2
    }
    this.spinner.show();
    this.service.getDuplicateComplaint(obj3).subscribe((res) => {
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

    if(err == "No Data Available"){
           this.spinner.hide();
      this.complaintList=undefined;
      this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.complaintTableDataSource.sort = this.sort;
      this.complaintTableDataSource.paginator = this.paginator;
      this.applyFilter();
    }
    
    else if(err == "Data Not Found"){
    this.spinner.hide();
    this.complaintList=undefined;
    this.complaintTableDataSource = new MatTableDataSource<any>(this.complaintList);
    let searchText = (<HTMLInputElement>document.getElementById("search")).value;
    this.complaintTableDataSource.sort = this.sort;
    this.complaintTableDataSource.paginator = this.paginator;
    this.applyFilter();
}
    else if(err == "Only Date range is selected"){
      this.toastr.warning("Only Date range is selected!");
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
  checkDuplicateIncident(){
 
    let obj2 = {

      "is_Category_selected": this.incidentDuplicateForm.controls.incident_type.value,
      "is_user_selected": this.incidentDuplicateForm.controls.user_name.value,
      "is_location_selected": this.incidentDuplicateForm.controls.location.value,
      "start_date": this.incidentDuplicateForm.controls.start_date.value,
      "end_date": this.incidentDuplicateForm.controls.end_date.value,
    }
    let obj3 = {
      ...this.DATA, ...obj2
    }
    this.spinner.show();
    this.service.getDuplicateIncident(obj3).subscribe((res) => {
      this.spinner.hide();
      this.incidentList = res.data;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      this.incidentTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
     this.incidentTableDataSource.sort = this.sort1;
      this.incidentTableDataSource.paginator = this.paginator1;

    }
    ,
    
  (err ) =>
   {

    if(err == "No Data Available"){
           this.spinner.hide();
      this.incidentList=undefined;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
      this.incidentTableDataSource.sort = this.sort1;
      this.incidentTableDataSource.paginator = this.paginator1;
      this.applyFilter();
    }
    
    else if(err == "Data Not Found"){
    this.spinner.hide();
    this.incidentList=undefined;
    this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
    let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
    this.incidentTableDataSource.sort = this.sort1;
    this.incidentTableDataSource.paginator = this.paginator1;
    this.applyFilter();
}
    else if(err == "Only Date range is selected"){
      this.toastr.warning("Only Date range is selected!");
      this.spinner.hide();
      this.incidentList=undefined;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
      this.incidentTableDataSource.sort = this.sort1;
      this.incidentTableDataSource.paginator = this.paginator1;
      this.applyFilter();
}
    else{
           this.spinner.hide();
         this.toastr.warning("Oops...Something went wrong!");
    }
    
  
     
   });
    
  }
  openDialog(ComplaintObject: any): void {

    const dialogRef = this.dialog.open(ComplaintSummaryComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ComplaintObject
    });

    dialogRef.afterClosed().subscribe(result => {
this.getResultWithSearchFilter();
    //  this.getComplaint();
    });
 
  }
  openDialogIncident(incidentObject: any): void {

    const dialogRef = this.dialog.open(IncidentDetailComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: incidentObject
    });

    dialogRef.afterClosed().subscribe(result => {

   this.getResultWithSearchFilterIncident();
 // this.getIncident();
    });
 
  }
  getResultWithSearchFilter(){
    let obj2 = {

      "is_Category_selected": this.complaintDuplicateForm.controls.complaint_type.value,
      "is_user_selected": this.complaintDuplicateForm.controls.user_name.value,
      "is_location_selected": this.complaintDuplicateForm.controls.location.value,
      "start_date": this.complaintDuplicateForm.controls.start_date.value,
      "end_date": this.complaintDuplicateForm.controls.end_date.value,
    }
    let obj3 = {
      ...this.DATA, ...obj2
    }
    this.service.getDuplicateComplaint(obj3).subscribe((res) => {
    
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
  getResultWithSearchFilterIncident(){

    let obj2 = {

      "is_Category_selected": this.incidentDuplicateForm.controls.incident_type.value,
      "is_user_selected": this.incidentDuplicateForm.controls.user_name.value,
      "is_location_selected": this.incidentDuplicateForm.controls.location.value,
      "start_date": this.incidentDuplicateForm.controls.start_date.value,
      "end_date": this.incidentDuplicateForm.controls.end_date.value,
    }
    let obj3 = {
      ...this.DATA, ...obj2
    }
    this.service.getDuplicateIncident(obj3).subscribe((res) => {
    
      this.incidentList = res.data;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      this.incidentTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
      
      this.incidentTableDataSource.sort = this.sort1;
      this.incidentTableDataSource.paginator = this.paginator1;
      this.applyFilterIncident();

      //this.spinner.hide();
    }
    ,
  
(err ) =>
 {
  if(err == "Data Not Found"){
    this.incidentList=undefined;
    this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
    let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
    this.incidentTableDataSource.sort = this.sort1;
    this.incidentTableDataSource.paginator = this.paginator1;
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
  methodFilterPredicateIncident() {
    this.incidentTableDataSource.filterPredicate =

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
   

    let obj2 = {

      "is_Category_selected": true,
      "is_user_selected": true,
      "is_location_selected": true,
      "start_date": "",
      "end_date": ""
    }
    let obj3 = {
      ...this.DATA, ...obj2
    }
    this.spinner.show();
    this.service.getDuplicateComplaint(obj3).subscribe((res) => {
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
      
      this.complaintStartDate=res.start_date;
      this.complaintEndDate=res.end_date;

      this.complaintDuplicateForm.patchValue({
       
        start_date: this.datepipe.transform(res.start_date, 'yyyy-MM-dd'),
        end_date: this.datepipe.transform(res.end_date, 'yyyy-MM-dd'),
       

      });
    }
    ,
    
  (err ) =>
   {

    if(err == "No Data Available"){
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
 
  getIncident() {
   

    let obj2 = {

      "is_Category_selected": true,
      "is_user_selected": true,
      "is_location_selected": true,
      "start_date": "",
      "end_date": ""
    }
    let obj3 = {
      ...this.DATA, ...obj2
    }
    this.spinner.show();
    this.service.getDuplicateIncident(obj3).subscribe((res) => {
      this.spinner.hide();
      this.incidentList = res.data;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      this.incidentTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
     this.incidentTableDataSource.sort = this.sort1;
      this.incidentTableDataSource.paginator = this.paginator1;

      this.incidentStartDate=res.start_date;
      this.incidentEndDate=res.end_date;

      this.incidentDuplicateForm.patchValue({
       
        start_date: this.datepipe.transform(res.start_date, 'yyyy-MM-dd'),
        end_date: this.datepipe.transform(res.end_date, 'yyyy-MM-dd'),
       

      });
    }
    ,
    
  (err ) =>
   {

    if(err == "No Data Available"){
           this.spinner.hide();
      this.incidentList=undefined;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
      this.incidentTableDataSource.sort = this.sort1;
      this.incidentTableDataSource.paginator = this.paginator1;
      this.applyFilterIncident();
    }
    else if(err == "Data Not Found"){
    this.spinner.hide();
    this.incidentList=undefined;
    this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
    let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
    this.incidentTableDataSource.sort = this.sort1;
    this.incidentTableDataSource.paginator = this.paginator1;
    this.applyFilterIncident();
}
    else{
           this.spinner.hide();
         this.toastr.warning("Oops...Something went wrong!");
    }
    
  
     
   });

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
  deleteIncident(idArg: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDeleteIncident(idArg);
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

      this.service.getDuplicateComplaint(this.DATA).subscribe((res) => {
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

  requestDeleteIncident(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'incident_id': id
    }
   
    this.service.deleteIncident(data).subscribe((res) => {
      this.toastr.success('Incident Deleted!');
      // this.getComplaint();

      this.service.getDuplicateIncident(this.DATA).subscribe((res) => {
        this.incidentList = res.data;
        this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
        this.incidentTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
        
          return data[sortHeaderId];
        };
        let searchText = (<HTMLInputElement>document.getElementById("searchIncident")).value;
        
        this.incidentTableDataSource.sort = this.sort1;
        this.incidentTableDataSource.paginator = this.paginator1;
        this.applyFilterIncident();

        //this.spinner.hide();
      });
    });
  }
  applyFilter() {
    this.complaintTableDataSource.filter = this.searchText.trim().toLowerCase();
    this.methodFilterPredicate();
  }
  applyFilterIncident() {
    this.incidentTableDataSource.filter = this.searchTextIncident.trim().toLowerCase();
    this.methodFilterPredicateIncident();
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i = 0;
    this.messageService.OnSelect(i);
  }
}

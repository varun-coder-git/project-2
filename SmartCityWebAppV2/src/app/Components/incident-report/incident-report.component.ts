import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort ,Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentDetailComponent } from '../incident-detail/incident-detail.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { NgxSpinnerService } from "ngx-spinner";




@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.css']
})
export class IncidentReportComponent implements OnInit {


  
  id = '';

  user_id: any;
  token: any;
  DATA: any;
  incidentList: any;
  searchText: any;

  incidentColumns = ['ward', 'incident_title', 'incident_id', 'incident_type', 'submission_date', 'status', 'A']
  incidentTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private service: ApiService,
    private toastr: ToastrService,
    private messageService: ParentChildCommunicationService,
    private router: Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getIncident();

  }


  openDialog(incidentObject: any): void {
    //console.log("inside parent", incidentObject);
    const dialogRef = this.dialog.open(IncidentDetailComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: incidentObject
    });

    dialogRef.afterClosed().subscribe(result => {
    
      this.getResultWithSearchFilter();
    });
  }
  getResultWithSearchFilter(){

    this.service.getIncident(this.DATA).subscribe((res) => {

    
      this.incidentList = res.data;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      
      this.incidentTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;

      this.incidentTableDataSource.sort = this.sort;
      this.incidentTableDataSource.paginator = this.paginator;
      this.applyFilter();
    },
    
    
  (err ) =>
   {

    if(err == "Data Not Found"){
      this.incidentList=undefined;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.incidentTableDataSource.sort = this.sort;
      this.incidentTableDataSource.paginator = this.paginator;
      this.applyFilter();
    }
    else
    this.toastr.warning("Oops...Something went wrong!")
    // this.error = err.message;
   // console.log("message",err.message);
     
   }
    );
  }
  methodFilterPredicate() {
    this.incidentTableDataSource.filterPredicate =

      (data: Element, filters: string) => {
     //   console.log("inside filterPredicate")
        const matchFilter: any = [];
        const filterArray = filters.split(' ');
        const columns = (<any>Object).values(data);
      //  console.log('array', filterArray);

        filterArray.forEach(filter => {
          const customFilter: any = [];
         // console.log('column', columns);
          // columns.forEach((column:any) => customFilter.push(column.includes(filter)));
          columns.forEach((column: any) => {
           // console.log("column", column)
            customFilter.push(column && column.toString().toLowerCase().includes(filter))
          });
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND toLowerCase()
      }
  }
  // ngAfterViewChecked() {
  //   window.scrollTo(0, 0);
  //   }
  getIncident() {
   this.spinner.show();
    this.service.getIncident(this.DATA).subscribe((res) => {
     this.spinner.hide();

      this.incidentList = res.data;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      this.incidentTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.incidentTableDataSource.sort = this.sort;


      this.incidentTableDataSource.paginator = this.paginator;
  
    }
    ,
    
  (err ) =>
   {

    if(err == "Data Not Found"){
      this.spinner.hide();
      this.incidentList=undefined;
      this.incidentTableDataSource = new MatTableDataSource<any>(this.incidentList);
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.incidentTableDataSource.sort = this.sort;
      this.incidentTableDataSource.paginator = this.paginator;
      this.applyFilter();
    }
    else{
      this.spinner.hide();
      this.toastr.warning("Oops...Something went wrong!");
    }
 

     
   }
    
    );
  }


  deleteIncident(idArg: any) {

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
      'incident_id': id
    }
    //console.log("obj", data);
    this.service.deleteIncident(data).subscribe((res) => {
      this.toastr.success('Incident Deleted!');
      this.getResultWithSearchFilter();
    });
  }

  applyFilter() {
    this.incidentTableDataSource.filter = this.searchText.trim().toLowerCase();
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

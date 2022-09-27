import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.services';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerDetailComponent } from '../volunteer-detail/volunteer-detail.component';


@Component({
  selector: 'app-volunteer-report',
  templateUrl: './volunteer-report.component.html',
  styleUrls: ['./volunteer-report.component.css']
})
export class VolunteerReportComponent implements OnInit {


  id = '';

  user_id: any;
  token: any;
  DATA: any;
  volunteerList: any;
  searchText: any;

  volunteerColumns = ['ward_name', 'volunteer_title', 'category_name', 'volunteer_id', 'submission_date', 'A']
  volunteerTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private service: ApiService,
    private toastr: ToastrService,
    private spinner:NgxSpinnerService,
    private messageService: ParentChildCommunicationService,
    private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getVolunteer();

  }


  openDialog(VolunteerObject: any): void {
   // console.log("inside parent", VolunteerObject);
    const dialogRef = this.dialog.open(VolunteerDetailComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: VolunteerObject
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getResultWithSearchFilter();
    });
  }
  getResultWithSearchFilter(){
    this.service.getVolunteer(this.DATA).subscribe((res) => {


      this.volunteerList = res.data;
      this.volunteerTableDataSource = new MatTableDataSource<any>(this.volunteerList);
      this.volunteerTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
     
      this.volunteerTableDataSource.sort = this.sort;
      this.volunteerTableDataSource.paginator = this.paginator;
      this.applyFilter();

    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.volunteerList=undefined;
        this.volunteerTableDataSource = new MatTableDataSource<any>(this.volunteerList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.volunteerTableDataSource.sort = this.sort;
        this.volunteerTableDataSource.paginator = this.paginator;
        this.applyFilter();
      }
      else
      this.toastr.warning("Oops...Something went wrong!")
      // this.error = err.message;
     // console.log("message",err.message);
       
     });
  }
  methodFilterPredicate() {
    this.volunteerTableDataSource.filterPredicate =

      (data: Element, filters: string) => {
       // console.log("data", data)
       // console.log("filters", filters)
        const matchFilter: any = [];
        const filterArray = filters.split(' ');
        const columns = (<any>Object).values(data);
        //console.log('array', filterArray);

        filterArray.forEach(filter => {
          const customFilter: any = [];
          // console.log('column', columns);
          // columns.forEach((column:any) => customFilter.push(column.includes(filter)));
          columns.forEach((column: any) => {
            // console.log("column", column)
            customFilter.push(column.toString().toLowerCase() && column.toString().toLowerCase().includes(filter))
          });
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND toLowerCase()
      }
  }
 
  getVolunteer() {
    this.spinner.show();
    this.service.getVolunteer(this.DATA).subscribe((res) => {
      this.spinner.hide();

      this.volunteerList = res.data;
      this.volunteerTableDataSource = new MatTableDataSource<any>(this.volunteerList);
      this.volunteerTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.volunteerTableDataSource.sort = this.sort;
      this.volunteerTableDataSource.paginator = this.paginator;

    }
    ,
    
  (err ) =>
   {

    if(err == "Data Not Found"){
      this.spinner.hide();
      this.volunteerList=undefined;
      this.volunteerTableDataSource = new MatTableDataSource<any>(this.volunteerList);
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.volunteerTableDataSource.sort = this.sort;
      this.volunteerTableDataSource.paginator = this.paginator;
      this.applyFilter();
    }
    else{
      this.spinner.hide();
      this.toastr.warning("Oops...Something went wrong!");
    }

    // this.error = err.message;
   // console.log("message",err.message);
     
   }
);
  }


  deleteVolunteer(idArg: any) {

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
      'volunteer_id': id
    }
   // console.log("obj", data);
    this.service.deleteVolunteer(data).subscribe((res) => {
      this.toastr.success('Volunteer Activity Deleted!');
      this.getResultWithSearchFilter();
    });
  }

  applyFilter() {
    this.volunteerTableDataSource.filter = this.searchText.trim().toLowerCase();
    this.methodFilterPredicate();
  }


}

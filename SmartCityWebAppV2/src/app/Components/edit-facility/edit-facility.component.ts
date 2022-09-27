import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MDBModalRef, MDBModalService, MdbTableDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { AddFacilityComponent } from '../add-facility/add-facility.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-edit-facility',
  templateUrl: './edit-facility.component.html',
  styleUrls: ['./edit-facility.component.css']
})
export class EditFacilityComponent implements OnInit {
  facilityData: any;

  searchText: string = '';


  user_id: any;
  token: any;
  DATA: any;

  facilityList: any;
  facilityColumns = ['facility_name', 'facility_type', 'longitude', 'latitude', 'actions']
  facilityTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<EditFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private modalService: MDBModalService,
    private toastrService: ToastrService,
    private spinner:NgxSpinnerService
    ) { }

  ngOnInit(): void {

    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getFacility();
  }

  getFacility() {
    this.spinner.show();
    this.service.getFacility(this.DATA).subscribe((res) => {
 
       this.spinner.hide();
      this.facilityList = res.data;
      this.facilityTableDataSource = new MatTableDataSource<any>(this.facilityList);
      this.facilityTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.facilityTableDataSource.sort = this.sort;
      this.facilityTableDataSource.paginator = this.paginator;
      
    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.spinner.hide();
        this.facilityList=undefined;
        this.facilityTableDataSource = new MatTableDataSource<any>(this.facilityList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.facilityTableDataSource.sort = this.sort;
        this.facilityTableDataSource.paginator = this.paginator;
        this.applyFilter();
      }
      else{
        this.spinner.hide();
        this.toastrService.warning("Oops...Something went wrong!");
      }
      

     });
  }
  methodFilterPredicate(){
    this.facilityTableDataSource.filterPredicate =

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
  onClose() {
    this.dialogRef.close();
  }
  getResultWithSearchFilter(){
    this.service.getFacility(this.DATA).subscribe((res) => {
      //console.log(res);

      this.facilityList = res.data;
      this.facilityTableDataSource = new MatTableDataSource<any>(this.facilityList);
      this.facilityTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.applyFilter();
      this.facilityTableDataSource.sort = this.sort;
      this.facilityTableDataSource.paginator = this.paginator;
    
    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.facilityList=undefined;
        this.facilityTableDataSource = new MatTableDataSource<any>(this.facilityList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.facilityTableDataSource.sort = this.sort;
        this.facilityTableDataSource.paginator = this.paginator;
        this.applyFilter();
      }
      else
      this.toastrService.warning("Oops...Something went wrong!")
      // this.error = err.message;
     // console.log("message",err.message);
       
     });
  }
  addFacility(idArg: any) {
    let dialogRef = this.dialog.open(AddFacilityComponent, {
      width: '50%',
      data: idArg
    });

    dialogRef.afterClosed().subscribe(s => {

      this.getResultWithSearchFilter();
    });
  }

  deleteFaclity(idArg: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
      data:'Are you sure you want to delete?'
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
      'location_id': id
    }
    this.service.deleteFacility(data).subscribe((res) => {
      this.toastrService.success('Facility Deleted!');
      this.getResultWithSearchFilter();
    });
  }

  applyFilter() {
    this.facilityTableDataSource.filter = this.searchText.trim().toLowerCase();
    this.methodFilterPredicate();
  }

}

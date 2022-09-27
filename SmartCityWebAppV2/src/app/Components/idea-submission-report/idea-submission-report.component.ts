import { Component, OnInit, ViewChild } from '@angular/core';
import IdeaSubmissionReport, { ColoumnNames } from 'src/app/jsonFiles/IdeaSubmissionReport';
import { MatDialog } from '@angular/material/dialog';
import { IdeaSubmissionDetailsComponent } from '../idea-submission-details/idea-submission-details.component';
import { ApiService } from 'src/app/services/api.services';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
export interface IdeaSubmissionReportObject {
  [x: string]: any;
  iobj: any;
}
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-idea-submission-report',
  templateUrl: './idea-submission-report.component.html',
  styleUrls: ['./idea-submission-report.component.css']
})

export class IdeaSubmissionReportComponent implements OnInit {
  //IdeaSubmissionReport=IdeaSubmissionReport;
  // id='';
  searchText: any;
  ideaList: any;
  // maxRows=10;
  // ideaList=[

  //     {
  //             "cardType": "",
  //             "cardTitle": "",
  //             "cardDescription": "",
  //             "cardPostedOn": "",
  //             "cardLastCommentedOn": null,
  //             "cardPostedBy": "",
  //             "cardPlace": null,
  //             "cardProfileImage": null,
  //             "threadId": "",
  //             "status": "",
  //             "cardUserId": ""
  //         }



  // ];
  user_id: any;
  token: any;
  DATA: any;
  offset: any;
  recordId: any;

  ideaColumns = ['wardName', 'cardTitle', 'cardType', 'threadId', 'd_cardPostedOn', 'A']
  ideaTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: ApiService,
    private toastrService: ToastrService, private messageService: ParentChildCommunicationService,
    private spinner: NgxSpinnerService
  ) { }
  openDialog(IdeaSubmissionReportObject: any): void {
    const dialogRef = this.dialog.open(IdeaSubmissionDetailsComponent, {
      width: '70%',
      autoFocus: false,
      maxHeight: '90vh',
      data: { IdeaSubmissionReportObject }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.service.GetIdeas(this.DATA).subscribe((res) => {

        this.ideaList = res.data;
        this.ideaTableDataSource = new MatTableDataSource<any>(this.ideaList);
        this.ideaTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
        
          return data[sortHeaderId];
        };
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        // this.ideaTableDataSource.sortingDataAccessor = (data:any, sortHeaderId:any) => {
        //   if(!data[sortHeaderId]) {
        //     return this.sort.direction === "asc" ? '3' : '1';
        //   }
        //   return '2' + data[sortHeaderId].toLocaleLowerCase();
        // }
       
        this.ideaTableDataSource.sort = this.sort;
        this.ideaTableDataSource.paginator = this.paginator;
        this.applyFilter();

      });


    });
  }

  ngOnInit(): void {


    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'recordId': 1,
      "is_admin": true
      // 'offset':100
    }
    this.getIdeas();

  }
  // ngAfterViewChecked() {
  //   window.scrollTo(0, 0);
  //   }
  applyFilter() {
    this.ideaTableDataSource.filter = this.searchText.trim().toLowerCase();
    this.methodFilterPredicate();
  }
  getIdeas() {
    this.spinner.show();
    this.service.GetIdeas(this.DATA).subscribe((res) => {
      this.spinner.hide();

      this.ideaList = res.data;
      this.ideaList = res.data;
      this.ideaTableDataSource = new MatTableDataSource<any>(this.ideaList);
 
      this.ideaTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.ideaTableDataSource.sort = this.sort;
      this.ideaTableDataSource.paginator = this.paginator;
  

    },
    
  (err ) =>
   {

    if(err == "Data Not Found"){
      this.spinner.hide();
      this.ideaList=undefined;
      this.ideaTableDataSource = new MatTableDataSource<any>(this.ideaList);
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.ideaTableDataSource.sort = this.sort;
      this.ideaTableDataSource.paginator = this.paginator;
      this.applyFilter();
    }
    else{
      this.spinner.hide();
      this.toastrService.warning("Oops...Something went wrong!");
    }
    // this.error = err.message;
   // console.log("message",err.message);
     
   }

    );

  }
  methodFilterPredicate() {
    this.ideaTableDataSource.filterPredicate =

      (data: Element, filters: string) => {
        //console.log("inside filterPredicate")
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
            customFilter.push(column && column.toString().toLowerCase().includes(filter))
          });
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND toLowerCase()
      }
  }
  deleteIdea(ideaId: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(ideaId);
    })
  }

  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_Id': user_id,
      'token': token,
      'thread_id': id
    }
    //console.log("data delete", data);
    this.service.deleteIdea(data).subscribe((res) => {
      this.toastrService.success('Idea Deleted!');
      this.service.GetIdeas(this.DATA).subscribe((res) => {

        this.ideaList = res.data;
        this.ideaTableDataSource = new MatTableDataSource<any>(this.ideaList);
        this.ideaTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
        
          return data[sortHeaderId];
        };
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        
        //console.log("input search text", (<HTMLInputElement>document.getElementById("search")).value);
        this.ideaTableDataSource.sort = this.sort;
        this.ideaTableDataSource.paginator = this.paginator;
        this.applyFilter();


      },
      
  (err ) =>
   {

    if(err == "Data Not Found"){
      this.ideaList=undefined;
      this.ideaTableDataSource = new MatTableDataSource<any>(this.ideaList);
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
      this.ideaTableDataSource.sort = this.sort;
      this.ideaTableDataSource.paginator = this.paginator;
      this.applyFilter();
    }
    else
    this.toastrService.warning("Oops...Something went wrong!")
    // this.error = err.message;
   // console.log("message",err.message);
     
   }

      );
    });
  }
  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
    let i = 0;
    this.messageService.OnSelect(i);
  }

}

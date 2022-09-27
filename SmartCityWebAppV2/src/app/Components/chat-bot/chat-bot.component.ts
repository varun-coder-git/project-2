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

import { ChatbotDetailsComponent } from '../chatbot-details/chatbot-details.component';
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  id = '';

  user_id: any;
  token: any;
  DATA: any;
  chatbotList: any;
  searchText: any;

  chatbotColumns = ['ward_name', 'citizen_name', 'query', 'reported_date', 'status', 'A']
  chatbotTableDataSource = new MatTableDataSource<Element>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private service: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
   ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getChatbot();

  }


  openDialog(ChatbotObject: any): void {

    const dialogRef = this.dialog.open(ChatbotDetailsComponent, {
      width: '55%',
      maxHeight: '90vh',
      data: ChatbotObject
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getResultWithSearchFilter();

    });
  }
  getResultWithSearchFilter(){
    this.service.getChatbot(this.DATA).subscribe((res) => {


      this.chatbotList = res.data;
      this.chatbotTableDataSource = new MatTableDataSource<any>(this.chatbotList);
      this.chatbotTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      let searchText = (<HTMLInputElement>document.getElementById("search")).value;
     
      this.chatbotTableDataSource.sort = this.sort;
      this.chatbotTableDataSource.paginator = this.paginator;
      this.applyFilter();
    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.chatbotList=undefined;
        this.chatbotTableDataSource = new MatTableDataSource<any>(this.chatbotList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.chatbotTableDataSource.sort = this.sort;
        this.chatbotTableDataSource.paginator = this.paginator;
        this.applyFilter();
      }
      else
      this.toastr.warning("Oops...Something went wrong!")
      
       
     });
  
  }
  methodFilterPredicate() {
    this.chatbotTableDataSource.filterPredicate =

      (data: Element, filters: string) => {
   
        const matchFilter: any = [];
        const filterArray = filters.split(' ');
        const columns = (<any>Object).values(data);
       

        filterArray.forEach(filter => {
          const customFilter: any = [];
          
          columns.forEach((column: any) => {
           
            customFilter.push(column.toString().toLowerCase() && column.toString().toLowerCase().includes(filter))
          });
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND toLowerCase()
      }
  }
  
  getChatbot() {
      this.spinner.show();
      this.service.getChatbot(this.DATA).subscribe((res) => {
      this.spinner.hide();
      this.chatbotList = res.data;
      this.chatbotTableDataSource = new MatTableDataSource<any>(this.chatbotList);
      this.chatbotTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.chatbotTableDataSource.sort = this.sort;
      this.chatbotTableDataSource.paginator = this.paginator;
   
    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.spinner.hide();
        this.chatbotList=undefined;
        this.chatbotTableDataSource = new MatTableDataSource<any>(this.chatbotList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.chatbotTableDataSource.sort = this.sort;
        this.chatbotTableDataSource.paginator = this.paginator;
        this.applyFilter();
      }
      else{ this.toastr.warning("Oops...Something went wrong!");
        this.spinner.hide();
      }
     
   
       
     });
  }


  deleteChatbot(idArg: any) {

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
      'chatbot_id': id
    }
    
    this.service.deleteChatbot(data).subscribe((res) => {
      this.toastr.success('Chatbot Record Deleted!');
      this.getResultWithSearchFilter();
    });
  }

  applyFilter() {
    this.chatbotTableDataSource.filter = this.searchText.trim().toLowerCase();
    this.methodFilterPredicate();
  }

}

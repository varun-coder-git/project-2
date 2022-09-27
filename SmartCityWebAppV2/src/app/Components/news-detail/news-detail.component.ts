import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { HttpClient } from '@angular/common/http';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  newsData: any;
  newsImagePath:any=true;
  user_id: any;
  token: any;
  obj1: any;
  obj3: any;
  userComment: any;
  selected: any;
  selectedStatus: any;
  url :any;
  // url = 'http://164.52.208.77:3002/';

  offset: number = 0;
  getCommentLength: any;
  offsetStatus: any;
  user_name: any;
  imgPath: any;
  thumbnailArray: string[] = [];
  downloadText: any;
  news_media: any;
  count = 0;
  commentForm:any=FormGroup;
  newsStatusForm: FormGroup;
  count1 = 1;
  contentArray: any;
  selectedStatusId: any;
  constructor(public dialogRef: MatDialogRef<NewsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private dialog: MatDialog, private http: HttpClient) { }

  ngOnChanges() {

  }
  ngOnInit(): void {

    this.url=this.service.expressApiUrl;
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }

    this.getNewsDetails();
    this.initForm();
  }

//   checkCommentEntry(){

//     if( (<HTMLInputElement>document.getElementById("comment")).value !== ""){
//       let user_Id = localStorage.getItem('user_id');
//       let token = localStorage.getItem('token');
//       let obj1 = {
//         'user_id': user_Id,
//         'token': token,
  
//       }
//       let obj2 = {
//         'newsID': this.newsData.newsID,
//         'comment': this.userComment
//       }
  
//       let obj3 = {
//         ...obj1, ...obj2
//       }

//       this.service.AddNewsComment(obj3).subscribe(res => {
//         this.toastrService.success('Comment added successfully!');
//         this.getNewsDetails();
//       },
//         error => {
//           this.toastrService.warning('Oops! Something went wrong.');
//         }
//       )
//       this.userComment = '';
           
//     }else{
//        // document.getElementById("start_button").disabled = false;
//        this.toastrService.warning('Plz leave your comment!');

//     }           
// }  

  getNewsDetails() {
    this.offset = this.offset + 3;
    let obj2 = {

      'ID': this.data.id,
      'offset': this.offset
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.getNewsById(obj3).subscribe(res => {
      this.newsData = res.data[0];
      
      if(this.newsData.image == " ")
      this.newsImagePath=false;

    });
  }





  onClose() {
    this.dialogRef.close();
  }
  onKeydown(event:any){
    event.preventDefault();
  }

  addNewsComment() {


    this.userComment=this.commentForm.controls["comment"].value;
    let user_Id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_Id,
      'token': token,

    }
    let obj2 = {
      'newsID': this.newsData.newsID,
      'comment': this.userComment
    }

    let obj3 = {
      ...obj1, ...obj2
    }
 
    //console.log(this.userComment);
    //if(this.userComment.trim().length === 0){
      if (this.userComment == '' || this.userComment == '\n'||this.userComment == '\n\n'|| this.userComment == '\t' || this.userComment === null || this.userComment === undefined)
      {
        this.toastrService.warning('Plz leave your comment!');
      
        this.commentForm.controls["comment"].value=null;
        this.commentForm.get('comment').reset();
  
      }  
      
        
  
      else {
       // console.log("usercomment", this.userComment);
        this.service.AddNewsComment(obj3).subscribe(res => {
          this.toastrService.success('Comment added successfully!');
          this.getNewsDetails();
        },
          error => {
            this.toastrService.warning('Oops! Something went wrong.');
          }
        )
        this.commentForm.markAsPristine();
        this.commentForm.markAsUntouched();
        this.commentForm.reset();
      }
  
  //  }
   
  }
  initForm() {
    this.commentForm = new FormGroup({
      'comment': new FormControl('',[Validators.required]),
    },



    );
  }
  get f() { return this.commentForm.controls; }
  get today() { return new Date() }
  deleteNewsComment(commentId: any, isAdmin: boolean, commentUserId: any) {
    //console.log(commentId)
    if (isAdmin == false || commentUserId == this.user_id) {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        data: 'Are you sure you want to delete?'
      })
      dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
        if (showSnackBar) this.requestDelete(commentId);
      })
    }
    else
      this.toastrService.warning("Sorry! You cannot delete other Admin's comment!");
  }


  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'commentID': id
    }
    //console.log(data)
    this.service.deleteNewsComment(data).subscribe((res) => {
      if (res.status)
        this.toastrService.success('Comment Deleted!');
      else
        this.toastrService.warning('Oops! Something went wrong.');

      this.getNewsDetails();
    });
  }

}

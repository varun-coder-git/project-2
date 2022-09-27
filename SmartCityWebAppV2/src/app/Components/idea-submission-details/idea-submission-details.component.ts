import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdeaSubmissionReportComponent, IdeaSubmissionReportObject } from '../idea-submission-report/idea-submission-report.component';
import Details from '../../jsonFiles/IdeaSubmissionDetails';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-idea-submission-details',
  templateUrl: './idea-submission-details.component.html',
  styleUrls: ['./idea-submission-details.component.css']
})
export class IdeaSubmissionDetailsComponent implements OnInit {
  Details = Details;
  url:any;
  // url='http://164.52.208.77:3002/';
  offset:number=0;
  ideaList = {
    "Image": null,
    "Name": "",
    "IdeaDescription": "",
    "IdeaNumber": 0,
    "Title": "",
    "SubmissionDate": "",
    "category_id": 0,
    "category_name":"",
    "ward_name":"",
    "attachment":"",
    "address":"",
    "Comment": [
      {
        "Image": null,
        "PerconCommentId": 0,
        "Name": "",
        "CommentDescription": "",
        "IdeaNumber": 0,
        "DateOfComment": ""
      },
      {
        "Image": null,
        "PerconCommentId": 0,
        "Name": "",
        "CommentDescription": "",
        "IdeaNumber": 0,
        "DateOfComment": ""
      },
      {
        "Image": null,
        "PerconCommentId": 0,
        "Name": "",
        "CommentDescription": "",
        "IdeaNumber": 0,
        "DateOfComment": ""
      }
    ]
  };
  thumbnailArray:string[]=[];
  downloadText:any;
  iconList = [
    { type: 'png', icon: 'fa fa-file-image-o' },
    { type: 'gif', icon: 'fa fa-file-image-o' },
    { type: 'bmp', icon: 'fa fa-file-image-o' },
    { type: 'pdf', icon: 'fa fa-file-pdf-o' },
    { type: 'jpg', icon: 'fa fa-file-image-o' },
    { type: 'jpeg', icon: 'fa fa-file-image-o' },
    { type: 'mp4', icon: 'fa fa-file-video-o' },
    { type: 'mp3', icon: 'fa fa-file-audio-o' },
    { type: 'mov', icon: 'fa fa-file-video-o' },
    { type: 'wmv', icon: 'fa fa-file-video-o' },
    { type: 'avi', icon: 'fa fa-file-video-o' },
    { type: 'fly', icon: 'fa fa-file-video-o' },
    { type: 'avchd', icon: 'fa fa-file-video-o' },
    { type: 'fly', icon: 'fa fa-file-video-o' },
    { type: 'webm', icon: 'fa fa-file-video-o' },
    { type: 'mkv', icon: 'fa fa-file-video-o' },
    { type: 'jfif', icon: 'fa fa-file-image-o' },
    { type: 'tiff', icon: 'fa fa-file-image-o' },
    { type: 'hiec', icon: 'fa fa-file-image-o' },
    { type: 'xbm', icon: 'fa fa-file-image-o' },
    { type: 'cur', icon: 'fa fa-file-image-o' },
    { type: 'ico', icon: 'fa fa-file-image-o' },
    { type: 'doc', icon: 'fa fa-file-word-o' },
    { type: 'docx', icon: 'fa fa-file-word-o' },
    { type: 'odt', icon: 'fa fa-file-word-o' },
    { type: 'docm', icon: 'fa fa-file-word-o' },
    { type: 'xlsx', icon: 'fa fa-file-excel-o' },
    { type: 'xlsm', icon: 'fa fa-file-excel-o' },
    { type: 'xls', icon: 'fa fa-file-excel-o' },
    { type: 'txt', icon: 'fa fa-file-text' },
    { type: 'html', icon: 'fa fa-file-text' },
    { type: 'csv', icon: 'fa fa-file-text' },
    { type: 'webp', icon: 'fa fa-file-text' },
    { type: 'pptx', icon: 'fa fa-file-powerpoint-o' },
    { type: 'ppt', icon: 'fa fa-file-powerpoint-o' },
  ];
  userComment: any;
  user_id: any;
  token: any;
  DATA: any;
  DATA1: any;
  user_name:any;
  idea_media:any;
  imgPath:any;
  count=0;
  getCommentLength:any;
  constructor(public dialogRef: MatDialogRef<IdeaSubmissionReportComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IdeaSubmissionReportObject, private service: ApiService,
    private toastrService: ToastrService,private http: HttpClient) { }


  ngOnInit(): void {
    this.url=this.service.expressApiUrl+"/";
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getIdeaSummary();
  }
  OnClose() {
    this.dialogRef.close();
  }
  getIdeaSummary() {
    let is_admin:boolean=true;
    var id = this.data;
    this.offset=this.offset+3;
    // console.log("DATA",id.IdeaSubmissionReportObject);
    this.DATA1 = {
      'user_id': this.user_id,
      'token': this.token,
      'offset':this.offset,
      // 'is_admin':"true"
    }
    this.service.GetIdeaSummary(this.DATA1, id.IdeaSubmissionReportObject,is_admin).subscribe((res) => {
      // console.log(res);
      
      this.ideaList = res.Details[0];
      this.getCommentLength=this.ideaList.Comment.length;
     // console.log("ideaList", this.ideaList);


      this.idea_media=this.ideaList.attachment;
      //if(this.complaint_media)
      //console.log('at',typeof this.idea_media.attachment)
      this.downloadText= (this.idea_media.length == 0)?"No attachments available":"Download all attachments";

      //console.log(this.thumbnailArray);

      if(this.idea_media.length !== 0 &&this.count==0)
      this.getThumbnails();

    });

  }
  // getCommntLength(){
  //   if(this.getCommentLength>3)
  //   return true;
  //   else 
  //   return false;
  // }

  getThumbnails(){
    this.count++;
    //console.log(this.idea_media.length);
    for(let i=0;i<this.idea_media.length;i++){
      let path=this.idea_media[i].attachment;
      //console.log("media",path);
      //path.split("/").pop();
      let filepath:string=path.substr(path.lastIndexOf('/') + 1);
     // console.log("media",filepath);
      this.thumbnailArray.push(filepath);
    }
   //console.log("thumbnails",this.thumbnailArray);
  }
  getFileExtension(filename:any) {
    let ext = filename.split('.').pop();
    let obj = this.iconList.filter(row => {
      if (row.type === ext) {
        return true;
      }
      else 
      return false;
    });
    if (obj.length > 0) {
      let icon = obj[0].icon;
      return icon;
    } else {
      return '';
    }
  }

  downloadZip(media:any) {

     let zip = new JSZip();
    let filename:any;
    for(let i=0;i<media.length;i++){
      filename=this.thumbnailArray[i];
      let fileData=  this.loadSvgData(this.url + media[i].attachment).then(function result(res:any) {
        return res;
      });
      zip.file(filename,fileData);
    }
    zip.generateAsync({ type: "blob" })
    .then(blob => saveAs(blob, "Idea-"+this.data.IdeaSubmissionReportObject+".zip"));

    }
  
    private async loadSvgData(url:any) : Promise<any>{
   

    return this.http.get(url, { responseType: "arraybuffer" }).toPromise();
            

             
  }

  // private loadSvgData(url: string, callback: Function,filename:any) : void{
  //   this.http.get(url, { responseType: "arraybuffer" })
  //            .subscribe(x => callback(x,filename));
  // }

  // private saveAsZip(content: Blob,filename:any) : void{
  //   let zip = new JSZip();
   
  //   zip.file(filename,content);
   
  //   zip.generateAsync({ type: "blob" })
  //      .then(blob => saveAs(blob,'SmartCity.zip'));
  // };

 
  addIdeaComment() {

    let parent_thread_id = this.data.IdeaSubmissionReportObject;
    let idea_cat_id = this.ideaList.category_id;
    let user_Id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_Id': user_Id,
      'token': token,
      
    }
    let obj2 = {
      'parent_thread_id': parent_thread_id,
      'idea_cat_id': idea_cat_id,
      'description':this.userComment

    }
    let obj3 = {
      ...obj1, ...obj2
    }

    //console.log(obj3);

    //console.log(obj3);
    if(this.userComment==''||this.userComment=='\n'||this.userComment=='\t'||this.userComment===null||this.userComment===undefined)
    this.toastrService.warning('Plz leave your comment!');

    else{
      this.service.AddIdeaComment(obj3).subscribe(res => {
        this.toastrService.success('Comment added successfully!');
        this.getIdeaSummary();
      },
        error => {
          this.toastrService.warning('Oops! Something went wrong.');
        }
      )
      this.userComment = '';
    }

    this.userComment = '';

  }
  onKeydown(event:any){
    event.preventDefault();
  }
  deleteIdeaComment(commentId: any,adminFlag:boolean,commentUserId:any) {
   // console.log("comment Id", commentId);
    if(adminFlag == false || this.user_id == commentUserId){
      const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
        data:'Are you sure you want to delete?'
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
      'response_Id': id
    }
    this.service.DeleteIdeaComment(data).subscribe((res) => {
      this.toastrService.success('Comment Deleted!');
      this.getIdeaSummary();
    });
  }
}

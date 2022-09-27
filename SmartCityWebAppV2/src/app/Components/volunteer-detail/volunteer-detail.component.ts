import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

import * as JSZip from 'jszip';
//import * as JSZipUtils from '../../../../node_modules/jszip-utils';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer-detail',
  templateUrl: './volunteer-detail.component.html',
  styleUrls: ['./volunteer-detail.component.css']
})
export class VolunteerDetailComponent implements OnInit {

  volunteerData: any;
  volunteer_media: any;
  user_id: any;
  token: any;
  obj1: any;
  obj3: any;
  userComment: any;
  selected: any;
  selectedStatus: any;
  // url='http://164.52.208.77:3002/';
  url :any;
  volunteerStatus: any;
  offset: number = 0;
  getCommentLength: any;
  offsetStatus: any;
  user_name: any;
  imgPath: any;
  uploadFiles: any;
  thumbnailArray: string[] = [];
  downloadText: any;
  iconList = [
    { type: 'png', icon: 'fa fa-file-image-o' },
    { type: 'mp3', icon: 'fa fa-file-audio-o' },
    { type: 'gif', icon: 'fa fa-file-image-o' },
    { type: 'bmp', icon: 'fa fa-file-image-o' },
    { type: 'pdf', icon: 'fa fa-file-pdf-o' },
    { type: 'jpg', icon: 'fa fa-file-image-o' },
    { type: 'jpeg', icon: 'fa fa-file-image-o' },
    { type: 'mp4', icon: 'fa fa-file-video-o' },
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
  count = 0;
  volunteerStatusForm: FormGroup;
  selectedStatusId:any;

  contentArray:[]=[];
  zip = new JSZip();

  constructor(public dialogRef: MatDialogRef<VolunteerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private http: HttpClient) { }


  ngOnInit(): void {

    window.scrollTo(0, 0);
    this.volunteerStatusForm = new FormGroup({
      'volunteerStatus': new FormControl('', [Validators.required]),
    });
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }
    //this.getVolunteerStatus();
    this.getVolunteerDetails();

  }

  // getVolunteerStatus() {
  //   this.service.getVolunteerStatus(this.obj1).subscribe(res => {
  //     this.volunteerStatus = res.data;

  //     //console.log(this.selected[0].key);

  //   });
  // }
  getVolunteerDetails() {
this.url=this.service.expressApiUrl+"/";
    this.offset = this.offset + 3;
    let obj2 = {

      'volunteer_id': this.data.volunteer_id,
      'offset': this.offset,
      'is_admin': "true"
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.getVolunteerById(obj3).subscribe(res => {
      this.volunteerData = res.data[0];
      // if (this.complaintStatus) {
      // this.selected = this.complaintStatus.filter((sta: any) => sta.status_name == this.complaintData.ComplaintStatus)
      // console.log(this.selected[0].complaint_status_id);
      // this.selectedStatus = this.selected[0].complaint_status_id;

      // this.complaintStatusForm.patchValue({
      //   complaintStatus: this.complaintData.ComplaintStatusId

      // });
      //}
      this.volunteer_media = this.volunteerData.media_files;
      //if(this.volunteer_media)
     // console.log('at', this.volunteer_media.length)
      this.downloadText = (this.volunteer_media.length == 0) ? "No attachments available" : "Download all attachments";

     // console.log(this.thumbnailArray);





      //  this.getCommentLength = this.complaintData.comments.length;





      if (this.volunteer_media.length !== 0 && this.count == 0)
        this.getThumbnails();
    });


  }

  getThumbnails() {
    this.count++;
    //console.log(this.volunteer_media.length);
    for (let i = 0; i < this.volunteer_media.length; i++) {
      let path = this.volunteer_media[i].media_file_name;
      //console.log("media",path);
      //path.split("/").pop();
      let filepath: string = path.substr(path.lastIndexOf('/') + 1);
      // console.log("media",filepath);
      this.thumbnailArray.push(filepath);
    }

  }
  getFileExtension(filename: any) {
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
  // onStatusChange(event: any) {

  //   this.selectedStatusId=event;
  //   console.log(event);
  //   this.obj3 = {

  //     'complaint_id': this.data.complaint_id,
  //     'complaint_status_id': event
  //   }
  // }
  // updateComplaintStatus() {

  //   let obj = {
  //     ...this.obj1, ...this.obj3
  //   }


  //   if(this.obj3===undefined || this.selectedStatusId==this.complaintData.ComplaintStatusId)
  //   this.toastr.warning("Status already exist!");

     
  //   else{
  //     this.service.updateComplaintStatus(obj).subscribe(res => {
  //       this.toastr.success("Complaint Status Updated!");
  //       this.onClose();
  //     });
  //   }
   
  // }
  onClose() {
    this.dialogRef.close();
  }


  addVolunteerComment() {

   // let idea_cat_id = this.volunteerData.category_id;
    let user_Id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_Id,
      'token': token
    }
    let obj2 = {
      'volunteer_id': this.volunteerData.volunteer_id,
     
      'comment': this.userComment


    }

    let obj3 = {
      ...obj1, ...obj2
    }

    //console.log(obj3);
    if (this.userComment == '' || this.userComment == '\n' || this.userComment == '\t'||this.userComment===null||this.userComment===undefined)
      this.toastrService.warning('Plz leave your comment!');

    else {
      //console.log("usercomment", this.userComment);
      this.service.addVolunteerComment(obj3).subscribe(res => {
        this.toastrService.success('Comment added successfully!');
        this.getVolunteerDetails();
      },
        error => {
          this.toastrService.warning('Oops! Something went wrong.');
        }
      )
      this.userComment = '';
    }

  }
 


  downloadZip(docUrl: any) {


    ///let url1 = this.url + docUrl[0].complaint_media_file;

    let zip = new JSZip();
    let filename: any;
    for (let i = 0; i < docUrl.length; i++) {
      filename = this.thumbnailArray[i];
    //  console.log(filename);
      let fileData=  this.loadSvgData(this.url + docUrl[i].media_file_name).then(function result(res:any) {
        return res;
      });
     // console.log(fileData);
      zip.file(filename,fileData);
    }

    zip.generateAsync({ type: "blob" })
       .then(blob => saveAs(blob,"Volunteer Activity-"+this.data.volunteer_id+".zip"));
  }




  private async loadSvgData(url:any) : Promise<any>{
   

    return this.http.get(url, { responseType: "arraybuffer" }).toPromise();
            

             
  }
  
  onKeydown(event:any){
    event.preventDefault();
  }
  deleteVolunteerComment(commentId: any, isAdmin: boolean, commentUserId: any) {
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
      'volunteer_id': id
    }
    this.service.deleteVolunteerComment(data).subscribe((res) => {
      if (res.status)
        this.toastrService.success('Comment Deleted!');
      else
        this.toastrService.warning('Oops! Something went wrong.');

      this.getVolunteerDetails();
    });
  }

}

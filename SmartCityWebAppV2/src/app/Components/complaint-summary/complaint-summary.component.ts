import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as JSZip from 'jszip';
//import * as JSZipUtils from '../../../../node_modules/jszip-utils';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
//import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
@Component({
  selector: 'app-complaint-summary',
  templateUrl: './complaint-summary.component.html',
  styleUrls: ['./complaint-summary.component.css']
})
export class ComplaintSummaryComponent implements OnInit {

  complaintData: any;
  complaint_media: any;
  user_id: any;
  token: any;
  obj1: any;
  obj3: any;
  obj4: any;
  userComment: any;
  selected: any;
  selectedStatus: any;
  url :any;
  // url='http://164.52.208.77:3002/';
  complaintStatus: any;complaintCategoryData:any;
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
  count = 0;
  complaintStatusForm: FormGroup;complaintCategoryForm: FormGroup;
  selectedStatusId: any;
  selectedCategoryId: any;
  contentArray: [] = [];
  zip = new JSZip();
  // complaintStatus = [

  //   {
  //     'key': '1',
  //     'value': 'Open'
  //   },
  //   {
  //     'key': '2',
  //     'value': 'In Progress'
  //   },
  //   {
  //     'key': '3',
  //     'value': 'Closed'
  //   },
  //   {
  //     'key': '4',
  //     'value': 'Rejected'
  //   },
  // ];
  constructor(public dialogRef: MatDialogRef<ComplaintSummaryComponent>, private messageService: ParentChildCommunicationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private http: HttpClient) { }


  ngOnInit(): void {
    this.url=this.service.expressApiUrl+"/";
    this.complaintStatusForm = new FormGroup({
      'complaintStatus': new FormControl('', [Validators.required]),
    });
    this.complaintCategoryForm = new FormGroup({
      'complaintCategory': new FormControl('', [Validators.required]),
    });
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }
    this.getComplaintStatus();
    this.getComplaintCategory();
    this.getComplaintDetails();

  }
  getComplaintCategory() {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj = {
      'user_id': user_id,
      'token': token,
    }

    this.service.getComplaintCategory(obj).subscribe(res => {
      this.complaintCategoryData = res.data;

    });
  }
  getComplaintStatus() {
    this.service.getComplaintStatus(this.obj1).subscribe(res => {
      this.complaintStatus = res.data;

     

    });
  }
  getComplaintDetails() {

    this.offset = this.offset + 3;
    let obj2 = {

      'complaint_id': this.data.complaint_id,
      'offset': this.offset,
      'is_admin': "true"
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.getComplaintById(obj3).subscribe(res => {
      this.complaintData = res.data[0];
  

      this.complaintStatusForm.patchValue({
        complaintStatus: this.complaintData.ComplaintStatusId

      });
      this.complaintCategoryForm.patchValue({
        complaintCategory: this.complaintData.ComplaintCategoryID

      });
      this.complaint_media = this.complaintData.complaint_media;
 
     
      this.downloadText = (this.complaint_media.length == 0) ? "No attachments available" : "Download all attachments";

   





     





      if (this.complaint_media.length !== 0 && this.count == 0)
        this.getThumbnails();
    });


  }

  getThumbnails() {
    this.count++;
    
    for (let i = 0; i < this.complaint_media.length; i++) {
      let path = this.complaint_media[i].complaint_media_file;
     
      let filepath: string = path.substr(path.lastIndexOf('/') + 1);
     
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
  onStatusChange(event: any) {

    this.selectedStatusId = event;

    this.obj3 = {

      'complaint_id': this.data.complaint_id,
      'complaint_status_id': event,
      "is_admin": true
    }
  }
  
 
  updateComplaintCategory() {
    console.log();
    this.selectedCategoryId = this.complaintCategoryForm.controls.complaintCategory.value;

    this.obj4 = {

      'complaint_id': this.data.complaint_id,
      'complaint_category_id': this.complaintCategoryForm.controls.complaintCategory.value,
      "is_admin": true
    }
    let obj = {
      ...this.obj1, ...this.obj4
    }


    if (this.obj4 === undefined ||(this.selectedCategoryId == this.complaintData.ComplaintCategoryID))
      this.toastr.warning("Category already exist!");


    else {
      this.service.updateComplaintCategory(obj).subscribe(res => {
        this.toastr.success("Complaint Category Updated!");
        this.router.navigate(['/Homepage']);
        this.onClose();
      });

    }

  }
  updateComplaintStatus() {

    let obj = {
      ...this.obj1, ...this.obj3
    }


    if (this.obj3 === undefined || this.selectedStatusId == this.complaintData.ComplaintStatusId)
      this.toastr.warning("Status already exist!");


    else {
      this.service.updateComplaintStatus(obj).subscribe(res => {
        this.toastr.success("Complaint Status Updated!");
        this.router.navigate(['/Homepage']);
        this.onClose();
      });

    }

  }
  onClose() {
    this.dialogRef.close();
  }


  addComplaintComment() {

    let idea_cat_id = this.complaintData.category_id;
    let user_Id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_Id,
      'token': token
    }
    let obj2 = {
      'thread_id': this.complaintData.complaint_id,
      'complaint_cat_id': this.complaintData.complaint_cat_id,
      'comments': this.userComment


    }

    let obj3 = {
      ...obj1, ...obj2
    }


    if (this.userComment == '' || this.userComment == '\n' || this.userComment == '\t' || this.userComment === null || this.userComment === undefined)
      this.toastrService.warning('Plz leave your comment!');

    else {
    
      this.service.AddComplaintComment(obj3).subscribe(res => {
        this.toastrService.success('Comment added successfully!');
        this.getComplaintDetails();
      },
        error => {
          this.toastrService.warning('Oops! Something went wrong.');
        }
      )
      this.userComment = '';
    }

  }
  onClickDownload(docUrl: any) {
    // var zip = new JSZip();
    //   var count = 0;
    //   var zipFilename = "zipFilename.zip";
    //  docUrl.forEach(function (url:any) {
    //     var filename = "filename";
    //     // loading a file and add it in a zip file
    //   //  JSZipUtils.getBinaryContent(url, function (err:any, data:any) {
    //       if (err) {
    //         throw err; // or handle the error
    //       }
    //       zip.file(filename, data, { binary: true });
    //       count++;
    //       if (count == docUrl.length) {
    //         // var zipFile = zip.generate({ type: "blob" });
    //         // saveAs(zipFile, zipFilename);
    //         zip.generateAsync({type:'blob'}).then(function(content) {
    //           saveAs(content, zipFilename);
    //        });
    //       }
    //     });
    //   });





  }



  downloadZip(docUrl: any) {


    

    let zip = new JSZip();
    let filename: any;
    for (let i = 0; i < docUrl.length; i++) {
      filename = this.thumbnailArray[i];
     
      let fileData = this.loadSvgData(this.url + docUrl[i].complaint_media_file).then(function result(res: any) {
        return res;
      });
     
      zip.file(filename, fileData);
    }

    zip.generateAsync({ type: "blob" })
      .then(blob => saveAs(blob,  "Complaint-"+this.data.complaint_id+".zip"));
  }


  // private loadSvgData(url:any, callback: Function, filename:any) : void{
  //   this.http.get(url, { responseType: "arraybuffer" })
  //            .subscribe(x => callback(x,filename));
  // }


  private async loadSvgData(url: any): Promise<any> {


    return this.http.get(url, { responseType: "arraybuffer" }).toPromise();



  }
  private saveAsZip(content: Blob, filename: any): void {
    let zip = new JSZip();

    zip.file(filename, content);


    zip.generateAsync({ type: "blob" })
      .then(blob => saveAs(blob, 'SmartCity.zip'));
  };
  downloadDocument(docUrl: any) {
   
    let url = this.url + docUrl[0].complaint_media_file;


    let zip = new JSZip();
    zip.file("my_file.png", url, { base64: true });
    //   zip.file("profile.png", url);
    //let imgFolder:any = zip.folder("images");
    // for (let i = 0; i < this.uploadFiles?.length; i++) {
    // imgFolder.file(this.uploadFiles[i].name, this.uploadFiles[i], { base64: true });
    // }
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        FileSaver.saveAs(content, "SmartCity.zip");
      });
    // }
    //	this.toastrService.success('Document Started Downloading!');

  }
  deleteComplaintComment(commentId: any, isAdmin: boolean, commentUserId: any) {
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

  onKeydown(event:any){
    event.preventDefault();
  }
  requestDelete(id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'comment_thread_id': id
    }
    this.service.DeleteComplaintComment(data).subscribe((res) => {
      if (res.status)
        this.toastrService.success('Comment Deleted!');
      else
        this.toastrService.warning('Oops! Something went wrong.');

      this.getComplaintDetails();
    });
  }
}

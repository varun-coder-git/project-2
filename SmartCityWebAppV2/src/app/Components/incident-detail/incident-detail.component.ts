import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createGzip } from 'zlib';
@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {

  incidentData: any;

  user_id: any;
  token: any;
  obj1: any;
  obj3: any;
  obj4:any;
  userComment: any;
  selected: any;
  selectedStatus: any;
  url :any;
  // url='http://164.52.208.77:3002/';
  incidentStatus: any;
  offset: number = 0;
  getCommentLength: any;
  offsetStatus: any;
  user_name: any;
  imgPath: any;
  thumbnailArray: string[] = [];
  downloadText: any;
  incident_media: any;
  count = 0;
  incidentCategoryData:any;
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
  incidentStatusForm: FormGroup;  incidentCategoryForm: FormGroup;
  count1 = 1;
  contentArray: any;
  selectedStatusId: any; selectedCategoryId: any;
  // zipNew= new JSZip();
  //  indexedArray= [
  //       { filename1: 'abc.png', content1: 'fa fa-file-image-o' },
  //       { filename1: 'def.pdf', content1: 'fa fa-file-pdf-o' },
  //       { filename1: 'ghi.jpg', content1: 'fa fa-file-image-o' },]

  constructor(public dialogRef: MatDialogRef<IncidentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private dialog: MatDialog, private http: HttpClient) { }

  ngOnChanges() {

  }
  ngOnInit(): void {
    this.url=this.service.expressApiUrl+"/";
    this.incidentStatusForm = new FormGroup({
      'incidentStatus': new FormControl('', [Validators.required]),
    });
    this.incidentCategoryForm = new FormGroup({
      'incidentCategory': new FormControl('', [Validators.required]),
    });
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.user_name = localStorage.getItem('full_name');
    this.imgPath = localStorage.getItem('image');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }
    this.getIncidentStatus();
    this.getIncidentDetails();
    this.getIncidentCategory();

  }
  getIncidentCategory() {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj = {
      'user_id': user_id,
      'token': token,
    }

    this.service.getIncidentCategory(obj).subscribe(res => {
      this.incidentCategoryData = res.data;

    });
  }
  getIncidentStatus() {
    this.service.getIncidentStatus(this.obj1).subscribe(res => {
      this.incidentStatus = res.data;

      //console.log(this.selected[0].key);

    });
  }
  getIncidentDetails() {
    this.offset = this.offset + 3;
    let obj2 = {

      'incident_id': this.data.incident_id,
      'offset': this.offset,
      'is_admin': "true"
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.getIncidentById(obj3).subscribe(res => {
      this.incidentData = res.data[0];


      //  if (this.incidentStatus) {
      // this.selected = this.incidentStatus.filter((sta: any) => sta.incident_status_type == this.incidentData.Incident_Status)
      // console.log(this.selected);
      //console.log(this.selected[0].incident_status_id);ncident_StatusId
      // this.selectedStatus = this.selected[0].incident_status_id;
      // }
      this.incidentStatusForm.patchValue({
        incidentStatus: this.incidentData.Incident_StatusId

      });

      

      this.incidentCategoryForm.patchValue({
        incidentCategory: this.incidentData.Incident_CategoryID

      });
      this.incident_media = this.incidentData.IncidentMedia;
      //if(this.complaint_media)
    //  console.log('at', this.incident_media.length)
      this.downloadText = (this.incident_media.length == 0) ? "No attachments available" : "Download all attachments";

     // console.log(this.thumbnailArray);



      this.getCommentLength = this.incidentData.comment_count;


      if (this.incident_media.length !== 0 && this.count == 0)
        this.getThumbnails();
    });
  }

  getThumbnails() {
    this.count++;
    for (let i = 0; i < this.incident_media.length; i++) {
      let path = this.incident_media[i].IncidentMedia_file;
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
  downloadDocument() {
    //console.log(docUrl[0].complaint_media_file)
    //let url=this.url+docUrl[0].complaint_media_file;
    // const link = document.createElement('a');
    // console.log(url);

    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', url);
    // link.setAttribute('download', 'img.png');
    // link.style.visibility = 'hidden';
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    // //document.body.removeChild(link);

    let zip = new JSZip();
    // zip.file("hello.txt", "Hello World\n");
    zip.file("my_file.png", "../../../assets/img/pdf.png");
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

  downloadZip(docUrl: any) {

    let zip = new JSZip();
    let filename: any;
    for (let i = 0; i < docUrl.length; i++) {
      filename = this.thumbnailArray[i];
      //console.log(filename);
      let fileData = this.loadSvgData(this.url + docUrl[i].IncidentMedia_file).then(function result(res: any) {
        return res;
      });
      // console.log(fileData);
      zip.file(filename, fileData);
    }
    zip.generateAsync({ type: "blob" })
      .then(blob => saveAs(blob, "Incident-"+this.data.incident_id+".zip"));

  }
  private async loadSvgData(url: any): Promise<any> {


    return this.http.get(url, { responseType: "arraybuffer" }).toPromise();



  }

  // private loadSvgData(url: string, callback: Function,filename:any) : void{
  //   this.http.get(url, { responseType: "arraybuffer" })
  //            .subscribe(x =>
  //             {

  //               callback(x,filename)
  //             }
  //              );
  // }

  // private saveAsZip(content: Blob,filename:any) : void{

  //   let zip= new JSZip();
  //  // zip.file(filename, content);
  //   //let imgFolder:any = zip.folder("issue");

  //   zip.file(filename,content);
  //   zip.generateAsync({ type: "blob" })
  //   .then(blob => saveAs(blob,'SmartCity.zip'));

  // };
  // createzip(contentArray:Blob){
  // // console.log(contentArray);
  //  //console.log(thumbnailArray);
  //   let zip = new JSZip();
  //  for(let i=0;i<this.thumbnailArray.length;i++){
  //     zip.file(this.thumbnailArray[i],contentArray);
  //  }



  // zip.generateAsync({ type: "blob" })
  //    .then(blob => saveAs(blob,'SmartCity.zip'));
  // }

  onStatusChange(event: any) {
    this.selectedStatusId = event;
    //console.log(event);
    this.obj3 = {

      'incident_id': this.data.incident_id,
      'incident_status_id': event
    }
  }
  updateIncidentStatus() {

    let obj = {
      ...this.obj1, ...this.obj3
    }

    //console.log(this.obj3);

    if (this.obj3 === undefined || this.selectedStatusId == this.incidentData.Incident_StatusId)
      this.toastr.warning("Status already exist!");

    else {
      this.service.updateIncidentStatus(obj).subscribe(res => {
        this.toastr.success("Incident Status Updated!");
        this.onClose();
      });
    }

  }
  updateIncidentCategory() {
    console.log();
    this.selectedCategoryId = this.incidentCategoryForm.controls.incidentCategory.value;

    this.obj4 = {

      'incident_id': this.data.incident_id,
      'incident_category_id': this.incidentCategoryForm.controls.incidentCategory.value,
      "is_admin": true
    }
    let obj = {
      ...this.obj1, ...this.obj4
    }


    if (this.obj4 === undefined ||(this.selectedCategoryId == this.incidentData.Incident_CategoryID))
      this.toastr.warning("Category already exist!");


    else {
      this.service.updateIncidentCategory(obj).subscribe(res => {
        this.toastr.success("Incident Category Updated!");
   
        this.onClose();
      });

    }

  }
  onClose() {
    this.dialogRef.close();
  }


  addIncidentComment() {

    let idea_cat_id = this.incidentData.category_id;
    let user_Id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_Id,
      'token': token,

    }
    let obj2 = {
      'incident_id': this.incidentData.Incident_Id,
      'comment': this.userComment


    }

    let obj3 = {
      ...obj1, ...obj2
    }

    //console.log(obj3);
    if (this.userComment == '' || this.userComment == '\n' || this.userComment == '\t' || this.userComment === null || this.userComment === undefined)
      this.toastrService.warning('Plz leave your comment!');

    else {
      //console.log("usercomment", this.userComment);
      this.service.AddIncidentComment(obj3).subscribe(res => {
        this.toastrService.success('Comment added successfully!');
        this.getIncidentDetails();
      },
        error => {
          this.toastrService.warning('Oops! Something went wrong.');
        }
      )
      this.userComment = '';
    }

  }
  onKeydown(event:any){
    event.preventDefault();
  }
  deleteIncidentComment(commentId: any, isAdmin: boolean, commentUserId: any) {
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
      'incident_id': id
    }
    this.service.DeleteIncidentComment(data).subscribe((res) => {
      if (res.status)
        this.toastrService.success('Comment Deleted!');
      else
        this.toastrService.warning('Oops! Something went wrong.');

      this.getIncidentDetails();
    });
  }
}

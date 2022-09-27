import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-chatbot-details',
  templateUrl: './chatbot-details.component.html',
  styleUrls: ['./chatbot-details.component.css']
})
export class ChatbotDetailsComponent implements OnInit {
  chatbotStatus: any;
  user_id: any;
  token: any;
  obj1: any;
  obj3:any;
  chatbotData:any;
  chatbotStatusForm: FormGroup;
  selectedStatusId:any;
  constructor(public dialogRef: MatDialogRef<ChatbotDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.chatbotStatusForm = new FormGroup({
      'chatbotStatus': new FormControl('', [Validators.required]),
    });
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }
    this.getChatbotDetails();
    this.getChatbotStatus();
  }
  getChatbotStatus() {
    this.service.getChatbotStatus(this.obj1).subscribe(res => {
      this.chatbotStatus = res.data;


    });
  }
  onStatusChange(event: any) {

    this.selectedStatusId=event;
    
    this.obj3 = {

      'chatbot_id': this.data.chatbot_id,
      'chatbot_status_id': event,
     
    }
  }
  getChatbotDetails() {

   
    let obj2 = {

      'chatbot_id': this.data.chatbot_id,
     
      
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
   
    this.service.getChatbotById(obj3).subscribe(res => {

      this.chatbotData = res.data[0];
   
      this.chatbotStatusForm.patchValue({
        chatbotStatus: this.chatbotData.chatbot_status_id

      });

    });


  }
  updateChatbotStatus() {

    let obj = {
      ...this.obj1, ...this.obj3
    }


    if(this.obj3===undefined || this.selectedStatusId==this.chatbotData.chatbot_status_id)
    this.toastr.warning("Status already exist!");

     
    else{
      this.service.updateChatbotStatus(obj).subscribe(res => {
        this.toastr.success("Chatbot Status Updated!");
        this.onClose();
      });
      
   }
   
  }
  onClose() {
    this.dialogRef.close();
  }

}

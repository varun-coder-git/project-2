import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { DatePipe } from '@angular/common';
import { PollService } from 'src/app/jsonFiles/poll.service';



@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {
  submitted: any;
  //pollCategoryType:any;
  pollCategoryData: any;
  isEditingEnabled: boolean = false;
  popupLabel = 'Add New Poll';
  popupIcon = 'plus';
  currentDate = new Date();
  pollForm: FormGroup;
  userName: string = '';
  isEdit: boolean = false;
  pollData: any;
  start_date_flag = false;
  end_date_flag = false;pollList:any;
  todayDate:any;
  url:any;
  constructor(
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private dialogRef: MatDialogRef<AddPollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private toastrService: ToastrService,
    private pollService: PollService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    //  this.pollCategoryType = [
    //   {
    //     'key': '1',
    //     'value': 'Unauthorized Hoardings'
    //   },
    //   {
    //     'key': '2',
    //     'value': 'Road repair/Potholes issues'
    //   },
    //   {
    //     'key': '3',
    //     'value': 'Drain and Sewage System'
    //   },
    //   {
    //     'key': '4',
    //     'value': 'Street light issues'
    //   },
    //   {
    //     'key': '5',
    //     'value': 'Garbage lifting/Area cleaning'
    //   },
    //   {
    //     'key': '6',
    //     'value': 'Water supply issues'
    //   },
    //   {
    //     'key': '7',
    //     'value': 'Illegal contruction'
    //   },
    //   {
    //     'key': '8',
    //     'value': 'Animal issues'
    //   },
    //   {
    //     'key': '9',
    //     'value': 'Public toilet issues'
    //   },
    //   {
    //     'key': '10',
    //     'value': 'Unauthorised hawkers and stalls'
    //   }
    // ];
    this.todayDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_id,
      'token': token,
    }
    this.service.getPoll(obj1).subscribe((res) => {
      

       this.pollList = res.data;
   
   
 
 

    });
    this.initForm();
    this.getPollCategory();
    if (this.data) {


      this.isEditingEnabled = false;
      this.popupLabel = 'Edit Poll';
      this.popupIcon = 'edit';
      this.isEdit = true;
      this.userName = this.data.full_name;

     

      let obj2 = {
        'poll_id': this.data.poll_id,
        'poll_options_id': this.data.poll_options_id,
        'admin_id': this.data.admin_id
      }
      let obj3 = {
        ...obj1, ...obj2
      }
     
      this.service.getPollById(obj3).subscribe(res => {
     
        this.pollData = res.data;

        let optionString = this.pollData.option_name;
        optionString = optionString.join('\n');
     
        this.pollForm.patchValue({
          poll_subject: this.pollData.poll_subject,
          start_date: this.datepipe.transform(this.pollData.start_date, 'yyyy-MM-dd'),
          end_date: this.datepipe.transform(this.pollData.end_date, 'yyyy-MM-dd'),
          poll_category_id: this.pollData.poll_cat_id,
          question_type_id: this.pollData.question_type,
          answer_choice: optionString,
          is_disable: this.pollData.is_disable

        });

        this.pollForm.controls['poll_subject'].reset({ value: this.pollData.poll_subject, disabled: true });
        this.pollForm.controls['poll_category_id'].reset({ value: this.pollData.poll_cat_id, disabled: true });
        this.pollForm.controls['question_type_id'].reset({ value: this.pollData.question_type, disabled: true });
        this.pollForm.controls['answer_choice'].reset({ value: optionString, disabled: true });
      }
        ,
        error => {
          this.toastrService.warning('Something went wrong!');
        }
      )

    }
  }

  initForm() {
    this.pollForm = new FormGroup({
      'poll_subject': new FormControl({ value: null, disabled: false }, Validators.required),
      'start_date': new FormControl({ value: null, disabled: false }, Validators.required),
      'end_date': new FormControl({ value: null, disabled: false }, Validators.required),
      'poll_category_id': new FormControl('', [Validators.required]),
      'question_type_id': new FormControl({ value: 'single', disabled: false }, Validators.required),
      'answer_choice': new FormControl({ value: null, disabled: false }, Validators.required),
      'is_disable': new FormControl()
    },



    );
  }
  get f() { return this.pollForm.controls; }
  get today() { return new Date() }

  getPollCategory() {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj = {
      'user_id': user_id,
      'token': token,
    }

    this.service.getPollCategory(obj).subscribe(res => {
      this.pollCategoryData = res.data;

    });
  }
  savePoll() {
    this.submitted = true;
    if (this.pollForm.invalid) {
      this.toastrService.warning('Please fill all required fields!');
    }
    let optionAry = this.pollForm.controls.answer_choice.value.split('\n');

    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_id,
      'token': token,
    }

    if (this.data) {



      if (this.pollData.admin_id == user_id) {
        let disable_poll_status: boolean = false;

        if (this.pollForm.controls.is_disable.value == true) {
          disable_poll_status = true;
        }
        else {
          disable_poll_status = false;
        }

        if (this.pollForm.controls.start_date.value != this.datepipe.transform(this.pollData.start_date, 'yyyy-MM-dd')) {
          this.start_date_flag = true;
        }
        if (this.pollForm.controls.end_date.value != this.datepipe.transform(this.pollData.end_date, 'yyyy-MM-dd')) {
          this.end_date_flag = true;
        }
        let obj2 = {


          //   'poll_subject': this.pollForm.controls.poll_subject.value,
          //   'start_date': this.pollForm.controls.start_date.value,
          //   'end_date': this.pollForm.controls.end_date.value,
          //   'poll_cat_id':this.pollForm.controls.poll_category_id.value,
          //   'question_type_id': this.pollForm.controls.question_type_id.value,
          //   'answer_choice': optionAry,
          //   'is_disable': disable_poll_status,
          //  'poll_options_id': this.data.poll_options_id,
          //   'poll_id': this.data.poll_id,



          'start_date': this.pollForm.controls.start_date.value,
          'end_date': this.pollForm.controls.end_date.value,
          "start_date_flag": this.start_date_flag,
          'is_disable': disable_poll_status,
          "end_date_flag": this.end_date_flag,
          'poll_id': this.data.poll_id,

        }

        let obj3 = {
          ...obj1, ...obj2
        }
        

        if (this.pollForm.controls.start_date.value > this.pollForm.controls.end_date.value) {
          this.toastrService.warning("Start date can't be greater than End date!");
        }
        else {
          this.service.updatePoll(obj3).subscribe(res => {



            this.toastrService.success('Poll Updated successfully!');
            this.pollForm.reset();
            this.onClose();
          },
            error => {
              //this.toastrService.warning('Poll already exist!');
            }
          )
        }
      }
      else
        this.toastrService.warning("Sorry! You cannot edit other Admin's poll!");
    }

    else {

      let count: number = 0;
      for (let i = 0; i < optionAry.length; i++) {
        if (optionAry[i] == "" || optionAry[i] == "\t" || optionAry[i] === undefined || optionAry[i] === null) {
          count++;
        }
      }

      //  if(count!==0)
      //  {
      let obj2 = {

        'poll_subject': this.pollForm.controls.poll_subject.value,
        'start_date': this.pollForm.controls.start_date.value,
        'end_date': this.pollForm.controls.end_date.value,
        'poll_cat_id': this.pollForm.controls.poll_category_id.value,
        'answer_choice': optionAry,
        'question_type_id': this.pollForm.controls.question_type_id.value,

      }
      let obj3 = {
        ...obj1, ...obj2
      }

      
      

      if(this.pollList!=undefined){
        for(let i=0;i<this.pollList.length;i++){
          
          if (this.pollForm.controls.poll_subject.value === this.pollList[i].poll_subject) {
            this.toastrService.warning("Poll subject already exist!");
          }
        }
      }
  
      
      if (this.pollForm.controls.poll_subject.value == '\t' || this.pollForm.controls.poll_subject.value === null || this.pollForm.controls.poll_subject.value === undefined || this.pollForm.controls.poll_subject.value == '' || this.pollForm.controls.poll_subject.value == '\n') {
        this.toastrService.warning('Please fill all required fields!');
      }
      // else if (count !== 0) {
      //   this.toastrService.warning("Answer choice options can't be empty!");
      // }
      else if (optionAry.length <= 1 || optionAry.length > 10) {
        this.toastrService.warning("Answer choice no. of options should be between 2 to 10!");
      }
      else if (this.pollForm.controls.start_date.value > this.pollForm.controls.end_date.value) {
        this.toastrService.warning("Start date can't be greater than End date!");
      }
      

      // else if (this.pollForm.controls.poll_subject.value == this.pollData.poll_subject) {
      //   this.toastrService.warning("Poll subject already exist!");
      // }
      else {



        this.service.addPoll(obj3).subscribe(res => {

          if (res.status) {
            this.toastrService.success('Poll added successfully!');
            this.pollForm.reset();
            this.onClose();
          }

        }
        )


        //      }
      }

    }

  }

  onReset() {
    this.submitted = false;
    this.pollForm.reset();
  }
  onClose() {
    this.dialogRef.close();
  }
}

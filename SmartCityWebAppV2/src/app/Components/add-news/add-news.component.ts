import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { DatePipe } from '@angular/common';
import { PollService } from 'src/app/jsonFiles/poll.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  submitted: any;
  url :any = '';
  isURL:boolean=false;
  newsCategoryData: any;
  isEditingEnabled: boolean = false;
  urlComment:any;
  popupLabel = 'Add News';
  popupIcon = 'plus';
  newsFile:any;
  currentDate = new Date();
  newsForm: FormGroup;
  userName: string = '';
  isBreaking:any= false;
  isHide:any= false;
  newsData: any;
  start_date_flag = false;
  end_date_flag = false;newsList:any;
  offset: number = 0;
  user_id:any;
  token:any;
  isDisable=false;
  obj1:any;
  constructor(
    public datepipe: DatePipe,
    private dialogRef: MatDialogRef<AddNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiService,
    private toastrService: ToastrService,  private dialog: MatDialog, private spinner:NgxSpinnerService
    ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.urlComment=this.service.expressApiUrl;
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.obj1 = {
      'user_id': this.user_id,
      'token': this.token,
    }
  
    this.initForm();
    this.getNewsCategory();
    if (this.data) {
      
     
      this.popupLabel = 'Edit News';
      this.popupIcon = 'edit';
      this.offset = this.offset + 3;
      let obj2 = {
        'ID': this.data.id,
        'offset': this.offset
      }
      let obj3 = {
        ...this.obj1, ...obj2
      }
      this.service.editNewsById(obj3).subscribe(res => {
        this.newsData = res.data[0];
        this.newsForm.patchValue({
          newsTitle : this.newsData.title,
          newsCategoryId: this.newsData.categoryID,
          newsDescription: this.newsData.description,
          isBreakingNews: this.newsData.is_breaking,
          isHideNews: this.newsData.is_hide

        });
             
            if(this.newsData.image !== " "){
              this.isURL=true;
              this.url= this.service.expressApiUrl+"/"+this.newsData.image;
            }
          
            if(this.newsData.is_disable == true){
              this.isDisable=true;
              this.newsForm.controls['isBreakingNews'].reset({ value: this.newsData.is_breaking, disabled: true });
            }
       //this.newsForm.controls['isBreakingNews'].reset({ value: this.newsData.is_breaking, disabled: true });
        // this.pollForm.controls['poll_category_id'].reset({ value: this.pollData.poll_cat_id, disabled: true });
        // this.pollForm.controls['question_type_id'].reset({ value: this.pollData.question_type, disabled: true });
        // this.pollForm.controls['answer_choice'].reset({ value: optionString, disabled: true });
      }
        ,
        error => {
          this.toastrService.warning('Something went wrong!');
        }
      )

    }
  
  }

  initForm() {
    this.newsForm = new FormGroup({
      'newsTitle': new FormControl({ value: null, disabled: false },[ Validators.required,Validators.maxLength(500)]),
      'newsCategoryId': new FormControl('', [Validators.required]),
      'newsDescription': new FormControl({ value: null, disabled: false }, [ Validators.required,Validators.maxLength(5000)]),
      'isBreakingNews': new FormControl(),
      'isHideNews': new FormControl(),
    },



    );
  }
  get f() { return this.newsForm.controls; }
  get today() { return new Date() }

  getNewsDetails() {
    this.offset = this.offset + 3;
    let obj2 = {

      'ID': this.data.id,
      'offset': this.offset
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.editNewsById(obj3).subscribe(res => {
      this.newsData = res.data[0];
    
    });
  }
  getNewsCategory() {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj = {
      'user_id': user_id,
      'token': token,
    }

    this.service.getNewsCategory(obj).subscribe(res => {
      this.newsCategoryData = res.data;

    });
  }
  

  saveNews() {
    this.submitted = true;
    if (this.newsForm.invalid) {
      this.toastrService.warning('Please fill all required fields!');
    }


    else{
      if (this.data) {



        if (this.newsData.admin_id == this.user_id) {
       
          // let obj2 = {  
  


          //   'title': this.newsForm.controls.newsTitle.value,
          //   'category_id': this.newsForm.controls.newsCategoryId.value,
          //   "description": this.newsForm.controls.newsDescription.value,
          //   'is_breaking': this.isBreaking,
          //   "is_hide": this.isHide,
          //   'news_id': this.data.id,
  
          // }
  
          // let obj3 = {
          //   ...this.obj1, ...obj2
          // }
          
  
          let formData = new FormData();
       
		    
           formData.append("file",this.newsFile);
           formData.append("user_id",this.user_id);
           formData.append("token",this.token);
           formData.append("title",this.newsForm.controls.newsTitle.value);
           formData.append("category_id",this.newsForm.controls.newsCategoryId.value);
           formData.append("description",this.newsForm.controls.newsDescription.value);
           formData.append("is_breaking",this.newsForm.controls.isBreakingNews.value);
           formData.append("is_hide",this.newsForm.controls.isHideNews.value);
           formData.append("news_id",this.data.id);
           formData.append("isURL",this.isURL.toString());
           this.spinner.show();
            this.service.updateNews(formData).subscribe(res => {
  
  
  
              this.toastrService.success('News Updated successfully!');
              this.spinner.hide();
              this.newsForm.reset();
              this.onClose();
            },
              error => {
                //this.toastrService.warning('Poll already exist!');
              }
            )
          
        }
        else
          this.toastrService.warning("Sorry! You cannot edit other Admin's news!");
      }
  
  
      else {

        let title = document.getElementById("title");

        
  
      
        let formData = new FormData();
       
		    
       formData.append("file",this.newsFile);
        formData.append("user_id",this.user_id);
        formData.append("token",this.token);
        formData.append("title",this.newsForm.controls.newsTitle.value);
        formData.append("category_id",this.newsForm.controls.newsCategoryId.value);
        formData.append("description",this.newsForm.controls.newsDescription.value);
        formData.append("is_breaking",this.isBreaking);
        formData.append("is_hide",this.isHide);
        
        

        this.spinner.show();
        this.service.addNews(formData).subscribe(res => {
  
          if (res.status) {
            this.toastrService.success('News added successfully!');
            this.spinner.hide();            
            this.newsForm.reset();
            this.onClose();
          }
  
        }
        )
      }
  

    }
    
   
  }
  
  isBreakingNews(event:any){
    this.isBreaking=event.checked;
  }
  isHideNews(event:any){
    this.isHide=event.checked;
  }
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {

      if(event.target.files[0].size < 5242880){
    
        this.newsFile=event.target.files[0];
     
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    
      reader.onload = (event) => { // called once readAsDataURL is completed

        this.url = reader.result;
        
        this.isURL=true;
      }
    }
    else{
      this.toastrService.warning("File size should not be more than 5MB!");
    }
  }
  }
  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = reader.result;
  //     }
  //   }
  // }
  deleteNewsFile(){
    this.url = null;
    this.isURL=false;
    this.newsFile=undefined;
  }
  deleteNewsComment(commentId: any, isAdmin: boolean, commentUserId: any) {
    
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
    
    this.service.deleteNewsComment(data).subscribe((res) => {
      if (res.status)
        this.toastrService.success('Comment Deleted!');
      else
        this.toastrService.warning('Oops! Something went wrong.');

      this.getNewsDetails();
    });
  }
  
  onReset() {
    this.submitted = false;
    this.newsForm.reset();
  }
  onClose() {
    this.dialogRef.close();
  }

}

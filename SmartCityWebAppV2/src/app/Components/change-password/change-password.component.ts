import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user_id:any;
  token:any;
  DATA:any;
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  hideOld = true;hideNew = true;hideConfirm = true;
  head_title="Thiruvananthapuram Connect";
  matcher = new ErrorStateMatcher();
  constructor(

    private router: Router,
    private service: ApiService,
    private toastrService: ToastrService,
    private cookieService: CookieService
  ) {


  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.changePasswordForm = new FormGroup({
      'oldPassword': new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&\d0-9].{3,}')]),
      'newPassword': new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&\d0-9].{3,}')]),
      'confirmPassword': new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&\d0-9].{3,}')]),
     
    });


    }

    onPasswordChange() {
      if (this.confirm_password == this.password) {
        this.changePasswordForm.controls['confirmPassword'].setErrors(null);
      } else {
        this.changePasswordForm.controls['confirmPassword'].setErrors({ mismatch: true });
      }
    }
    
    // getting the form control elements
    get password(): AbstractControl {
      return this.changePasswordForm.controls['newPassword'].value;
    }
    
    get confirm_password(): AbstractControl {
      return this.changePasswordForm.controls['confirmPassword'].value;
    }
   changePassword(){
    if (this.changePasswordForm.invalid) {

     // this.toastrService.warning('Invalid Entry!');
      return;
    }
    else{
      this.DATA = {
        'user_id': this.user_id,
        'token': this.token,
        'old_password': this.changePasswordForm.controls['oldPassword'].value,
        'new_password': this.changePasswordForm.controls['newPassword'].value,
   
      }
      this.service.changePassword(this.DATA).subscribe((res) => {
        this.toastrService.success("Password updated successfully!");
        
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('userName');
        localStorage.removeItem('image');
        localStorage.removeItem('email');
        localStorage.removeItem('facility_id');
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('encrypt_username');
        localStorage.removeItem('encrypt_password');

        this.router.navigate(['/Login']);
       },
       
       
        (err ) =>
        {
  
        if(err == "Old Password doesn't match"){
          this.toastrService.error("Incorrect old password!")
        }
        else
         this.toastrService.error("Oops...Something went wrong!")
  
          
        }
       );
   }}

  get f() { return this.changePasswordForm.controls; }

}

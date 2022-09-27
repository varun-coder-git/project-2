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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user_id:any;
  token:any;
  DATA:any;
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  hideNew = true;hideConfirm = true;
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
    this.resetForm = new FormGroup({
      'newPassword': new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&\d0-9].{3,}')]),
      'confirmPassword': new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&\d0-9].{3,}')]),
     
    });
}

onPasswordChange() {
  if (this.confirm_password == this.password) {
    this.resetForm.controls['confirmPassword'].setErrors(null);
  } else {
    this.resetForm.controls['confirmPassword'].setErrors({ mismatch: true });
  }
}

// getting the form control elements
get password(): AbstractControl {
  return this.resetForm.controls['newPassword'].value;
}

get confirm_password(): AbstractControl {
  return this.resetForm.controls['confirmPassword'].value;
}
resetPassword(){
if (this.resetForm.invalid) {

  //this.toastrService.warning('Invalid entry!');
  return;
}
else{
  let email=localStorage.getItem('email');
  this.DATA = {
    'email': email,
    'new_password': this.resetForm.controls['newPassword'].value,

  }
  this.service.resetPassword(this.DATA).subscribe((res) => {
    this.toastrService.success("Password updated successfully!");
    localStorage.removeItem('email');
    this.router.navigate(['/Login']);
   },
   
   
    (err ) =>
    {


      if(err == "Failed to save password"){
        this.toastrService.error("Failed to save password!")
      }
      else
     this.toastrService.error("Oops...Something went wrong!")

      
    }
   );
}}
}

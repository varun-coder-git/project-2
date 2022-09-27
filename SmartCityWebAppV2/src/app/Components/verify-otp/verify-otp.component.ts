import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {


  otpForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
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

    this.otpForm = new FormGroup({
      'OTP': new FormControl('', [Validators.required,Validators.maxLength(4)]),
     
    });

  

    }
  //   onlyNumber(evt:any) {
  //     var charCode = (evt.which) ? evt.which : evt.keyCode
  //     if (charCode > 31 && (charCode < 48 || charCode > 57)){
  //             return false;
  //         }
  //     return true;
  // }
  // checkValueLength(event:any):any{
  //   console.log(event.target.value)
  //   if(event.target.value.length==4){
  //     return false;
  //   }
  //   else
  //   return true;
    

  // }
    verifyOTP(){

      if(this.otpForm.invalid){
        //this.toastrService.warning("Please fill required field!");
        return;
      }
      else{
        let email=localStorage.getItem('email');
        let obj = {
          'email':email,
          'otp': this.otpForm.controls.OTP.value
      }
      
      this.service.verifyOTP(obj).subscribe((res) => {
       this.toastrService.success("OTP verified successfully!");
       let flag= localStorage.getItem('flag');
       if(flag == 'adminProfile'){
         localStorage.removeItem('flag')
        this.router.navigate(['/change-password']);

       }
       if(flag == 'forgotPassword'){
        localStorage.removeItem('flag')
       this.router.navigate(['/reset-password']);

      }
      if(flag == 'signUp'){
        localStorage.removeItem('flag')
        localStorage.removeItem('email');
       this.router.navigate(['/Login']);

      }
       
       },
       (err ) =>
        {
     
         if(err == "OTP doesn't match!!!"){
          this.toastrService.warning("OTP doesn't match!");
         }
         else if(err == "OTP expired"){
          this.toastrService.warning("OTP expired!");
         }
         else
         this.toastrService.error("Oops...Something went wrong!")
        
          
        }
       );
      }
    
    }
    logout(){
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
    }
    resendOTP(){
      let email=localStorage.getItem('email');
      let obj = {
        'email':email
    }
     //console.log(obj);
    this.service.resendOTP(obj).subscribe((res) => {
     this.toastrService.success("OTP sent to registered email-id!");
     });
    }
  get f() { return this.otpForm.controls; }

}

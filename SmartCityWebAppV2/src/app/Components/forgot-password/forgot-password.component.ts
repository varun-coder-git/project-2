import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
import { ThrowStmt } from '@angular/compiler';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

 
  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  head_title="Thiruvananthapuram Connect";
  matcher = new ErrorStateMatcher();
  captchaCode:any;
  constructor(

    private router: Router,
    private service: ApiService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {


  }

  ngOnInit() {

    this.forgotForm = new FormGroup({
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'captcha': new FormControl(null, [Validators.required]),
    });

    this.getCaptchaCode();

    }

    verifyCaptchaCode(){

      if (this.forgotForm.invalid) {

        // this.toastrService.warning('Invalid !');
        return;
      }
      else{
  
       if(this.forgotForm.controls.captcha.value  == this.captchaCode){
        this.spinner.show();
        this.service.forgotPassword({'email': this.forgotForm.controls.email.value}).subscribe((res) => {
        this.spinner.hide();
            localStorage.setItem('email',this.forgotForm.controls.email.value);
            localStorage.setItem('flag','forgotPassword');
            this.toastrService.success("OTP sent to your registered email id!");
            this.router.navigate(['/verify-otp']);
          
         }
         ,
         
     (err ) =>
      {
   
       if(err == "Data Not Found"){
        this.spinner.hide();
        this.toastrService.error("You are not registered member!");
        this.router.navigate(['/Login']);
       }
       else if(err == "Invalid credentials."){
        this.spinner.hide();
        this.toastrService.error("Invalid credentials!");
      
       }
       else{
        this.spinner.hide();
        this.toastrService.error("Oops...Something went wrong!")
       }
       
       // this.error = err.message;
      // console.log("message",err.message);
        
      }
         );
       
       
      }
      else{
        this.toastrService.error("Captcha code doesn't matched!");
      }
    }
    }
   getCaptchaCode(){
    // this.captchaCode = require("randomstring");
    // this.captchaCode.generate(6);
    this.captchaCode='';
    
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
      this.captchaCode += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   }

   
  get f() { return this.forgotForm.controls; }

}

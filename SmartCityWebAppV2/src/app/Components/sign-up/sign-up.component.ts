import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  hideConfirm = true;
  pincodeList:any;
  ward_id:any;
  selectedPincode:any;
  head_title="Thiruvananthapuram Connect";

  matcher = new ErrorStateMatcher();
  constructor(

    private router: Router,
    private service: ApiService,
    private toastrService: ToastrService,
    private cookieService: CookieService,
    private spinner:NgxSpinnerService
  ) {


  }

  ngOnInit() {
    this.getPincodeList();
    this.signupForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required,Validators.maxLength(50),Validators.minLength(1)]),
      'phoneNumber': new FormControl(null, [Validators.required,Validators.pattern(("[6-9]\\d{9}"))]),
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&\d0-9].{3,}')]),
      'confirmPassword': new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&\d0-9].{3,}')]),
      'city': new FormControl('Thiruvananthapuram', [Validators.required]),
      'pinCode':new FormControl(null, [Validators.required]),
    })

  }
   
  get f() { return this.signupForm.controls; }
  getPincodeList(){
    this.service.getPincodeList().subscribe((res) => {
     this.pincodeList=res.data;
    });
  }
  selectedPincodeValue(event: MatSelectChange) {
 //  this.selectedPincode=event.value;
//console.log(event.value)
this.selectedPincode=event.value;
  if(this.selectedPincode){
    for(let i=0;i<this.pincodeList.length;i++){
      if(this.selectedPincode === this.pincodeList[i].pincode){
        this.ward_id = this.pincodeList[i].ward_id;
      }
    }
  }
  }
  // All is this method
onPasswordChange() {
  if (this.confirm_password == this.password) {
    this.signupForm.controls['confirmPassword'].setErrors(null);
  } else {
    this.signupForm.controls['confirmPassword'].setErrors({ mismatch: true });
  }
}

// getting the form control elements
get password(): AbstractControl {
  return this.signupForm.controls['password'].value;
}

get confirm_password(): AbstractControl {
  return this.signupForm.controls['confirmPassword'].value;
}
  registerAdmin(){
    if (this.signupForm.invalid) {

      // this.toastrService.warning('Please fill all required fields!');
      return;
    }
    else{
      let obj = {
        'email': this.signupForm.controls.email.value,
        'password':this.signupForm.controls.password.value,
        'full_name': this.signupForm.controls.fullName.value,
        'phonenumber':this.signupForm.controls.phoneNumber.value,
        'pincode':this.selectedPincode,
        'ward_id':this.ward_id
    }
  
   
    this.spinner.show();
    this.service.registerAdmin(obj).subscribe((res) => {
     this.spinner.hide();
     localStorage.setItem('email',this.signupForm.controls.email.value);
     localStorage.setItem('flag','signUp');
     this.toastrService.success("Registration Successful!");
     this.router.navigate(['/verify-otp']);
     },
     (err ) =>
     {
  
      if(err == "Email or Phone Number already exist"){
        this.spinner.hide();
        this.toastrService.warning("Email or Phone Number already exist!")
        
      }
      else{
        this.spinner.hide();
        this.toastrService.warning("Oops...Something went wrong!")
      }
      
  
       
     }
     );
    }
    

  }
  }


 

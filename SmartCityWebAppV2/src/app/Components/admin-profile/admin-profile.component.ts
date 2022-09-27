import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
import { ThrowStmt } from '@angular/compiler';
import { MatSelectChange } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  user_id:any;
  token:any;
  DATA:any;
  bloodGroupList:any;
  adminDetails:any;
  adminProfileForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  pincodeList:any;
  ward_id:any;
  selectedPincode:any;
  selectedBloodGroup:any;
  adminImageUrl:any;
  url:any;
  head_title="Thiruvananthapuram Connect";
  adminImageFile:any;
 
  constructor(

    private router: Router,
    private service: ApiService,
    private toastrService: ToastrService,
    private cookieService: CookieService, private spinner:NgxSpinnerService
  ) {


  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.adminImageUrl=this.service.expressApiUrl;
    this.adminProfileForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required,Validators.maxLength(50),Validators.minLength(1)]),
      'phoneNumber': new FormControl(null, [Validators.required,Validators.pattern(("[6-9]\\d{9}")),Validators.maxLength(10),Validators.minLength(10)]),
      'email': new FormControl(null, [Validators.required]),
      'bloodGroup': new FormControl(null, ),
      'address':new FormControl(''),
      'alternateNumber':new FormControl('',[Validators.maxLength(10),Validators.minLength(10),Validators.pattern(("[6-9]\\d{9}"))]),
      'city': new FormControl('Thiruvananthapuram', [Validators.required]),
      'pinCode':new FormControl('', [Validators.required]),
      
    });

   this.getBloodGroupList();
   this.getPincodeList();
   this.getAdminDetails();

    }
    getBloodGroupList(){
      this.DATA = {
        'user_id': this.user_id,
        'token': this.token,
   
      }
      this.service.getBloodGroupList(this.DATA).subscribe((res) => {
       this.bloodGroupList=res.data;
      });
    }
    getAdminDetails(){
      this.DATA = {
        'user_id': this.user_id,
        'token': this.token,
   
      }
      this.spinner.show();
      this.service.getAdminDetails(this.DATA).subscribe((res) => {
        this.spinner.hide();
       this.adminDetails=res.data[0];
       if(this.adminDetails){
        this.adminProfileForm.patchValue({
          fullName: this.adminDetails.full_name,
          phoneNumber: this.adminDetails.phonenumber,
          email:this.adminDetails.email,
          bloodGroup:this.adminDetails.blood_group_id,
          address:this.adminDetails.address,
          city:this.adminDetails.city,
          pinCode:this.adminDetails.pincode,
          alternateNumber:this.adminDetails.emergency_number


        });
        this.url=this.adminImageUrl+"/"+this.adminDetails.image_path;
        this.selectedBloodGroup=this.adminDetails.blood_group_id;
        this.selectedPincode=this.adminDetails.pincode;
        this.ward_id=this.adminDetails.ward_id;
       }
      },
      (err ) =>
    {
 
     
      this.spinner.hide();
      this.toastrService.error("Oops...Something went wrong!")
     }
     
      );
    }
    getPincodeList(){
      this.service.getPincodeList().subscribe((res) => {
       this.pincodeList=res.data;
      });
    }
    selectedPincodeValue(event: MatSelectChange) {
   
  this.selectedPincode=event.value;
    if(this.selectedPincode){
      for(let i=0;i<this.pincodeList.length;i++){
        if(this.selectedPincode === this.pincodeList[i].pincode){
          this.ward_id = this.pincodeList[i].ward_id;
        }
      }
    }
    }
    selectedBloodGroupValue(event: MatSelectChange){
      
      this.selectedBloodGroup=event.value;
    }
    onSelectFile(event:any) {
      if (event.target.files && event.target.files[0]) {
  
        if(event.target.files[0].size < 5242880){
      
          this.adminImageFile=event.target.files[0];
       
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
      
        reader.onload = (event) => { // called once readAsDataURL is completed
  
          this.url = reader.result;
          
          //this.isURL=true;
        }
      }
      else{
        this.toastrService.warning("File size should not be more than 5MB!");
      }
    }
    }
    verifyOTP(){
      this.spinner.show();
      this.service.verifyOTPProfile(this.DATA).subscribe((res) => {
      this.spinner.hide();
          localStorage.setItem('email',this.adminProfileForm.controls.email.value);
          localStorage.setItem('flag','adminProfile');

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
     
      
    }
       );
    }
    updateAdminDetails(){
      if (this.adminProfileForm.invalid) {

        
        return;
      }
      else{
        let formData = new FormData();
        
         
       formData.append("file",this.adminImageFile);
       formData.append("user_id",this.user_id);
       formData.append("token",this.token);
       formData.append("full_name",this.adminProfileForm.controls.fullName.value);
       formData.append("phoneNumber",this.adminProfileForm.controls.phoneNumber.value);
       formData.append("email",this.adminProfileForm.controls.email.value);
    
       formData.append("blood_group",this.selectedBloodGroup);
       formData.append("address",this.adminProfileForm.controls.address.value);
       formData.append("city",this.adminProfileForm.controls.city.value);
       formData.append("pincode",this.adminProfileForm.controls.pinCode.value);
       formData.append("emergency_number",this.adminProfileForm.controls.alternateNumber.value);
       formData.append("ward_id",this.ward_id);
       this.spinner.show();
       this.service.updateAdminDetails(formData).subscribe((res) => {
       
       this.toastrService.success("Profile details updated successfully!");
       this.spinner.hide();
       this.router.navigate(['/HomePage']);
       
        },
        (err ) =>
        {
     
         if(err == "Phone number already exists"){
          this.spinner.hide();
          this.toastrService.warning("Phone number already exists!!")
   
         }
         else if(err == "Email already exists"){
          this.spinner.hide();
           this.toastrService.warning("Email already exists!!")
           
    
          }
          else if(err == "Internal server error"){
            this.spinner.hide();
           this.toastrService.warning("Internal server error!")
    
          }
          else if(err == "OTP send Successful!"){
            this.spinner.hide();
            localStorage.setItem('email',this.adminProfileForm.controls.email.value);
            this.router.navigate(['/verify-otp']);
           this.toastrService.warning("OTP sent Successfully to your registered email id! ");
    
          }
          
         else
         {
          this.spinner.hide();
          this.toastrService.error("Oops...Something went wrong!")
         }
         
  
          
        }
        );

      }
     
    }
  get f() { return this.adminProfileForm.controls; }


}



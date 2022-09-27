import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
import { loadModules } from 'esri-loader';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminLoginForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  head_title="Thiruvananthapuram Connect";
  matcher = new ErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ApiService,
    private toastrService: ToastrService,
    private cookieService: CookieService
  ) {


  }

  ngOnInit() {
this.componentDidMount();
    this.adminLoginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(8)]),
      'rememberMe':new FormControl(false)
    });
    
    // let username=localStorage.getItem('encrypt_username');
  
    // if(username!=null )
    // {
    //   console.log(CryptoJS.AES.decrypt(username, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8));
    // }
    
    let rememberMe:any=localStorage.getItem('rememberMe');
    let encrypt_username:any=localStorage.getItem('encrypt_username');
    let encrypt_password:any=localStorage.getItem('encrypt_password');
    if((rememberMe=='true'||rememberMe==true ) && (localStorage.getItem('user_id')==null || localStorage.getItem('user_id')==undefined||localStorage.getItem('user_id')=='') ){
    if(localStorage.getItem('token')==null||localStorage.getItem('token')==undefined){
      let decrypt_username= CryptoJS.AES.decrypt(encrypt_username, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
      let decrypt_password= CryptoJS.AES.decrypt(encrypt_password, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
    
      // this.adminLoginForm = new FormGroup({
      //   'email': new FormControl(decrypt_username, [Validators.required, Validators.email]),
      //   'password': new FormControl(decrypt_password, [Validators.required]),
      //   'rememberMe':new FormControl(false)
      // });
      this.adminLoginForm.setValue({
        email: decrypt_username,
        password:decrypt_password,
        rememberMe:true
      });
    }

    }

    
   
    this.checkRememberMe();



  }
  componentDidMount() {
    let latitude: any, longitude: any;
    const options = {
      url: "https://js.arcgis.com/4.20/",
    };

    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      // latitude = 76.9366;
      longitude = position.coords.longitude;
      //longitude = 8.5241;


      sessionStorage.setItem("currentLatitude", latitude);
      sessionStorage.setItem("currentLongitude", longitude);
    });

    // const [esriConfig,Map, MapView,Locator,Locate,Search,Graphic,GraphicsLayer,Point,WebStyleSymbol,locator] = await loadModules(["esri/config",'esri/Map', 'esri/views/MapView','esri/tasks/Locator','esri/widgets/Locate','esri/widgets/Search','esri/Graphic','esri/layers/GraphicsLayer','esri/geometry/Point',
    // 'esri/symbols/WebStyleSymbol','esri/rest/locator']);

    loadModules(
      [
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/tasks/Locator",
        "esri/widgets/Locate",
        "esri/widgets/Search",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        "esri/symbols/WebStyleSymbol",
        "esri/rest/locator",
      ],
      options
    ).then(
      ([
        esriConfig,
        Map,
        MapView,
        Locator,
        Locate,
        Search,
        Graphic,
        GraphicsLayer,
        Point,
        WebStyleSymbol,
        locator,
      ]) => {
        esriConfig.apiKey =
          "AAPKa808b66b329d4c20bedf21c30bfea58dkc4s6BDpyyhENXyDlewV2OAkuxnAGDz3LgnOk9Px1LWQBQNG3giBD5f5hX7aRB2R";

        const point = {
          //Create a point
          location: [longitude, latitude],
        };

        const locatorUrl =
          "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

        locator
          .locationToAddress(locatorUrl, point)
          .then((response: any) => {
            // If an address is successfully found, show it in the popup's content
          
           
            sessionStorage.setItem("currentAddress", response.address);
            // sessionStorage.setItem("compliantLocation", response.address);
            // sessionStorage.setItem("incidentLocation", response.address);
            // sessionStorage.setItem("ideasLocation", response.address);
            // sessionStorage.setItem("volunterLocation", response.address);
          })
          .catch(() => {
            
            navigator.geolocation.getCurrentPosition(function (position) {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              sessionStorage.setItem("currentLatitude", latitude);
              sessionStorage.setItem("currentLongitude", longitude);

              const point = {
                //Create a point
                location: [longitude, latitude],
              };

              locator.locationToAddress(locatorUrl, point).then((response: any) => {
                // If an address is successfully found, show it in the popup's content
                sessionStorage.setItem("currentAddress", response.address);
                // sessionStorage.setItem("compliantLocation", response.address);
                // sessionStorage.setItem("incidentLocation", response.address);
                // sessionStorage.setItem("ideasLocation", response.address);
                // sessionStorage.setItem("volunterLocation", response.address);
              });
            });
          });
      }
    );


  }
  checkRememberMe(){
 
    let rememberMe:any=localStorage.getItem('rememberMe');
    let encrypt_username:any=localStorage.getItem('encrypt_username');
    let encrypt_password:any=localStorage.getItem('encrypt_password');
    if((rememberMe=='true'||rememberMe==true ) && (localStorage.getItem('user_id')==null || localStorage.getItem('user_id')==undefined||localStorage.getItem('user_id')=='') ){
    if(localStorage.getItem('token')==null||localStorage.getItem('token')==undefined){
      let decrypt_username= CryptoJS.AES.decrypt(encrypt_username, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
      let decrypt_password= CryptoJS.AES.decrypt(encrypt_password, environment.encryptPassword.trim()).toString(CryptoJS.enc.Utf8);
    }

    }

   
  
    if(localStorage.getItem('user_id')!=null ||localStorage.getItem('user_id')!=undefined||localStorage.getItem('user_id')!=''){
      this.router.navigate(['/HomePage']);
    }
    
  }
  get f() { return this.adminLoginForm.controls; }

  // get input() { return this.adminLoginForm.get('email'); }

  onSubmit() {
    this.submitted = true;
   // console.log(this.adminLoginForm.value);
   // console.log(this.adminLoginForm.controls.rememberMe.value);
    let username=this.adminLoginForm.controls.email.value;
    let password=this.adminLoginForm.controls.password.value;
    let rememberMe=this.adminLoginForm.controls.rememberMe.value;
    this.cookieService.set('username', username);
    this.cookieService.set('password', password);


     localStorage.setItem('encrypt_username',CryptoJS.AES.encrypt(username.trim(), environment.encryptPassword.trim()).toString()) 

     localStorage.setItem('encrypt_password',CryptoJS.AES.encrypt(password.trim(), environment.encryptPassword.trim()).toString()) 


    //this.cookieService.set('isLoggedin',this.adminLoginForm.controls.rememberme.value);
    if (this.adminLoginForm.invalid) {

     // this.toastrService.warning('Please enter Email & Password!');
      return;
    }
    else {

     let obj={
      'email': this.adminLoginForm.controls.email.value,
      'password': this.adminLoginForm.controls.password.value,
      }
      this.service.login(obj).subscribe((res) => {


        if (res.status) {

          if (res.data.is_admin == true && res.message == "Logged in Successful") {
            localStorage.setItem('user_id', res.data.user_id);
            // console.log(localStorage.getItem('user_id'));
            localStorage.setItem('token', res.data.token);
            // localStorage.setItem('userName', res.data.userName);
            // localStorage.setItem('image', res.data.image);
            localStorage.setItem('rememberMe',rememberMe);
            // this.toastrService.success('Login Successful!');
            this.router.navigate(['/HomePage']);
          }
         
          else {
            this.toastrService.error('Email or password you entered is not correct. Please try again.');
          }

        }

      },
      (err ) =>
      {
   
       if(err == "Inactive account,please verify email first!!"){
        localStorage.setItem('email',this.adminLoginForm.controls.email.value);
        this.toastrService.warning("Inactive account,please verify email first!!!")
        this.router.navigate(['/verify-otp']);
       }
       else if(err =="Data Not Found/Account is disable"){
        this.toastrService.error('You are not registered member!');
       }
       else if(err == "Internal server error"){
        this.toastrService.error('Internal server error!');
       }
       else if(err == "Invalid Credentials"){
        this.toastrService.error('Invalid credentials!');
       }
       else if(err == "Invalid credentials."){
        this.toastrService.error('Invalid credentials!');
       }
       else
       this.toastrService.error("Oops...Something went wrong!")
       // this.error = err.message;
      // console.log("message",err.message);
        
      }
      );
    }
    this.adminLoginForm.markAsPristine();
    this.adminLoginForm.markAsUntouched();
  }

}

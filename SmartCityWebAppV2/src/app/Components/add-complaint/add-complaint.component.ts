import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { DatePipe } from '@angular/common';
import { ComplaintChangeLocationMapComponent } from '../complaint-change-location-map/complaint-change-location-map.component';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { loadModules } from 'esri-loader';

declare var $: any;
@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  pdfFileName: any;isDisabled:boolean=true;
  files: any = [];
  iconList = [
    { type: 'png', icon: 'fa fa-file-image-o' },
    { type: 'gif', icon: 'fa fa-file-image-o' },
    { type: 'pdf', icon: 'fa fa-file-pdf-o' },
    { type: 'jpg', icon: 'fa fa-file-image-o' },
    { type: 'jpeg', icon: 'fa fa-file-image-o' },
    { type: 'mp4', icon: 'fa fa-file-video-o' },
    { type: 'mpeg', icon: 'fa fa-file-video-o' },
    { type: 'jfif', icon: 'fa fa-file-image-o' },
    { type: 'doc', icon: 'fa fa-file-word-o' },
    { type: 'docx', icon: 'fa fa-file-word-o' },
    { type: 'xlsx', icon: 'fa fa-file-excel-o' },
    { type: 'xls', icon: 'fa fa-file-excel-o' },
    { type: 'txt', icon: 'fa fa-file-text' },
    { type: 'pptx', icon: 'fa fa-file-powerpoint-o' },
    { type: 'ppt', icon: 'fa fa-file-powerpoint-o' },
    { type: 'csv', icon: 'fa fa-file-text' },
  ];
  thumbnailArray: string[] = [];
  selectedProductDocuments: any;
  isURL: any = false; ispdfURL: any = false;locationShow: any = false;locationHide: any = true;
  submitted: any;submittedMobile: any;
  //pollCategoryType:any;
  complaintCategoryData: any;
  isEditingEnabled: boolean = false;
  popupLabel = 'Add New Complaint';
  popupIcon = 'plus';
  currentDate = new Date();
  complaintForm: FormGroup;
  userName: string = '';
  isEdit: boolean = false;
  pollData: any;
  start_date_flag = false;
  end_date_flag = false; pollList: any;
  todayDate: any;
  pincodeList: any;
  url: any;
  currentAddress: any;
  currentlongitude: any;
  currentlatitude: any;
  citizen_user_id:any;
  constructor(
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private dialogRef: MatDialogRef<AddComplaintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.componentDidMount();

    this.initForm();
    this.getPincodeList();
    this.getComplaintCategory();

  }

  initForm() {
    this.complaintForm = new FormGroup({
      'citizenMobileNo': new FormControl({ value: null, disabled: false }, Validators.required),
      'citizenName': new FormControl({ value: null, disabled: true }, Validators.required),
      'citizenEmail': new FormControl({ value: null, disabled: true }, [Validators.required,Validators.email]),
      'title': new FormControl({ value: null, disabled: true }, Validators.required),
      'complaint': new FormControl({ value: null, disabled: true }, Validators.required),
      'ward_id': new FormControl({ value: '', disabled: true }, [Validators.required]),
      'complaint_cat_id': new FormControl({ value: '', disabled: true }, [Validators.required]),
      'complaint_via': new FormControl({ value: '', disabled: true }, [Validators.required]),
    },



    );
  }
  get f() { return this.complaintForm.controls; }
  get today() { return new Date() }
  checkCitizenExist(){
    this.submittedMobile=true;
    if(this.complaintForm.get('citizenMobileNo')!.invalid){
    //  this.toastrService.warning("Please enter mobile number");
    }
    else{
      this.locationShow= true;this.locationHide = false;
      this.service.authenticateCitizenUser({"phoneNumber":this.complaintForm.controls.citizenMobileNo.value}).subscribe(res => {
        this.toastrService.success("Registered Citizen found!")
       this.complaintForm.controls['citizenMobileNo'].reset({ value: this.complaintForm.controls['citizenMobileNo'].value,disabled: true });
       this.complaintForm.controls['citizenName'].reset({ value: res.data.userName, disabled: true });
       this.complaintForm.controls['citizenEmail'].reset({ value: res.data.Email, disabled: true });
        
       this.complaintForm.controls['title'].reset({ value: "", disabled: false });
       this.complaintForm.controls['complaint'].reset({ value: "", disabled: false });
       this.complaintForm.controls['ward_id'].reset({ value: "", disabled: false });
       this.complaintForm.controls['complaint_cat_id'].reset({ value: "", disabled: false });
       this.complaintForm.controls['complaint_via'].reset({ value: "", disabled: false });
        
       this.isDisabled=false;
       
       
        // this.complaintForm.controls['citizenName'].setValue(res.data.userName);
        // this.complaintForm.controls['citizenEmail'].setValue(res.data.Email);
        this.citizen_user_id=res.data.user_id;
      },
      
    (err ) =>
     {
  
      if(err == "User not found"){
        this.locationShow= true;this.locationHide = false;
        this.toastrService.warning("Citizen not registered. Please fill below fields!")
       
        this.complaintForm.controls['citizenMobileNo'].reset({ value: this.complaintForm.controls['citizenMobileNo'].value,disabled: true });
        this.complaintForm.controls['citizenName'].reset({ value: "", disabled: false });
        this.complaintForm.controls['citizenEmail'].reset({ value: "", disabled: false });
         
        this.complaintForm.controls['title'].reset({ value: "", disabled: false });
        this.complaintForm.controls['complaint'].reset({ value: "", disabled: false });
        this.complaintForm.controls['ward_id'].reset({ value: "", disabled: false });
        this.complaintForm.controls['complaint_cat_id'].reset({ value: "", disabled: false });
        this.complaintForm.controls['complaint_via'].reset({ value: "", disabled: false });
       
        this.isDisabled=false;
      }
      else
      this.toastrService.warning("Oops...Something went wrong!")
  
       
     }
      );
    
    }
      
    
   
    
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
            this.currentAddress = response.address;
          //  console.log("response address:", response.address);
          if(sessionStorage.getItem("currentAddress") != null){
            sessionStorage.setItem("currentAddress", response.address);
          }
           
          
          })
          .catch(() => {
            this.currentAddress=sessionStorage.getItem("currentAddress");
            navigator.geolocation.getCurrentPosition(function (position) {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              if(sessionStorage.getItem("currentLatitude") != null)
              sessionStorage.setItem("currentLatitude", latitude);
              if(sessionStorage.getItem("currentLongitude") != null)
              sessionStorage.setItem("currentLongitude", longitude);

              const point = {
                //Create a point
                location: [longitude, latitude],
              };

              locator.locationToAddress(locatorUrl, point).then((response: any) => {
                // If an address is successfully found, show it in the popup's content
                if(sessionStorage.getItem("currentAddress") != null)
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
  getComplaintCategory() {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj = {
      'user_id': user_id,
      'token': token,
    }

    this.service.getComplaintCategory(obj).subscribe(res => {
      this.complaintCategoryData = res.data;

    });
  }
  getPincodeList() {
    this.service.getPincodeList().subscribe((res) => {
      this.pincodeList = res.data;
    });
  }
  changeMapLocation() {


    const dialogRef = this.dialog.open(ComplaintChangeLocationMapComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: null
    });


    dialogRef.afterClosed().subscribe(result => {
      var Address = sessionStorage.getItem("currentAddress")
      this.currentAddress = Address;
    })
  }
  saveComplaint() {
    this.currentlongitude = sessionStorage.getItem('currentLongitude');
    this.currentlatitude = sessionStorage.getItem('currentLatitude');
    this.submitted = true;   this.submittedMobile=true;
    if (this.complaintForm.invalid) {
//       document.querySelector('container')!.scrollTop();
// console.log ("test")
         
      // this.toastrService.warning('Please fill all required fields!');
    }

    else {
      let user_id: any = localStorage.getItem('user_id');
      let token: any = localStorage.getItem('token');

      let formData = new FormData();

      let temp:any=null;
      formData.append("complainant_phonenumber", this.complaintForm.controls.citizenMobileNo.value);
      formData.append("complainant_Email", this.complaintForm.controls.citizenEmail.value);
      formData.append("complainant_full_name", this.complaintForm.controls.citizenName.value);
      if(this.citizen_user_id){
        formData.append("complainant_user_id", this.citizen_user_id);
      }
      
      formData.append("user_id", user_id);
      formData.append("token", token);
      formData.append("title", this.complaintForm.controls.title.value);
      formData.append("complaint_cat_id", this.complaintForm.controls.complaint_cat_id.value);
      formData.append("ward_id", this.complaintForm.controls.ward_id.value);
      formData.append("complaint", this.complaintForm.controls.complaint.value);
      formData.append("longitude", this.currentlongitude);
      formData.append("latitude", this.currentlatitude);
      formData.append("address", this.currentAddress);
      formData.append("complaint_via", this.complaintForm.controls.complaint_via.value);
      for (let i = 0; i < this.files.length; i++)
        formData.append("file" + i, this.files[i]);



      if (this.complaintForm.controls.title.value == '\t' || this.complaintForm.controls.title.value === null || this.complaintForm.controls.title.value === undefined || this.complaintForm.controls.title.value == '' || this.complaintForm.controls.title.value == '\n') {
        this.toastrService.warning('Please fill all required fields!');
      }

      this.spinner.show();
      this.service.addComplaint(formData).subscribe(res => {
        this.spinner.hide();
        if(res.status && res.message == "duplicate record found")
        {
          this.toastrService.warning("Duplicate Record found!")
        }

        else if (res.status) {
          this.toastrService.success('Complaint added successfully!');
          this.complaintForm.reset();
          this.onClose();
        }

        else
        this.toastrService.warning("Oops...Something went wrong!")
    
         
       

      },

      
      
    (err ) =>
     {
  
      if(err == "duplicate record found"){
        this.toastrService.warning("Duplicate Record found!")
      }
      else if(err == "No Data Available"){
       
      }
      else
      this.toastrService.warning("Oops...Something went wrong!")
  
       
     }
      )


    }






  }

  onReset() {
    this.submitted = false;
    this.complaintForm.reset();
  }
  onClose() {
    this.dialogRef.close();
  }
  remove(file: any) {
    console.log(file);

    var index = this.files.indexOf(file);
    this.files.splice(index, 1)


  }
  onSelectFileDocument(event: any) {
    this.files = [];
    //   var file=event.target.files;
    //     for (let i = 0; i < event.target.files.length; i++) {
    //   //     var fileInfo = file[i];
    //   //      console.log("files are: ",fileInfo);
    //  this.files.push(event.target.files[i]);

    //   }

    console.log(this.files);
    this.thumbnailArray = [];
    if (event.target.files.length > 3) {
      this.toastrService.warning("Maximum 3 attchments are allowed!")
    }
    // else if(event.target.files.length >=1  && event.target.files.length <=3){
    //   for(let i=0;i<event.target.files.length;i++){
    //     if(event.target.files[i].size > 5242880){
    //       this.toastrService.warning("File size should not be more than 5MB!")
    //     }
    //   }

    // }
    else {

      // this.pdfFileName=event.target.files[0].name;
      if (event.target.files && event.target.files[0]) {



        this.selectedProductDocuments = event.target.files;
        for (let i = 0; i < this.selectedProductDocuments.length; i++) {
          if (event.target.files[i].size > 5242880) {
            this.toastrService.warning("File size should not be more than 5MB!")
            break;
          }
          else {
            this.thumbnailArray.push(event.target.files[i].name)

            console.log("file" + i + ":" + event.target.files[i]);
            this.files.push(event.target.files[i]);
          }

        }
        console.log(this.files);
        // console.log(this.selectedProductDocuments)
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed

          //this.urlProduct = reader.result;
          console.log(this.url);

          this.ispdfURL = true;

        }
      }
      else {
        //this.toastrService.warning("File size should not be more than 5MB!");
      }
    }

  }
}

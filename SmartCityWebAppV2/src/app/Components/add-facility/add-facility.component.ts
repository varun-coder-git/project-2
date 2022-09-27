import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.css']
})
export class AddFacilityComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private toastrService: ToastrService) { }
    submitted:any;
  facilityType: any;
  popupIcon = 'plus';
  popupLabel = 'Add New Facility';
  facilityForm: FormGroup;
  user_id: any;
  token: any;
  DATA: any;
  ngOnInit(): void {
    window.scrollTo(0, 0);
  
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getFacilityCount();
  
    this.initForm();
    if (this.data) {
      this.popupIcon = 'edit';
      this.popupLabel = 'Edit Facility';
      this.facilityForm.patchValue({
        location_category_id:this.data.location_category_id,
        name: this.data.facility_name,
        longitude: this.data.longitude,
        latitude: this.data.latitude
      });
    }
  }
  get f() { return this.facilityForm.controls; }

  initForm() {
    this.facilityForm = new FormGroup({
      'location_category_id': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required,Validators.maxLength(50)]),
      'longitude': new FormControl('', [Validators.required]),
      'latitude': new FormControl('', [Validators.required]),
    });
  }

  getFacilityCount(){
    this.service.getFacilityCategory(this.DATA).subscribe((res) => {
    this.facilityType = res.data;
    });

  
  }
  onClose() {
    this.dialogRef.close();
  }

  saveFacility() {
    this.submitted=true;
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let obj1 = {
      'user_id': user_id,
      'token': token,
    }
    let obj2 = this.facilityForm.value;
    let obj3 = {
      ...obj1, ...obj2
    }
    if (this.data) {
      let obj4 = {
        
        'location_id': this.data.location_id
      }
      let obj5 = {
        ...obj1, ...obj2, ...obj4
      }
      
      this.service.updateFacility(obj5).subscribe(res => {
      this.toastrService.success('Facility updated successfully!');
      this.facilityForm.reset();
      this.onClose();
      }
      ,
        error => {
          this.toastrService.warning('Facility already exist!');
        }
      )
    }
    else {
     

      if(this.facilityForm.invalid){
       
        }
        else{
          this.service.addFacility(obj3).subscribe(res => {
            if(res.status==true || res.message=="Data Found"){
              this.toastrService.success('Facility added successfully!');
              this.facilityForm.reset();
              this.onClose();
            }
          
          },
            error => {
              this.toastrService.warning('Oops! something something went wrong');
            }
          )
        }
   
    }
  }
}

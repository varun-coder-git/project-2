import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';

@Component({
  selector: 'app-top-complaint-category-issues',
  templateUrl: './top-complaint-category-issues.component.html',
  styleUrls: ['./top-complaint-category-issues.component.css']
})
export class TopComplaintCategoryIssuesComponent implements OnInit {

  user_id: any;
  token: any;
  DATA: any;
  wardDetails: any;
  msg:any;
 
  isWeek=true;isMonth=true;isYear=true;
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'calender_period':1
    }
    this.getTopPerformingWard();
  }
  // ngAfterViewChecked() {
  //   window.scrollTo(0, 0);
  //   }
  onDateChange(event:any){
  
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'calender_period':event
    }
    this.service.getTopComplaintCategoryIssues(this.DATA).subscribe((res) => {


      this.wardDetails = res.data;
     
      this.chartLabels = this.wardDetails.label;
      this.chartDatasets = [
        
        { data: this.wardDetails.count, label: '' }
      ];
      if(this.chartDatasets[0].data[0]==="0"&&this.chartDatasets[0].data[1]==="0"&&
        this.chartDatasets[0].data[2]==="0"&&this.chartDatasets[0].data[3]==="0"&&this.chartDatasets[0].data[4]==="0"&&this.chartDatasets[0].data[5]==="0"&&event==1)
      {this.isWeek=true;
    
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Week!";
      
      
      }

      if(this.chartDatasets[0].data[0]==="0"&&this.chartDatasets[0].data[1]==="0"&&
      this.chartDatasets[0].data[2]==="0"&&this.chartDatasets[0].data[3]==="0"&&this.chartDatasets[0].data[4]==="0"&&this.chartDatasets[0].data[5]==="0"&&event==2)
      { this.isMonth=true;
       //  alert('no data');
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Month!";
           //  this.msg = document.getElementById('msg')?.innerText;
           //  this.msg.textContent="New";
          
      }

      if(this.chartDatasets[0].data[0]==="0"&&this.chartDatasets[0].data[1]==="0"&&
      this.chartDatasets[0].data[2]==="0"&&this.chartDatasets[0].data[3]==="0"&&this.chartDatasets[0].data[4]==="0"&&this.chartDatasets[0].data[5]==="0"&&event==3)
      { this.isYear=true;
       //  alert('no data');
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Year!";
           //  this.msg = document.getElementById('msg')?.innerText;
           //  this.msg.textContent="New";
          
      }
      if(this.chartDatasets[0].data[0]!=="0"||this.chartDatasets[0].data[1]!=="0"||
      this.chartDatasets[0].data[2]!=="0"||this.chartDatasets[0].data[3]!=="0"||this.chartDatasets[0].data[4]!=="0"||this.chartDatasets[0].data[5]!=="0")
      { this.isYear=true;
       //  alert('no data');
       (<HTMLDivElement>document.getElementById("msg")).innerHTML = "";
           //  this.msg = document.getElementById('msg')?.innerText;
           //  this.msg.textContent="New";
          
      }
 

    },
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        console.log("No data")
        this.isWeek=true;
    
        (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Week!";
      }
   //   else
      //this.toastr.warning("Oops...Something went wrong!")
      // this.error = err.message;
     // console.log("message",err.message);
       
     }
    
    );
  }
  getTopPerformingWard(){
    this.service.getTopComplaintCategoryIssues(this.DATA).subscribe((res) => {


      this.wardDetails = res.data;
      //console.log(this.donutDetails);
      // this.chartLabels = this.donutDetails.label;
      // this.chartDatasets = [
      //   { data: this.donutDetails.count, label: '' }
      //   // { data:[0,0, 0,0,0], label: 'My First dataset' },
        
      // ];
     
      this.chartDatasets=[
        { data: this.wardDetails.count, label: '' }
      ];
      this.chartLabels= this.wardDetails.label;
    
    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        console.log("No data");
       
    
        (<HTMLDivElement>document.getElementById("msg")).innerHTML = "No Data to be shown for This Week!";
      }
   //   else
      //this.toastr.warning("Oops...Something went wrong!")
      // this.error = err.message;
     // console.log("message",err.message);
       
     }
    
    
    );

  }
  public chartType: string = 'bar';

  public chartDatasets: Array<any>  = [
    { data: [], label: '' }
  ];;

  public chartLabels: Array<any> =[];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    legend: {
      display: false,
    },

    tooltips: {
      titleFontSize: 15,
      bodyFontSize: 15,
      custom: function (tooltip: any) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = true;
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value:any) {if (value % 1 === 0) {return value;}},
          fontSize: 16,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
          maxTicksLimit: 6
        },
        scaleLabel: {
          display: true,
          labelString: 'No. of Complaints',
          fontSize: 22,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
        }
      }],
      xAxes: [{
        ticks: {

          fontSize: 16,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
        },
        scaleLabel: {
          display: true,
          labelString: 'Complaint Categories',
          fontSize: 22,
          fontColor: "Black",
          defaultFontFamily: "Segoe UI",
        }
      }]
    }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
@Component({
  selector: 'app-ward-need-improvement',
  templateUrl: './ward-need-improvement.component.html',
  styleUrls: ['./ward-need-improvement.component.css']
})
export class WardNeedImprovementComponent implements OnInit {

  user_id: any;
  token: any;
  DATA: any;
  wardDetails: any;
  msg:any;
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
    this.getLessPerformingWard();
  }
  // ngAfterViewChecked() {
  //   window.scrollTo(0, 0);
  //   }
  getLessPerformingWard(){
    this.service.getLessPerformingWardChart(this.DATA).subscribe((res) => {


      this.wardDetails = res.data;
      //console.log(this.donutDetails);
      // this.chartLabels = this.donutDetails.label;
      // this.chartDatasets = [
      //   { data: this.donutDetails.count, label: '' }
      //   // { data:[0,0, 0,0,0], label: 'My First dataset' },
        
      // ];
     
      this.chartDatasets=[
       { data: this.wardDetails.closed_complaint_count, label: '' }
        // { data: [10,20,30,40,50], label: '' }
      ];
     this.chartLabels= this.wardDetails.ward_name;
      // this.chartLabels= ["Parasarapalli MaveliNagarm","Ward name", "c","Parasarapalli MaveliNagarm","Parasarapalli MaveliNagarm"];
    });

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
          labelString: 'No. of Closed Complaints',
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
          labelString: 'Ward Name',
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

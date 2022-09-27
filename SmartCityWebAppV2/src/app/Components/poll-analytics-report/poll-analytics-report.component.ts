
import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { DatePipe } from '@angular/common';
import { PollService } from 'src/app/jsonFiles/poll.service';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// import 'chartjs-plugin-labels';
import 'chart.piecelabel.js';
import { ClientRequest } from 'http';
import { style } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-poll-analytics-report',
  templateUrl: './poll-analytics-report.component.html',
  styleUrls: ['./poll-analytics-report.component.css']
})
export class PollAnalyticsReportComponent implements OnInit {
  docDefinition: any;
  pollAnalyticsData:any;
  obj1:any;
  optionLabel:[]=[];
  voteCount:[]=[];
  dataset = [{
    data: []
  }];
  showTable=false;
  content:any;
  constructor(public dialogRef: MatDialogRef<PollAnalyticsReportComponent>,
    private dialog: MatDialog,
    public datepipe: DatePipe,private spinner:NgxSpinnerService,
   
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private toastrService: ToastrService,
    private pollService: PollService) { }

  ngOnInit(): void {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
     this.obj1 = {
      'user_id': user_id,
      'token': token,
    }
    this.getPollAnalyticsById();
    setTimeout(() => {
      // Charts are now rendered
     
      const chart = document.getElementById('chart')!;
      html2canvas(chart, {
        height: 3000,
        width: 1000,
        scale: 3,
       
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('table')!.style.display = 'contents';
          document.getElementById('close')!.style.visibility = 'hidden';
          document.getElementById('download')!.style.visibility = 'hidden';
        }
      }).then((canvas) => {
        // Get chart data so we can append to the pdf
        const chartData = canvas.toDataURL();
        // Prepare pdf structure
        
        const docDefinition = { content:[]as any,
        styles: {
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
            alignment: 'left',
            FontFace:"Segoe UI"
          },
          subsubheader: {
            fontSize: 12,
            // italics: true,
            margin: [0, 10, 0, 25],
            alignment: 'left',
            FontFace:"Segoe UI"
          },
          chartStyle:{
            alignment: 'center'
          },
          table: {
            margin: [0, 5, 0, 15]
          }
        },
        defaultStyle: {
          // alignment: 'justify'
        },
        pageOrientation: 'portrait',
      };

        // Add some content to the pdf
        const title= {text: "Poll Subject: "+this.pollAnalyticsData.poll_subject, style: 'subheader'};
        const description = {text: 'Start Date:'+this.datepipe.transform(this.pollAnalyticsData.start_date, 'dd-MM-yyyy')+'\t'+'End Date:'+this.datepipe.transform(this.pollAnalyticsData.end_date, 'dd-MM-yyyy'), style: 'subsubheader'};
      
        // docDefinition.content.push(title);
        // docDefinition.content.push(description);
        // Push image of the chart
        docDefinition.content.push({image: chartData,width: 500,style:'chartStyle'});
        this.docDefinition = docDefinition;
        // pdfMake.createPdf(docDefinition).download('Poll Analytics Report' + '.pdf');
      });
    }, 1100);
  }
  
  // @ViewChild('pdfTable')
  //  pdfTable!: ElementRef;
  
  public downloadAsPDF() {
    // const pdfTable = this.pdfTable.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).download(); 
    if (this.docDefinition) {
      
      pdfMake.createPdf(this.docDefinition).download('Poll Analytics Report-'+this.data + '.pdf');
  
  } else {
   // console.log('Chart is not yet rendered!');
  }
  }
  // @ViewChild('content', {static: false}) content: ElementRef;


  // public downloadPDF() {
  //   const doc = new jsPDF();

  //   const specialElementHandlers = {
  //     '#editor': function (element:any, renderer:any) {
  //       return true;
  //     }
  //   };

  //   const content = this.content.nativeElement;

  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('test.pdf');
  // }

  getPollAnalyticsById(){

    let obj2 = {
      'poll_id': this.data,
      
    }
    let obj3 = {
      ...this.obj1, ...obj2
    }
    this.service.getPollAnalyticsById(obj3).subscribe(res => {
      //console.log("response", res.data);
      this.pollAnalyticsData = res.data;
      this.dataset[0].data=this.pollAnalyticsData.option_name;
      this.optionLabel=this.pollAnalyticsData.labels;
      //console.log("analytics:",this.pollAnalyticsData.d_vote_count);
      this.voteCount=this.pollAnalyticsData.d_vote_count;
      this.chartDatasets = [
        { data: this.pollAnalyticsData.d_vote_count, label: this.pollAnalyticsData.option_name },

        // { data: [10,20,30,40], label: '' }
      ];
     
      this.chartLabels= this.pollAnalyticsData.labels;
       this.chartOptions= {
        responsive: true,
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            label: 10
            ,
            font: {
              weight: 'bold'
            }
          }
        },
        legend: {
          display: false,
        },
    
    
    
    
    
    
        tooltips: {
          titleFontSize: 15,
          bodyFontSize: 15,
          custom: function (tooltip: any) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            
            label: function (tooltipItem: any, data: any) {
              
             // console.log("index", tooltipItem, "\t", "data:", data, "\t", "data value:",data.datasets[0].label[0]);
              // let dataset = [{
              //   data: ['Option 1 ', 'Option 2 ','Option 3 ', 'Option 4 ','Option 5 ', 'Option 6 ','Option 7 ', 'Option 8 ','Option 9 ', 'Option 10 ']
              
              // }];
              return data.datasets[0].label[tooltipItem.index] + ": " + tooltipItem.value;
              // console.log("index", tooltipItem,"\t","data:",data);
              // return "option";
            }
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
              labelString: 'Votes',
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
              labelString: 'Answer Choices',
              fontSize: 22,
              fontColor: "Black",
              defaultFontFamily: "Segoe UI",
            }
          }]
        }
      };
      
      });
   
  }
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [], label: '' }
  ];
  //label: ['Option 1','Option 2','Option 3','Option 4','Option 5','Option 6','Option 7','Option 8', 'Option 9', 'Option 10']
  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',


      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any;
  

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  
  onClose() {
    this.dialogRef.close();
  }
}

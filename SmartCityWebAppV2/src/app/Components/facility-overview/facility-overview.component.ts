import { Component, OnInit } from '@angular/core';
import { EditFacilityComponent } from '../edit-facility/edit-facility.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.services';
import { loadModules } from 'esri-loader';
import { NgxSpinnerService } from "ngx-spinner";
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facility-overview',
  templateUrl: './facility-overview.component.html',
  styleUrls: ['./facility-overview.component.css']
})
export class FacilityOverviewComponent implements OnInit {
  facilityType:any;complaintType:any;incidentType:any;storepoint:any;
  complaintData:any;incidentData:any;
  url:any;
  user_id: any;
  token: any;
  DATA: any;
  complaintIcon:any;
  incidentIcon:any;selectedIndex:any=0;
  constructor(public toastr: ToastrService,private dialog: MatDialog,private spinner:NgxSpinnerService,
              private service: ApiService,private messageService: ParentChildCommunicationService) { }

  ngOnInit(): void {
    
    this.url=this.service.expressApiUrl+"/";
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.selectedIndex=localStorage.getItem('selectedTabIndex');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.getFacilityCount();
    this.getComplaintCount();
    this.getIncidentCount();
   // this.initDefaultMap();
   this.getComplaintIncidentHotspot();
  }

  getComplaintIncidentHotspot(){
   
    this.service.getComplaintIncidentHotspot(this.DATA).subscribe(res => {
  
      this.complaintData=res.data.complaint_data;
      this.incidentData=res.data.incident_data;
      this.incidentIcon=res.data.map_data[0].incident;
      this.complaintIcon=res.data.map_data[0].complaint;
      //this.hotspotlist = res.data[0].facility_data;
    //  console.log(this.complaintData, this.incidentData);
   

        this.initDefaultMap(this.complaintData,this.incidentData);
   
    });

  }
  getIncidentCount(){
    this.spinner.show();
    this.service.getIncidentCount(this.DATA).subscribe((res) => {
      //console.log(res);

      this.incidentType = res.data;
     
this.spinner.hide();
    });

  
  }
  getComplaintCount(){
    this.spinner.show();
    this.service.getComplaintCount(this.DATA).subscribe((res) => {
      //console.log(res);

      this.complaintType = res.data;
     
this.spinner.hide();
    });

  
  }
  getFacilityCount(){
    this.spinner.show();
    this.service.getFacilityCount(this.DATA).subscribe((res) => {
      //console.log(res);

      this.facilityType = res.data;
     
this.spinner.hide();
    });

  
  }
  editFacility(){
    let dialogRef = this.dialog.open(EditFacilityComponent, {
      width: '60%',
      autoFocus: false,
      maxHeight: '90vh',
    });
    dialogRef.afterClosed().subscribe(s => {
     
      this.getFacilityCount();
         });
  }
  displayIncidentMap(incidentCatidClicked:any,incidentName:any,incidentCount:any) {
    
    localStorage.setItem('incident_cat_id', incidentCatidClicked);
    if(incidentCount == 0)
    {
      this.toastr.warning("No incident logged for "+incidentName+"!");
    }
    else{
      let id = '17';
      let componentName = "IncidentMap"
      this.messageService.setMessage(id, componentName);
    }
   

  }
  displayComplaintMap(complaintCatidClicked:any,complaintName:any,complaintCount:any) {
    

    localStorage.setItem('complaint_cat_id', complaintCatidClicked);
  
    if(complaintCount == 0)
    {
      this.toastr.warning("No complaint logged for "+complaintName+"!");
    }
    else{
      let id = '16';
      let componentName = "ComplaintMap"
      this.messageService.setMessage(id, componentName);
    }
   

  }
  displayMap(facilityidClicked:any,facilityName:any,facilityIcon:any) {

    localStorage.setItem('facility_id', facilityidClicked);

    let id = '12';
    let componentName = "FacilityMap"
    this.messageService.setMessage(id, componentName);

  }

  gotoDashboard() {

    // let id = '0';
    // let componentName = "Dashboard"
    // this.messageService.setMessage(id, componentName);

    window.history.back();

  }
  sentMail(){
    this.toastr.success('Mail Sent!','', {
      timeOut: 1000,
    });
console.log("inside sent mail");
  }
  onTabChanged(event:any){

  localStorage.setItem('selectedTabIndex', event.index);
  this.selectedIndex=event.index;
  this.getComplaintIncidentHotspot();

  }
  private async initDefaultMap(complaintHotspots:any,incidentHotspots:any) {


    const complaint_Hotspots = complaintHotspots;
    const incident_Hotspots = incidentHotspots;



    const [Map,
      MapView,
      FeatureLayer,
      SimpleMarkerSymbol,
      Graphic, GraphicsLayer,
      PictureMarkerSymbol,
      Point, WebStyleSymbol, Track,PopupTemplate,    AttachmentsContent, 
      TextContent] = await loadModules(['esri/Map',
        'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/symbols', 'esri/Graphic',
        'esri/layers/GraphicsLayer', "esri/symbols/PictureMarkerSymbol", "esri/geometry/Point",
        "esri/symbols/WebStyleSymbol", "esri/widgets/Track",'esri/PopupTemplate',"esri/popup/content/AttachmentsContent",
        "esri/popup/content/TextContent"]);



    var map = new Map({
      basemap: "streets-navigation-vector"
      // basemap: "topo-vector"
          // basemap: "satellite"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 9,
      center: [76.9366, 8.5241] // longitude, latitude
   
    });

    // =====================================================================================================
    const template = {
      // autocasts as new PopupTemplate()
      title: "popup test"
    }

    // Create an instance of the Track widget
    // and add it to the view's UI
    // var track = new Track({
    //   view: view
    // });

    // view.ui.add(track, "bottom-right");

    // view.when(function () {

    //   track.start();
    // });

  //   const popupTemplate = {
  //     title: "{Name}",
  //     content: "{Description}"
  //  }
  //  const attributes = {
  //     Name: "Graphic",
  //     Description: "I am a polygon"
  //  }

    let symbol1 = {
      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url:this.url+this.complaintIcon,
      // url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
      width: "40px",
      height: "40px",
     
      // url:"F:\SmartCity\SmartCityWebApp\src\assets\img\marker.png"
    };

    let symbol2 = {
      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url:this.url+this.incidentIcon,
     
      width: "40px",
      height: "40px",
      // url:"F:\SmartCity\SmartCityWebApp\src\assets\img\marker.png"
    };
    // let symbol3 = {
    //   type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    //   // url:this.url+this.incidentIcon,
    //  url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
    //   width: "60px",
    //   height: "60px",
    //   // url:"F:\SmartCity\SmartCityWebApp\src\assets\img\marker.png"
    // };
   
    var marker = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40]
    };


    var webStyleSymbol = new WebStyleSymbol({
      name: "tear-pin-1",
      styleName: "Esri2DPointSymbolsStyle"
    });




        webStyleSymbol = new WebStyleSymbol({
          name: "tear-pin-1",
          styleName: "Esri2DPointSymbolsStyle"
        });

       

    const addgraphics1 = (a: any, b: any,id:any,address:any,title:any,category:any) => {
      const measureThisAction = {
        title: "Assign",
          id: id,
          className: "esri-icon-directions"
      };
      const popupTemplate = {
        title: "{Name}",
        content:"<b>Title:</b> {Description.Title}<br>"+"<b>Category:</b>{Description.Category}<br>"+"<b>Address:</b> {Description.Address}<br>"+"\n",
        actions: [measureThisAction]
     }
     const attributes = {
        Name: "<b>Complaint ID:</b> "+id,
        Description:   {Longitude:a,Latitude:b,Address:address,Title:title,Category:category}
     }

      var markerPoint = new Point({ x: a, y: b });
      const storepoint = new Graphic(markerPoint, symbol1,attributes,popupTemplate);


      var layer = new GraphicsLayer();
      layer.add(storepoint);

    //   var template = new PopupTemplate({
    //     title: 'Test',
    //     content: '<p>Hello</p>',
    // });
    // popupTemplate: template
      map.add(layer);
      view.popup.on("trigger-action", (event:any) => {
        if (event.action.id === id) {
          
          let obj1 = {
            'user_id': this.user_id,
            'token': this.token
          }
          let obj2 = {
            'thread_id': id,
            
          }
      
          let obj3 = {
            ...obj1, ...obj2
          }
         this.spinner.show();
         this.service.assignComplaint(obj3).subscribe(res => {
          this.spinner.hide();
        this.toastr.success("Mail Sent successfully!");
     //this.sentMail();
         
          });
        }
      });
    }
    function addgraphics2(a: any, b: any,id:any,address:any,title:any,category:any) {

     
  

      const popupTemplate = {
        title: "{Name}",
        content:"<b>Title:</b> {Description.Title}<br>"+"<b>Category:</b>{Description.Category}<br>"+"<b>Address:</b> {Description.Address}<br>"+"\n",
      
     }
     const attributes = {
        Name: "Incident ID: "+id,
        Description:   {Longitude:a,Latitude:b,Address:address,Title:title,Category:category}
     }
     var markerPoint = new Point({ x: a, y: b });
     var storepoint = new Graphic(markerPoint, symbol2,attributes,popupTemplate);
      var layer = new GraphicsLayer();
      layer.add(storepoint);
      map.add(layer);
    
    }

    view.when(function () {

      // let hotspots

      for (var i = 0; i < complaint_Hotspots.length; i++) {
        if(complaint_Hotspots[i].longitude!=null&&complaint_Hotspots[i].latitude!=null)
        addgraphics1(complaint_Hotspots[i].longitude,complaint_Hotspots[i].latitude,complaint_Hotspots[i].id,complaint_Hotspots[i].address,complaint_Hotspots[i].title,complaint_Hotspots[i].Category);

        // addgraphics("76.936", "8.5241");
        // addgraphics("76.956", "8.5341");
        // addgraphics("76.938", "8.5541");
        }

        for (var i = 0; i < incident_Hotspots.length; i++) {
          if(incident_Hotspots[i].longitude!=null&&incident_Hotspots[i].latitude!=null)
          addgraphics2(incident_Hotspots[i].longitude,incident_Hotspots[i].latitude,incident_Hotspots[i].id,incident_Hotspots[i].address,incident_Hotspots[i].title,incident_Hotspots[i].Category);
  
          // addgraphics("76.936", "8.5241");
          // addgraphics("76.956", "8.5341");
          // addgraphics("76.938", "8.5541");
          }

    });

    // symbol1.on(function () {}
    // );


    // mark.popup.open({
    //   //       // Set the popup's title to the coordinates of the location
    //         title: "Longitude: "  + "\nLatitude:  "  ,
    //   //       location: event.mapPoint 
    //      });
  
  
      // markerPoint.popup.open({
      //         // Set the popup's title to the coordinates of the location
      //         title: "Longitude: " + "\nLatitude:  "  ,
         
      //       })
      // view.popup.open({
      //   //       // Set the popup's title to the coordinates of the location
      //         title: "Longitude: "  + "\nLatitude:  "  ,
      //   //       location: event.mapPoint 
      //      });

      // var markerPoint = new Point({ x: 76.926, y: 8.5231 });
      // var storepoint = new Graphic(markerPoint, symbol3);
      // var layer = new GraphicsLayer();
      // layer.add(storepoint);
      // map.add(layer);

    
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
//  const point = { //Create a point
//   type: "point",
//   longitude: -118.80657463861,
//   latitude: 34.0005930608889
// };
// const simpleMarkerSymbol = {
//   type: "simple-marker",
//   color: [226, 119, 40],  // Orange
//   outline: {
//       color: [255, 255, 255], // White
//       width: 1
//   }
// };

// const pointGraphic = new Graphic({
//   geometry: point,
//   symbol: symbol3,

//   attributes: attributes,
//   popupTemplate: popupTemplate
// });


// layer.add(pointGraphic);
// map.add(layer);
    // view.on("click", function (event:any) {
    //   event.stopPropagation();

    //   // Get the coordinates of the click on the view
    //   var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
    //   var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
    //   let loc = "22, 2A, Mundhwa - Kharadi Rd, Near Nyati Empire, Santipur, Thite Nagar, Kharadi, Pune, Maharashtra 411014";
    //   view.popup.open({
    //     // Set the popup's title to the coordinates of the location
    //     title: "Longitude: " + lon + "\nLatitude:  " + lat ,
    //     location: event.mapPoint 
    //   });

    //   console.log(view.popup.title);
    //   console.log(view.popup.location);
    //  // view.popup.content = "This is the content";
    //  // view.popup.title = "This is the title";
    //   //console.log(view.popup.title);
    // });

 
   }

}

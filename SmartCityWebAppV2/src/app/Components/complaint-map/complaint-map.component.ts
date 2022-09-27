import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { loadModules } from 'esri-loader';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-complaint-map',
  templateUrl: './complaint-map.component.html',
  styleUrls: ['./complaint-map.component.css']
})
export class ComplaintMapComponent implements OnInit {


  hotspotlist: any;
  complaintCatId: any;
  complaintName: any;
  complaintIcon:any;
  url:any;
  complaint: number;

  complaintImg:any;
  user_id: any;
  token: any;
  DATA: any;


  constructor(public toastr: ToastrService,private spinner:NgxSpinnerService,private service: ApiService, private messageService: ParentChildCommunicationService,private location: Location ) { }

  ngOnInit(): void {
    this.url=this.service.expressApiUrl+"/";
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

 


    this.complaintCatId = localStorage.getItem('complaint_cat_id');
    //this.facilityName = localStorage.getItem('facility_name');
    //this.facilityIcon=localStorage.getItem('facility_icon');
    this.complaint = parseInt(this.complaintCatId);
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'category_id':this.complaint
    }

    


    this.service.getComplaintByID(this.DATA).subscribe(res => {
  
      this.complaintName=res.data[0].Category;
      this.complaintIcon=res.data[0].marker_path;
      this.hotspotlist = res.data;

      this.complaintImg=this.url+this.complaintIcon;
     // console.log(this.hotspotlist);
      if (this.hotspotlist.length > 0) {

        this.initDefaultMap(this.hotspotlist);
      }

    });


  }

  ngAfterViewInit(): void {
  }

  gotoDashboard() {

    let id = '0';
    let componentName = "Dashboard"
    this.messageService.setMessage(id, componentName);
  //  window.history.back();
  // localStorage.setItem('selectedTabIndex', '1');
    
  }

  private async initDefaultMap(data: any): Promise<void> {


    const hotspots = data


    const [Map,
      MapView,
      FeatureLayer,
      SimpleMarkerSymbol,
      Graphic, GraphicsLayer,
      PictureMarkerSymbol,
      Point, WebStyleSymbol, Track,PopupTemplate] = await loadModules(['esri/Map',
        'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/symbols', 'esri/Graphic',
        'esri/layers/GraphicsLayer', "esri/symbols/PictureMarkerSymbol", "esri/geometry/Point",
        "esri/symbols/WebStyleSymbol", "esri/widgets/Track",'esri/PopupTemplate']);



    var map = new Map({
      basemap: "streets-navigation-vector"
      // basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 9,
      center: [76.9366, 8.5241] // longitude, latitude
    });
    // view.on("click", function (event:any) {
    //   event.stopPropagation();

    //   // Get the coordinates of the click on the view
    //   var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
    //   var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
    //   //let loc = "22, 2A, Mundhwa - Kharadi Rd, Near Nyati Empire, Santipur, Thite Nagar, Kharadi, Pune, Maharashtra 411014";
    //   view.popup.open({
    //     // Set the popup's title to the coordinates of the location
    //     title: "Longitude: " + lon + "\nLatitude:  " + lat,
    //     location: event.mapPoint 
    //   });

    //   console.log(view.popup.title);
    //   console.log(view.popup.location);
    //  // view.popup.content = "This is the content";
    //  // view.popup.title = "This is the title";
    //   //console.log(view.popup.title);
    // });
    // =====================================================================================================


    // Create an instance of the Track widget
    // and add it to the view's UI
    // var track = new Track({
    //   view: view
    // });

    // view.ui.add(track, "top-left");

    // view.when(function () {

    //   track.start();
    // });




    let symbol = {
      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url: this.url+this.complaintIcon,
      width: "40px",
      height: "40px",
      // url:"F:\SmartCity\SmartCityWebApp\src\assets\img\marker.png"
    };
    var marker = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40]
    };


    var webStyleSymbol = new WebStyleSymbol({
      name: "tear-pin-1",
      styleName: "Esri2DPointSymbolsStyle"
    });



    switch (this.complaint) {
      case 1:

        webStyleSymbol = new WebStyleSymbol({
          name: "gas-station",
          styleName: "Esri2DPointSymbolsStyle"
        });

        break;
      case 2:

        webStyleSymbol = new WebStyleSymbol({
          name: "police-station",
          styleName: "Esri2DPointSymbolsStyle"
        });

        break;

      case 3:
        webStyleSymbol = new WebStyleSymbol({
          name: "hospital",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      case 4:
        webStyleSymbol = new WebStyleSymbol({
          name: "restroom",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      case 5:
        webStyleSymbol = new WebStyleSymbol({
          name: "tear-pin-1",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      case 6:
        webStyleSymbol = new WebStyleSymbol({
          name: "hospital",
          styleName: "Esri2DPointSymbolsStyle"
        });
        break;
      default:
        webStyleSymbol = new WebStyleSymbol({
          name: "tear-pin-1",
          styleName: "Esri2DPointSymbolsStyle"
        });

    }
    const addgraphics1 = (a: any, b: any,id:any,address:any,title:any,category:any) => {
      const measureThisAction = {
        title: "Assign",
          id: id,
          className: "esri-icon-directions"
      };
      const popupTemplate = {
        title: "<b>{Name}</b>",
        content:"<b>Title:</b> {Description.Title}<br>"+"<b>Category:</b>{Description.Category}<br>"+"<b>Address:</b> {Description.Address}<br>"+"\n",
        actions: [measureThisAction]
     }
     const attributes = {
        Name: "<b>Complaint ID:</b> "+id,
        Description:   {Longitude:a,Latitude:b,Address:address,Title:title,Category:category}
     }

      var markerPoint = new Point({ x: a, y: b });
      const storepoint = new Graphic(markerPoint, symbol,attributes,popupTemplate);


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
       this.toastr.success("Mail sent successfully!");
            this.sentMail();
          });
        }
      });
    }
   


    view.when(function () {

      for (var i = 0; i < hotspots.length; i++) {

        addgraphics1(hotspots[i].longitude, hotspots[i].latitude,hotspots[i].id,hotspots[i].address,hotspots[i].title,hotspots[i].Category);

      }

    });

  }


  sentMail(){
    this.toastr.success('Mail sent successfully!','', {
      timeOut: 3000,
    });

  }
}

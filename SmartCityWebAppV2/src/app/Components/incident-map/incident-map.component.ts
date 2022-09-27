import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { loadModules } from 'esri-loader';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { PlatformLocation } from '@angular/common'
@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.css']
})
export class IncidentMapComponent implements OnInit {

  hotspotlist: any;
  incidentId: any;
  incidentName: any;
  incidentIcon:any;
  url:any;
  incident: number;

  incidentImg:any;
  user_id: any;
  token: any;
  DATA: any;


  constructor(private service: ApiService, private messageService: ParentChildCommunicationService,private location: Location ) { }

  ngOnInit(): void {
    this.url=this.service.expressApiUrl+"/";
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

 


    this.incidentId = localStorage.getItem('incident_cat_id');
    //this.facilityName = localStorage.getItem('facility_name');
    //this.facilityIcon=localStorage.getItem('facility_icon');
    this.incident = parseInt(this.incidentId);
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'category_id':this.incident
    }

    


    this.service.getIncidentByID(this.DATA).subscribe(res => {
  
      this.incidentName=res.data[0].Category;
      this.incidentIcon=res.data[0].marker_path;
      this.hotspotlist = res.data;

      this.incidentImg=this.url+this.incidentIcon;
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
      url: this.url+this.incidentIcon,
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



    switch (this.incident) {
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
    function addgraphics(a: any, b: any,id:any,address:any,title:any,category:any) {

     
  

      const popupTemplate = {
        title: "<b>{Name}</b>",
        content:"<b>Title:</b> {Description.Title}<br>"+"<b>Category:</b>{Description.Category}<br>"+"<b>Address:</b> {Description.Address}<br>"+"\n",
     }
     const attributes = {
        Name: "Incident ID: "+id,
        Description:   {Longitude:a,Latitude:b,Address:address,Title:title,Category:category}
     }
     var markerPoint = new Point({ x: a, y: b });
     var storepoint = new Graphic(markerPoint, symbol,attributes,popupTemplate);
      var layer = new GraphicsLayer();
      layer.add(storepoint);
      map.add(layer);
    
    }
  //   function addgraphics(a: any, b: any,name:any,type:any) {

  
  //   const popupTemplate = {
  //     title: "{Name}"+"{incidentImg}",
  //     content: "Name: {Description.Name}<br>"+"Longitude: {Description.Longitude}<br>"+"\n"+"Latitude: {Description.Latitude}"+"\n"
  //  }
  //  const attributes = {
  //     Name: type,
  //     Description: {  
                  
  //                 Longitude:a,Latitude:b,Name:name
  //     }
  //  }
  //  var markerPoint = new Point({ x: a, y: b });
  //  var storepoint = new Graphic(markerPoint, symbol,attributes,popupTemplate);
  //   var layer = new GraphicsLayer();
  //   layer.add(storepoint);
  //   map.add(layer);
  //   }


    view.when(function () {

      for (var i = 0; i < hotspots.length; i++) {

        addgraphics(hotspots[i].longitude, hotspots[i].latitude,hotspots[i].id,hotspots[i].address,hotspots[i].title,hotspots[i].Category);

      }

    });

  }





}

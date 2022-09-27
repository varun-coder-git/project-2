import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { loadModules } from 'esri-loader';
import { ApiService } from 'src/app/services/api.services';
import { ParentChildCommunicationService } from 'src/app/services/childToParentCommunication/child-parent-communication.service';
import { PlatformLocation } from '@angular/common'

@Component({
  selector: 'app-facility-map',
  templateUrl: './facility-map.component.html',
  styleUrls: ['./facility-map.component.css']
})
export class FacilityMapComponent implements OnInit {

  hotspotlist: any;
  facilityId: any;
  facilityName: any;
  facilityIcon:any;
  url:any;
  facility: number;

facilityImg:any;
  user_id: any;
  token: any;
  DATA: any;


  constructor(private service: ApiService, private messageService: ParentChildCommunicationService,private location: Location ) { }

  ngOnInit(): void {
    this.url=this.service.expressApiUrl+"/";
    window.scrollTo(0, 0);
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');

 


    this.facilityId = localStorage.getItem('facility_id');
    //this.facilityName = localStorage.getItem('facility_name');
    //this.facilityIcon=localStorage.getItem('facility_icon');
    this.facility = parseInt(this.facilityId);
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token,
      'id':this.facility
    }

    


    this.service.getFacilityByID(this.DATA).subscribe(res => {
  
      this.facilityName=res.data[0].facility_type;
      this.facilityIcon=res.data[0].facility_image;
      this.hotspotlist = res.data[0].facility_data;

      this.facilityImg=this.url+this.facilityIcon;
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
      url: this.url+this.facilityIcon,
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



    switch (this.facility) {
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

    function addgraphics(a: any, b: any,name:any,type:any) {

  
    const popupTemplate = {
      title: "<b>{Name}</b>",
      content: "<b>Name:</b> {Description.Name}<br>"+"<b>Longitude:</b> {Description.Longitude}<br>"+"\n"+"<b>Latitude: </b>{Description.Latitude}"+"\n"
   }
   const attributes = {
      Name: type,
      Description: {  
                  
                  Longitude:a,Latitude:b,Name:name
      }
   }
   var markerPoint = new Point({ x: a, y: b });
   var storepoint = new Graphic(markerPoint, symbol,attributes,popupTemplate);
    var layer = new GraphicsLayer();
    layer.add(storepoint);
    map.add(layer);
    }


    view.when(function () {

      for (var i = 0; i < hotspots.length; i++) {

        addgraphics(hotspots[i].longitude, hotspots[i].latitude,hotspots[i].facility_name,hotspots[i].facility_type);

      }

    });

  }




}

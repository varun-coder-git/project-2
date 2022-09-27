import { Component, OnInit, Inject  } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { parse } from '@fortawesome/fontawesome-svg-core';
// import '../../../node_modules/@arcgis/core/assets/esri/themes/light/main.css';
import { loadModules } from 'esri-loader';

const options = {
  url: 'https://js.arcgis.com/4.24/'
};

@Component({
  selector: 'app-complaint-change-location-map',
  templateUrl: './complaint-change-location-map.component.html',
  styleUrls: ['./complaint-change-location-map.component.css']
})

export class ComplaintChangeLocationMapComponent implements OnInit {

  mapClickFlag:any=false;
  constructor(private location: Location,    private dialogRef: MatDialogRef<ComplaintChangeLocationMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    //this.initDefaultMap();
    this.componentDidMount();
  }
  componentDidMount() {
    // document.body.style = 'background-image: url();';
    // document.body.style = 'background: #F9F9F9';
    loadModules(["esri/config",'esri/Map', 'esri/views/MapView','esri/tasks/Locator','esri/widgets/Locate','esri/widgets/Search','esri/Graphic','esri/layers/GraphicsLayer','esri/geometry/Point',
    'esri/symbols/WebStyleSymbol','esri/rest/locator'], options)
      .then(([esriConfig,Map, MapView,Locator,Locate,Search,Graphic,GraphicsLayer,Point,WebStyleSymbol,locator]) => {
        esriConfig.apiKey = "AAPKa808b66b329d4c20bedf21c30bfea58dkc4s6BDpyyhENXyDlewV2OAkuxnAGDz3LgnOk9Px1LWQBQNG3giBD5f5hX7aRB2R";
 
       
        const locatorUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer" ;

        const map = new Map({ basemap: "streets-navigation-vector" });
        const view = new MapView({
          container: "viewDiv",
          map:map,
          zoom: 9,
          center: [76.9366, 8.5241]
        });
 

        view.on("click",  (event:any) => {   
          event.stopPropagation();
          this.mapClickFlag=true;
          // Get the coordinates of the click on the view
          var lat:any = Math.round(event.mapPoint.latitude * 1000) / 1000;
          var lon:any = Math.round(event.mapPoint.longitude * 1000) / 1000;

          const params = {
            location: event.mapPoint
          };
          locator
          .locationToAddress(locatorUrl,params)
          .then((response:any) => {
            // If an address is successfully found, show it in the popup's content
            view.popup.open({
              // Set the popup's title to the coordinates of the location
              title:response.address,
              location: event.mapPoint
            });
            // if (sessionStorage.getItem("complaintLogBack") != null || sessionStorage.getItem("complaintLogBack") != undefined) {
            //   sessionStorage.setItem("compliantTempLocation",response.address); 
            // }
            // if (sessionStorage.getItem("incidentBack") != null || sessionStorage.getItem("incidentBack") != undefined) {
            //     sessionStorage.setItem("incidentTempLocation",response.address);   
            // }
            // if (sessionStorage.getItem("ideasBack") != null || sessionStorage.getItem("ideasBack") != undefined) {
            //   sessionStorage.setItem("ideasTempLocation",response.address);  
            // }
            // if (sessionStorage.getItem("volunterBack") != null || sessionStorage.getItem("volunterBack") != undefined) {
            //   sessionStorage.setItem("volunterTempLocation",response.address);  
            // }
            // if (sessionStorage.getItem("volunterEditBack") != null || sessionStorage.getItem("volunterEditBack") != undefined) {
               sessionStorage.setItem("currentAddressTemp",response.address);  
            // }
        })
          .catch(() => {
            // If the promise fails and no result is found, show a generic message
            view.popup.open({
              // Set the popup's title to the coordinates of the location
              title: "No address was found for this location",
              location: event.mapPoint 
            });
          //  view.popup.content = "No address was found for this location";
          });

          view.when(function () {
            // if (sessionStorage.getItem("complaintLogBack") != null || sessionStorage.getItem("complaintLogBack") != undefined) {
            //   sessionStorage.setItem("complaintTemplong", lon);
            //   sessionStorage.setItem("complaintTemplat", lat); 
            // }
            // if (sessionStorage.getItem("incidentBack") != null || sessionStorage.getItem("incidentBack") != undefined) {
            //     sessionStorage.setItem("incidentTemplong", lon);
            //     sessionStorage.setItem("incidentTemplat", lat); 
            // }
            // if (sessionStorage.getItem("ideasBack") != null || sessionStorage.getItem("ideasBack") != undefined) {
            //   sessionStorage.setItem("ideasTemplong", lon);
            //   sessionStorage.setItem("ideasTemplat", lat); 
            // }
            // if (sessionStorage.getItem("volunterBack") != null || sessionStorage.getItem("volunterBack") != undefined) {
            //     sessionStorage.setItem("volunterTemplong", lon);
            //     sessionStorage.setItem("volunterTemplat", lat); 
            // }
            // if (sessionStorage.getItem("volunterEditBack") != null || sessionStorage.getItem("volunterEditBack") != undefined) {
              sessionStorage.setItem("currentLongitude", lon);
              sessionStorage.setItem("currentLatitude", lat); 
       //   }
           
              addgraphics(lon,lat);
          });

        });

        view.when(function () {
          addgraphics(sessionStorage.getItem("currentLongitude"),sessionStorage.getItem("currentLatitude"));
          // if (sessionStorage.getItem("complaintLogBack") != null || sessionStorage.getItem("complaintLogBack") != undefined) {
          //   addgraphics(sessionStorage.getItem("complaintlong"),sessionStorage.getItem("complaintlat"));
          // }
          // if (sessionStorage.getItem("incidentBack") != null || sessionStorage.getItem("incidentBack") != undefined) {
          //   addgraphics(sessionStorage.getItem("incidentlong"),sessionStorage.getItem("incidentlat"));
          // }
          // if (sessionStorage.getItem("ideasBack") != null || sessionStorage.getItem("ideasBack") != undefined) {
          //   addgraphics(sessionStorage.getItem("ideaslong"),sessionStorage.getItem("ideaslat"));
          // }
          // if (sessionStorage.getItem("volunterBack") != null || sessionStorage.getItem("volunterBack") != undefined) {
          //   addgraphics(sessionStorage.getItem("volunterlong"),sessionStorage.getItem("volunterlat"));
          // }
          // if (sessionStorage.getItem("volunterEditBack") != null || sessionStorage.getItem("volunterEditBack") != undefined) {
          //   addgraphics(sessionStorage.getItem("volunterEditlong"),sessionStorage.getItem("volunterEditlat"));
          // }
         
      });

      let markerSymbol = {
        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40]
      };
        var webStyleSymbol = new WebStyleSymbol({
          name: "tear-pin-1",
          styleName: "Esri2DPointSymbolsStyle"
        });

        function addgraphics(a:any,b:any) {

          var markerPoint = new Point({ x: a, y: b });
          var storepoint = new Graphic(markerPoint, webStyleSymbol);
          map.removeAll();
          var layer = new GraphicsLayer();
          layer.add(storepoint);
          map.add(layer);
        }







        var locateBtn = new Locate({
          view: view

        });
        const searchWidget = new Search({
          view: view,
        });
       
        searchWidget.on("select-result", function(event:any){
          const point = { //Create a point
            location: [event.result.feature.geometry.longitude, event.result.feature.geometry.latitude]
         }; 
        locator
        .locationToAddress(locatorUrl,point)
        .then((response:any) => {
          // If an address is successfully found, show it in the popup's content
          // if (sessionStorage.getItem("complaintLogBack") != null || sessionStorage.getItem("complaintLogBack") != undefined) {
            sessionStorage.setItem("currentLongitude",event.result.feature.geometry.longitude);
          sessionStorage.setItem("currentLatitude",event.result.feature.geometry.latitude);
          sessionStorage.setItem("currentAddress",response.address); 
          addgraphics(event.result.feature.geometry.longitude,event.result.feature.geometry.latitude);
        //  }

          // if (sessionStorage.getItem("incidentBack") != null || sessionStorage.getItem("incidentBack") != undefined) {
          //     sessionStorage.setItem("incidentTemplong",event.result.feature.geometry.longitude);
          //     sessionStorage.setItem("incidentTemplat",event.result.feature.geometry.latitude);
          //     sessionStorage.setItem("incidentTempLocation",response.address);  
          //     addgraphics(event.result.feature.geometry.longitude,event.result.feature.geometry.latitude);
          // }
          // if (sessionStorage.getItem("ideasBack") != null || sessionStorage.getItem("ideasBack") != undefined) {
          //   sessionStorage.setItem("ideasTemplong",event.result.feature.geometry.longitude);
          //   sessionStorage.setItem("ideasTemplat",event.result.feature.geometry.latitude);
          //   sessionStorage.setItem("ideasTempLocation",response.address);  
          //   addgraphics(event.result.feature.geometry.longitude,event.result.feature.geometry.latitude);
          // }
          // if (sessionStorage.getItem("volunterBack") != null || sessionStorage.getItem("volunterBack") != undefined) {
          //   sessionStorage.setItem("volunterTemplong",event.result.feature.geometry.longitude);
          //   sessionStorage.setItem("volunterTemplat",event.result.feature.geometry.latitude);
          //   sessionStorage.setItem("volunterTempLocation",response.address);  
          //   addgraphics(event.result.feature.geometry.longitude,event.result.feature.geometry.latitude);
          // }
          // if (sessionStorage.getItem("volunterEditBack") != null || sessionStorage.getItem("volunterEditBack") != undefined) {
          //   sessionStorage.setItem("volunterEditTemplong",event.result.feature.geometry.longitude);
          //   sessionStorage.setItem("volunterEditTemplat",event.result.feature.geometry.latitude);
          //   sessionStorage.setItem("volunterEditTempLocation",response.address);  
          //   addgraphics(event.result.feature.geometry.longitude,event.result.feature.geometry.latitude);
          // }
          
      })
        .catch(() => {
          sessionStorage.setItem("currentAddress", "No address was found for this location");
        });
        });
        view.ui.add(locateBtn, "top-left");
        view.ui.add(searchWidget, "top-right");
      })

  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(){
    if (
     ( sessionStorage.getItem("currentAddress") != null ||
      sessionStorage.getItem("currentAddress") != undefined ) &&  (this.mapClickFlag==true)
    ) {
      sessionStorage.setItem(
        "currentAddress",
        sessionStorage.getItem("currentAddressTemp")!
      );
      sessionStorage.setItem(
        "currentLongitude",
        sessionStorage.getItem("currentLongitude")!
      );
      sessionStorage.setItem(
        "currentLatitude",
        sessionStorage.getItem("currentLatitude")!
      );
    } else {
      // sessionStorage.setItem(
      //   "currentAddress",
      //   sessionStorage.getItem("currentAddressTemp")!
      // );
      // sessionStorage.setItem(
      //   "currentLongitude",
      //   sessionStorage.getItem("currentLongitude")!
      // );
      // sessionStorage.setItem(
      //   "currentLatitude",
      //   sessionStorage.getItem("currentLatitude")!
      // );
    }
    this.onClose();
  }
 
}

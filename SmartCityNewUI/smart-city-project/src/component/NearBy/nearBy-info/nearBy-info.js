import React, { Component } from "react";
import { loadModules } from 'esri-loader';
import { Map   }  from '@esri/react-arcgis';
import "./nearBy-info.css"

const options = {
  url: 'https://js.arcgis.com/4.20/'
};

const styles =  {
  

  container: {
    width: '100vw',
    padding:'10px',
  },
  mapDiv: {
    padding: '5px',
    height: '100%',
    width: '100%'
  },
}

class NearByInfo extends Component {

  constructor(props) {
    super(props);
    this.state={
      facilities: [],
      id:-1
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  getFacilitesByType() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "user_id": sessionStorage.getItem("user_id"),
          "token": sessionStorage.getItem("token"),
          "id": this.state.id
        }
      )
    };
    var data= fetch(process.env.REACT_APP_API_URL+'FacilityType/GetFacilityType', requestOptions)
      .then(response => response.json())
      .then(
        (json) => {
          this.setState({facilities:json.data});

         this.consturctMap();
        }
    );
  }
  componentDidMount() {
    this.state.id=sessionStorage.getItem("nearById");
    this.getFacilitesByType();
  }

  
  async consturctMap(){
    const [Map,Locator,
      MapView,
      FeatureLayer,
      SimpleMarkerSymbol,
      Graphic, GraphicsLayer,
      PictureMarkerSymbol,
      Point, WebStyleSymbol, Track,Popup,PopupTemplate ] =  await loadModules(['esri/Map',"esri/tasks/Locator",
        'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/symbols', 'esri/Graphic',
        'esri/layers/GraphicsLayer', "esri/symbols/PictureMarkerSymbol", "esri/geometry/Point",
        "esri/symbols/WebStyleSymbol", "esri/widgets/Track","esri/widgets/Popup","esri/PopupTemplate"]);

        var map = new Map({
          basemap: 'streets-navigation-vector',
        });
        

    
        var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 9,
          center: [76.9366, 8.5241] // longitude, latitude
        });
        

        function addgraphics(a, b,name) {
          const popupTemplate = {
            title: name,
         }

         const attributes = {
          Description:   {Longitude:a,Latitude:b}
       }

          var markerPoint = new Point({ x: a, y: b });
          var storepoint = new Graphic(markerPoint, symbol1,attributes,popupTemplate);
          var layer = new GraphicsLayer();
          layer.add(storepoint);
          map.add(layer);

        }
        var hotspots=this.state.facilities;
        let symbol1 = {
          type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
          url:process.env.REACT_APP_API_URL+hotspots[0].facility_image,
          width: "40px",
          height: "40px",
        };
        view.when(function () {
          for (var i = 0; i <hotspots[0].facility_data.length; i++) {

            
            addgraphics(hotspots[0].facility_data[i].longitude, hotspots[0].facility_data[i].latitude,hotspots[0].facility_data[i].facility_name);
          }}); 
      }

 

  render() {
    return(<div className="Mapscreenres" style={styles.container}>
    <div id='viewDiv' style={ styles.mapDiv } >
    </div>
  </div>);
  }
}

export default NearByInfo;

import React, { Component } from "react";
import { loadModules } from 'esri-loader';
import { Map   }  from '@esri/react-arcgis';

const options = {
  url: 'https://js.arcgis.com/4.20/'
};

const styles =  {
  

  container: {
    width: '100%',
    height:'200px'
  },
  mapDiv: {
    height: '100%',
    width: '100%'
  },
}
class UserGeoMapComponent extends Component {

  constructor(props) {
    super(props);
    this.state={
      long:"123",
      lat:"123",
      address_user:'',
    }
  }
  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.lat !== prevProps.lat) {
    //  this.fetchData(this.props.lat);
  this.consturctMap();
    } 
  }

  async consturctMap(){
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

      var symbol1 = new WebStyleSymbol({
        name: "tear-pin-1",
        styleName: "Esri2DPointSymbolsStyle"
      });
      var long=this.props.long;
      var lat=this.props.lat;
      var address=this.props.address;
      view.when(function () {
          addgraphics(long,lat,address);    
        }); 

  })
  }



  render() {
    return (
    <div style={styles.container}>
    <div id='viewDiv' style={ styles.mapDiv } >
    </div>
  </div>
  );
  }
}

export default UserGeoMapComponent;

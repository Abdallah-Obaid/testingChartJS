'use strict';
console.log('hi');

var graticule = new ol.layer.Graticule({
  // the style to use for the lines, optional.
  strokeStyle: new ol.style.Stroke({
    color: 'rgba(207, 0, 15, 1)',
    width: 2,
    lineDash: [0.5, 4],
  }),
  showLabels: true,
  visible: false,
  wrapX: false,
});
var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([new ol.interaction.DragRotateAndZoom()]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
    graticule ],
  target: 'map',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: [6078500.965142061, 2809586.587491476],
    zoom: 17,
  }),
});
map.on('click',function(e){console.log(e.coordinate);
});

///////////////////////////////Change map terrain///////////////////////////////

const openStreetMapStandard = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible:false,
  title: 'Standard-Layers',
});

const openStreetMapHumanitarian = new ol.layer.Tile({
  source: new ol.source.OSM({
    url:'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  }),
  visible:false,
  title: 'First-Layer',
});
const stamenTerrain = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url:'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
    attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
  }),
  visible:false,
  title: 'Sec-Layer',
});
const sateliteTerrain = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
  }),
  visible:true,
  title: 'sateliteTerrain',
});
const bingSateliteTerrain = new ol.layer.Tile({
  source: new ol.source.BingMaps({
    key: 'AvULmzfOTcs6LuAIaoZhatEkngR7N1X1wwaxoOHqN-QEIbDkY6HWGd23_04Abynr',
    imagerySet: 'AerialWithLabelsOnDemand',
    // use maxZoom 19 to see stretched tiles instead of the BingMaps
    // "no photos at this zoom level" tiles
    // maxZoom: 19
  }),
  visible:false,
  title: 'bingSateliteTerrain',
});
  // layer group 
const baseLayerGroup = new ol.layer.Group({
  layers:[
    openStreetMapStandard,openStreetMapHumanitarian,stamenTerrain,sateliteTerrain,bingSateliteTerrain,
  ],
});
map.addLayer(baseLayerGroup);//layer activation

// Layer Switcher
const baseLayerElements=document.querySelectorAll('.sidebar > input[type=radio]'); // select all children "type radio" for sidbar div
for(let baseLayerElement of baseLayerElements){
  baseLayerElement.addEventListener('change',function(e){
    e.preventDefault();
    var allCheckbox = document.getElementById('all-checkbox');
    let baseLayerElementValue = this.value; 
    if('Sec-Layer' == baseLayerElementValue){
      allCheckbox.style.display = 'block';
    }
    else
    {
      allCheckbox.style.display = 'none';
    }
    baseLayerGroup.getLayers().forEach(function(ele,i,arr)
    {let baseLayerTitle = ele.get('title');
      ele.setVisible(baseLayerTitle === baseLayerElementValue);
    });
  });
}
////////////////////////////////////////////////////////////////////////////////


/////////////////////TO make GeoImage "Geo Refferance layer/////////////////////

/**
 * TO make GeoImage "Geo Refferance layer"
 */
$('.option').on('change', resetSource);

var x = Number($('#x').val());
var y = Number($('#y').val());
var sx = Number($('#w').val());
var sy = Number($('#h').val());
var xmin = Number($('#xmin').val());
var ymin = Number($('#ymin').val());
var xmax = Number($('#xmax').val());
var ymax = Number($('#ymax').val());

var geoimg = new ol.layer.GeoImage({
  name: 'Georef',
  opacity: .7,
  source: new ol.source.GeoImage({
    url: './data/mapYas.png',
    imageCenter: [x,y],
    imageScale: [sx,sy],
    imageCrop: [xmin,ymin,xmax,ymax],
    //imageMask: [[273137.343,6242443.14],[273137.343,6245428.14],[276392.157,6245428.14],[276392.157,6242443.14],[273137.343,6242443.14]],
    imageRotate: Number($('#rotate').val()*Math.PI/180),
    projection: 'EPSG:3857',
    attributions: [ '<a href=\'http://www.geoportail.gouv.fr/actualite/181/telechargez-les-cartes-et-photographies-aeriennes-historiques\'>Photo historique &copy; IGN</a>' ],
  }),
});
map.addLayer(geoimg);

function resetSource () {
  var x = Number($('#x').val());
  var y = Number($('#y').val());
  var sx = Number($('#w').val());
  var sy = Number($('#h').val());
  var xmin = Number($('#xmin').val());
  var ymin = Number($('#ymin').val());
  var xmax = Number($('#xmax').val());
  var ymax = Number($('#ymax').val());
  // geoimg.getSource().setCenter([x,y]);
  geoimg.getSource().setRotation($('#rotate').val()*Math.PI/180);
  geoimg.getSource().setScale([sx,sy]);
  geoimg.getSource().setCrop([xmin,ymin,xmax,ymax]);
  var crop = geoimg.getSource().getCrop();
  $('#xmin').val(crop[0]);
  $('#ymin').val(crop[1]);
  $('#xmax').val(crop[2]);
  $('#ymax').val(crop[3]);
}

// Show extent in the layerswitcher
map.addControl(new ol.control.LayerSwitcher({ extent:true }));
map.on('click',function(e){  geoimg.getSource().setCenter([e.coordinate[0],e.coordinate[1]]);});
////////////////////////////////////////////////////////////////////////////////



//////////////////////////Draw in  map with diff zoom///////////////////////////

const fillStyle=new ol.style.Fill({
  color: [84,118,255,1],
});

const strokeStyle=new ol.style.Stroke({
  color: [46,45,45,1],
  width:1.2,
});

const circleStyle = new ol.style.Circle({
  fill: new ol.style.Fill({
    color:[245,49,5,1],
  }),
  radius: 7,
  stroke: strokeStyle,
});

const penguinInLayer = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vector_data/map.geojson',
    format: new ol.format.GeoJSON(),
  }),
  visible: true,
  maxZoom:40,
  minZoom:18,
  // projection: 'EPSG:3857',
  title:'penguinInLayer',
  style: new ol.style.Style({
    fill:fillStyle,
    stroke:strokeStyle,
    image:circleStyle,
  }),
});
map.addLayer(penguinInLayer);

const penguinInLayerDetails = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vector_data/map1.geojson',
    format: new ol.format.GeoJSON(),
  }),
  visible: true,
  maxZoom:40,
  minZoom:21,
  // projection: 'EPSG:3857',
  title:'penguinInLayerDetails',
});
map.addLayer(penguinInLayerDetails);
////////////////////////////////////////////////////////////////////////////////



/////////////////////////This is t handle search process////////////////////////

var queryInput = document.getElementById('epsg-query'); //for search
var searchButton = document.getElementById('epsg-search');//for search
var resultSpan = document.getElementById('epsg-result');//for search
var renderEdgesCheckbox = document.getElementById('render-edges');// for grid
var showGraticuleCheckbox = document.getElementById('show-graticule');// for grid

/**
 * This is t handle search process
 * @param {fuction} query 
 */
function search(query) {
  resultSpan.innerHTML = 'Searching ...';
  console.log(query);
  fetch(`https://eu1.locationiq.com/v1/search.php?key=d4328e89827d71&q=${query}&format=json`)
    .then(function (response) {
      // console.log('sadsadasdsadasd',response);
      return response.json();
    })
    .then(function (json) {
      var results = json[0];
      // console.log(results);
      var pointer = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([results.lon, results.lat])),
      });
      // console.log(pointer,'@@@@@@@');
      pointer.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            color: '#BADA55',
            crossOrigin: 'anonymous',
            // For Internet Explorer 11
            imgSize: [20, 20],
            src: 'data/dot.svg',
          }),
        }),
      );
      var vectorSource = new ol.source.Vector({
        features: [pointer],
      });
      var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
      });
      
      map.addLayer(vectorLayer);//layer activation
      map.setView(new ol.View({
        center: ol.proj.fromLonLat([results.lon,results.lat]),
        zoom: 17,
      }));

      resultSpan.innerHTML =results.display_name ;          
    });
}
////////////////////////////////////////////////////////////////////////////////


///////////////////////////////Handle click event///////////////////////////////

/** 
 * Handle click event.
 * @param {Event} event The event.
 */
searchButton.onclick = function (event) {
  search(queryInput.value);
  event.preventDefault();
};
////////////////////////////////////////////////////////////////////////////////


//////////////////////////Handle checkbox change event//////////////////////////

/**
 * Handle checkbox change event.
 */
renderEdgesCheckbox.onchange = function () {
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Tile) {
      var source = layer.getSource();
      if (source instanceof ol.source.TileImage) {
        source.setRenderReprojectionEdges(renderEdgesCheckbox.checked);
      }
    }
  });
};
////////////////////////////////////////////////////////////////////////////////



//////////////////////////Handle checkbox change event//////////////////////////

/**
 * Handle checkbox change event.
 */
showGraticuleCheckbox.onchange = function () {
  graticule.setVisible(showGraticuleCheckbox.checked);
};
////////////////////////////////////////////////////////////////////////////////


// // for make polyline from x,y coordinate from geojson
// var newArray=[];
// var coordinates = [[-51.668701171875,-28.541100228636036],[-51.70166015625,-28.627925287618552],[-51.6357421875,-28.772474183943007],[-51.5203857421875,-28.777289039997598],[-51.35009765625,-28.73394733840369],[-51.207275390625,-28.676130433078256],[-51.5972900390625,-29.065772888415406],[-51.844482421875,-28.9072060763367],[-51.60072326660156,-29.068173545070522],[-51.79023742675781,-29.233683670282776],[-52.1466064453125,-29.120373989614624],[-51.79229736328125,-29.237278753059552],[-52.051849365234375,-29.45155650109173]];
// console.log('coordinates1',coordinates);
// // coordinates.unshift(getLocation());
// console.log('coordinates2',coordinates);
// coordinates.forEach((e)=>{newArray.push(e[1],e[0]);});
// var polyline=ol.format.Polyline.encodeDeltas(
//   newArray,
//   2,1e6,
// );

// var route = /** @type {import("../src/ol/geom/LineString.js").default} */ (new ol.format.Polyline(
//   {
//     factor: 1e6,
//   },
// ).readGeometry(polyline, {
//   dataProjection: 'EPSG:4326',
//   featureProjection: 'EPSG:3857',
// }));


// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }
// }
// function showPosition(position) {
//   console.log([position.coords.latitude
//     ,position.coords.longitude]);
// }


// var routeCoords = route.getCoordinates();
// console.log('routeCoords', routeCoords);
// var routeLength = routeCoords.length;
// console.log('route', route);
// var routeFeature = new ol.Feature({
//   type: 'route',
//   geometry: route,
// });
// var geoMarker = /** @type Feature<import("../src/ol/geom/Point").default> */ (new ol.Feature(
//   {
//     type: 'geoMarker',
//     geometry: new ol.geom.Point(routeCoords[0]),
//   },
// ));
// var startMarker = new ol.Feature({
//   type: 'icon',
//   geometry: new ol.geom.Point(routeCoords[0]),
// });
// var endMarker = new ol.Feature({
//   type: 'icon',
//   geometry: new ol.geom.Point(routeCoords[routeLength - 1]),
// });

// var styles = {
//   route: new ol.style.Style({
//     stroke: new ol.style.Stroke({
//       width: 6,
//       color: [237, 212, 0, 0.8],
//     }),
//   }),
//   icon: new ol.style.Style({
//     image: new ol.style.Icon({
//       anchor: [0.5, 1],
//       src: 'data/icon.png',
//     }),
//   }),
//   geoMarker: new ol.style.Style({
//     image: new ol.style.Circle({
//       radius: 7,
//       fill: new ol.style.Fill({ color: 'rgb(43, 149, 219)' }),
//       stroke: new ol.style.Stroke({
//         color: 'white',
//         width: 2,
//       }),
//     }),
//   }),
// };

// var animating = false;
// var speed, now;
// var speedInput = document.getElementById('speed');
// var startButton = document.getElementById('start-animation');

// var vectorLayer = new ol.layer.Vector({
//   source: new ol.layer.Vector({
//     features: [routeFeature, geoMarker, startMarker, endMarker],
//   }),
//   style: function (feature) {
//     // hide geoMarker if animation is active
//     if (animating && feature.get('type') === 'geoMarker') {
//       return null;
//     }
//     return styles[feature.get('type')];
//   },
// });

// var key = 'M9TDdi2dEDvoOpLaJYxQ';
// var attributions =
//   '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
//   '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
// map.addLayer(vectorLayer);


// var moveFeature = function (event) {
//   var vectorContext = ol.render.getVectorContext(event);
//   var frameState = event.frameState;

//   if (animating) {
//     var elapsedTime = frameState.time - now;
//     // here the trick to increase speed is to jump some indexes
//     // on lineString coordinates
//     var index = Math.round((speed * elapsedTime) / 1000);

//     if (index >= routeLength) {
//       stopAnimation(true);
//       return;
//     }

//     var currentPoint = new ol.geom.Point(routeCoords[index]);
//     var feature = new ol.Feature(currentPoint);
//     vectorContext.drawFeature(feature, styles.geoMarker);
//   }
//   // tell OpenLayers to continue the postrender animation
//   map.render();
// };

// function startAnimation() {
//   if (animating) {
//     stopAnimation(false);
//   } else {
//     animating = true;
//     now = new Date().getTime();
//     speed = speedInput.value;
//     startButton.textContent = 'Cancel Animation';
//     // hide geoMarker
//     geoMarker.setStyle(null);
//     // just in case you pan somewhere else
//     map.getView().setCenter([6078500.965142061, 2809586.587491476]);
//     vectorLayer.on('postrender', moveFeature);
//     map.render();
//   }
// }

// /**
//  * @param {boolean} ended end of animation.
//  */
// function stopAnimation(ended) {
//   animating = false;
//   startButton.textContent = 'Start Animation';

//   // if animation cancelled set the marker at the beginning
//   var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
//   var geometry = geoMarker.getGeometry();
//   geometry.setCoordinates(coord);
//   //remove listener
//   vectorLayer.un('postrender', moveFeature);
// }

// startButton.addEventListener('click', startAnimation, false);





















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add functionality to vectors (Pop up text):
          
// map.on('click', function(cleckedArea){
//   map.forEachFeatureAtPixel(cleckedArea.pixel,function(feature,layer){
//     let clickedFeatureName = feature.get('name');
//     // let clickedFeatureAdditionalinfo = feature.get('additionalinfo');
//     console.log(clickedFeatureName,'hello');
//   });  console.log(cleckedArea.coordinate);
// });

    
// var extent = [3992801.0614873893, 3762111.5948936045, 3992879.65616761, 3762172.8669200735];

// const imageLayerToMap = new ol.layer.Image({
//   source: new ol.source.ImageStatic({
//     attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
//     url: 'https://www.autodesk.eu/content/dam/autodesk/www/products/autodesk-autocad-lt/fy20/features/images/new-dark-theme-large-1920x1048.jpg',
//     // projection: 'EPSG:4326',
//     imageExtent: extent,
//     imageSize:[0, 0],
  
//   }),
//   className:'mapy',
// });
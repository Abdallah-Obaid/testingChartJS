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
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
    graticule ],
  target: 'map',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: [0, 0],
    zoom: 1,
  }),
});
map.on('click',function(e){console.log(e.coordinate);
});

  //add more terrain
  const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible:false,
    title: 'Standard-Layers',
  });

  const openStreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url:'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    }),
    visible:true,
    title: 'First-Layer',
  });

var queryInput = document.getElementById('epsg-query');
var searchButton = document.getElementById('epsg-search');
var resultSpan = document.getElementById('epsg-result');
var renderEdgesCheckbox = document.getElementById('render-edges');
var showGraticuleCheckbox = document.getElementById('show-graticule');

function search(query) {
  resultSpan.innerHTML = 'Searching ...';
  console.log(query)
  fetch(`https://eu1.locationiq.com/v1/search.php?key=d4328e89827d71&q=${query}&format=json`)
    .then(function (response) {
      console.log('sadsadasdsadasd',response)
      return response.json();
    })
    .then(function (json) {
      var results = json[0];
      console.log(results)
      var pointer = new ol.Feature({///////////////////////////////////
        geometry: new ol.geom.Point(ol.proj.fromLonLat([results.lon, results.lat])),
      });
      console.log(pointer,'@@@@@@@')
      pointer.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            color: '#BADA55',
            crossOrigin: 'anonymous',
            // For Internet Explorer 11
            imgSize: [20, 20],
            src: 'data/dot.svg',
          }),
        })
      );
      var vectorSource = new ol.source.Vector({
        features: [pointer],
      });
      var vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });
      
      var rasterLayer = new ol.layer.Tile({
        source: new ol.source.OSM({
          url:'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        }),
        visible:true,
        title: 'First-Layer',
      });
      document.getElementById('map').remove();
      var g = document.createElement('div');
      g.setAttribute("id", "map");
      g.setAttribute("class", "map");
      document.getElementById('out-map').appendChild(g);
      let map = new ol.Map({
        layers: [rasterLayer, vectorLayer],
        projection: 'EPSG:4326',
        target: "map",
        view: new ol.View({
          center: ol.proj.fromLonLat([results.lon,results.lat]),
          zoom: 17
        })
      });
      // map.layer(vectorLayer)
//       map.layers = [rasterLayer,vectorLayer]
//       console.log(map)
//       // map.setTarget('map')
//       // map.setLayers( [rasterLayer, vectorLayer])
//       map.setView(
//   new ol.View({
//     projection: 'EPSG:4326',
//     center: [results.lon,results.lat],
//     zoom: 16,
//   }),
// );  ////////////////////////////////////////

// map.addLayer(baseLayerGroup);//layer activation
  resultSpan.innerHTML =results.display_name ;
    });

}
/**
 * Handle click event.
 * @param {Event} event The event.
 */
searchButton.onclick = function (event) {
  search(queryInput.value);
  event.preventDefault();
};

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

/**
 * Handle checkbox change event.
 */
showGraticuleCheckbox.onchange = function () {
  graticule.setVisible(showGraticuleCheckbox.checked);
};

const stamenTerrain = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url:'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    }),
    visible:false,
    title: 'Sec-Layer',
  });
  // layer group 
  const baseLayerGroup = new ol.layer.Group({
    layers:[
      openStreetMapStandard,openStreetMapHumanitarian,stamenTerrain,
    ],
  });
  map.addLayer(baseLayerGroup);//layer activation

  // Layer Switcher
  const baseLayerElements=document.querySelectorAll('.sidebar > input[type=radio]');
  for(let baseLayerElement of baseLayerElements){
      baseLayerElement.addEventListener('change',function(e){
      e.preventDefault();
      var allCheckbox = document.getElementById('all-checkbox')
      let baseLayerElementValue = this.value; 
      if('Sec-Layer' == baseLayerElementValue){
        allCheckbox.style.display = "block";
      }
      else
      {
        allCheckbox.style.display = "none";
      }
      baseLayerGroup.getLayers().forEach(function(ele,i,arr)
      {let baseLayerTitle = ele.get('title');
        ele.setVisible(baseLayerTitle === baseLayerElementValue);
      });
    });
  }
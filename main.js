console.log('hi');
var graticule = new ol.layer.Graticule({
  // the style to use for the lines, optional.
  strokeStyle: new ol.style.Stroke({
    color: 'rgba(255,120,0,0.9)',
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

function setProjection(code, name, proj4def, bbox) {
  if (code === null || name === null || proj4def === null || bbox === null) {
    resultSpan.innerHTML = 'Nothing usable found, using EPSG:3857...';
    map.setView(
      new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 1,
      }),
    );
    return;
  }

  resultSpan.innerHTML = '(' + code + ') ' + name;

  var newProjCode = 'EPSG:' + code;
  proj4.defs(newProjCode, proj4def);
  console.log('here');
  ol.proj.proj4.register(proj4);
  var newProj = ol.proj.get(newProjCode);
  var fromLonLat = ol.proj.getTransform('EPSG:4326', newProj);

  var worldExtent = [bbox[1], bbox[2], bbox[3], bbox[0]];
  newProj.setWorldExtent(worldExtent);

  // approximate calculation of projection extent,
  // checking if the world extent crosses the dateline
  if (bbox[1] > bbox[3]) {
    worldExtent = [bbox[1], bbox[2], bbox[3] + 360, bbox[0]];
  }
  var extent = ol.extent.applyTransform(worldExtent, fromLonLat, undefined, 8);
  newProj.setExtent(extent);
  var newView = new ol.View({
    projection: newProj,
  });
  map.setView(newView);
  newView.fit(extent);
}

function search(query) {
  resultSpan.innerHTML = 'Searching ...';
  fetch('https://epsg.io/?format=json&q=' + query)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var results = json['results'];
      if (results && results.length > 0) {
        for (var i = 0, ii = results.length; i < ii; i++) {
          var result = results[i];
          if (result) {
            var code = result['code'];
            var name = result['name'];
            var proj4def = result['proj4'];
            var bbox = result['bbox'];
            if (
              code &&
              code.length > 0 &&
              proj4def &&
              proj4def.length > 0 &&
              bbox &&
              bbox.length == 4
            ) {
              setProjection(code, name, proj4def, bbox);
              return;
            }
          }
        }
      }
      setProjection(null, null, null, null);
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
      url:'https://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
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
    baseLayerElement.addEventListener('change',function(){
      let baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach(function(ele,i,arr)
      {let baseLayerTitle = ele.get('title');
        ele.setVisible(baseLayerTitle === baseLayerElementValue);
      });
    });
  }







{/* <div id="map" class="map"></div>
<form class="form-inline">
  <label for="epsg-query">Search projection:</label>
  <input type="text" id="epsg-query" placeholder="4326, 27700, 3031, US National Atlas, Swiss, France, ..." class="form-control" size="50" />
  <button id="epsg-search" class="btn">Search</button>
  <span id="epsg-result"></span>
  <div>
    <label for="render-edges">
      Render reprojection edges
      <input type="checkbox" id="render-edges">
    </label>
    <label for="show-graticule">
      &nbsp;&nbsp;&nbsp;Show graticule
      <input type="checkbox" id="show-graticule" />
    </label>
  </div>
</form>
</div> */}
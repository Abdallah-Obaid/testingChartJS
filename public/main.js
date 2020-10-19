window.onload = init;
function init(){
  const map = new ol.Map({
    view: new ol.View({ //shape and size of view
      center: [4034906.622841873, 3669027.2006313847],
      zoom: 7,
    }),
    layers: [ //standard terrain
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: 'js-map',
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
}

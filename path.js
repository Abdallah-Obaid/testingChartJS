// var a={'name':'a','cord':[10,30],'connect':[]};
// var b={'name':'b','cord':[20,30],'connect':[]};
// var c={'name':'c','cord':[30,30],'connect':[]};
// var d={'name':'d','cord':[10,20],'connect':[]};
// var e={'name':'e','cord':[20,20],'connect':[]};
// var f={'name':'f','cord':[30,20],'connect':[]};




// a.connect = [b,d,e];
// b.connect = [a,c,e];
// c.connect = [b,e,f];
// d.connect = [a,e];
// e.connect = [a,b,c,d,f];
// f.connect = [c,e];

var a={'name':'a','cord':[35.86602285504341,31.97601465561543],'connect':[]};
var b={'name':'b','cord':[35.86597356945276, 31.976024894181652],'connect':[]};
var c={'name':'c','cord':[35.86598966270685,31.976086894363696],'connect':[]};
var d={'name':'d','cord':[35.86595144122838,31.97609627970872],'connect':[]};
var e={'name':'e','cord':[35.86594607681036,31.97607324295106],'connect':[]};
var f={'name':'f','cord':[35.86591690778732,31.97614320641936],'connect':[]};
var g={'name':'g','cord':[35.865960493683815,31.97611846324765],'connect':[]};
var h={'name':'h','cord':[35.86596351116896,31.976134674291945],'connect':[]};
var i={'name':'i','cord':[35.86591087281704,31.976123866929395],'connect':[]};
var j={'name':'j','cord':[35.86590986698866,31.97610310541359],'connect':[]};
var k={'name':'k','cord':[35.86590684950352,31.976082628297483],'connect':[]};
a.connect = [b];
b.connect = [a,c];
c.connect = [b,g,d];
d.connect = [c,e,i,j];
e.connect = [d];
f.connect = [i];
g.connect = [c,h,i];
h.connect = [g];
i.connect = [d,g,f];
j.connect = [k,d];
k.connect = [j];

// To find distance between nodes for edges
function finLength(f1,f2){
  var dif1 = f1.cord[0] - f2.cord[0];
  var dif2 = f1.cord[1] - f2.cord[1];
  var edge = Math.sqrt( dif1*dif1 + dif2*dif2 );
  return edge;
}

function findAllPathes(first,sec){
  if(first.name === sec.name)return 'you are in the point';
  let totalWeight;
  let finalPath = [];
  let finalnames = [];
  let nodes = function(node,weigth,path,names){
    node.connect.forEach((ele) =>{
      let disLin = finLength(node,ele);
      if(ele.name == sec.name){
        if(totalWeight == undefined || weigth + disLin < totalWeight){
          finalPath = path.slice();
          finalPath.push(ele.cord);
          finalnames = names.slice();
          finalnames.push(ele.name);
          totalWeight =  weigth + disLin;
        }
      }
      else if(first.name != ele.name && (totalWeight == undefined || weigth + disLin < totalWeight)){
        let skip = false; 
        names.forEach((name) =>{
          if(name == ele.name )skip = true;
        });
        if(!skip)return nodes(ele, weigth + disLin, path.concat([ele.cord]),names.concat([ele.name]));
      }
    });
  };
  nodes(first,0,[],[]);
  finalPath.unshift(first.cord);
  finalnames.unshift(first.name);
  return finalPath.length > 1 ? JSON.stringify({path:finalPath,weight:totalWeight,finalnames:finalnames}): 'no destence';
}

console.log(findAllPathes(f,a));
// console.log(`a=>b = ${finLength(a,b)}  `,`a=>e = ${finLength(a,e)}  `,`b=>f = ${finLength(b,f)}  `,`e=>f = ${finLength(e,f)}  `);
// console.log(findAllPathes(a,e));
// console.log(findAllPathes(b,e));
// console.log(findAllPathes(c,b));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // for make polyline from x,y coordinate from geojson


// var a={'name':'a','cord':[35.86602285504341,31.97601465561543],'connect':[]};
// var b={'name':'b','cord':[35.86597356945276, 31.976024894181652],'connect':[]};
// var c={'name':'c','cord':[35.86598966270685,31.976086894363696],'connect':[]};
// var d={'name':'d','cord':[35.86595144122838,31.97609627970872],'connect':[]};
// var e={'name':'e','cord':[35.86594607681036,31.97607324295106],'connect':[]};
// var f={'name':'f','cord':[35.86591690778732,31.97614320641936],'connect':[]};
// var g={'name':'g','cord':[35.865960493683815,31.97611846324765],'connect':[]};
// var h={'name':'h','cord':[35.86596351116896,31.976134674291945],'connect':[]};
// var i={'name':'i','cord':[35.86591087281704,31.976123866929395],'connect':[]};
// var j={'name':'j','cord':[35.86590986698866,31.97610310541359],'connect':[]};
// var k={'name':'k','cord':[35.86590684950352,31.976082628297483],'connect':[]};
// a.connect = [b];
// b.connect = [a,c];
// c.connect = [b,g,d];
// d.connect = [c,e,i,j];
// e.connect = [d];
// f.connect = [i];
// g.connect = [c,h,i];
// h.connect = [g];
// i.connect = [d,g,f];
// j.connect = [k,d];
// k.connect = [j];

// // To find distance between nodes for edges
// function finLength(f1,f2){
//   var dif1 = f1.cord[0] - f2.cord[0];
//   var dif2 = f1.cord[1] - f2.cord[1];
//   var edge = Math.sqrt( dif1*dif1 + dif2*dif2 );
//   return edge;
// }

// function findAllPathes(first,sec){
//   if(first.name === sec.name)return 'you are in the point';
//   let totalWeight;
//   let finalPath = [];
//   let finalnames = [];
//   let nodes = function(node,weigth,path,names){
//     node.connect.forEach((ele) =>{
//       let disLin = finLength(node,ele);
//       if(ele.name == sec.name){
//         if(totalWeight == undefined || weigth + disLin < totalWeight){
//           finalPath = path.slice();
//           finalPath.push(ele.cord);
//           finalnames = names.slice();
//           finalnames.push(ele.name);
//           totalWeight =  weigth + disLin;
//         }
//       }
//       else if(first.name != ele.name && (totalWeight == undefined || weigth + disLin < totalWeight)){
//         let skip = false; 
//         names.forEach((name) =>{
//           if(name == ele.name )skip = true;
//         });
//         if(!skip)return nodes(ele, weigth + disLin, path.concat([ele.cord]),names.concat([ele.name]));
//       }
//     });
//   };
//   nodes(first,0,[],[]);
//   finalPath.unshift(first.cord);
//   finalnames.unshift(first.name);
//   return finalPath.length > 1 ? JSON.stringify({path:finalPath,weight:totalWeight,finalnames:finalnames}): 'no destence';
// }
// var path = JSON.parse(findAllPathes(a,f)).path; //Shows start and end point

// console.log(path,'pathsnewArrayadasd');
// var newArray=[];
// // JSON.parse()
// // var coordinates =path;
// var coordinates =[[35.86591690778732,31.97614320641936],[35.86591087281704,31.976123866929395],[35.86595144122838,31.97609627970872],[35.86598966270685,31.976086894363696],[35.86597356945276,31.976024894181652],[35.86602285504341,31.97601465561543]];
// console.log(coordinates,'coordinatescoordinates');
// coordinates.forEach((e)=>{newArray.push(e[1],e[0]);});
// console.log(newArray,'newArraynewArray');
// var polyline=ol.format.Polyline.encodeDeltas(
//   newArray,
//   2,1e6,
// );
// console.log(newArray,'newArraynewArray');
// console.log(polyline);
// var route = /** @type {import("../src/ol/geom/LineString.js").default} */ (new ol.format.Polyline(
//   {
//     factor: 1e6,
//   },
// ).readGeometry(polyline, {
//   dataProjection: 'EPSG:4326',
//   featureProjection: 'EPSG:3857',
// }));

// //0: -5751733.504402943
// //1: -3317367.02757665
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }
// }
// function showPosition(position) {
//   console.log([position.coords.latitude
//     ,position.coords.longitude]);
// }
// coordinates.unshift(getLocation());
// console.log('coordinates',coordinates);
// var strGeoJson =
//   '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-51.668701171875,-28.541100228636036],[-51.70166015625,-28.627925287618552],[-51.6357421875,-28.772474183943007],[-51.5203857421875,-28.777289039997598],[-51.35009765625,-28.73394733840369],[-51.207275390625,-28.676130433078256],[-51.5972900390625,-29.065772888415406],[-51.844482421875,-28.9072060763367],[-51.60072326660156,-29.068173545070522],[-51.79023742675781,-29.233683670282776],[-52.1466064453125,-29.120373989614624],[-51.79229736328125,-29.237278753059552],[-52.051849365234375,-29.45155650109173]]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-52.921142578125,-29.166552295200137],[-52.239990234375,-29.606894276531495]]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-50.943603515625,-30.09761327721712],[-51.58630371093749,-29.897805610155864],[-51.56982421875,-29.439597566602902],[-51.48193359375,-29.382175075145277],[-51.3885498046875,-29.32950930836469],[-51.3885498046875,-29.20971322586817],[-51.416015625,-29.1233732108192],[-51.5478515625,-29.10897615145303],[-51.6632080078125,-29.10897615145303],[-51.778564453125,-29.171348850951507],[-51.74560546875,-29.267232865200878],[-51.70166015625,-29.372601506681402],[-51.602783203125,-29.425244985472006],[-51.5972900390625,-29.931134809868684],[-52.4102783203125,-29.94541533710444],[-51.5478515625,-29.931134809868684],[-51.5643310546875,-30.140376821599734],[-51.7840576171875,-30.35391637229704],[-51.96533203125,-30.571720565199872],[-51.5972900390625,-30.168875561169088],[-51.37207031249999,-30.33021268543272],[-51.1907958984375,-30.595365565588075],[-50.9710693359375,-30.51021658722997],[-50.877685546875,-30.666265946323286],[-50.987548828125,-30.722948824772498],[-51.119384765625,-30.755998458321656],[-51.141357421875,-30.666265946323286],[-51.2347412109375,-30.685163937659564],[-51.2017822265625,-30.770159115784185],[-51.339111328125,-30.73239273400607],[-51.2896728515625,-30.60954979719083],[-51.22375488281249,-30.56226095049943],[-51.416015625,-30.29701788337204],[-51.580810546875,-30.19261821849926],[-51.94885253906249,-30.533876572997617],[-52.239990234375,-30.552800413453518],[-52.3443603515625,-30.62373195163005],[-52.2235107421875,-30.760718908944472],[-52.064208984375,-30.760718908944472],[-51.943359375,-30.704058230919504],[-52.0147705078125,-30.619004797647808],[-51.8829345703125,-30.637912028341113],[-51.96086883544922,-30.56758209727092]]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-53.03649902343749,-29.27681632836857],[-52.33886718749999,-29.735762444449076],[-52.4871826171875,-29.864465259257987],[-53.15185546875,-29.453948118887734],[-52.5091552734375,-29.89304338543418],[-52.62451171875,-30.07860131571654],[-53.27819824218749,-29.68328053373362],[-53.3111572265625,-29.764377375163114],[-53.3111572265625,-29.864465259257987],[-53.23974609375,-29.926374178635747],[-53.12988281249999,-29.854937397596693],[-53.0914306640625,-29.807284450222504]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-51.64398193359375,-29.19532826709913],[-51.60552978515624,-29.267232865200878],[-51.5313720703125,-29.25285598597375],[-51.514892578125,-29.20252099881366],[-51.58630371093749,-29.15935704135541],[-51.64398193359375,-29.19532826709913]]]}}]}';
// console.log("encodeFloats1",encodeFloats1)
// var route = /** @type {ol.geom.LineString} */ (new GeoJSON().readFeature(
// //   JSON.parse(strGeoJson).features[1],
// //   {
// //     dataProjection: "EPSG:4326",
// //     featureProjection: "EPSG:3857"
// //   }
// // )).getGeometry();

// // document.getElementById('form').addEventListener('change',()=>{
// //   path = JSON.parse(findAllPathes(window[document.getElementById('from').value],window[document.getElementById('to').value])).path;
// //   console.log(path,'path');
// //   var newArray=[];
// //   // JSON.parse()
// // console.log("encodeFloats1",encodeFloats1)
// // var route = /** @type {ol.geom.LineString} */ (new ol.format.GeoJSON().readFeature(
// //   var coordinates =path;
// //   // var coordinates =[[35.86591690778732,31.97614320641936],[35.86591087281704,31.976123866929395],[35.86595144122838,31.97609627970872],[35.86598966270685,31.976086894363696],[35.86597356945276,31.976024894181652],[35.86602285504341,31.97601465561543]];

// //   coordinates.forEach((e)=>{newArray.push(e[1],e[0]);});
// //   console.log(coordinates,'coordinatescoordinates');
// //   console.log(newArray,'newArraynewArraynewArray');
// //   var polyline=ol.format.Polyline.encodeDeltas(
// //     newArray,
// //     2,1e6,
// //   );
// //   var route = /** @type {import("../src/ol/geom/LineString.js").default} */ (new ol.format.Polyline(
// //     {
// //       factor: 1e6,
// //     },
// //   ).readGeometry(polyline, {
// //     dataProjection: 'EPSG:4326',
// //     featureProjection: 'EPSG:3857',
// //   }));
// //   routeFeature.setGeometry(route);
// //   var routeCoords = route.getCoordinates();
// //   console.log('routeCoords', routeCoords);
// //   var routeLength = routeCoords.length;
// //   console.log('route', route);


// //   geoMarker.setGeometry(new ol.geom.Point(routeCoords[0]));
// //   startMarker.setGeometry(new ol.geom.Point(routeCoords[0]));
// //   endMarker.setGeometry(new ol.geom.Point(routeCoords[routeLength - 1]));
// // });

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

// // var animating = false;
// // var speed, now;
// // var speedInput = document.getElementById('speed');
// // var startButton = document.getElementById('start-animation');

// var vectorLayer1 = new ol.layer.Vector({
//   source: new ol.source.Vector({
//     features: [routeFeature, geoMarker, startMarker, endMarker],
//   }),
//   style: function (feature) {
//     // hide geoMarker if animation is active
//     // if (animating && feature.get('type') === 'geoMarker') {
//     //   return null;
//     // }
//     return styles[feature.get('type')];
//   },
// });
// map.addLayer(vectorLayer1);//layer activation
// var key = 'M9TDdi2dEDvoOpLaJYxQ';
// var attributions =
//   '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
//   '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

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
//     map.getView().setCenter([3992579.250256516, 3760172.928780113]);
//     vectorLayer1.on('postrender', moveFeature);
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
//   vectorLayer1.un('postrender', moveFeature);
// }

// startButton.addEventListener('click', startAnimation, false);
// map.on('click',function(e){
//   console.log('Clicked');
//   $('.option').on('change', resetSource);

//   var x = Number($('#x').val());
//   var y = Number($('#y').val());
//   var sx = Number($('#w').val());
//   var sy = Number($('#h').val());
//   var xmin = Number($('#xmin').val());
//   var ymin = Number($('#ymin').val());
//   var xmax = Number($('#xmax').val());
//   var ymax = Number($('#ymax').val());
  
//   function resetSource () {
//     var x = Number($('#x').val());
//     var y = Number($('#y').val());
//     var sx = Number($('#w').val());
//     var sy = Number($('#h').val());
//     var xmin = Number($('#xmin').val());
//     var ymin = Number($('#ymin').val());
//     var xmax = Number($('#xmax').val());
//     var ymax = Number($('#ymax').val());
//     geoimg.getSource().setCenter(e.coordinate[0],e.coordinate[1]);
//     geoimg.getSource().setRotation($('#rotate').val()*Math.PI/180);
//     geoimg.getSource().setScale([sx,sy]);
//     geoimg.getSource().setCrop([xmin,ymin,xmax,ymax]);
//     var crop = geoimg.getSource().getCrop();
//     $('#xmin').val(crop[0]);
//     $('#ymin').val(crop[1]);
//     $('#xmax').val(crop[2]);
//     $('#ymax').val(crop[3]);
//     map.addLayer(geoimg);
//   }
        
//   var geoimg = new ol.layer.GeoImage({
//     name: 'Georef',
//     opacity: .7,
//     source: new ol.source.GeoImage({
//       url: './data/mapYas.png',
//       imageCenter: [e.coordinate[0],e.coordinate[1]],
//       imageScale: [sx,sy],
//       imageCrop: [xmin,ymin,xmax,ymax],
//       // imageMask: [[273137.343,6242443.14],[273137.343,6245428.14],[276392.157,6245428.14],[276392.157,6242443.14],[273137.343,6242443.14]],
//       imageRotate: Number($('#rotate').val()*Math.PI/180),
//       projection: 'EPSG:3857',
//       attributions: [ '<a href=\'http://www.geoportail.gouv.fr/actualite/181/telechargez-les-cartes-et-photographies-aeriennes-historiques\'>Photo historique &copy; IGN</a>' ],
//     }),
//   });
//   map.getLayers().forEach(layer => {
//     console.log(layer.get('name'));
//     if (layer.get('name') === 'Georef') {
//       map.removeLayer(layer);
//     }
//   });
//   map.addLayer(geoimg);

//   console.log(map.getLayers(),'layerssssssssssssssssssssssssssssss');
// });  
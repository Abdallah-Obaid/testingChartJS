import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';
import GeoJSON from 'ol/format/GeoJSON';
import LineString from 'ol/geom/LineString';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { getVectorContext } from 'ol/render';
import { encodeDeltas } from 'ol/format/Polyline';

// This long string is placed here due to jsFiddle limitations.
// It is usually loaded with AJAX.
var polyline = [
  'hldhx@lnau`BCG_EaC??cFjAwDjF??uBlKMd@}@z@??aC^yk@z_@se@b[wFdE??wFfE}N',
  'fIoGxB_I\\gG}@eHoCyTmPqGaBaHOoD\\??yVrGotA|N??o[N_STiwAtEmHGeHcAkiA}^',
  'aMyBiHOkFNoI`CcVvM??gG^gF_@iJwC??eCcA]OoL}DwFyCaCgCcCwDcGwHsSoX??wI_E',
  'kUFmq@hBiOqBgTwS??iYse@gYq\\cp@ce@{vA}s@csJqaE}{@iRaqE{lBeRoIwd@_T{]_',
  'Ngn@{PmhEwaA{SeF_u@kQuyAw]wQeEgtAsZ}LiCarAkVwI}D??_}RcjEinPspDwSqCgs@',
  'sPua@_OkXaMeT_Nwk@ob@gV}TiYs[uTwXoNmT{Uyb@wNg]{Nqa@oDgNeJu_@_G}YsFw]k',
  'DuZyDmm@i_@uyIJe~@jCg|@nGiv@zUi_BfNqaAvIow@dEed@dCcf@r@qz@Egs@{Acu@mC',
  'um@yIey@gGig@cK_m@aSku@qRil@we@{mAeTej@}Tkz@cLgr@aHko@qOmcEaJw~C{w@ka',
  'i@qBchBq@kmBS{kDnBscBnFu_Dbc@_~QHeU`IuyDrC_}@bByp@fCyoA?qMbD}{AIkeAgB',
  'k_A_A{UsDke@gFej@qH{o@qGgb@qH{`@mMgm@uQus@kL{_@yOmd@ymBgwE}x@ouBwtA__',
  'DuhEgaKuWct@gp@cnBii@mlBa_@}|Asj@qrCg^eaC}L{dAaJ_aAiOyjByH{nAuYu`GsAw',
  'Xyn@ywMyOyqD{_@cfIcDe}@y@aeBJmwA`CkiAbFkhBlTgdDdPyiB`W}xDnSa}DbJyhCrX',
  'itAhT}x@bE}Z_@qW_Kwv@qKaaAiBgXvIm}A~JovAxCqW~WanB`XewBbK{_A`K}fBvAmi@',
  'xBycBeCauBoF}}@qJioAww@gjHaPopA_NurAyJku@uGmi@cDs[eRaiBkQstAsQkcByNma',
  'CsK_uBcJgbEw@gkB_@ypEqDoqSm@eZcDwjBoGw`BoMegBaU_`Ce_@_uBqb@ytBwkFqiT_',
  'fAqfEwe@mfCka@_eC_UmlB}MmaBeWkkDeHwqAoX}~DcBsZmLcxBqOwqE_DkyAuJmrJ\\o',
  '~CfIewG|YibQxBssB?es@qGciA}RorAoVajA_nAodD{[y`AgPqp@mKwr@ms@umEaW{dAm',
  'b@umAw|@ojBwzDaaJsmBwbEgdCsrFqhAihDquAi`Fux@}_Dui@_eB_u@guCuyAuiHukA_',
  'lKszAu|OmaA{wKm}@clHs_A_rEahCssKo\\sgBsSglAqk@yvDcS_wAyTwpBmPc|BwZknF',
  'oFscB_GsaDiZmyMyLgtHgQonHqT{hKaPg}Dqq@m~Hym@c`EuiBudIabB{hF{pWifx@snA',
  'w`GkFyVqf@y~BkoAi}Lel@wtc@}`@oaXi_C}pZsi@eqGsSuqJ|Lqeb@e]kgPcaAu}SkDw',
  'zGhn@gjYh\\qlNZovJieBqja@ed@siO{[ol\\kCmjMe\\isHorCmec@uLebB}EqiBaCg}',
  '@m@qwHrT_vFps@kkI`uAszIrpHuzYxx@e{Crw@kpDhN{wBtQarDy@knFgP_yCu\\wyCwy',
  'A{kHo~@omEoYmoDaEcPiuAosDagD}rO{{AsyEihCayFilLaiUqm@_bAumFo}DgqA_uByi',
  '@swC~AkzDlhA}xEvcBa}Cxk@ql@`rAo|@~bBq{@``Bye@djDww@z_C_cAtn@ye@nfC_eC',
  '|gGahH~s@w}@``Fi~FpnAooC|u@wlEaEedRlYkrPvKerBfYs}Arg@m}AtrCkzElw@gjBb',
  'h@woBhR{gCwGkgCc[wtCuOapAcFoh@uBy[yBgr@c@iq@o@wvEv@sp@`FajBfCaq@fIipA',
  'dy@ewJlUc`ExGuaBdEmbBpBssArAuqBBg}@s@g{AkB{bBif@_bYmC}r@kDgm@sPq_BuJ_',
  's@{X_{AsK_d@eM{d@wVgx@oWcu@??aDmOkNia@wFoSmDyMyCkPiBePwAob@XcQ|@oNdCo',
  'SfFwXhEmOnLi\\lbAulB`X_d@|k@au@bc@oc@bqC}{BhwDgcD`l@ed@??bL{G|a@eTje@',
  'oS~]cLr~Bgh@|b@}Jv}EieAlv@sPluD{z@nzA_]`|KchCtd@sPvb@wSb{@ko@f`RooQ~e',
  '[upZbuIolI|gFafFzu@iq@nMmJ|OeJn^{Qjh@yQhc@uJ~j@iGdd@kAp~BkBxO{@|QsAfY',
  'gEtYiGd]}Jpd@wRhVoNzNeK`j@ce@vgK}cJnSoSzQkVvUm^rSgc@`Uql@xIq\\vIgg@~k',
  'Dyq[nIir@jNoq@xNwc@fYik@tk@su@neB}uBhqEesFjoGeyHtCoD|D}Ed|@ctAbIuOzqB',
  '_}D~NgY`\\um@v[gm@v{Cw`G`w@o{AdjAwzBh{C}`Gpp@ypAxn@}mAfz@{bBbNia@??jI',
  'ab@`CuOlC}YnAcV`@_^m@aeB}@yk@YuTuBg^uCkZiGk\\yGeY}Lu_@oOsZiTe[uWi[sl@',
  'mo@soAauAsrBgzBqgAglAyd@ig@asAcyAklA}qAwHkGi{@s~@goAmsAyDeEirB_{B}IsJ',
  'uEeFymAssAkdAmhAyTcVkFeEoKiH}l@kp@wg@sj@ku@ey@uh@kj@}EsFmG}Jk^_r@_f@m',
  '~@ym@yjA??a@cFd@kBrCgDbAUnAcBhAyAdk@et@??kF}D??OL',
].join('');
// for make polyline from x,y coordinate from geojson
// var newArray=[];
var coordinates = [[-51.668701171875,-28.541100228636036],[-51.70166015625,-28.627925287618552],[-51.6357421875,-28.772474183943007],[-51.5203857421875,-28.777289039997598],[-51.35009765625,-28.73394733840369],[-51.207275390625,-28.676130433078256],[-51.5972900390625,-29.065772888415406],[-51.844482421875,-28.9072060763367],[-51.60072326660156,-29.068173545070522],[-51.79023742675781,-29.233683670282776],[-52.1466064453125,-29.120373989614624],[-51.79229736328125,-29.237278753059552],[-52.051849365234375,-29.45155650109173]];
// coordinates.forEach((e)=>{newArray.push(e[1],e[0])})
// var polyline=encodeDeltas(
//   newArray,
//   2,1e6
// )
console.log(polyline);
var route = /** @type {import("../src/ol/geom/LineString.js").default} */ (new Polyline(
  {
    factor: 1e6,
  },
).readGeometry(polyline, {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857',
}));

//0: -5751733.504402943
//1: -3317367.02757665
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position) {
  console.log([position.coords.latitude
    ,position.coords.longitude]);
}
coordinates.unshift(getLocation());
console.log('coordinates',coordinates);
var strGeoJson =
  '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-51.668701171875,-28.541100228636036],[-51.70166015625,-28.627925287618552],[-51.6357421875,-28.772474183943007],[-51.5203857421875,-28.777289039997598],[-51.35009765625,-28.73394733840369],[-51.207275390625,-28.676130433078256],[-51.5972900390625,-29.065772888415406],[-51.844482421875,-28.9072060763367],[-51.60072326660156,-29.068173545070522],[-51.79023742675781,-29.233683670282776],[-52.1466064453125,-29.120373989614624],[-51.79229736328125,-29.237278753059552],[-52.051849365234375,-29.45155650109173]]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-52.921142578125,-29.166552295200137],[-52.239990234375,-29.606894276531495]]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-50.943603515625,-30.09761327721712],[-51.58630371093749,-29.897805610155864],[-51.56982421875,-29.439597566602902],[-51.48193359375,-29.382175075145277],[-51.3885498046875,-29.32950930836469],[-51.3885498046875,-29.20971322586817],[-51.416015625,-29.1233732108192],[-51.5478515625,-29.10897615145303],[-51.6632080078125,-29.10897615145303],[-51.778564453125,-29.171348850951507],[-51.74560546875,-29.267232865200878],[-51.70166015625,-29.372601506681402],[-51.602783203125,-29.425244985472006],[-51.5972900390625,-29.931134809868684],[-52.4102783203125,-29.94541533710444],[-51.5478515625,-29.931134809868684],[-51.5643310546875,-30.140376821599734],[-51.7840576171875,-30.35391637229704],[-51.96533203125,-30.571720565199872],[-51.5972900390625,-30.168875561169088],[-51.37207031249999,-30.33021268543272],[-51.1907958984375,-30.595365565588075],[-50.9710693359375,-30.51021658722997],[-50.877685546875,-30.666265946323286],[-50.987548828125,-30.722948824772498],[-51.119384765625,-30.755998458321656],[-51.141357421875,-30.666265946323286],[-51.2347412109375,-30.685163937659564],[-51.2017822265625,-30.770159115784185],[-51.339111328125,-30.73239273400607],[-51.2896728515625,-30.60954979719083],[-51.22375488281249,-30.56226095049943],[-51.416015625,-30.29701788337204],[-51.580810546875,-30.19261821849926],[-51.94885253906249,-30.533876572997617],[-52.239990234375,-30.552800413453518],[-52.3443603515625,-30.62373195163005],[-52.2235107421875,-30.760718908944472],[-52.064208984375,-30.760718908944472],[-51.943359375,-30.704058230919504],[-52.0147705078125,-30.619004797647808],[-51.8829345703125,-30.637912028341113],[-51.96086883544922,-30.56758209727092]]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-53.03649902343749,-29.27681632836857],[-52.33886718749999,-29.735762444449076],[-52.4871826171875,-29.864465259257987],[-53.15185546875,-29.453948118887734],[-52.5091552734375,-29.89304338543418],[-52.62451171875,-30.07860131571654],[-53.27819824218749,-29.68328053373362],[-53.3111572265625,-29.764377375163114],[-53.3111572265625,-29.864465259257987],[-53.23974609375,-29.926374178635747],[-53.12988281249999,-29.854937397596693],[-53.0914306640625,-29.807284450222504]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-51.64398193359375,-29.19532826709913],[-51.60552978515624,-29.267232865200878],[-51.5313720703125,-29.25285598597375],[-51.514892578125,-29.20252099881366],[-51.58630371093749,-29.15935704135541],[-51.64398193359375,-29.19532826709913]]]}}]}';

// console.log("encodeFloats1",encodeFloats1)
// var route = /** @type {ol.geom.LineString} */ (new GeoJSON().readFeature(
//   JSON.parse(strGeoJson).features[1],
//   {
//     dataProjection: "EPSG:4326",
//     featureProjection: "EPSG:3857"
//   }
// )).getGeometry();

var routeCoords = route.getCoordinates();
console.log('routeCoords', routeCoords);
var routeLength = routeCoords.length;
console.log('route', route);
var routeFeature = new Feature({
  type: 'route',
  geometry: route,
});
var geoMarker = /** @type Feature<import("../src/ol/geom/Point").default> */ (new Feature(
  {
    type: 'geoMarker',
    geometry: new Point(routeCoords[0]),
  },
));
var startMarker = new Feature({
  type: 'icon',
  geometry: new Point(routeCoords[0]),
});
var endMarker = new Feature({
  type: 'icon',
  geometry: new Point(routeCoords[routeLength - 1]),
});

var styles = {
  route: new Style({
    stroke: new Stroke({
      width: 6,
      color: [237, 212, 0, 0.8],
    }),
  }),
  icon: new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'data/icon.png',
    }),
  }),
  geoMarker: new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: 'rgb(43, 149, 219)' }),
      stroke: new Stroke({
        color: 'white',
        width: 2,
      }),
    }),
  }),
};

var animating = false;
var speed, now;
var speedInput = document.getElementById('speed');
var startButton = document.getElementById('start-animation');

var vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: [routeFeature, geoMarker, startMarker, endMarker],
  }),
  style: function (feature) {
    // hide geoMarker if animation is active
    if (animating && feature.get('type') === 'geoMarker') {
      return null;
    }
    return styles[feature.get('type')];
  },
});

var key = 'M9TDdi2dEDvoOpLaJYxQ';
var attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

var center = [-5639523.95, -3501274.52];
var map = new Map({
  target: document.getElementById('map'),
  view: new View({
    center: center,
    zoom: 10,
    minZoom: 2,
    maxZoom: 19,
  }),
  layers: [
    new TileLayer({
      source: new XYZ({
        attributions: attributions,
        url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=' + key,
        tileSize: 512,
      }),
    }),
    vectorLayer,
  ],
});

var moveFeature = function (event) {
  var vectorContext = getVectorContext(event);
  var frameState = event.frameState;

  if (animating) {
    var elapsedTime = frameState.time - now;
    // here the trick to increase speed is to jump some indexes
    // on lineString coordinates
    var index = Math.round((speed * elapsedTime) / 1000);

    if (index >= routeLength) {
      stopAnimation(true);
      return;
    }

    var currentPoint = new Point(routeCoords[index]);
    var feature = new Feature(currentPoint);
    vectorContext.drawFeature(feature, styles.geoMarker);
  }
  // tell OpenLayers to continue the postrender animation
  map.render();
};

function startAnimation() {
  if (animating) {
    stopAnimation(false);
  } else {
    animating = true;
    now = new Date().getTime();
    speed = speedInput.value;
    startButton.textContent = 'Cancel Animation';
    // hide geoMarker
    geoMarker.setStyle(null);
    // just in case you pan somewhere else
    map.getView().setCenter(center);
    vectorLayer.on('postrender', moveFeature);
    map.render();
  }
}

/**
 * @param {boolean} ended end of animation.
 */
function stopAnimation(ended) {
  animating = false;
  startButton.textContent = 'Start Animation';

  // if animation cancelled set the marker at the beginning
  var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
  var geometry = geoMarker.getGeometry();
  geometry.setCoordinates(coord);
  //remove listener
  vectorLayer.un('postrender', moveFeature);
}

startButton.addEventListener('click', startAnimation, false);

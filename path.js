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


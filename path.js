var a={'name':'a','cord':[10,30],'connect':[]};
var b={'name':'b','cord':[20,30],'connect':[]};
var c={'name':'c','cord':[30,30],'connect':[]};
var d={'name':'d','cord':[10,20],'connect':[]};
var e={'name':'e','cord':[20,20],'connect':[]};
var f={'name':'f','cord':[30,20],'connect':[]};

a.connect = [b,d,e];
b.connect = [a,c,e];
c.connect = [b,e,f];
d.connect = [a,e];
e.connect = [a,b,c,d,f];
f.connect = [c,e];

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

console.log(findAllPathes(a,f));
console.log(`a=>b = ${finLength(a,b)}  `,`a=>e = ${finLength(a,e)}  `,`b=>f = ${finLength(b,f)}  `,`e=>f = ${finLength(e,f)}  `);
// console.log(findAllPathes(a,e));
// console.log(findAllPathes(b,e));
// console.log(findAllPathes(c,b));
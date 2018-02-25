google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawChart);
var data =[];
var depend =[];
loadJSON("example.json", function(response) {
        var actual_JSON = JSON.parse(response);
        parseData(actual_JSON);
         
    });

function parseData(response) {
  var item = response[0].steps;
        var i = 0;
        for (; i < item.length; i++) {
            var sub = [];
            sub.push(item[i].machine);
            sub.push(item[i].name);
            sub.push(new Date(parseInt(item[i].start,10)*1000));
            sub.push(new Date(parseInt(item[i].end,10)*1000));
            depend.push({name: item[i].name, next: item[i].next})
            data.push(sub);
        }
}

console.log (data);


function drawChart() {
    var container = document.getElementById('example2.2');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Term' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows(data);

    // var options = {
    //   timeline: { showRowLabels: false }
    // };
    google.visualization.events.addListener(chart, 'ready', function() {
      var all = document.getElementsByTagName("text");
      console.log(all);
  // for (el in all){
    for(var j = 0; j < depend.length; j++){
    var fromx = 0;
    var fromy = 0;
    var tox = 0;
    var toy = 0;
      for (var i = 0; i < all.length; i++) {
        if (all[i].innerHTML == depend[j].name) {
            fromx = all[i].attributes[1].value;
            fromy = all[i].attributes[2].value;
            if (depend[j].next.length != 0) {
              for (var k = 0; k < depend[j].next.length; k++) {
                for(var l = 0; l < all.length; l++){
                  if (all[l].innerHTML == depend[j].next[k] ) {
                    tox = all[l].attributes[1].value;
                    toy = all[l].attributes[2].value;
                    addArrows(fromx, fromy, tox, toy);
                    tox = 0;
                    toy = 0;
                   }
                }
              }
            }
        }
        

      }

      // addArrows(fromx,fromy,tox,toy);
    }
    stage.add(layer);
  // }

});


    chart.draw(dataTable);
  }


function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }



var width = window.innerWidth;
    var height = window.innerHeight;
    
    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });

    var layer = new Konva.Layer();


// addArrows(185,28,412.4,28);
function addArrows(fromx, fromy, tox, toy){
  console.log("arrow");


    var arrow = new Konva.Arrow({
      points: [fromx,fromy, tox, toy],
      pointerLength: 10,
      pointerWidth : 10,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2
    });

    // add the shape to the layer
    layer.add(arrow);

    // add the layer to the stage
    
  }

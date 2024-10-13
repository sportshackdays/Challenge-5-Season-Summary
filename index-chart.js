let chart;
let points;
let bottomY;

function dictToArrays(dict) {
  let arr1 = [], arr2 = [];
  for (var key in dict) {
    if (dict.hasOwnProperty(key)) {
        arr1.push(key);
        arr2.push(dict[key]);
    }
  }
  return [ arr1, arr2 ];
}

function setupChart() {
  let dataKeys = dictToArrays(myData.TrainingTimeperMonth);
  let chartSettings = {
    size: {
      width: width, 
      height: height
    },
    type: 'bar',
    data: {
      labels: dataKeys[0],
      datasets: [{
        label: 'High Temperatures',
        data: dataKeys[1],
        trendlineLinear: {
          lineStyle: 'line',
          style: '#3e95cd',
          width: 1
        }
      }]
    },
    // required to allow p5.js commands in draw() to work
    options: {
      animation: false,
      events: [],
      tooltips: {
        enabled: false
      },
      scales: {
        /*yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]*/
      }
    },
  };
  chart = new Chart(drawingContext, chartSettings);
  points = getPoints(chart);
}

let tc1 = 0;
function drawChart() {
  // draw the chart (0 = no animation)
  //chart.update(0);

  //bottomY = chart.getDatasetMeta(0).controller._ruler.scale.top;
  //console.log(bottomY);

  tc1++;
  let i = 0;
  for (let point of points) {
    stroke(255,255,255);
    strokeWeight(24);
    line(point.x, point.y, point.x, WINDOW_HEIGHT);
    if (++i < tc1 / 25) {
      fill('red');
    } else {
      fill(255);
    }
    noStroke();
    circle(point.x, point.y, 24);
  }
}

function getPoints(chart) {  
  let data = chart.getDatasetMeta(0).data;
  let points = [];
  for (let i=0; i<data.length; i++) {
    let x = data[i].x;
    let y = data[i].y;
    points.push( createVector(x,y) );
  }
  return points;
}



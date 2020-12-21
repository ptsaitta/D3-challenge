// @TODO: YOUR CODE HERE!

//This is where we are to append our code: <div id="scatter">

//define width
var width = parseInt(d3.select("#scatter").style("width"));

//define height
var height = width - width / 3.8;

//define spacing for label on graph
var labelArea = 100;

//define margin for graph
var margin = 20;



//append svg to <div id="scatter">

var svg = d3.select("#scatter").append("svg").attr("width", width)
            .attr("height", height).attr("class", "chart");

//set dot size
var circRadius;
function updateRadius() {
    if (width <= 500) {
        circleRadius = 5;
    }
    else {
        circleRadius = 10;
    }
}
updateRadius()

//create x axis labels
//apppend group element with x axis label in it

svg.append("g").ttr("class", "xAxisLabel");

var xAxisLabel = d3.select(".xAxisLabel");
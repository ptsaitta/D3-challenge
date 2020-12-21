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





var svg = d3.select("#scatter").append("svg");

function updateRadius() {
    if (width <= 500) {
        circleRadius = 5;
    }
    else {
        circleRadius = 10;
    }
}
updateRadius()
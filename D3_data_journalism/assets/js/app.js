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

//updates position as a function of screen width dynamically
function xAxisLabelUpdate() {
    xAxisLabel.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - 40) +
      ")"
  );
}
xAxisLabelUpdate();

//append different y axis data depending on what dataset csv is selected

//When poverty is selected

xAxisLabel.append("text").attr("y", -30).attr("data-name", "poverty").attr("data-axis", "x")
          .attr("class", "aText active x").text("% In Poverty");

//When Age is selected
xAxisLabel.append("text").attr("y", 0).attr("data-name", "age").attr("data-axis", "x")
          .attr("class", "aText inactive x").text("Median Age");

//When Income is selected
xAxisLabel.append("text").attr("y", 30).attr("data-name", "income").attr("data-axis", "x")
          .attr("class", "aText inactive x").text("Median Household Income");


//Create Y axes
// reate variables for padding to use to customizr later
var leftTextX = margin + 40;
var leftTextY = (height + labelArea) / 2 - labelArea;
          
//append another group element for the axis to the left of the chart.
svg.append("g").attr("class", "yText");
          
// make selectable
var yText = d3.select(".yText");
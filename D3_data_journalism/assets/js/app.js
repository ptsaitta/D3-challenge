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
        circRadius = 5;
    }
    else {
        circRadius = 10;
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

//append different x axis data depending on what dataset csv is selected

//When poverty is selected (default)

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

//updates position as a function of screen width dynamically
function yAxisLabelUpdate() {
    yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-45)"
  );
}
yAxisLabelUpdate();

//append different y axis data depending on what dataset csv is selected

//When obesity is selected (default)
yText
  .append("text")
  .attr("y", -30)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Percentage Suffering from Obesity");

  //Smokers
yText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Percentage who Smokes");

  //No Hea;thcare
yText
  .append("text")
  .attr("y", 30)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Percentage who lacks Healthcare");

///import data from .csv files, then use data in visualization
//import with d3.csv upon load

d3.csv("assets/data/data.csv").then(function(data) {
    
    //then visualize the data (which we will define below)

    buildGraph(data);
  });

//function to visualize data, using what we've built so far

function buildGraph(dataset) {
    //define current axes - initialize with defaults from csv file headers
    var currentX = "poverty";
    var currentY = "obesity";

    //define other parameters for later

    var xMin;
    var xMax;
    var yMin;
    var yMax;

    //d3 tooltip d3-tip
    var toolTip = d3.tip().attr("class", "d3-tip").offset([50,-50])
                    .html(function(d) {
                        var xVal;
                        var state = "<div>" + d.state + "</div>";
                        var yVal = "<div>" + currentY + ": " + d[currentY + "%</div>"];
                        if (currentX === "poverty") {
                            xVal = "<div>" + currentX + ": " + d[currentX] + "%</div>";
                        }
                        else {
                            xVal = "<div>" + currentX + ": " + parseFloat(d[currentX]).toLocaleString("en") + "</div>";
                        }
                    return state + xVal + yVal;
                    });
    svg.call(toolTip);

    //define formatting functions

    function xWindow() {
          // min selects smallest value
        xMin = d3.min(dataset, function(d) {
            return parseFloat(d[currentX]) * 0.90;
          });
      
          // max selects largets value
          xMax = d3.max(dataset, function(d) {
            return parseFloat(d[currentX]) * 1.10;
          });
    }

    function yWindow() {
        xMin = d3.min(dataset, function(d) {
            return parseFloat(d[currentY]) * 0.90;
          });
      
          xMax = d3.max(dataset, function(d) {
            return parseFloat(d[currentY]) * 1.10;
          });
    }

//build function to handle changing the label if a new dataset is selected
    function labelChange(axis, clickedText) {
        
        d3.selectAll(".aText").filter("." + axis).filter(".active")
          .classed("active", false) //change appearance of active/inactive datasets
          .classed("inactive", true);
    
        clickedText.classed("inactive", false).classed("active", true); // ^^
      }

    }

    //Make first scatterplot

    //grab x and y data windows
    xWindow();
    yWindow();

    //window values used to create scale for plot

    var xScale = d3.scaleLinear().domain([xMin, xMax]).range([margin + labelArea, width - margin]);
    var yScale = d3.scaleLinear().domain([yMin, yMax]).range([height - margin - labelArea, margin]);

    //pass these scales in to create axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    //add tick marks
    xAxis.ticks(5);
    yAxis.ticks(5);

    //actually append axes to the avg element
    svg.append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  
    svg.append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", "translate(" + (margin + labelArea) + ", 0)");


        //make circles for each data entry
    var dataCircles = svg.selectAll("g dataCircles").data(dataset).enter();

        dataCircles
          .append("circle")
          .attr("cx", function(d) {
            return xScale(d[currentX]);
          })
          .attr("cy", function(d) {
            return yScale(d[currentY]);
          })
          .attr("r", circRadius)
          .attr("class", function(d) {
            return "stateCircle " + d.abbr;
          })

          //make data appear on hovering over and disappear on no longer hovering over
         
          .on("mouseover", function(d) {
            toolTip.show(d, this);
            d3.select(this).style("stroke", "#736d6d");
          })
          .on("mouseout", function(d) {
            toolTip.hide(d);
            d3.select(this).style("stroke", "#b0aeae");
          });



        //append text to the circles
        dataCircles.append("text")
          .text(function(d) {
            return d.abbr; //appends the state abbr.
        })
        // Scale text
          .attr("dx", function(d) {
            return xScale(d[currentX]);
        })
        
        //Add second argument to position text in middle of circle
          .attr("dy", function(d) {
            return yScale(d[currentY]) + circRadius / 2.5;
        })
          .attr("font-size", circRadius)
          .attr("class", "stateText")
        
        //On mouseover show data
          .on("mouseover", function(d) {
            toolTip.show(d);
            d3.select("." + d.abbr).style("stroke", "#736d6d");
        })
        
        //On mouseout hide data
          .on("mouseout", function(d) {
            toolTip.hide(d);
            d3.select("." + d.abbr).style("stroke", "#b0aeae");
        });


    //Make graph respond to clicks to change axes

    //select axis text "aText" from xAxisLabel above and store in variable
    d3.selectAll(".aText").on("click", function() {
        var self = d3.select(this);


        var dataAxis = self.attr("data-axis");
        var dataName = self.attr("data-name");

        //from attr "x" from xLabelText
        if (dataAxis === "x") {
            //update current x axis
            currentX = dataName;

            //update x window and domain
            xWindow();
            xScale.domain([xMin, xMax]);
        }
    }



        
            
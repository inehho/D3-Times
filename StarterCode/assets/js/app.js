// @TODO: YOUR CODE HERE!
//step one- make the svg

var svgWidth = 920;
var svgHeight= 600;

// make our margin
var margin ={
    top: 60,
  right: 90,
  bottom: 60,
  left: 95
}
// define width and height
var width = svgWidth - margin.left -margin.right;
var height = svgHeight - margin.bottom - margin.top;

//append a tag for the svg wrapper holding the chart
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
//make our chart group which would hold data
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
//import data from csv using then because its quite a lot of data
d3.csv("assets/data/data.csv")
    .then(function(data){
       console.log(data);
       data.forEach(elem => {
           elem.poverty =+ elem.poverty;
           elem.healthcare =+ elem.healthcare;
           elem.abbr = elem.abbr;
        //validate result console.log(elem.healthcare);
       }); 
// creating scale functions
       var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(data, elem => elem.poverty)])
        .range([0,width]);
       var yLinearScale = d3.scaleLinear()
       .domain([4, d3.max(data, elem => elem.healthcare)])
       .range([height,0]);
// create axis functions
       var bottomAxis = d3.axisBottom(xLinearScale);
       var leftAxis = d3.axisLeft(yLinearScale);
// attaching the chartgroup
       chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
       chartGroup.append("g")
        .call(leftAxis);
// creating circles by appending to the chartgroup
       var circleGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", elem =>xLinearScale(elem.poverty))
        .attr("cy", elem =>xLinearScale(elem.healthcare))
        .attr("r", "10")
        .attr("fill", "red")
        .attr("opacity", ".5");
        // .attr("classed", "stateText");
    
        // var circle = chartGroup.selectAll("stateText")
        // .data(data)
        // .enter()
        // .append("text")
        // .text(function (d) {
        //   return d.abbr;
        // })
        // .attr("cx", elem =>xLinearScale(elem.poverty))
        // .attr("cy", elem =>xLinearScale(elem.healthcare))
        // .attr("font-size", "10px")
        // .attr("text-anchor", "middle")
        // .attr("fill", "white");
        // chartGroup.call(circle);
// adding tool tip
    // ==============================
        var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(elem) {
        return (`${elem.abbr}<br>Poverty: ${elem.poverty}<br>H.C: ${elem.healthcare}`);
        });
        chartGroup.call(toolTip);

        circleGroup.on("click", function(data) {
            toolTip.show(data, this);
          })
            // onmouseout event
            .on("mouseout", function(data, index) {
              toolTip.hide(data);
            });
      
          // Create axes labels
          chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Health Care (%)");
      
          chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top -5})`)
            .attr("class", "axisText")
            .text("In Poverty (%)");


    });



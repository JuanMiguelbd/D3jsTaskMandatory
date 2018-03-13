// Firts of all, We set the dimensions of the graph
var margin = { top: 50, right: 0, bottom: 30, left: 130 }
width = 400,
    height = 180;


// Afterthat, We create a frame of work (svg object on body)
var svg = d3.select("body")
    .append("svg")
    .attr("width", "80%")
    .attr("height", "80%")
    .attr("viewBox", "0 0 " + width + " " + height);


// We load the data and we create a function
d3.csv("gdpesp.csv", function (error, data) {

    //map function goes through every element, then returns a number for GDP
    data = data.map(function (d) {
        d["GDP"] = +d["GDP"];
        return d;
    });

    //-------------------------------------------------------------------

    // We define range and domain about Scale y
    var yScale = d3.scale.linear()
        .range([height - margin.top - margin.bottom, 0])
        .domain([0, d3.max(data, function (d) { return d["GDP"]; })]);

    // We define range and domain about Scale x
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([1, width - margin.right - margin.left], .3)
        .domain(data.map(function (d) { return d["YEAR"]; }));

    //--------------------------------------------------------------------

    // we set axis x and y
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickFormat(d3.format("$,"));
    //--------------------------------------------------------------------

    // We use this method to set the colors for each bar.
    var colorScale = d3.scale.category10();

    //--------------------------------------------------------------------

    // We set bar on chart and their attributes.
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d["YEAR"]); })
        .attr("y", function (d) { return yScale(d["GDP"]); })
        .attr("height", function (d) { return height - margin.top - margin.bottom - yScale(d["GDP"]); })
        .attr("width", function (d) { return xScale.rangeBand(); })
        .attr('fill', function (d) { return colorScale(d['GDP']); });

    //---------------------------------------------------------------------------------

    //adding y axis to the left of the chart with the parameters of yAxis attributes
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);

    //adding x axis to the bottom of chart with the parameters of xAxis attributes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .call(xAxis);

    //---------------------------------------------------------------------------------

    //adding a label at the top of the chart
    svg.append("g")
        .attr("transform", "translate(" + (50 + width / 2) + ", 15)")
        .append("text")
        .text("Gross domestic product (GDP) Spain")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "10px" });


    //adding a label to the left of the chart, beside x axis
    svg.append("g")
        .attr("transform", "translate(" + (50 + width / 2) + ", 175)")
        .append("text")
        .text("Year")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "5px" });

    //adding a label to the left of the chart, beside y axis
    svg.append("g")
        .attr("transform", "translate(" + (100 + margin.right) + "," + (10 + height / 2) + ")rotate(-90)")
        .append("text")
        .text("GPD (Billion of Dollars)")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "5px" });

    //adding a legend to the right and on the top of the chart
    var legend = svg.selectAll(".legend")
        .data(data)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 5 + ")"; });

    // we set attributes and position for "rect" legend 
    legend.append("rect")
        .attr("x", width - 8)
        .attr("y", 8)
        .attr("width", 4)
        .attr("height", 4)
        .style("fill", function (d) { return colorScale(d['GDP']); });

    // we set attributes and position for "text" legend 
    legend.append("text")
        .attr("x", width - 12)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) { return ("GPD : " + d['GDP']); });
})

# Mandatory Task: Barchart with D3js 
For this task, we have got the data from this web :

https://es.statista.com/estadisticas/501016/prevision-producto-interior-bruto-pib-en-espana/

The data are about gross domestic product (GDP) of Spain. 

We are going to create a bar graph about data above. For this, we have save this data in a CSV file.
To draw the bar Graph we have used D3js javascript library. 

We have created four files:

    1. index.html
    2. main.js
    3. styles.css
    4. gdpesp.csv

###1. index.html

- First let's create the basic HTML.


```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Basic Bar Chart</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
</head>

<body>
</body>

<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.2/d3.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.5/nv.d3.js"></script>
<script src="./main.js"></script>
<script src="./gdpesp.js"></script>
<link rel="stylesheet" href="./styles.css" />

</html>
```

### 2. main.js

Here, We create the bar graph.

- Firts of all, we set the dimensions of the graph.

```javascript

var margin = { top: 50, right: 0, bottom: 30, left: 130 }
        width = 400,
        height = 180;

```
- We create svg object on body with their attributes.

```javascript
var svg = d3.select("body")
    .append("svg")
    .attr("width", "80%")
    .attr("height", "80%")
    .attr("viewBox", "0 0 " + width + " " + height);
```

- We load the data from gdpesp.csv file and we create a function to get the data. Map function goes through every element, then returns a number for GDP.

```javascript
d3.csv("gdpesp.csv", function (error, data) {
    data = data.map(function (d) {
        d["GDP"] = +d["GDP"];
        return d;
    });
```
- We define range and domain about Scale y.
```javascript
    var yScale = d3.scale.linear()
        .range([height - margin.top - margin.bottom, 0])
        .domain([0, d3.max(data, function (d) { return d["GDP"]; })]);
```

- We define range and domain about Scale x.
```javascript
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([1, width - margin.right - margin.left], .3)
        .domain(data.map(function (d) { return d["YEAR"]; }));
```


- We set axis x and y.
```javascript
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickFormat(d3.format("$,"));
```

- We use this method to set the colors for each bar.
```javascript
    var colorScale = d3.scale.category10();
```
   
- We set bar on chart and their attributes.
```javascript   
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
```

- Adding y axis to the left of the chart with the parameters of yAxis attributes.
```javascript
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);
```

- Adding x axis to the bottom of chart with the parameters of xAxis attributes.
```javascript    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .call(xAxis);
```
   
- Adding a label at the top of the chart.
```javascript   
    svg.append("g")
        .attr("transform", "translate(" + (50 + width / 2) + ", 15)")
        .append("text")
        .text("Gross domestic product (GDP) Spain")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "10px" });
```

- Adding a label to the left of the chart, beside x axis.
```javascript
    svg.append("g")
        .attr("transform", "translate(" + (50 + width / 2) + ", 175)")
        .append("text")
        .text("Year")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "5px" });
```

- Adding a label to the left of the chart, beside y axis.
```javascript   
    svg.append("g")
        .attr("transform", "translate(" + (100 + margin.right) + "," + (10 + height / 2) + ")rotate(-90)")
        .append("text")
        .text("GPD (Billion of Dollars)")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "5px" });
```
- Adding a legend on the top right of the chart.
```javascript   
    var legend = svg.selectAll(".legend")
        .data(data)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 5 + ")"; });
```
- We set attributes and position for "rect" legend. 
```javascript   
    legend.append("rect")
        .attr("x", width-8)
        .attr("y", 8)
        .attr("width", 4)
        .attr("height", 4)
        .style("fill", function (d) { return colorScale(d['GDP']); });
```
- We set attributes and position for "text" legend .
```javascript   
    legend.append("text")
        .attr("x", width-12)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {return ("GPD : " + d['GDP']); });
})
```

### 3. styles.css

- Lastly, we set styles for each element of graph.

```javascript  
.axis text {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 5px;
    text-anchor: end;
  }

.axis path {
    fill: none;
    stroke: black;
    stroke-width: 0.5px;
    shape-rendering: crispEdges;
  }

  .bar {
    stroke: none;
    width: 20px;
    fill-opacity: .9;
  }

  .legend {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 18%;
}
```
### 4. gdpesp.csv

- File CSV, where we have saved the data.
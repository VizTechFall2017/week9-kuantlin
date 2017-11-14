var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 100;
var marginTop = 100;

var svg = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');


svg.append("g")
    .attr('class','x-axis')
    .attr('transform','translate(0,' + (height-2*marginTop) + ')')  //move the axis to the bottom of the screen
    .call(d3.axisBottom(scaleX));


var parser = d3.timeParse("%m/%d/%Y");

scaleX.domain([d3.min(dataIn.map(function(d){return d.date})), d3.max(dataIn.map(function(d){return d.date}))]);

var scaleX = d3.scaleTime().range([0, width-2*marginLeft]);
var scaleY = d3.scaleLinear().range([(height-2*marginTop), 0]).domain([0,200]);


//import the data from the .csv file
d3.csv('./daca_timeline.csv', function(dataIn){


    dataIn.forEach(function(d){
        d.date = parser(d.start_date);
    });



    console.log(dataIn)

});
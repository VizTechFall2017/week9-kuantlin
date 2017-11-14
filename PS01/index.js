var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 0;
var marginTop = 0;

var pieX = width/2;
pieY = height/2;


var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var pieGroup = svg.append('g')
    .attr('transform', 'translate(' + pieX + ',' + pieY + ')');


//set up scales to position circles using the data
var scaleColor = d3.scaleOrdinal().domain(["Biomass", "Geothermal", "Solar", "Hydro", "Wind"])
    .range(["lightsalmon","salmon","darksalmon","lightcoral","indianred"]);


var nestedData = [];

var pieRadius = 200;

var makeArc = d3.arc()
    .innerRadius(50)
    .outerRadius(pieRadius);

var makePie = d3.pie()
    .sort(null) //organized pie stuff in an order, how to put in an order
    .value(function(d){
        return d.total
    });


var labelArc = d3.arc()
    .outerRadius(pieRadius-50)
    .innerRadius(pieRadius-50);


//use d3 to create a function to draw the line, and store it in a variable for future use
//Tell the function how to calculate x and y positions for each point, using your scale functions and the values stored in the data
//(it doesn't matter that the data hasn't loaded yet, because this function won't run until you call it, and then it will
//use the data that you pass it using d3)



//import the data from the .csv file
d3.csv('./Clean Energy.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);

    var loadData = dataIn;

    g = pieGroup.selectAll('.arc')
        .data(makePie(loadData))   //makePie makes sure that one arc gets added for each data object in the array
        .enter()
        .append('g')
        .attr('class','arc');

    g.append('path')              //grab each group in the variable above, and add a path to it (this will be the pie wedge)
        .attr('d',makeArc)        //call the makeArc generator function to draw the actual wedges
        .attr('fill', function(d){ return scaleColor(d.data.type)})
        .attr('opacity',.75);

    g.append('text')
        .attr("transform", function(d) {
            return "translate(" + labelArc.centroid(d) + ")"; })
        .attr('dy', '.35em')
        .attr('text-anchor','middle')
        .text(function(d){
            return d.data.type
        });



})


/*
    // Add the path
    svg.append("path")
    //skipping .enter(), because we don't want a new path for every point in the dataset!
        .datum(dataIn)         //datum (not data!) tells d3 that all of the data belongs to a single line
        .attr("class", "area")
        .attr("d", makeArea)   //the "d" attribute is just part of how the path element is defined, like "cx" or "cy" for a circle.
        //it calls the makeLine function above, and hands it sets of points that the path should contain.
        .attr('fill','limegreen')
        .attr('stroke','blue')
        .attr('stroke-width',3);

});

*/


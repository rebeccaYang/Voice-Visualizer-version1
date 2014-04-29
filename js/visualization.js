var h = 150;
var w = 130;
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var render = function () {

    if(typeof array === 'object' && array.length > 0) {
        var dataset = new Array();
        dataset[0] = boost;
        dataset[1] = boost2;
        alert("boost:" + boost + "boost2:" + boost2);


        var rects = svg.selectAll("rect").data(dataset).enter().append("rect");

        rects.attr("x", function(d,i){ return i*30;})
            .attr("y", function(d){return 130-d;})
            .attr("width", 25)
            .attr("height", function(d,i){ return d;})
            .attr("fill","red");   

        
    }
    else
    {
        alert("error in render");
        var dataset = new Array();
        dataset = [15,10];


        var rects = svg.selectAll("rect").data(dataset).enter().append("rect");

        rects.attr("x", function(d,i){ return i*30;})
            .attr("y", function(d){return 130-d;})
            .attr("width", 25)
            .attr("height", function(d,i){ return d;})
            .attr("fill","red");  
    }

}

render();



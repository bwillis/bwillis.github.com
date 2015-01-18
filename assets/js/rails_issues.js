$(document).ready(function(){

  //
  Parse.initialize("s5AHwSgdqPua5A9GYINRgqpLkhhKtY2AlQFF0kyD", "xPQK5VMekc8IhRUTF0uXuPsx0HDNrmN5eTvSdhej");
  var Term = Parse.Object.extend("Term");
  //

  var color = d3.scale.category20();

  var allData = [], hiddenData = [];

  var margin = {top: 20, right: 60, bottom: 40, left: 80},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  var x = d3.time.scale()
      .range([0, width])
      .domain([
        new Date(2010, 08, 01),
        new Date(2014, 08, 16)
      ]);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, 0]); // set to 0,0 otherwise it will scale 0,1

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(function(d){
        if(d.getMonth() == 0) {
          return d3.time.format("%Y")(d);
        } else {
          return d3.time.format("%b")(d);
        }
      });

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")

  var svg = d3.select('.js-graph')
      .append("svg")
      .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(new Date(d.date)); })
    .y(function(d) { return y(d.match_count); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var toggleTermLine = function(term) {
    var data = _.find(hiddenData, function(data){ return data.key == term; });
    if(data) {
      hiddenData = _.reject(hiddenData, function(data){ return data.key == term; });
      addTermLine(term, data.data);
    } else {
      hiddenData.push(_.find(allData, function(data){ return data.key == term; }));
      removeTermLine(term);
    }
  };

  var removeTermLine = function(term) {

    allData = _.reject(allData, function(data){ return data.key == term; });

    var lines = svg.selectAll('path.line')
      .data(allData, function(d){ return d.key; });

    lines.exit().remove();
  };

  var addTermLine = function(term, data) {

    // add a way to key the data so we know which is new and which is old
    allData.push({key: term, data: data})

    // update the y domain to be the max value of the entire dataset
    y.domain([
          0,
          d3.max(allData, function(d) {
            return d3.max(d.data, function(d2){ return d2.match_count; });
        })]);
    // update the y axis to reflect the new domain
    svg.selectAll("g.y.axis").call(yAxis);

    // re-bind all the data and tell d3 how to uniquely identify each data set
    // so it knows which is new/existing/removed
    var lines = svg.selectAll('path.line')
      .data(allData, function(d){ return d.key; });

    // any existing data, terms that were not seen are applied these properties
    // reset the d property because the y axis may have changed
    lines
      .attr('class', 'line')
      .attr('d', function(d){ return line(d.data); });

    // brand new data, apply these properties
    newLine = lines
      .enter()
      .append('path')
      .style("stroke", function(d) { return color(d.key); })
      .attr('class', 'line')
      .attr('term', term)
      .attr('d', function(d){ return line(d.data); });

    // draw the line
    //newLine.node().getTotalLength()

    // if the keys that were in the data no longer exist, apply these properties
    lines.exit().remove();

    return color(term);
  };

  var addVerticalLine = function(date, clazz) {
    return svg.append( "rect" )
        .attr("x", x( date ) )
        .attr("y", y( y.domain()[1] ) )
        .attr("width", 10 )
        .attr("height", y( y.domain()[0] ))
        .attr("class", clazz);
  };

  // search box functionality
  var searchBox = $('.js-search input[type=text]');

  $('.js-search').on('submit', function(e){
    e.preventDefault();
    var searchTerm = searchBox.val();

    var termQuery = new Parse.Query(Term);
    termQuery.equalTo("term", searchTerm);
    termQuery.find({
      success: function(terms) {
        if(terms && terms.length) {
          var term = terms[0].get('term'), history = terms[0].get('history');
          var lineColor = addTermLine(term, history);
          $('.js-search-terms')
            .append(
              $("<li><a href='#' class='js-toggle-active-term' style='color:"+lineColor+";'>" + term + "</a></li>")
            ).on('click', function(e){
              e.preventDefault();
              toggleTermLine(term);
              return false;
            });
        } else {
          console.log('nada')
        }
      },
      error: function(object, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    searchBox.val('');

    return false;
  });
  searchBox.focus();

  // rails 4.0
  addVerticalLine(new Date('2013-06-25'));
  // rails 3.0
  addVerticalLine(new Date('2010-08-29'));
  // rails 2.0
  addVerticalLine(new Date('2007-12-07'));
  // rails 1.0
  addVerticalLine(new Date('2005-12-13'));

});

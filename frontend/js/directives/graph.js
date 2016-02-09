app.directive('graph', function() {
  return {
    replace: true,
    scope: {
      type: '@',
      dataset: '@',
      id: '@'
    },
    templateUrl: 'js/directives/graph.html',
    link: function(scope, element, attrs) {

      if (attrs.type !== "pie") {

        scope.$watch(attrs.dataset, function() {
          var height = 270;
          var width = 300;
          var barWidth = 10;
          var barOffset = 2;
          var dataset = JSON.parse(attrs.dataset);

          var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset)])
            .range([0, height - height / 5]);

          var xScale = d3.scale.ordinal()
            .domain(d3.range(0, dataset.length))
            .rangeBands([0, width], 0.3, 0);

          var colors = d3.scale.linear()
            .domain([0, dataset.length])
            .range(['blue', 'red']);

          var hAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

          var svg = d3.select("#" + attrs.id).append('svg');



          var graph = svg.attr('width', width)
            .attr('height', height)
            .selectAll('rect').data(dataset)
            .enter().append('rect')
              .style('fill', function(d, i) {
                return colors(i);
              })
              .attr('width', xScale.rangeBand())
              .attr('height', 0)
              .attr('x', function(d, i) {
                return xScale(i);
              })
              .attr('y', height);


          graph.transition()
            .attr('height', function(d) {
              return yScale(d);
            })
            .attr('y', function(d) {
              return height - yScale(d) - height/15;
            })
            .delay(function(d, i) {
              return i*20;
            })
            .duration(300)
            .ease('elastic')
            .each("end", appendInfo);

            function appendInfo() {
              svg.selectAll("text")
               .data(dataset)
               .enter()
               .append("text")
                .text(function(d) {
                  return d;
                })
                .attr("x", function(d, i) {
                  return xScale(i);
                })
                .attr("y", function(d) {
                  return height - height/100 - height/15 - yScale(d);
              });

              svg.append("g")
                .attr("transform", "translate(0," + (height-20) + ")")
                .call(hAxis);

            }
        });
      } else {
          scope.$watch(attrs.dataset, function() {

            var dataset = JSON.parse(attrs.dataset);

            var width = 360;
            var height = 360;
            var radius = Math.min(width, height) / 2;

            var color = ["red", "blue"];

            var svg = d3.select("#" + attrs.id)
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
                .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

            var arc = d3.svg.arc()
              .outerRadius(radius);

            var pie = d3.layout.pie()
              .value(function(d) { return d; })
              .sort(null);

            var path = svg.selectAll('path')
              .data(pie(dataset))
              .enter()
              .append('path')
              .attr('d', arc)
              .attr('fill', function(d, i) {
                return color[i];
              });
        });


      }
    }
  };
});

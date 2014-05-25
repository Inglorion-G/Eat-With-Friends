// <html>
//   <head>    
//     <meta http-equiv="Content-type" content="text/html; charset=utf-8">
//     <title>Testing Pie Chart</title>
//     <script type="text/javascript" src="http://mbostock.github.com/d3/d3.js?2.1.3"></script>
//     <script type="text/javascript" src="http://mbostock.github.com/d3/d3.geom.js?2.1.3"></script>
//     <script type="text/javascript" src="http://mbostock.github.com/d3/d3.layout.js?2.1.3"></script>
//  
//     <style type="text/css">
//         .slice text {
//             font-size: 16pt;
//             font-family: Arial;
//         }   
//     </style>
//   </head>
//   <body>
//     <script type="text/javascript">
// 
// 			var w = 300,                       
// 			var h = 300,                           
// 			var r = 100,                            
// 			color = d3.scale.category20c();   
// 
// 			data = [{"label":"one", "value":20}, 
// 			        {"label":"two", "value":50}, 
// 			        {"label":"three", "value":30}];
// 
// 			var vis = d3.select("body")
// 			    .append("svg:svg")              
// 			    .data([data])                   
// 			        .attr("width", w)         
// 			        .attr("height", h)
// 			    .append("svg:g")               
// 			        .attr("transform", "translate(" + r + "," + r + ")")   
// 
// 			var arc = d3.svg.arc()    
// 			    .outerRadius(r);
// 
// 			var pie = d3.layout.pie()        
// 			    .value(function(d) { return d.value; }); 
// 
// 			var arcs = vis.selectAll("g.slice") 
// 			    .data(pie)   
// 			    .enter()               
// 			        .append("svg:g")             
// 			            .attr("class", "slice");
// 
// 			    arcs.append("svg:path")
// 			            .attr("fill", function(d, i) { return color(i); } )
// 			            .attr("d", arc);                         
// 
// 			    arcs.append("svg:text")                                   
// 			            .attr("transform", function(d) {     
// 			            d.innerRadius = 0;
// 			            d.outerRadius = r;
// 			            return "translate(" + arc.centroid(d) + ")"; 
// 			        })
// 			        .attr("text-anchor", "middle")                  
// 			        .text(function(d, i) { return data[i].label; });
// 				
//     </script>
//   </body>
// </html>
window.EatFriends.Views.ReportShow = Backbone.CompositeView.extend({
	template: JST["users/show/reports"],
	
	initialize: function (options) {
		this.user = options.user
	},
	
	renderPieChart: function () {
	
	 var totalCarbs = this.user.totalCarbs();
	 var totalFat = this.user.totalFat();
	 var totalProtein = this.user.totalProtein();
	 
		var w = 300,                       
		h = 300,                           
		r = 100,                            
		color = d3.scale.ordinal().range(["#2F7689", "#FF4444", 
						"#99CC00"]);   

		data = [{"label":"Protein", "value": totalProtein}, 
		        {"label":"Fat", "value": totalFat}, 
		        {"label":"Carbs", "value": totalCarbs}];

		var vis = d3.select(".pie-chart")
		    .append("svg:svg")              
		    .data([data])                   
		    .attr("width", w)         
		    .attr("height", h)
		    .append("svg:g")               
		    .attr("transform", "translate(" + r + "," + r + ")")   

		var arc = d3.svg.arc()    
		    .outerRadius(r);
				
		var arcOver = d3.svg.arc()
		    .outerRadius(r + 15);

		var pie = d3.layout.pie()        
		    .value(function(d) { return d.value; }); 

		var arcs = vis.selectAll("g.slice") 
		    .data(pie)   
		    .enter()               
		    .append("svg:g")             
		    .attr("class", "slice")
				.on("mouseover", function(d) {
            d3.select(this).select("path").transition()
               .duration(600)
               .attr("d", arcOver);
        })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
               .duration(600)
               .attr("d", arc);
        });

		    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc);                         

		    arcs.append("svg:text")                                   
		            .attr("transform", function(d) {     
		            d.innerRadius = 0;
		            d.outerRadius = r;
		            return "translate(" + arc.centroid(d) + ")"; 
		        })
		        .attr("text-anchor", "middle")                  
		        .text(function(d, i) { return data[i].label; });
  },
	
	render: function () {
		alert("in render")
		var content = this.renderPieChart();
		
		this.$el.html(content);
		return this;
	}
	
});
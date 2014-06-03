window.EatFriends.Views.ReportShow = Backbone.View.extend({
	
	tagName: "food-chart-div",
	
	template: JST["users/show/chart"],
		
	draw: function () {
		
		var totalProtein = this.model.totalProtein();
		var totalFat = this.model.totalFat();
		var totalCarbs = this.model.totalCarbs();
		
		if (totalProtein < .01) {
			totalProtein = .01;
		}
		
		if (totalFat < .01) {
			totalFat = .01;
		}
		
		if (totalCarbs < .01) {
			totalCarbs = .01;
		}
		
		var w = 300,                       
		h = 300,                           
		r = 125,                            
		color = d3.scale.ordinal().range(["#2F7689", "#FF4444", 
						"#99CC00"]);   

		data = [{"label":"Protein", "value": totalProtein }, 
		        {"label":"Fat", "value": totalFat }, 
		        {"label":"Carbs", "value": totalCarbs }];

		var vis = d3.select("#food-chart")
		    .append("svg:svg")              
		    .data([data])                   
		    .attr("width", w)   
		    .attr("height", h)
		    .append("svg:g")               
		    .attr("transform", "translate(" + h/2 + "," + w/2 + ")") 

		var arc = d3.svg.arc()    
		    .outerRadius(r);
				
		var arcOver = d3.svg.arc()
		    .outerRadius(r + 20);

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
		var content = this.template({user: this.model});
		this.$el.html(content);
		this.draw();
		
		return this;
	}
	
});
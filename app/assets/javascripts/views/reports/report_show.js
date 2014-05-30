window.EatFriends.Views.ReportShow = Backbone.View.extend({
	
	template: JST["users/show/chart"],
		
	draw: function () {
		var w = 300,                       
		h = 300,                           
		r = 100,                            
		color = d3.scale.ordinal().range(["#2F7689", "#FF4444", 
						"#99CC00"]);   

		data = [{"label":"Protein", "value": 5}, 
		        {"label":"Fat", "value": 5}, 
		        {"label":"Carbs", "value": 5}];

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
		var content = this.template({user: this.model});
		this.$el.html(content);
		this.draw();
		
		return this;
	}
	
});
include("GG.cuts.jscad"); 

function main() { 

	// various things to be printed to test gaps.  We'll do 20cm x 20cm x 10cm as a base
	

	var test = cube(1).scale([20,20,10]); 
    var segments = [];
	
	for (var x=0; x<3; x++) { 
		for (var y=0; y<3; y++) { 	
			var n = x*3+y+1; 
			var gap = n/10; 
			
			var text = vector_text(0,0,"G"+gap); 
			var o = [];
			text.forEach(function(pl) {                   // pl = polyline (not closed)
			   o.push(rectangular_extrude(pl, {w: 2, h: 2}));   // extrude it to 3D
			});
			text = union(o); 
			var bounds = text.getBounds(); 
			text = text.scale([15 / bounds[1].x, 15 / bounds[1].y, 12 / bounds[1].z]).translate([2.5,2.5,0]); 
			

			var t = test.union(text).translate([ x*22,y*22, 0]); 

			var u = GG.ycut( [t], 0.5, n/10, "  N  "); 
			segments = segments.concat(u); 
		}
	}

	for(var i=0; i<segments.length; i++) { 
		segments[i] = segments[i].setColor(hsl2rgb(Math.random(),Math.random()*0.5+0.5,0.5)); 
		segments[i] = segments[i].translate([0,segments[i].getBounds()[0].y * 1.1,0]); 
	} 
	return segments; 
	
}
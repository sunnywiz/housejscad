function main() { 

    var segments = []; 
    segments.push(union(sphere(5),cube(8).translate([-4,-4,-4]))); 
	
	var u = union(segments); 
	var bounds = u.getBounds(); 

	var cutloc = 0.5;   // percentage relative to y
	
	var cutscale = 0.1;  // absolute! 
	
	// create a bunch of nobs

	
	
	// start cut code
	var xmin = bounds[0].x; 
	var ymin = bounds[0].y; 
	var zmin = bounds[0].z; 
	var xmax = bounds[1].x; 
	var ymax = bounds[1].y; 
	var zmax = bounds[1].z; 
	
	var zdist = zmax - zmin; 
	var ydist = ymax - ymin; 
	var xdist = xmax - xmin; 

	var y1 = ydist * cutloc; 

	var nobwidth = 0.1; // relative to 0..1
	var internobwidth=0.5; 
	var firstnob = 0.2;   // nob at ?
	var nobdepth = 0.1;    // relative to y
	var nobtrusion = 0.05;  // relative to x

	var nob = polygon([[0,0],[-nobtrusion,-nobdepth],[nobwidth+nobtrusion,-nobdepth],[nobwidth,0]]);
	nob = linear_extrude({height:1},nob); 
	var nobsa = []; 
	var nobsb = []; 
	for (var nx = firstnob; nx<1; nx+=internobwidth) { 
		var nob2 =  nob.translate([nx,0,0]).scale([xdist,ydist,zdist]).translate([xmin,ymin+y1,zmin]);
		nobsa.push(nob2.translate([0,-cutdepth,0])); 
		nobsb.push(nob2.translate([0,+cutdepth,0])); 
	}
	var a = polygon([ 
		[0,0],
		[0,y1],
		[xdist,y1],
		[xdist,0] ]);
	a = linear_extrude({height:zdist},a).translate([xmin,ymin,zmin]);
	a = a.subtract(nobs); 
	
	var b = polygon([ 
		[0,ydist*cutloc],
		[xdist,ydist*cutloc],
		[xdist,ydist],
		[0,ydist] ]); 
	b = linear_extrude({height:zdist},b).translate([xmin,ymin,zmin]);
	b = b.union(nobs); 

	var newsegments = []; 
	for (var i=0; i<segments.length; i++) { 
		newsegments.push(segments[i].intersect(a)); 
		newsegments.push(segments[i].intersect(b)); 
	}
	segments = newsegments; 
	
	for(var i=0; i<segments.length; i++) { 
		console.log(i+" "+segments[i]); 
		segments[i] = segments[i].setColor(hsl2rgb(Math.random(),Math.random()*0.5+0.5,0.5)); 
	} 
	return segments; 
	
}
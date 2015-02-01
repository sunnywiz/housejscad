function main() { 

    var segments = []; 
    segments.push(union(sphere(5),cube(8).translate([-4,-4,-4]))); 

	var cutloc = 0.5;      // percentage relative to y
	var absgap = 0.1; 
	var template = " N N ";  //  how do we want this cut. 
	
	// It scales the cut to be across the X axis; 
	// this "scale" also determines how think the nobbies are. 
	// so if you want the nobbies to be smaller, use "     N      "  instead of "  N  "
	
	var u = union(segments); 
	var bounds = u.getBounds(); 

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

	// define the nobs in a [0,0..1,-1] scale
	// figure in gaps later. 
	var nobouter = polygon([   
		[0.1,0],
		[0,-1],
		[1,-1],
		[0.9,0]]);
	nobouter = linear_extrude({height:1},nobouter); 
	var nobinner = polygon([
		[0.2,0],
		[0.1,-0.9],
		[0.9,-0.9],
		[0.8,0]]);
	nobinner = linear_extrude({height:1},nobinner); 

	var nobsa = []; 
	var nobsb = []; 
	for (var i=0; i<template.length; i++) { 
		if (template[i] == 'N') { 
			nobsa.push(nobouter.translate([i,0,0]).scale([xdist/template.length,xdist/template.length,zdist]).translate([xmin,ymin+y1,zmin]));
			nobsb.push(nobinner.translate([i,0,0]).scale([xdist/template.length,xdist/template.length,zdist]).translate([xmin,ymin+y1,zmin]));
		}
	}

	var a = polygon([ 
		[0,0],
		[0,y1-absgap],
		[xdist,y1-absgap],
		[xdist,0] ]);
	a = linear_extrude({height:zdist},a).translate([xmin,ymin,zmin]);
	a = a.subtract(nobsa); 
	
	var b = polygon([ 
		[0,y1],
		[xdist,y1],
		[xdist,ydist],
		[0,ydist] ]); 
	b = linear_extrude({height:zdist},b).translate([xmin,ymin,zmin]);
	b = b.union(nobsb); 

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
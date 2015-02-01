include("cuts.jscad"); 

function main() { 

    var segments = []; 
    segments.push(union(sphere(5),cube(8).translate([-4,-4,-4]))); 

	segments = GeekyGulati.ycut(segments, 0.5, 0.1, "   N   N   "); 
	var newsegments = []; 
	for (var i=0; i<segments.length; i++) { 
		newsegments = newsegments.concat( GeekyGulati.xcut( [segments[i]], 0.5, 0.1, "   N   N   ")); 
	} 
	segments = newsegments; 
	segments = GeekyGulati.zcut(segments, 0.5, 0.1, "   N   N   "); 

	for(var i=0; i<segments.length; i++) { 
		console.log(i+" "+segments[i]); 
		segments[i] = segments[i].setColor(hsl2rgb(Math.random(),Math.random()*0.5+0.5,0.5)); 
	} 
	return segments; 
	
}
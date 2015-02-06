include("GG.cuts.jscad"); 

function basic_cuts_test_1() { 
    var segments = []; 
    segments.push(union(sphere(50),cube(80).translate([-40,-40,-40]))); 

	segments = GG.ycut(segments, 0.5, 0.1, "   /#\\   ", "   /#\\   "); 		
	segments = GG.xcut(segments, 0.5, 0.5,   "   \\####/    ","   .   ,  .   "); 
	segments = GG.zcut(segments, 0.5, 0.3, " #   ##   ### ", "   \#####/   "); 

	/*segments = */ GG.randomColor(segments); 
	
	// for plating, uncomment this bit: 
	
	// top bits are the first four.  rotate them so that cuts are facing up.
	//for (var i=0; i<4; i++) { 
	//	segments[i] = segments[i].rotateY(180); 
	//}
	
	//segments = GG.plate(segments,150,10); 
	return segments; 
}

function empty_box_cuts_test() { 
	// this is closer to how 3d model of a house would be cut
	
	var box = cube(50).subtract(cube(40).translate([3,4,5]));   // 5mm hollow
	var segments = [box]; 
	
	var cut1 = "    \\#/   \\#/   "; 
	var cut2 = "   ,      ,    "; 
	
	segments = GG.ycut(segments, 0.5, 0.5, cut1, cut2); 
	segments = GG.xcut(segments, 0.5, 0.5, " "+cut1, " "+cut2); 
	segments = GG.zcut(segments, 0.5, 0.5, "  "+cut1, "  "+cut2); 

	
	GG.randomColor(segments); 
	for (var i=0; i<4; i++) { segments[i] = segments[i].rotateY(180); }
	GG.plate(segments, 130, 2); 
	return segments; 
	
}

function main() { 

	// return basic_cuts_test_1(); 
	
	return empty_box_cuts_test(); 
}


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
	
	var box = cube(50).subtract(cube(40).translate([3,4,10]));   // 5mm hollow
	var segments = [box]; 

    var floorcut = " # #   # # "; 
	var wallvertical = " ,  , "; 
	var wallhorizontal = "  /#\\  /#\\  "; 
	var cut1 = "  \\#/       \\#/  "; 
	var cut2 = " ,   , "; 
	
	segments = GG.ycut(segments, 0.5, 0.3, floorcut, wallvertical); 
	segments = GG.xcut(segments, 0.5, 0.3, floorcut, wallvertical); 
	segments = GG.zcut(segments, 0.5, 0.3, wallhorizontal, wallhorizontal); 

	
	GG.randomColor(segments); 
	for (var i=0; i<4; i++) { segments[i] = segments[i].rotateY(180); }
	GG.plate(segments, 130, 2); 
	return segments; 
	
}

function joinZ(a, b, absgap, templateX, templateY) { 
	// Given two shapes a and b, which intersect in the Z-direction, 
	// does some template cutting using the two templates 
	var c = intersection(a,b);
	var bounds = c.getBounds(); 
	var xsize = bounds[1].x - bounds[0].x; 
	var ysize = bounds[1].y - bounds[0].y; 
	var zsize = bounds[1].z - bounds[0].z; 
	if (xsize == 0 || ysize==0 || zsize==0) { 
		// no intersection
		return [a,b];  // no changes
	}
	var nibbleX = GG.convertToNobs(templateX,0.2);
	var nibbleY = GG.convertToNobs(templateY,0.2);
	var l; 
	
	var l = templateX.length; 
	for (var i=0; i<nibbleX[0].length; i++) { 
		var r = nibbleX[0][i].rotateX(90); 
		r = r.scale([xsize/l,-ysize,zsize]);
		r = r.translate([bounds[0].x,bounds[0].y,bounds[1].z]); 
		nibbleX[0][i] = r; 
	}
	for (var i=0; i<nibbleX[1].length; i++) { 
		var r = nibbleX[1][i].rotateX(90); 
		r = r.scale([xsize/l,-ysize,zsize]);
		r = r.translate([bounds[0].x,bounds[0].y,bounds[1].z]); 
		nibbleX[1][i] = r; 
	} 
	
	l = templateY.length; 
	for (var i=0; i<nibbleY[0].length; i++) { 
		var r = nibbleY[0][i].rotateX(90).rotateZ(90); 
		r = r.scale([xsize,ysize/l,zsize]);
		r = r.translate([bounds[0].x,bounds[0].y,bounds[1].z]); 
		nibbleY[0][i] = r; 
	}
	for (var i=0; i<nibbleY[1].length; i++) { 
		var r = nibbleY[1][i].rotateX(90).rotateZ(90); 
		r = r.scale([xsize,ysize/l,zsize]);
		r = r.translate([bounds[0].x,bounds[0].y,bounds[1].z]); 
		nibbleY[1][i] = r; 
	}
	
    var a1 = a.subtract(nibbleX[0]).subtract(nibbleY[0]);
	var b1 = b.subtract(c).union(nibbleX[1]).union(nibbleY[1]); 
    return [a1,b1]; 
}

function join_test_1() { 
	var a = cube({size:[50,50,20], round: true});
	var b = cube({size:[40,40,20], round: true}).translate([0,0,17]);
	
	var a1 = joinZ(a,b,0.4,"   /#\\    /#\\   ", "   /#\\    /#\\   ");   // returns [ new a, new b ]
	a1[1] = a1[1].rotateX(180);
	a1 = GG.plate(a1, 130, 2); 
	a1 = GG.randomColor(a1); 
	return a1; 
}

function main() { 

	// return basic_cuts_test_1(); 
	// return empty_box_cuts_test();

	return join_test_1(); 
	
}


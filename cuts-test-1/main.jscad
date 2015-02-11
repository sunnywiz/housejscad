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

function join_test_1() { 
	var a = cube({size:[50,50,20], round: false});
	var b = cube({size:[40,40,20], round: false}).translate([0,0,30]);
	
	var a1 = GG.joinZ(a,b,5,"   /#\\    /#\\   ", "   /#\\    /#\\   ");   // returns [ new a, new b ]
	// a1[1] = a1[1].rotateX(180);
	// a1 = GG.plate(a1, 130, 2); 
	a1 = GG.randomColor(a1); 
	return a1; 
}

function join_test_2() { 
	var a = cube({size:[50,50,50], round: true});
	var b = cube({size:[40,40,40], round: true}).translate([0,60,0]);

	return GG.randomColor(GG.joinY(a,b,5,"    #    ", "     #     ")); 
}

function main() { 

	// return basic_cuts_test_1(); 
	// return empty_box_cuts_test();

	// return join_test_1();
	// return join_test_2(); 

}


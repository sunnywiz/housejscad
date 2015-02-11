include('GG.cuts.jscad');
include('GG.txtTo3d.jscad'); 

function main() {
    
    var segments=[];    	
	var t = new GG.txtTo3d(); 
			
	// floor = 1 foot (joists and all)  
	// window = 3 feet after floor, 4 feet of window
	// door = 7 feet of door
	// above door and window = 1 foot.
	// grand total = 9 feet
	
	t.setTranslation('#',function() { return cube(1).scale([1,1,9]); }); 
	t.setTranslation('.',function() { return cube(1); }); 
	t.setTranslation('b',function() { return cube(1); }); 
	t.setTranslation('d',function() { 
		return union([
			cube(1), 
			cube(1).translate([0,0,8])
		]); 
	}); 
	t.setTranslation('w',function()	{ 
		return union([
			cube({size: [1,1,4]}), 
			cube(1).translate([0,0,8])
		]); 
	});

var templatebasement = 
"################################################################################\n"+
"################################################################################\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................d...........................................##\n"+
"##................................d...........................................##\n"+
"##................................d...........................................##\n"+
"##................................d...........................................##\n"+
"##................................d...........................................##\n"+
"##................................d...........................................##\n"+
"##................................d...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................##\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#...........................................ww\n"+
"##................................#        ...................................##\n"+
"##................................#        ...................................##\n"+
"##................................#        ...................................##\n"+
"##................................#        ...................................##\n"+
"##................................#        ...................................##\n"+
"##................................#        ...................................##\n"+
"###################################        #####################################\n";


var templatefamily = 
"       ###################################        #..........##########################\n"+
"       ##...............#................#        #...................................#\n"+
"       ##...............#................#        #...................................#\n"+
"       ##...............#................#        #...................................#\n"+
"       ##...............#................#        #...................................#\n"+
"       ##...............#................#        #...................................#\n"+
"       ##...............#................#        #...................................#\n"+
"       ##...............#................#        #...................................#\n"+
"       ww...............#................#        #...................................#\n"+
"       ww...............#................#        #...................................#\n"+
"       ww...............#................#        #...................................#\n"+
"       ww...............#................#dddddddd#...................................#\n"+
"       ww...............#................#............................................#\n"+
"       ww...............#................#............................................#\n"+
"       ww...............#................#............................................#\n"+
"       ww...............#................#............................................#\n"+
"       ##...............#................d............................................#\n"+
"       ##...............#................d............................................#\n"+
"       ##...............#................d............................................#\n"+
"       ##...............#................d............................................#\n"+
"       ##...............#................d............................................d\n"+
"       ##...............#................d............................................d\n"+
"       ##...............#................d............................................d\n"+
"       ##...............#................#............................................d\n"+
"       ##ddddddd###############################.......................................d\n"+
"       ##.....................................#.......................................d\n"+
"       ##.....................................d.......................................d\n"+
"       ##.....................................d.......................................d\n"+
"       ##.....................................d.......................................d\n"+
"       ##.....................................d.......................................d\n"+
"       ##.....................................d.......................................d\n"+
"       ##.....................................d.......................................d\n"+
"       ##.....................................d.......................................d\n"+
"       ##.....................................#.......................................d\n"+
"       ##.....................................#.......................................#\n"+
"       ##.....................................#.......................................#\n"+
"       ##.....................................#.......................................#\n"+
"       ##.....................................#.......................................#\n"+
"       ##.....................................#.......................................#\n"+
"       ww.....................................#.......................................#\n"+
"       ww.....................................#.......................................#\n"+
"       ww.....................................#.......................................#\n"+
"       ww.....................................#.......................................#\n"+
"       ww.....................................#.......................................#\n"+
"       ww..............................########.......................................#\n"+
"       ww..............................#......#.......................................#\n"+
"       ww..............................b......#.......................................#\n"+
"       ##..............................b......#.......................................#\n"+
"       ##..............................b......#.......................................#\n"+
"       ##..............................b......#.......................................#\n"+
"       ##..............................b......#.......................................#\n"+
"       ##..............................b......#.......................................#\n"+
"       ##..............................b......#.......................................#\n"+
"       ##..............................#......#.......................................#\n"+
"       ################################################################################\n";

var templatekitchen = 
       "####################################################wwwwwwwww###################\n"+
       "####################################################wwwwwwwww###################\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "ww............................................................................dd\n"+
       "ww............................................................................dd\n"+
       "ww............................................................................dd\n"+
       "ww............................................................................dd\n"+
       "ww............................................................................dd\n"+
       "ww............................................................................dd\n"+
       "ww............................................................................dd\n"+
       "ww............................................................................##\n"+
       "ww............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................##\n"+
       "##............................................................................ww\n"+
       "dd............................................................................ww\n"+
       "dd.........................................#..................................ww\n"+
       "dd.........................................#..................................ww\n"+
       "dd.........................................#..................................ww\n"+
       "dd................................         #..................................ww\n"+
       "dd................................         #..................................##\n"+
       "dd................................         #          ........................##\n"+
       "dd................................         #          ........................##\n"+
       "dd................................         #          ........................##\n"+
       "##................................         #          ........................##\n"+
       "##................................         #          ........................##\n"+
       "##................................         #          ........................##\n"+
       "##################################         #          ##########################\n";

	    var templatebedrooms=
"#########################################         #####################################\n"+
"#...............#........#..............#         #......#............................#\n"+
"#...............#........#..............#         #......b............................#\n"+
"#...............#........#..............#         #......b............................#\n"+
"#...............#........#..............#         #......b............................#\n"+
"#...............#........#..............#         #......b............................#\n"+
"#...............#........#..............#         #......b............................#\n"+
"#...............#........#..............#         #......b............................#\n"+
"#...............#bbbbbbbb#..............#.........#......b............................#\n"+
"#...............#.......................#.........#......#............................#\n"+
"#...............d.......................d.........########............................#\n"+
"#...............d.......................d.........b......#............................#\n"+
"w...............d.......................d.........b......#............................#\n"+
"w...............d.......................d.........b......#............................w\n"+
"w...............d.......................d.........b......#............................w\n"+
"w...............d.......................d.........b......#............................w\n"+
"w...............d.......................d.........b......#............................w\n"+
"w...............#.......................#.........b......#............................w\n"+
"w...............#.......................#.........#########...........................w\n"+
"w...............#.......................#.................#...........................w\n"+
"#...............#.......................#.................d...........................w\n"+
"#...............#.......................#.................d...........................#\n"+
"#...............#########################.................d...........................#\n"+
"#.......................................d.................d...........................#\n"+
"#.......................................d.................d...........................#\n"+
"#.......................................d.................d...........................#\n"+
"#.......................................d.................d...........................#\n"+
"#.......................................d.................#############################\n"+
"#.......................................d.................#...........................#\n"+
"#.......................................d.................#...........................#\n"+
"#.......................................d.................#...........................#\n"+
"#.......................................#########dddddddd##...........................#\n"+
"#.......................................#.....#.......................................#\n"+
"#.......................................#.....b.......................................#\n"+
"#.......................................#.....b.......................................w\n"+
"#.......................................#.....b.......................................w\n"+
"#.......................................#.....b.......................................w\n"+
"#.......................................#.....b.......................................w\n"+
"#.......................................#.....b.......................................w\n"+
"w.......................................#.....b.......................................w\n"+
"w.......................................#.....b.......................................w\n"+
"w.......................................#.....b.......................................w\n"+
"w.......................................#.....#.......................................#\n"+
"w.......................................#######.......................................#\n"+
"w.......................................#.....#.......................................#\n"+
"w.......................................b.....#.......................................#\n"+
"w.......................................b.....#.......................................#\n"+
"#.......................................b.....#.......................................#\n"+
"#.......................................b.....#.......................................#\n"+
"#.......................................b.....#.......................................#\n"+
"#.......................................b.....#.......................................#\n"+
"#.......................................b.....#.......................................#\n"+
"#.......................................b.....#.......................................#\n"+
"#.......................................b.....#.......................................#\n"+
"#.......................................#.....#.......................................#\n"+
"#######################################################################################";
	
	var s = (304.8)/48;   // 304.8 mm per feet, at 1/48 scale
	
	// result of convert is [0,0]..[+x,+y,+z] 
	
	var basement = t.convert(templatebasement,28,17,9); // cube({size:[30,20,9]});
	var family = t.convert(templatefamily,28,20,9); //cube({size:[30,20,9]});
	var kitchen = t.convert(templatekitchen,28,20,9); //cube({size:[30,20,9]});
	var bedrooms = t.convert(templatebedrooms, 30, 20, 9);
	var garage = cube({size:[30,40,9]});
	
	// move them into position
	
	// basement does not move: at 0,0
	// family room is up and to the right of basement
	family = family.translate([0,-30,4]);
	var underfamily = cube({size:[30,20,4]}).translate([0,-30,0]); 

	// kitchen is directly above basement
	kitchen = kitchen.translate([0,0,9+10]); // joist should intersect ceiling
	
	// bedrooms are above family
	bedrooms = bedrooms.translate([-2,-30,4+9+10]); 
	
	// garage goes next to family
	garage = garage.translate([0,-80,4]); 
	var undergarage = cube({size:[30,40,4]}).translate([0,-80,0]); 

	//       0        1         2         3         4         5         6
	//  t1= "123456789012345678901234567890123456789012345678901234567890
	var t20="          /#\\               /#\\         "; 
	var t30="                   /#\\                   /#\\                "; 
	var t9 ="    /#\\    "; 
	
	// vertical things -- NO, makes it hard to print
	// var a = GG.joinZ(basement,kitchen,0.5,t30,t20); 
	// basement=a[0]; kitchen=a[1]; 
	// a = GG.joinZ(family, bedrooms,0.5,t30,t20); 
	// family = a[0]; bedrooms=a[1]; 
	
	// horizontal
	a = GG.joinY(family,basement,0.25,t30,t9); 
	family = a[0]; basement = a[1]; 
	
	//a = GG.joinY(family,kitchen,0.25,t30,t9); 
	//family = a[0]; kitchen=a[1]; 
	
	a = GG.joinY(bedrooms,kitchen,0.25,t30,t9); 
	bedrooms=a[0]; kitchen=a[1]; 
	
	a = GG.joinY(garage,family,0.25,t30,t20); 
	garage=a[0]; family=a[1]; 
	
	var segments = [ basement, underfamily, family, kitchen, bedrooms, undergarage,garage ]; 
	GG.randomColor(segments); 

	return segments; 
}

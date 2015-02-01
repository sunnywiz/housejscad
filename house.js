// javascript classes example copied from: http://javascript.crockford.com/private.html

var GeekyGulati = GeekyGulati || {}; 
GeekyGulati.TwoD = function() { 

	// This defines a two-D space starting at 0,0
	// various operations for getting, setting, and finding. 

	var _store = []; 
	var _xmax=0, _ymax = 0; 
	var _that = this; 
	
	this.Set = function(x,y,v) { 
		if (y>_ymax) _ymax = y;
		if (typeof(_store[y])=='undefined') _store[y]=[]; 
		if (x>_xmax) _xmax = x; 
		_store[y][x] = v;
		return _that; 
	};
	
	this.Get = function(x,y) { 
		if (typeof(_store[y])=='undefined') return undefined; 
		return _store[y][x]; 
	}
	
	this.BlockEqual = function(x,y,dx,dy,v) { 
		for (var y2 = y; y2<y+dy; y2++) { 
			if (typeof(_store[y2]) == 'undefined') return false; 
			for (var x2 = x; x2<x+dx; x2++) { 
			   if (_store[y2][x2] != v) return false; 
			}
		}
		return true;
	}
	
	this.BlockSet = function(x,y,dx,dy,v) {
		if (y+dy > _ymax) _ymax = y+dy; 
		if (x+dx > _xmax) _xmax = x+dx; 
		for (var y2 = y; y2<y+dy; y2++) { 
			if (typeof(_store[y2]) == 'undefined') _store[y2]=[];
			for (var x2 = x; x2<x+dx; x2++) { 
			   _store[y2][x2]=v; 
			}
		}
		return _that; 
	}

	this.GetXMax = function() { return _xmax; } 
	this.GetYMax = function() { return _ymax; }
	
	this.FindSingle = function(v) { 
		// Returns {X:x,Y:y} of location found or 0
		for (var y = 0; y <= _ymax; y++) { 
			if (typeof(_store[y]) == 'undefined') continue; 
			for (var x = 0; x<= _xmax; x++) { 
			    if (_store[y][x] == v) { 
				    echo("found "+v+" at "+x+" "+y); 
					return { X:x, Y:y }; 
			   }
			}
		}
		echo (v+" not found");
		return 0;
	}
}

function main() {
    
    var segments=[]; 
    var template=
"##########################################         ######################################\n"+
"#................#........#..............#         #......#.............................#\n"+
"#................#........#..............#         #......b.............................#\n"+
"#................#........#..............#         #......b.............................#\n"+
"#................#........#..............#         #......b.............................#\n"+
"#................#........#..............#         #......b.............................#\n"+
"#................#........#..............#         #......b.............................#\n"+
"#................#........#..............#         #......b.............................#\n"+
"#................#bbbbbbbb#..............#.........#......b.............................#\n"+
"#................#.......................#.........#......#.............................#\n"+
"#................d.......................d.........########.............................#\n"+
"#................d.......................d.........b......#.............................#\n"+
"w................d.......................d.........b......#.............................#\n"+
"w................d.......................d.........b......#.............................w\n"+
"w................d.......................d.........b......#.............................w\n"+
"w................d.......................d.........b......#.............................w\n"+
"w................d.......................d.........b......#.............................w\n"+
"w................#.......................#.........b......#.............................w\n"+
"w................#.......................#.........#########............................w\n"+
"w................#.......................#.................#............................w\n"+
"#................#.......................#.................d............................w\n"+
"#................#.......................#.................d............................#\n"+
"#................#.......................#.................d............................#\n"+
"#................#########################.................d............................#\n"+
"#........................................d.................d............................#\n"+
"#........................................d.................d............................#\n"+
"#........................................d.................d............................#\n"+
"#........................................d.................d............................#\n"+
"#........................................d.................############################## H\n"+
"#........................................d.................#............................#\n"+
"#........................................d.................#............................#\n"+
"#........................................d.................#............................#\n"+
"#........................................#########dddddddd##............................#\n"+
"#........................................#.....#........................................#\n"+
"#........................................#.....b........................................#\n"+
"#........................................#.....b........................................w\n"+
"#........................................#.....b........................................w\n"+
"#........................................#.....b........................................w\n"+
"#........................................#.....b........................................w\n"+
"#........................................#.....b........................................w\n"+
"w........................................#.....b........................................w\n"+
"w........................................#.....b........................................w\n"+
"w........................................#.....b........................................w\n"+
"w........................................#.....#........................................#\n"+
"w........................................#######........................................#\n"+
"w........................................#.....#........................................#\n"+
"w........................................b.....#........................................#\n"+
"w........................................b.....#........................................#\n"+
"#........................................b.....#........................................#\n"+
"#........................................b.....#........................................#\n"+
"#........................................b.....#........................................#\n"+
"#........................................b.....#........................................#\n"+
"#........................................b.....#........................................#\n"+
"#........................................b.....#........................................#\n"+
"#........................................b.....#........................................#\n"+
"#........................................#.....#........................................#\n"+
"#########################################################################################\n"+
"                                       V"; ;
   			 
    var translate = new Object(); 
	translate['#'] = function() { return cube(1).scale([1,1,10]); }; 
	translate['.'] = function() { return cube(1); }; 
	translate['b'] = function() { return cube(1); }; 
	translate['d'] = function() { 
		return union([
			cube(1), 
			cube(1).translate([0,0,9])
		]); 
	}; 
	translate['w'] = function()	{ 
		return union([
			cube({size: [1,1,5]}), 
			cube(1).translate([0,0,9])
		]); 
	};
	translate['O'] = function() { 
	    return union([ 
			cube(1),
			cylinder({r:0.5,h:10}).translate([0.5,0.5,0])
		]);
	}

	var twoD = new GeekyGulati.TwoD(); 
    var x=0; 
    var y=0; 
    for(var i=0, len=template.length; i<len; i++) {
        x++; 
        var ch = template[i];
        if (ch == '\n' || ch=='\r') { 
            x = 0; 
            y++; 
		} else { 
		   twoD.Set(x,y,ch); 
		}
	}
	var xMax = twoD.GetXMax();
	var yMax = twoD.GetYMax(); 

	var tryBuckets = [];
	for(x=1; x<xMax; x++) { 
		for (y=1; y<yMax; y++) { 
			tryBuckets.push([x,y]); 
		}
	}
	tryBuckets.sort(
		function(a,b) { 
			return (b[0]*b[1]) - (a[0]*a[1]) 
		} 
	);
	
	// TODO: idea is to look for "groups" of things, like >, so can replace the whole thing with 
	// a set of steps.   Only when we get steps, though. 
	
	for (var tbi=0; tbi<tryBuckets.length; tbi++) {
		var dx = tryBuckets[tbi][0]; 
		var dy = tryBuckets[tbi][1]; 
		for (y=0; y<=twoD.GetYMax()-dy; y++) { 
			for (x = 0; x < twoD.GetXMax()-dx; x++) { 
				var ch = twoD.Get(x,y); 
				if (ch in translate) { 
					if (twoD.BlockEqual(x,y,dx,dy,ch)) { 
						var s = translate[ch] (); 
						s = s.scale([dx,dy,1]).translate([x,y,0]); 
						segments.push(s); 
						twoD.BlockSet(x,y,dx,dy,undefined);	
					}
				}
			}
		} 
	}
	
	
//	return segments; 
//							var s = translate[ch] (); 
//						s = s.translate([x,y,0]); 
//						segments.push(s);

	var floor = union(segments); 
	segments = [ floor ]; 
/*	
	// Now try to cut it along the "V" 
	var cut = twoD.FindSingle('V'); 
	if (cut) { 
		var block1 = cube(1).scale([cut.X,yMax,10]); 
		var block2 = cube(1).scale([xMax,yMax,10]).translate([cut.X,0,0]); 
		var newsegments = []; 
		for (var i=0; i<segments.length; i++) { 
			var part1 = segments[i].intersect(block1); 
			var part2 = segments[i].intersect(block2); 
			newsegments.push(part1); 
			newsegments.push(part2); 
		}
		segments = newsegments;  
	}

	cut = twoD.FindSingle('H'); 
	if (cut) { 
		var block1 = cube(1).scale([xMax,cut.Y,10]); 
		var block2 = cube(1).scale([xMax,yMax,10]).translate([0,cut.Y,0]); 
		var newsegments = []; 
		for (var i=0; i<segments.length; i++) { 
			var part1 = segments[i].intersect(block1); 
			var part2 = segments[i].intersect(block2); 
			newsegments.push(part1); 
			newsegments.push(part2); 
		}
		segments = newsegments;  
	}
*/
	cut=5; 
	if (cut > 0) { 
		var block1 = cube(1).scale([xMax,yMax,cut]); 
		var block2 = cube(1).scale([xMax,yMax,10]).translate([0,0,cut]); 
		var newsegments = []; 
		for (var i=0; i<segments.length; i++) { 
			var part1 = segments[i].intersect(block1); 
			var part2 = segments[i].intersect(block2); 
			newsegments.push(part1); 
			newsegments.push(part2); 
		}
		segments = newsegments;  
	}

	// Color everything	
	for(var i=0; i<segments.length; i++) { 
		segments[i] = segments[i].setColor(hsl2rgb(Math.random(),Math.random()*0.5+0.5,0.5)); 
	}
	
	// Final polish. 
	var scale=72; 
	var feetTomm=304.8; 
	var finalX = (30 * feetTomm)/scale;   
	var finalY = (20 * feetTomm)/scale;   
	var finalZ = (8 * feetTomm)/scale; 
	for (var i=0; i<segments.length; i++) { 
		segments[i] = segments[i].mirroredY().scale([finalX/xMax, finalY/yMax, finalZ/10]); 
	}
	
	// return segments; 
	return segments[0];
	
	// TODO: find a way to lay the objects out.  Probably want to flip the top pieces over. 
	
	// Convert to multi-part format -- THIS DOES NOT WORK
	//var newsegments = []; 
	//for (var i=0; i<segments.length; i++) { 
	//	newsegments.push({ name: "A"+i, caption: "A"+i, data: segments[i]});
	//}
	//return newsegments; 
}

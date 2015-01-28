// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

function  IsAllTheSame(twoD,x,y,dx,dy,ch) { 
	for (var y2 = y; y2<y+dy; y2++) { 
		for (var x2 = x; x2<x+dx; x2++) { 
		   if (typeof(twoD[y2]) == 'undefined') return false; 
		   if (twoD[y2][x2] != ch) return false; 
		}
	}
	return true; 
}

function SetAsConsumed(twoD,x,y,dx,dy) { 
	for (var y2 = y; y2<y+dy; y2++) { 
		for (var x2 = x; x2<x+dx; x2++) { 
		   twoD[y2][x2] = undefined; 
		}
	}
	return true; 
}

function main() {
    
    var segments=[]; 
    var template="##===##########===###\n"+
                 "#...................#\n"+
                 "=...................=\n"+
                 "=.......     .......=\n"+
                 "=.......     .......=\n"+
                 "=.......     .......=\n"+
                 "=...................=\n"+
                 "=...................=\n"+
                 "=...................=\n"+
                 "#...................#\n"+
                 "##===##!!!!!!##===###\n";
   			 
    var translate = new Object(); 
	translate['#'] = function() { return cube(1).scale([1,1,10]); }; 
	translate['.'] = function() { return cube(1); }; 
	translate['!'] = function() { 
		return union([
			cube(1), 
			cube(1).translate([0,0,9])
		]); 
	}; 
	translate['='] = function()	{ 
		return union([
			cube({size: [1,1,5]}), 
			cube(1).translate([0,0,9])
		]); 
	};

	var twoD = [];
	twoD[0] = []; 
    var xMax = 0; 
    var yMax = 0; 	
    var x=0; 
    var y=0; 
    for(var i=0, len=template.length; i<len; i++) {
        x++; 
        var ch = template[i];
        if (ch == '\n' || ch=='\r') { 
            x = 0; 
            y++; 
			twoD[y]=[]; 
		} else { 
			if (ch in translate) { 
			   twoD[y][x] = ch; 
			   if (x>=xMax) { xMax = x+1; }
			   if (y>=yMax) { yMax = y+1; }
			}
		}
	}

	// ordered by x times y -- most thingies grabbed. 
	var tryBuckets = [ [6,6],        //36
					   [6,5],[5,6],  //30 
					   [5,5],        //25
					   [6,4],[4,6],  //24
					   [4,5],[5,4],  //20
					   [6,3],[3,6],  //18
					   [4,4],        //16
					   [3,5],[5,3],  //15
					   [4,3],[3,4],[6,2],[2,6],  //12
					   [2,5],[5,2],  //10
					   [3,3],        // 9
					   [4,2],[2,4],  // 8
					   [3,2],[2,3],[6,1],[1,6], // 6
					   [1,5],[5,1],  // 5
					   [2,2],[4,1],[1,4], // 4
					   [3,1],[1,3],  // 3
					   [2,1],[1,2] ]; // 2
	
	// TODO: idea is to look for "groups" of things, like >, so can replace the whole thing with 
	// a set of steps.   Only when we get steps, though. 
	
	for (y=0; y<yMax+10; y++) { 
		if (typeof (twoD[y]) == 'undefined') continue; 
    	for (x = 0; x < xMax+10; x++) { 
			var ch = twoD[y][x]; 
			if (ch in translate) { 
			
				var found = false; 
				// see how much we can grab
				for (var tbi = 0; !found && tbi < tryBuckets.length; tbi++) { 
					var dx = tryBuckets[tbi][0]; 
					var dy = tryBuckets[tbi][1]; 
					
					if (IsAllTheSame(twoD,x,y,dx,dy,ch)) { 
						var s = translate[ch] (); 
						s = s.scale([dx,dy,1]).translate([x,y,0]); 
						segments.push(s); 
						SetAsConsumed(twoD,x,y,dx,dy);	
						found = true; 
					}
				}
				if (!found) { 
					var s = translate[ch] (); 
					s = s.translate([x,y,0]); 
					segments.push(s);
				}
			}
		}
	} 
    return segments;     
	
}

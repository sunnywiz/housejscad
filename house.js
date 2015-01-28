// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

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

	for (y=0; y<yMax+10; y++) { 
		if (typeof (twoD[y]) == 'undefined') continue; 
    	for (x = 0; x < xMax+10; x++) { 
			var ch = twoD[y][x]; 
			if (ch in translate) { 
				var s = translate[ch] (); 
				s = s.translate([x,y,0]); 
				segments.push(s);
			}
		}
	} 
    return segments;     

}

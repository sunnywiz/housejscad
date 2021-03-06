include('GG.twoD.jscad'); 

if (typeof(GG) == 'undefined') { 
	GG={}; 
} 

GG.txtTo3d = function() {
	var _translations = {};
	var _self = this; 
	
	this.setTranslation = function(ch, func) { 
		// given a character ch, return a function that returns a solid from
		// 0,0,0 to 1,1,N (N is up to you) 
		_translations[ch] = func; 
	};

	this.convert = function(template, finalX, finalY, finalZ) {
	
		var twoD = new GG.TwoD(); 
		var x=0; 
		var y=0; 
		var segments = []; 
		
		// import template into twoD.  Could be moved to twoD
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
			for (y=0; y<=twoD.GetYMax()-dy+1; y++) { 
				for (x = 0; x <= twoD.GetXMax()-dx+1; x++) { 
					var ch = twoD.Get(x,y); 
					if (ch in _translations) { 
						if (twoD.BlockEqual(x,y,dx,dy,ch)) { 
							var s = _translations[ch] (); 
							s = s.scale([dx,dy,1]).translate([x,y,0]); 
							segments.push(s); 
							twoD.BlockSet(x,y,dx,dy,undefined);	
						}
					}
				}
			} 
		}
		var floor = union(segments).mirroredY();  
		console.log("floor", floor); 
		var b = floor.getBounds(); 
		var bx = b[1].x-b[0].x; 
		var by = b[1].y-b[0].y; 
		var bz = b[1].z-b[0].z;
		if (bx < 1) bx = 1; 
		if (by < 1) by = 1; 
		if (bz < 1) bz = 1; 
		floor = floor.translate([-b[0].x,-b[0].y,-b[0].z]);   // put it at 0,0,0
		floor = floor.scale([finalX/bx,finalY/by,finalZ/bz]); // scale it to desired size
		return floor;		
	}
	
}; 

GG.steps = function(numSteps) { 
	// result: 1x1x1 cube with steps carved in
	// 0,0,0 is lowest
	// 1,1,1 is highest
	// steps are along the X axis
	// rising up the +Z along the +Y axis
	
	// steps = 1:   cube
	// steps = 2:    #
	//              #/
	// steps = 3:         #
	//                   #/ +Z
	//                  #/
	//                  +Y
	
	// ie, the "top" step is the same level as the desired whatever is. 

	var segments = []; 
	// build
	for (var i=0; i<numSteps; i++) { 
		var step = cube(1).scale([1,1,i+1]).translate([0,i,0]); 
		segments.push(step); 
	}

	var steps = union(segments); 

	// carve out the bottom
	if (numSteps>1) { 
		var carve = polygon([[1.5,0],[numSteps,numSteps-1.5],[numSteps,0]]); 
		var carve2 = linear_extrude({height:1},carve);
		carve2 = carve2.rotateX(90); 
		carve2 = carve2.rotateZ(90); 
		steps = steps.subtract(carve2); 
	}
		
	var b = steps.getBounds(); 
	return steps.scale([1/b[1].x, 1/b[1].y, 1/b[1].z]); 
}
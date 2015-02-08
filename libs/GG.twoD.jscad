
if (typeof(GG)=='undefined') { 
	GG = {}; 
}
GG.TwoD = function() { 

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

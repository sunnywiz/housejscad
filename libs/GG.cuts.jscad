if (typeof(GG) == 'undefined') { 
	GG={}; 
} 

GG.convertToNobs = function(template, gap) { 
    
    // returns [ [stuff to remove],[stuff to add]]
    
    var a=[];
    var b=[]; 
    
    if (gap > 0.2) gap=0.2; 
    
    for (var i=0; i<template.length; i++) { 
    	var ch = template[i];
        
        var outer = 0; 
        var inner = 0;

		var leftx = gap; 
		var rightx = 1-gap;
		var topy = -1+gap;
		var bottomy = 0; 
		if (template[i-1] != ' ') { leftx = 0; }
		if (template[i+1] != ' ') { rightx = 1; }

		if (ch=='#') { 
            outer = polygon([[0,0],[0,-1],[1,-1],[1,0]]);
            inner = polygon([[leftx,0],[leftx,topy],[rightx,topy],[rightx,0]]);
        } 
		
		if (ch=='.') {  // only uses gap
			outer = polygon([[0.5-2*gap, 0], [0.5, -2 * gap], [0.5+2*gap,0]]); 
			inner = polygon([[0.5-1*gap, 0], [0.5, -1 * gap], [0.5+1*gap,0]]); 
		}

		if (ch==',') {  // uses 0.1 + gap
			outer = polygon([[0.4-2*gap, 0], [0.5, -0.1-2 * gap], [0.6+2*gap,0]]); 
			inner = polygon([[0.4-1*gap, 0], [0.5, -0.1-1 * gap], [0.6+1*gap,0]]); 
		}

		if (ch=='/') 
        {
            if (template[i-1]=='#') { 
                outer = polygon([[0,0],[0,-1],[0.5,-1],[gap,0]]); 
                inner = polygon([[0,0],[0,topy],[0.5-1.5*gap,topy]]);
            } else { 
        		outer = polygon([[0,0],[1,-1],[1,0]]);
    			inner = polygon([[leftx,0],[rightx,topy],[rightx,0]]);
            }
		}
        
        if (ch=='\\') { 
            if (template[i+1]=='#') { 
                outer = polygon([[1,0],[1,-1],[0.5,-1],[1-gap,0]]); 
                inner = polygon([[1,0],[1,topy],[0.5+1.5*gap,topy]]);
            } else { 
        		outer = polygon([[0,0],[0,-1],[1,0]]);
    			inner = polygon([[leftx,0],[leftx,topy],[rightx,0]]);
            }
        }
		
        if (outer && inner) {
            
            outer = linear_extrude({height: 1}, outer);
            outer = outer.translate([i,0,0]);
            outer = outer.setColor([1,0,0]);   
            
            inner = linear_extrude({height: 1}, inner); 
            inner = inner.translate([i,0,0]);
            inner = inner.setColor([0,1,0]);
            
            a.push(outer);
            b.push(inner);
        }
	}
	return [a,b]; 
};

GG.ycut = function(segments, pctCut, absGap, xtemplate, ztemplate) { 

	var u = union(segments); 
	var bounds = u.getBounds(); 
	
	// start cut code
	var xmin = bounds[0].x; 
	var ymin = bounds[0].y; 
	var zmin = bounds[0].z; 
	var xmax = bounds[1].x; 
	var ymax = bounds[1].y; 
	var zmax = bounds[1].z; 

	var zdist = zmax - zmin; 
	var ydist = ymax - ymin; 
	var xdist = xmax - xmin; 
	
	var y1 = ydist * pctCut; 

	var a = polygon([ 
		[0,0],
		[0,y1-absGap],
		[xdist,y1-absGap],
		[xdist,0] ]);
	a = linear_extrude({height:zdist},a).translate([xmin,ymin,zmin]);
	
	var b = polygon([ 
		[0,y1],
		[xdist,y1],
		[xdist,ydist],
		[0,ydist] ]); 
	b = linear_extrude({height:zdist},b).translate([xmin,ymin,zmin]);
	
	var xtemplateUnit = xdist / xtemplate.length;  // each nob is this wide
    var xgap = absGap / xtemplateUnit; 	
	var xnobs = GG.convertToNobs(xtemplate, xgap);  // 0..xtemplate.Length, 1
	for (var i=0; i<xnobs[0].length; i++) { 
		xnobs[0][i] = xnobs[0][i].
			scale([xtemplateUnit,xtemplateUnit,zdist]).
			translate([xmin,y1+ymin,zmin]);
	}			
	for (var i=0; i<xnobs[1].length; i++) { 
		xnobs[1][i] = xnobs[1][i].
			scale([xtemplateUnit,xtemplateUnit,zdist]).
			translate([xmin,y1+ymin,zmin]); 
	}	

	var ztemplateUnit = zdist / ztemplate.length; 
	var zgap = absGap / ztemplateUnit; 
	var znobs = GG.convertToNobs(ztemplate, zgap); 
	
	for (var i=0; i<znobs[0].length; i++) { 
		znobs[0][i] = znobs[0][i].
			rotateY(-90).
            scale([-xdist,ztemplateUnit,ztemplateUnit]).
			translate([xmin,y1+ymin,zmin]);
	}			
	for (var i=0; i<znobs[1].length; i++) { 
		znobs[1][i] = znobs[1][i].
            rotateY(-90).
            scale([-xdist,ztemplateUnit,ztemplateUnit]).
			translate([xmin,y1+ymin,zmin]); 
	}	
	
	a = a.subtract(xnobs[0]); 
	b = b.union(xnobs[1]); 

	a = a.subtract(znobs[0]); 
	b = b.union(znobs[1]);
	
    var aparts = [], bparts=[];
	for (var i=0; i<segments.length; i++) { 
		aparts.push(segments[i].intersect(a)); 
		bparts.push(segments[i].intersect(b)); 
	}
	return aparts.concat(bparts); 
};

GG.xcut = function(segments, pctCut, absGap, ytemplate, ztemplate) { 
	var u = union(segments); 
	var bounds = u.getBounds(); 
	var rotsegments = []; 
	for (var i=0; i< segments.length; i++) { 
		rotsegments.push(segments[i].translate([-bounds[0].x, -bounds[0].y, -bounds[0].z]).rotateZ(90)); 
	}
	rotsegments = GG.ycut(rotsegments, pctCut, absGap, ytemplate,ztemplate); 
	var newsegments = []; 
	for (var i=0; i< rotsegments.length; i++) { 
		newsegments.push(rotsegments[i].rotateZ(-90).translate([bounds[0].x, bounds[0].y,bounds[0].z])); 
	}
	return newsegments; 
};

GG.zcut = function(segments, pctCut, absGap, xtemplate, ytemplate) { 
	var u = union(segments); 
	var bounds = u.getBounds(); 
	var rotsegments = []; 
	for (var i=0; i< segments.length; i++) { 
		rotsegments.push(segments[i].translate([-bounds[0].x, -bounds[0].y, -bounds[0].z]).rotateX(90)); 
	}
	rotsegments = GG.ycut(rotsegments, pctCut, absGap, xtemplate,ytemplate); 
	var newsegments = []; 
	for (var i=0; i< rotsegments.length; i++) { 
		newsegments.push(rotsegments[i].rotateX(-90).translate([bounds[0].x, bounds[0].y,bounds[0].z])); 
	}
	return newsegments; 
};

GG.plate = function(segments,xlim,spacing) { 
    
	var x = 0; 
	var y = 0; 
	var ybiggest = 0; 
	
    for(var i=0; i<segments.length; i++) { 
		
        var item = segments[i];
		var bounds = item.getBounds(); 
		var xsize = bounds[1].x - bounds[0].x; 
		var ysize = bounds[1].y - bounds[0].y; 

		// transform the item to 0,0,0
		item = item.translate([-bounds[0].x,-bounds[0].y,-bounds[0].z]); 

		// will it fit on the current (x) line? 
		if (x + xsize > xlim) { 
			// no, perform carriage return
			y = y + ybiggest + spacing; 
			x = 0; 
			ybiggest = 0; 
		} else {
			// it fits here! 
		}
		// transform it to x,y and then move pointers
		item = item.translate([x,y,0]); 
		x = x + xsize + spacing; 
		if (ysize > ybiggest) ybiggest = ysize; 

		segments[i] = item; 
	}
	return segments; 
}

GG.randomColor = function(segments) { 
	for(var i=0; i<segments.length; i++) { 
		segments[i] = segments[i].setColor(hsl2rgb(Math.random(),Math.random()*0.5+0.5,0.5)); 
	} 
	return segments; 
}
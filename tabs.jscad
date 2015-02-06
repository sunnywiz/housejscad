
var convertToNobs = function(template, gap) { 
    
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
		
		if (ch=='.') { 
			outer = polygon([[0.5-2*gap, 0], [0.5, -2 * gap], [0.5+2*gap,0]]); 
			inner = polygon([[0.5-1*gap, 0], [0.5, -1 * gap], [0.5+1*gap,0]]); 
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
}

var testycut = function(segments, pctCut, absGap, xtemplate, ztemplate) { 

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
	var xnobs = convertToNobs(xtemplate, xgap);  // 0..xtemplate.Length, 1
	
	for (var i=0; i<xnobs[0].length; i++) { 
		xnobs[0][i] = xnobs[0][i].
			scale([xdist/xtemplate.length,xdist/xtemplate.length,zdist]).
			translate([xmin,y1,zmin]);
	}			
	for (var i=0; i<xnobs[1].length; i++) { 
		xnobs[1][i] = xnobs[1][i].
			scale([xdist/xtemplate.length,xdist/xtemplate.length,zdist]).
			translate([xmin,y1,zmin]); 
	}	
	a = a.subtract(xnobs[0]); 
	b = b.union(xnobs[1]); 
	
	return [a,b];
	
}

function main() { 
	var segments = [ cube(50) ];
	
	var segments = testycut(segments, 0.5, 0.2, "#  # ##  /#\\ . /\\  \\#/ #", "      .      ");    
	
	// Color everything	
	for(var i=0; i<segments.length; i++) { 
		segments[i] = segments[i].setColor(hsl2rgb(Math.random(),Math.random()*0.5+0.5,0.5)); 
	}

    return segments; 
}
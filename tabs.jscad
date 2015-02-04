
var convertToNobs = function(template, gap) { 
	
    var a=[];
	var b=[]; 
	
    for (var i=0; i<template.length; i++) { 
		var ch = template[i];
        
        var outer = 0; 
        var inner = 0;

		var leftx = gap; 
		var rightx = 1-gap;
		var topy = -1+gap;
		var bottomy = 0; 
		if (i>0 && template[i-1] != ' ') { leftx = 0; }
		if (i<template.length-1 &&template[i+1] != ' ') { rightx = 1; }

		if (ch=='#') { 
            outer = polygon([[0,0],[0,-1],[1,-1],[1,0]]);
            inner = polygon([[leftx,0],[leftx,topy],[rightx,topy],[rightx,0]]);
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
            
            outer = linear_extrude({height: 0.1}, outer);
            outer = outer.translate([i,0,0]);
            outer = outer.setColor([1,0,0]);   
            
            inner = linear_extrude({height: 0.1}, inner); 
            inner = inner.translate([i,0,0.1]);
            inner = inner.setColor([0,1,0]);
            
            a.push(outer);
            b.push(inner);
        }
	}
	return [a,b]; 
}

function main() { 
    var template = "#  # ##  /#\\  /\\  \\#/ #";    
    var gap = 0.1; 
	var bar = convertToNobs(template, gap); 
	return bar[0].concat(bar[1]);
}
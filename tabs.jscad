
function main() { 
    var template = "#  # ##  /#\\  /\  \#/ ";
    
    var a=[];
    var gap = 0.1; 
	for (var i=0; i<template.length; i++) { 
		var ch = template[i];
        
        var outer = 0; 
        var inner = 0;

		var leftx = gap; 
		var rightx = 1-gap;
		var topy = -1+gap;
		var bottomy = 0; 
		if (template[i-1] != ' ') { startx = 0; }
		if (template[i+1] != ' ') { endx = 1; }

		if (ch=='#') { 
            outer = polygon([[0,0],[0,-1],[1,-1],[1,0]]);
            inner = polygon([[startx,0],[startx,topy],[endx,topy],[endx,0]]);
        } 
		if (ch=='/') { 
			outer = polygon([[0,0],[1,-1],[1,0]]);
			inner = polygon([[startx,0],[endx,
		}
        if (outer && inner) {
            
            outer = linear_extrude({height: 0.1}, outer);
            outer = outer.translate([i,0,0]);
            outer = outer.setColor([1,0,0]);   
            
            inner = linear_extrude({height: 0.1}, inner); 
            inner = inner.translate([i,0,0.1]);
            inner = inner.setColor([0,1,0]);
            
            a.push(outer);
            a.push(inner);
        }
	}
	return a; 
}
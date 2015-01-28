// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

function main() {
    
    var w = cube({size:[1,1,1]});
    var segments=[]; 
    var template="######\n"+
                 "#....#\n"+
                 "######";
    var x=0; 
    var y=0; 
    for(var i=0, len=template.length; i<len; i++) {
        x++; 
        var ch = template[i];
        var s; 
        if (ch == '\n' || ch=='\r') { 
            x = 0; 
            y++; 
        }
        if (ch == '#') { 
            s = w.scale([1,1,10]).translate([x,y,0]);
        } else if (ch == '.') { 
            s = w.translate([x,y,0]);
        }
        segments.push(s);
    }
    return union(segments);     

}

// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

function main() {
   var w = cube({size:[1,1,5]});
   var segments=[]; 
   for(var x=0; x<100; x++) { 
       segments.push(w.translate([x,0,0]));
   }
   for(var y=1; y<100; y++) { 
       segments.push(w.translate([0,y,0]));
   }
   return union(segments);
}

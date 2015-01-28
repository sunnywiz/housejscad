// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

function main() {
    var w = cube({size:[1,1,5]});
   var segments = [
       w.translate([0,0,0]), 
       w.translate([0,1,0]),
       w.translate([0,2,0]), 
       w.translate([0,3,0]),
       w.translate([1,0,0]), 
       w.translate([2,0,0]),
       w.translate([3,0,0]) 
   ];
   return union(segments);
}
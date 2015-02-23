// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

function main() {
    
    var segments = []; 
   
    var L3, sink; 
    {
		var L1 =  cube(1).scale([10,2,3]);
		var L2= cube(1).scale([2,5,3]);
		sink = cube(1).scale([2,1.7,0.85]);
		var sinkEmpty = cube(1).scale([1.8,1.5,0.85]).translate([0.1,0.1,0.1]);
		sink = sink.subtract(sinkEmpty).setColor([1,1,1]); 
		sink = sink.translate([6,0.1,3-0.85]);
		sinkEmpty = sinkEmpty.translate([6,0.1,3-0.85]);
		L3 = union(L1,L2).subtract(sink).subtract(sinkEmpty);
    }

   
    var U1; 
    {
	   var u1 = cube(1).scale([4,1,4]); 
	   var u2 = cube(1).scale([1,5,4]);
	   var tri = polygon([[0,0],[2,0],[2,1],[1,2],[0,2]]);
	   tri = linear_extrude({height:4},tri);
	   var shelf = polygon([[0,0],[1,0],[0,1]]);
	   shelf = linear_extrude({height:0.2},shelf);

	   var shelf1 = shelf.translate([4,0,0]);
	   var shelf2 = shelf.translate([4,0,1.33-0.06]);
	   var shelf3 = shelf.translate([4,0,2.66-0.13]);
	   var shelf4 = shelf.translate([4,0,4-0.2]);
	   U1 = union(u1,u2,tri,shelf1,shelf2,shelf3,shelf4).translate([0,0,4]);
    }
   
    var C1 = cube(1).scale([1,2,3]).translate([0,15,0]); 
    var C2 = cube(1).scale([1,2,3]).translate([4,15,0]); 
   
	var U2; 
	{
		var u1 = cube(1).scale([1,1,4]);
		var u2 = cube(1).scale([1,1,4]).translate([4,0,0]); 
		var u3 = cube(1).scale([3,1,2]).translate([1,0,2]);
		U2 = union(u1,u2,u3).translate([0,16,4]); 
	}

    var A1 = cube(1).scale([2,4,3]).translate([9,5,0]);
   
    segments = [L3,sink,U1,U2,C1,C2,A1];
    return segments;
}
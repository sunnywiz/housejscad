include('GG.txtTo3d.jscad');
include('GG.cuts.jscad'); 

function main() {

	

	var segments = []; 
	
	segments.push(GG.steps(5) .scale([17,28,21]) .lieFlat() ); 
	segments.push(GG.steps(8) .scale([22,35,31]) .lieFlat() );

	var upstairsSteps = GG.steps(7).scale([25,40,26]);
	var familyCutout = cube(30).translate([18,18,0]); 
	var downstairsCutout = cube(1).scale([3,30,23]).translate([0,22,0]); 
	var wallSegment = cube(1).scale([3,23,30]); 
	upstairsSteps = upstairsSteps.subtract([familyCutout,downstairsCutout, wallSegment]); 
	
	upstairsSteps = upstairsSteps.lieFlat(); 
	
	segments.push(upstairsSteps); 
		
	GG.plannedColor(segments); 
	GG.plate(segments, 130, 5); 
	return segments; 
}

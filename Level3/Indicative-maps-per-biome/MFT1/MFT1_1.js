/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps"),
    MaxDeltas = ee.FeatureCollection("users/jrferrerparis/thirdparty/GlobalDeltaMax100");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'MFT1.1 Coastal river deltas';
var EFG_IM = indMaps.filter(ee.Filter.equals("title", EFGname))

// create legend and title elements
var legend=slegend.minorMajorLegend(EFGname);
var title=slegend.titleLabel();

// add everything to the map
Map.addLayer(EFG_IM, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGname + ' -- Indicative Map', true, 0.7);
Map.add(title);
Map.add(legend);

//

// Global river deltas dataset:
var convex_hull = ee.FeatureCollection("projects/sat-io/open-datasets/delta/delta-convex-hull");
var convex_hull_bound = ee.FeatureCollection("projects/sat-io/open-datasets/delta/delta-convex-bounds");
Map.addLayer(ee.FeatureCollection(convex_hull),{},'Delta Convex Hull', false, 0.5);
Map.addLayer(ee.FeatureCollection(convex_hull_bound),{},'Delta Convex Hull Bounds', true, 0.5);

// 100 Max Deltas
Map.addLayer(MaxDeltas,{},'Max 100 Deltas', true, 0.5)
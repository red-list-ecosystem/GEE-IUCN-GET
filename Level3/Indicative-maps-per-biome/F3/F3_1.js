var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
var altMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_WM_nwt");
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'F3.1 Large reservoirs';
var EFG_IM = indMaps.filter(ee.Filter.equals("title", EFGname));

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

// Alternative version (in preparation):
var EFG_alt = altMaps.filter(ee.Filter.equals("title", EFGname));
Map.addLayer(EFG_alt, {palette: ['red', 'yellow'], min: 1, max: 2
}, EFGname + ' -- alt map', false, 0.7);

// Add alternative datasets in earth engine collection below.

// GOODD database of dams
var GOODD = ee.FeatureCollection("users/jrferrerparis/thirdparty/GOOD2_dams");
Map.addLayer(GOODD,{},'GOOD2',false,1.0);

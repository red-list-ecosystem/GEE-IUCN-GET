/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'F3.5 Canals, ditches and drains';
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
// Global irrigation areas
var irrigation_maps = ee.ImageCollection("users/deepakna/global_irrigation_maps");
// +-> for individual years
var highly_irrigated_areas_2001 = ee.Image("users/deepakna/global_irrigation_maps/2001")
  .expression("b(0) == 2 ? 1 : 0");
Map.addLayer(highly_irrigated_areas_2001.updateMask(highly_irrigated_areas_2001.neq(0),true,0.5)
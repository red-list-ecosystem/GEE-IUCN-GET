/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/T1_3");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T1.3 Tropical/Subtropical montane rainforests';

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
// Global 1-km Cloud Cover : dataset not longer available?
var cloud_forest_pred = ee.Image("projects/sat-io/open-datasets/gcc/MODCF_CloudForestPrediction");

Map.addLayer(cloud_forest_pred, {
  bands: ['b1'],
  palette: ['white', 'purple'],
  min: 0.0001, max: 0.00077
}, 'Cloud Forest prediction', true, 0.7);

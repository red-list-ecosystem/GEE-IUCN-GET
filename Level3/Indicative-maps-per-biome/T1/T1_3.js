/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps"),
    image = ee.Image("users/jrferrerparis/IUCN-GET/L3_WM_nwt/T1_3");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T1.3 Tropical/Subtropical montane rainforests';
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

// https://samapriya.github.io/awesome-gee-community-datasets/projects/gcc/
// Global 1-km Cloud Cover :
var cf_pred = ee.Image("projects/sat-io/open-datasets/gcc/MODCF_CloudForestPrediction");
var msked_pred = cf_pred.updateMask(cf_pred.gte(0.0001));

Map.addLayer(msked_pred, {
  bands: ['b1'],
  palette: ['white', 'purple'],
  min: 0.0001, max: 0.00077
}, 'Cloud Forest prediction', true, 0.7);

// new version 
Map.addLayer(image, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGname + ' -- Indicative Map (new version)', true, 0.7);

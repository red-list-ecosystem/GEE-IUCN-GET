/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T7.1 Annual croplands';
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

// Alternative data sources

//Copernicus global landcover

var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('crops-coverfraction'); // crops cover fraction
var copernicus_crops=dataset.updateMask(dataset.gt(0)
var visParams = {
  min: 0.0,
  max: 100.0,
  palette: ['000000', '448564', '70daa4', 'ffffff'],
};
Map.addLayer(dataset, visParams, "COPERNICUS Crops cover fraction",false,0.5);

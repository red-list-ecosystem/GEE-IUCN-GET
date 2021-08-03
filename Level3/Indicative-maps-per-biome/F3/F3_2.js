/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps"),
    altMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_WM_nwt");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'F3.2 Constructed lacustrine wetlands';
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

//GLCF GLS water
var dataset = ee.ImageCollection('GLCF/GLS_WATER');
var water = dataset.select('water');
var waterVis = {
  min: 1.0,
  max: 4.0,
  palette: ['FAFAFA', '00C5FF', 'DF73FF', '828282', 'CCCCCC'],
};
Map.setCenter(-79.3094, 44.5693, 8);
Map.addLayer(water, waterVis, 'Water');

//Earthstats 5min resolution:
//From http://www.earthstat.org/cropland-pasture-area-2000/
var earthstats1 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Cropland2000_5m');
var earthstats2 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Pasture2000_5m');
var es_crops=earthstats1; //.updateMask(earthstats1.gt(0.05));
var es_past=earthstats2; //.updateMask(earthstats2.gt(0.05));

// visualizarion parameters
var cropVis = {min: 0.0, max: 1.0, palette: ['white', 'cyan', 'blue', 'purple'],};
var pastVis = {min: 0.0, max: 1.0, palette: ['white', 'pink','magenta'],};

// Add all layers to the map
Map.addLayer(es_crops, cropVis, 'Earthstats crops',false,0.5);
Map.addLayer(es_past, pastVis, 'Earthstats pastures',false,0.5);

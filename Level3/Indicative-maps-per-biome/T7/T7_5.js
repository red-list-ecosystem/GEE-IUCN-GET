/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T7.5 Derived semi-natural pastures and old fields';
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


// EUNIS map from https://www.eea.europa.eu/data-and-maps/data/ecosystem-types-of-europe-1
//
var EUNIS = ee.Image("users/jrferrerparis/thirdparty/EUNIS");
// Alternative data sources

//Copernicus global landcover
var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('crops-coverfraction'); // crops cover fraction
var copernicus_crops=dataset.updateMask(dataset.gt(5.0));

//Earthstats 5min resolution:
//From http://www.earthstat.org/cropland-pasture-area-2000/
var earthstats1 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Cropland2000_5m');
var earthstats2 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Pasture2000_5m');
var es_crops=earthstats1; //.updateMask(earthstats1.gt(0.05));
var es_past=earthstats2; //.updateMask(earthstats2.gt(0.05));

//Gridded Lifestock of the World v3
var GLW3_1 = ee.Image('users/jrferrerparis/thirdparty/GLW3_Cattle_2010_Da');
var GLW3_2 = ee.Image('users/jrferrerparis/thirdparty/GLW3_Sh_2010_Da');
var GLW3_cattle=GLW3_1;//.updateMask(GLW3_1.gt(5));
var GLW3_sheep=GLW3_2; //.updateMask(GLW3_2.gt(5));

// Global forest canopy height 2005
var dataset = ee.Image('NASA/JPL/global_forest_canopy_height_2005');
var forestCanopyHeight = dataset.select('1');

//HANPP from Haberl et al.
var HANPP = ee.Image('users/jrferrerparis/thirdparty/HANPP');



var dict = {
  "values": [23,24,25,26,27,28,29],
  "names": [
    "E1 Dry grasslands", // 23
    "E2 Mesic grasslands", // 24
    "E3 Seasonally wet and wet grasslands", // 25
    "E4 Alpine and subalpine grasslands", // 26
    "",
    "E6 Inland salt steppes", // 28
    "E7 Sparsely wooded grasslands" // 29
  ],
  "colors": [
    "#1B9E77", //green-bluish
    "#D95F02", //brown
    "#7570B3", //purple
    "#E7298A", //magenta
    "#999999", 
    "#66A61E", //grassgreen
    "#E6AB02"//mustard
  ]};

var EUNIS_grasses = EUNIS.updateMask(EUNIS.gt(22).and(EUNIS.lt(30)));
Map.addLayer(EUNIS_grasses, {min:23, max:29, palette:dict.colors}, 'EUNIS grasslands',true,0.85);

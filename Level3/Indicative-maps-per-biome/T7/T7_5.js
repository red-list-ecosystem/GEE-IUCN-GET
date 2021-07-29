/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
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

var dict = {
  "values": [23,24,25,26,27,28,29]
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
    "#7FC97F", "#BEAED4", "#FDC086", "#FFFF99", "#999999", "#386CB0", "#F0027F"
  ]};

var EUNIS_grasses = EUNIS.updateMask(EUNIS.gt(29).and(EUNIS.lt(23)));
Map.addLayer(EUNIS_grasses, {min:23, max:29, palette:dict['colors']}, 'EUNIS grasslands',false,0.5)

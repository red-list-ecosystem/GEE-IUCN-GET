/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps"),
    altMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_WM_nwt");
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

// Alternative data sources

// T7.4 indicative map:
var EFG_alt = altMaps.filter(ee.Filter.equals("title", 'T7.4 Urban and industrial ecosystems'));
Map.addLayer(EFG_alt, {palette: ['red', 'yellow'], min: 1, max: 2
}, 'T7.4 urban', false, 0.7);

// Global irrigation areas
// Deepak Nagaraj, Eleanor Proust, Alberto Todeschini, Maria Cristina Rulli, Paolo D'Odorico,
//A new dataset of global irrigation areas from 2001 to 2015, Advances in Water Resources,
//Volume 152,2021,103910,ISSN 0309-1708,https://doi.org/10.1016/j.advwatres.2021.103910.

var irrigation_maps = ee.ImageCollection("users/deepakna/global_irrigation_maps");
var irrigation_2010 = ee.Image(irrigation_maps.filter(ee.Filter.date('2001-01-01','2001-12-31')).first());
var irrigation_map = irrigation_2010.updateMask(irrigation_2010.gt(0));

// +-> for individual years
Map.addLayer(irrigation_map, {
  palette: ["#F6EFF7",  "#016C59"],
  min: 1, max: 2
}, 'Density of irrigation', false, 0.5);

// Aquastat version 5.0
var aquastat5 = ee.Image('users/jrferrerparis/thirdparty/Aquastat5');
var aquastat5_masked = aquastat5.updateMask(aquastat5.gt(10));

Map.addLayer(aquastat5_masked, {
  palette: [ "#FFFFD4", "#FED98E", "#FE9929", "#D95F0E", "#993404"],
  min: 0, max: 100
}, 'Aquastat 5.0', true, 0.5);


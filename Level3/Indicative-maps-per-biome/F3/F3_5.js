/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
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
// Deepak Nagaraj, Eleanor Proust, Alberto Todeschini, Maria Cristina Rulli, Paolo D'Odorico,
//A new dataset of global irrigation areas from 2001 to 2015, Advances in Water Resources,
//Volume 152,2021,103910,ISSN 0309-1708,https://doi.org/10.1016/j.advwatres.2021.103910.

var irrigation_maps = ee.ImageCollection("users/deepakna/global_irrigation_maps");
var irrigation_2010 = ee.Image(irrigation_maps.filter(ee.Filter.date('2001-01-01','2001-12-31')).first());
var irrigation_map = irrigation_2010.updateMask(irrigation_2010.gt(0));

// +-> for individual years
Map.addLayer(irrigation_map, {
  palette: ['#24b297', '#1482c7'],
  min: 1, max: 2
}, 'Density of irrigation', true, 0.5);
print(irrigation_maps);
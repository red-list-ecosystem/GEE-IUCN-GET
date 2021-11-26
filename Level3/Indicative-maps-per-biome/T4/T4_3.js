/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps"),
    newMap = ee.Image("users/jrferrerparis/IUCN-GET/L3_WM_nwt/T4_3");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T4.3 Hummock savannas';
var EFG_IM = indMaps.filter(ee.Filter.equals("title", EFGname))

// create legend and title elements
var legend=slegend.minorMajorLegend(EFGname);
var title=slegend.titleLabel();

// add everything to the map
Map.addLayer(EFG_IM, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGname + ' -- Indicative Map (old version)', false, 0.7);

Map.addLayer(newMap, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGname + ' -- Indicative Map (updated)', true, 0.7);

Map.add(title);
Map.add(legend);

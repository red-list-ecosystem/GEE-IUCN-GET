/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/TF1_6");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'TF1.6 Boreal, temperate and montane peat bogs';

// create legend and title elements
var legend=slegend.minorMajorLegend(EFGname);
var title=slegend.titleLabel();

// add everything to the map
Map.addLayer(image, {
  bands: ['b1'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, 'Indicative Map', true, 0.7);
Map.add(title);
Map.add(legend);

/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/TF1_6");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// name of functional group

var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");
var EFGname = 'TF1.6 Boreal, temperate and montane peat bogs';

Map.addLayer(image, {
  bands: ['b1'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, 'Indicative Map', true, 0.7);


var legend=slegend.minorMajorLegend(EFGname);
var title=slegend.titleLabel();

Map.add(title);
Map.add(legend);

/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/MT2_1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'MT2.1 Coastal shrublands and grasslands';

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

//Global Shoreline Dataset

var mainlands = ee.FeatureCollection('projects/sat-io/open-datasets/shoreline/mainlands');
var big_islands = ee.FeatureCollection('projects/sat-io/open-datasets/shoreline/big_islands');
var small_islands = ee.FeatureCollection('projects/sat-io/open-datasets/shoreline/small_islands');

Map.addLayer(ee.Image().paint(mainlands,0,3), {"palette":["008000"]}, 'Shoreline Mainlands', false, 0.7);
Map.addLayer(ee.Image().paint(big_islands,0,3), {"palette":["0000FF"]}, 'Shoreline Big Islands', false, 0.7);
Map.addLayer(ee.Image().paint(small_islands,0,3), {"palette":["FF0000"]}, 'Shoreline Small Islands', false, 0.7);

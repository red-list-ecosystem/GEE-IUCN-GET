/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/MT1_2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'MT1.2 Muddy Shorelines';

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

// Set up initial location for comparison of datasets
Map.setCenter(-64, 10.5, 7);

// Alternative datasets in earth engine collection:

//Murray Global Intertidal Change Dataset
var intertidal = ee.ImageCollection('UQ/murray/Intertidal/v1_1/global_intertidal');

var intertidal_visualization = {
  bands: ['classification'],
  min: 0.0,
  max: 1.0,
  palette: ['0000FF']
};

Map.addLayer(intertidal, intertidal_visualization, 'Murray -- Intertidal areas',false, 0.5);

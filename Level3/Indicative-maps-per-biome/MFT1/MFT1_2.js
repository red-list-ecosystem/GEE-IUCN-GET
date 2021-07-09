/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/MFT1_2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'MFT1.2 Intertidal forests and shrublands';

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
var ls_mangroves = ee.ImageCollection('LANDSAT/MANGROVE_FORESTS');
var ls_mangroves_vis = {
  min: 0,
  max: 1.0,
  palette: ['0115d4'],
};
Map.addLayer(ls_mangroves, ls_mangroves_vis, 'Landsat Mangroves dataset (2000)', true, 0.5);

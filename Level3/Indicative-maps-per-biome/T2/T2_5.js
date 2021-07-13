/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T2.5 Temperate pyric humid forests';
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
// Global forest canopy height 2005

var dataset = ee.Image('NASA/JPL/global_forest_canopy_height_2005');
var forestCanopyHeight = dataset.select('1');

var forestCanopyHeightVis = {
  min: 0.0,
  max: 30.0,
  palette: [
    'ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201',
    '004c00', '011301'
  ],
};
Map.setCenter(150, -32, 5);
Map.addLayer(forestCanopyHeight, forestCanopyHeightVis, 'Forest Canopy Height',true,0.5);

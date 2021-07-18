/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps"),
    altMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_WM_nwt");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'MFT1.2 Intertidal forests and shrublands';
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


// Alternative version (in preparation):
var EFG_alt = altMaps.filter(ee.Filter.equals("title", EFGname));
Map.addLayer(EFG_alt, {palette: ['red', 'yellow'], min: 1, max: 2
}, EFGname + ' -- alt map', false, 0.7);

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


// Global Mangrove Watch
//var gmw2007 = ee.FeatureCollection("projects/sat-io/open-datasets/GMW/GMW_2007_v2");
//var gmw2008 = ee.FeatureCollection("projects/sat-io/open-datasets/GMW/GMW_2008_v2");
//var gmw2009 = ee.FeatureCollection("projects/sat-io/open-datasets/GMW/GMW_2009_v2");
//var gmw2010 = ee.FeatureCollection("projects/sat-io/open-datasets/GMW/GMW_2010_v2");
//var gmw2015 = ee.FeatureCollection("projects/sat-io/open-datasets/GMW/GMW_2015_v2");
var gmw2016 = ee.FeatureCollection("projects/sat-io/open-datasets/GMW/GMW_2016_v2");
//var gmw1996 = ee.FeatureCollection("projects/sat-io/open-datasets/GMW/GMW_1996_v2");
Map.addLayer(ee.Image().paint(gmw2016,0,3), {"palette":["228B22"]}, 'Global Mangrove Watch 2015', true, 0.5)

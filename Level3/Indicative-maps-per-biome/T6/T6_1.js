/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T6.1 Ice sheets, glaciers and perennial snowfields';
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

// GLIMS database
var glims = ee.FeatureCollection("GLIMS/current");
Map.addLayer(glims, {color:'aqua'}, 'GLIMS glaciers', false);


// GLIMS database
var snow1k = ee.Image('users/murrnick/red-list-eco/globalTypology/snowOccurrence_1k_v1')
var snow30m = ee.Image('users/murrnick/red-list-eco/globalTypology/snowOccurrence_30m_v1')

var plasma = ["0d0887", "3d049b", "6903a5", "8d0fa1", "ae2891", "cb4679", "df6363", "f0844c", "faa638", "fbcc27", "f0f921"];

Map.addLayer(snow1k.updateMask(snow1k.gt(70)), {palette: plasma, min:70, max:100},'Murray -- snow 1k', false)
Map.addLayer(snow30m.updateMask(snow30m.gt(50)), {palette: plasma, min:50, max:100},'Murray -- snow 30m',false)

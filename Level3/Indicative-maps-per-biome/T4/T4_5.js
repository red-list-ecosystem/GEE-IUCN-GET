/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/T4_5");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T4.5 Temperate subhumid grasslands';

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


// Alternative datasets in earth engine collection:
// TEOW / RESOLVE 2017
var ecoRegions = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017");

// x-walk of ecoregion ids
var xw_minor =  [646, 653, 662, 334, 793, 336, 827, 713, 731, 797, 758, 359, 674, 192, 803, 342, 177, 719, 574, 688];
var xw_major = [721,67,741,193,812,813,385,190,725,652,389,387,388,390,693,726,41,661,727,728,575,392,730,826,81,576,828,732,733,734,395,397,85,761,578,735,628,737,176,804,746,178,401,343,770];

var teow_major = ecoRegions.filter(ee.Filter.inList('ECO_ID', xw_major));
var teow_minor = ecoRegions.filter(ee.Filter.inList('ECO_ID', xw_minor));

Map.addLayer(teow_major, {color: 'red', width: 0}, 'major occurrences by RESOLVE ECOREGIONS 2017', true, 0.5);
Map.addLayer(teow_minor, {color: 'yellow', width: 0}, 'minor occurrences by RESOLVE ECOREGIONS 2017', true, 0.5);

/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/T4_2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T4.2 Pyric tussock savannas';

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

// Add alternative datasets in earth engine collection below.

// TEOW / RESOLVE 2017
var ecoRegions = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017");

// x-walk of ecoregion ids
var xwalk = ee.FeatureCollection("users/jrferrerparis/IUCN-GET/L3_IM/xwalk_teow")
var slc = xwalk.filter(ee.Filter.eq('efg_code','T4.2'));
// Map the function over the features.
var xw_major = slc.filter(ee.Filter.equals('occurrence',1)).aggregate_array('eco_id');
var xw_minor = slc.filter(ee.Filter.equals('occurrence',2)).aggregate_array('eco_id');

// Check contributors to the xwalk and map versions
var xw_ver = slc.distinct(['contributors','map_code','map_version']).select(['contributors','map_code','map_version']);
print('Cross-walk contributors and versions:')
print(xw_ver);
// need to get a efficient way to select the latest version:
// print(xw_ver.aggregate_array('map_code'));

// filter ecoregions by the list of eco_ids
var teow_major = ecoRegions.filter(ee.Filter.inList('ECO_ID', xw_major));
var teow_minor = ecoRegions.filter(ee.Filter.inList('ECO_ID', xw_minor));

Map.addLayer(teow_major, {color: 'red', width: 0}, 'Ecoregions with major occurrences', false, 0.5);
Map.addLayer(teow_minor, {color: 'yellow', width: 0}, 'Ecoregions with minor occurrences', false, 0.5);

/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'F1.6 Episodic arid rivers';
var EFG_IM = indMaps.filter(ee.Filter.equals("title", EFGname)).first();

// create legend and title elements
var legend=slegend.minorMajorLegend(EFGname);
var title=slegend.titleLabel();

// add everything to the map
Map.addLayer(EFG_IM, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGname + ' -- Indicative Map', false, 0.7);
Map.add(title);
Map.add(legend);


// Global surface water

var gsw = ee.Image('JRC/GSW1_3/GlobalSurfaceWater');
var transition = gsw.select('transition');
//var ephemeral = transition.updateMask(transition.gt(8));
var seasonal = transition.updateMask(transition.eq(4).or(transition.eq(5)).or(transition.eq(8)));

//Map.addLayer({eeObject: seasonal,name: 'Seasonal water occurrence (1984-2015)',});


// MERIT hydro riverwidth
var dataset = ee.Image("MERIT/Hydro/v1_0_1");
var rivwidth = dataset.select('viswth');
var rivers = rivwidth.updateMask(rivwidth.gt(0));
var rivviz = {min:0,max:100,palette:['blue','black']};
Map.addLayer(rivers, rivviz, "River width",false);

// Calculations:
// (selected FEOW) * rivers * ephemeral) -> major
// (selected FEOW) * rivers -> minor
print(EFG_IM);

var A0 = EFG_IM.select('occurrence_type');
var A1 = (A0.gt(0));
//var test = (es_past.gt(es_crops)).multiply(HANPP.gt(0)).multiply(GLW3_cattle.gt(500));
var major = (A1).multiply(rivers.gt(0)).multiply(seasonal.gt(1));
var minor = (A1).multiply(rivers.gt(0)).multiply(2);
var combined = minor.subtract(major);
var result=combined.updateMask(combined.gt(0));

//Map.addLayer(A1, {palette: ['red'] }, 'a1',true,0.7);
Map.addLayer(minor, {min: 1.0, max: 2.0, palette: ['red', 'yellow'] }, 'minor',true,.7);
Map.addLayer(major, {min: 1.0, max: 2.0, palette: ['red', 'yellow'] }, 'minor',true,.7);

Map.addLayer(result, {min: 1.0, max: 2.0, palette: ['red', 'yellow'] }, EFGname + ' new IM',false,1.0);



// Need to adapt this for freshwater ecoregions:

// TEOW / RESOLVE 2017
//var ecoRegions = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017");

// x-walk of ecoregion ids
//var xwalk = ee.FeatureCollection("users/jrferrerparis/IUCN-GET/xwalk_feow")
//var slc = xwalk.filter(ee.Filter.eq('efg_code','F1.6'));
// Map the function over the features.
//var xw_major = slc.filter(ee.Filter.equals('occurrence',1)).aggregate_array('eco_id');
//var xw_minor = slc.filter(ee.Filter.equals('occurrence',2)).aggregate_array('eco_id');

// Check contributors to the xwalk and map versions
//var xw_ver = slc.distinct(['contributors','map_code','map_version']).select(['contributors','map_code','map_version']);
//print('Cross-walk contributors and versions:')
//print(xw_ver);
// need to get a efficient way to select the latest version:
// print(xw_ver.aggregate_array('map_code'));

// filter ecoregions by the list of eco_ids
//var teow_major = ecoRegions.filter(ee.Filter.inList('ECO_ID', xw_major));
//var teow_minor = ecoRegions.filter(ee.Filter.inList('ECO_ID', xw_minor));

//Map.addLayer(teow_major, {color: 'red', width: 0}, 'Ecoregions with major occurrences', false, 0.5);
//Map.addLayer(teow_minor, {color: 'yellow', width: 0}, 'Ecoregions with minor occurrences', false, 0.5);



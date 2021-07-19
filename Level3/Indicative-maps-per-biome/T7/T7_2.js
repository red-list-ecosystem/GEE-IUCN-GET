/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T7.2 Sown pastures and fields';
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

// Alternative data sources

//Copernicus global landcover

var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('crops-coverfraction'); // crops cover fraction
var copernicus_crops=dataset.updateMask(dataset.gt(5.0));
var visParams = {
  min: 0.0,
  max: 100.0,
  palette: ['yellow', 'orange', 'red'],
};
Map.addLayer(copernicus_crops, visParams, "COPERNICUS Crops cover fraction",false,0.5);

//Earthstats 5min resolution:
//From http://www.earthstat.org/cropland-pasture-area-2000/

var earthstats1 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Cropland2000_5m');
var earthstats2 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Pasture2000_5m');
var cropVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'white', 'cyan', 'blue', 'purple'
  ],
};
var pastVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'white', 'pink','magenta'
  ],
};
var es_crops=earthstats1.updateMask(earthstats1.gt(0.05));
var es_past=earthstats2.updateMask(earthstats2.gt(0.05));
Map.addLayer(es_crops, cropVis, 'Earthstats crops',false,0.5);
Map.addLayer(es_past, pastVis, 'Earthstats pastures',false,0.5);

//Gridded Lifestock of the World v3
var GLWvis = {
  min: 0.0,
  max: 5000.0,
  palette: [
    'white', 'orange','brown'
  ],
};
var GLW3_1 = ee.Image('users/jrferrerparis/thirdparty/GLW3_Cattle_2010_Da');
var GLW3_2 = ee.Image('users/jrferrerparis/thirdparty/GLW3_Sh_2010_Da');
var GLW3_cattle=GLW3_1.updateMask(GLW3_1.gt(5));
var GLW3_sheep=GLW3_2.updateMask(GLW3_2.gt(5));

Map.addLayer(GLW3_cattle, GLWvis, 'GLW v3 cattle',false,0.5);
Map.addLayer(GLW3_sheep, GLWvis, 'GLW v3 sheep',false,0.5);

//HANPP from Haberl et al.
var NPPvis = {
  min: -300.0,
  max: 1000.0,
  palette: [
    'green', '#eeeeee', 'yellow','orange','red','brown'
  ],
};
var HANPP = ee.Image('users/jrferrerparis/thirdparty/HANPP');
Map.addLayer(HANPP, NPPvis, 'HANPP',true,0.5);


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
Map.addLayer(forestCanopyHeight, forestCanopyHeightVis, 'Forest Canopy Height',false,0.5);
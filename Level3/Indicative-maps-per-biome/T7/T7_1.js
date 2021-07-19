/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T7.1 Annual croplands';
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

var dataset = ee.Image('USGS/GFSAD1000_V0');
var cropDominance = dataset.select('landcover').updateMask(dataset.gt(0));

var cropDominanceVis = {
  min: 0.0,
  max: 9.0,
  palette: [
    'black', 'white', 'green', 'yellow', 'brown', 'orange', '02be11', '015e08',
    '02a50f', 'purple'
  ],
};
Map.addLayer(cropDominance, cropDominanceVis, 'Crop Dominance',false,0.5);

//Earthstats 5m resolution: 
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
var GLW3_cattle = ee.Image('users/jrferrerparis/thirdparty/GLW3_Cattle_2010_Da');
var GLW3_sheep = ee.Image('users/jrferrerparis/thirdparty/GLW3_Cattle_2010_Da');

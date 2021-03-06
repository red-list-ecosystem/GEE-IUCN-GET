// Alternative data sources
// T7.4 indicative map:
var EFG_alt = altMaps.filter(ee.Filter.equals("title", EFGname));
Map.addLayer(EFG_alt, {palette: ['red', 'yellow'], min: 1, max: 2
}, 'T7.4 urban', false, 0.7);

//Copernicus global landcover
var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('crops-coverfraction'); // crops cover fraction
var copernicus_crops=dataset.updateMask(dataset.gt(5.0));

//Earthstats 5min resolution:
//From http://www.earthstat.org/cropland-pasture-area-2000/
var earthstats1 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Cropland2000_5m');
var earthstats2 = ee.Image('users/jrferrerparis/thirdparty/earthstats_Pasture2000_5m');
var es_crops=earthstats1; //.updateMask(earthstats1.gt(0.05));
var es_past=earthstats2; //.updateMask(earthstats2.gt(0.05));

//Gridded Lifestock of the World v3
var GLW3_1 = ee.Image('users/jrferrerparis/thirdparty/GLW3_Cattle_2010_Da');
var GLW3_2 = ee.Image('users/jrferrerparis/thirdparty/GLW3_Sh_2010_Da');
var GLW3_cattle=GLW3_1;//.updateMask(GLW3_1.gt(5));
var GLW3_sheep=GLW3_2; //.updateMask(GLW3_2.gt(5));

// Global forest canopy height 2005
var dataset = ee.Image('NASA/JPL/global_forest_canopy_height_2005');
var forestCanopyHeight = dataset.select('1');

//HANPP from Haberl et al.
var HANPP = ee.Image('users/jrferrerparis/thirdparty/HANPP');
// try with percentage

// visualizarion parameters
var GLWvis = {min: 0.0,max: 5000.0,palette: ['white', 'orange','brown'],};
var cropVis = {min: 0.0, max: 1.0, palette: ['white', 'cyan', 'blue', 'purple'],};
var pastVis = {min: 0.0, max: 1.0, palette: ['white', 'pink','magenta'],};
var copernicus_viz = {min: 0.0,max: 100.0,palette: ['yellow', 'orange', 'red']};
var NPPvis = {min: -300.0, max: 1000.0, palette: ['green', '#eeeeee', 'yellow','orange','red','brown'],};
var HeightVis = {min: 0.0, max: 30.0, palette: ['ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201',
    '004c00', '011301'],};

// Add all layers to the map
Map.addLayer(HANPP, NPPvis, 'HANPP',false,0.5);
Map.addLayer(es_crops, cropVis, 'Earthstats crops',false,0.5);
Map.addLayer(es_past, pastVis, 'Earthstats pastures',false,0.5);
Map.addLayer(GLW3_cattle, GLWvis, 'GLW v3 cattle',false,0.5);
Map.addLayer(GLW3_sheep, GLWvis, 'GLW v3 sheep',false,0.5);
Map.addLayer(forestCanopyHeight, HeightVis, 'Forest Canopy Height',false,0.5);
Map.addLayer(copernicus_crops, copernicus_viz, "COPERNICUS Crops cover fraction",false,0.5);

// Calculations:
// (Pastures > Crops) & (HANPP > 0) & (Cattle > 500)
var A1 = (es_past.gt(es_crops)), // this calculation has to be done without masking
  A2 = (es_past.subtract(es_crops)).gt(-0.1),
  B1 = HANPP.gt(100).and(HANPP.lt(700)),
  B2 = HANPP.gt(80).and(HANPP.lt(840)),
  C = GLW3_cattle.gt(500),
  D = GLW3_sheep.gt(500);
//var test = (es_past.gt(es_crops)).multiply(HANPP.gt(0)).multiply(GLW3_cattle.gt(500));
var testA = (A1).multiply(B1).multiply(C);
var testB = (A1).multiply(B1).multiply(D);
var major = testA.add(testB).gt(0);
var testA1 = (A2).multiply(B2).multiply(C);
var testB1 = (A2).multiply(B2).multiply(D);
var minor = testA1.add(testB1).gt(0).multiply(2);

var combined = minor.subtract(major);
var result=combined.updateMask(combined.gt(0));

//Map.addLayer(A, {min: 0.0, max: 1.0, palette: ['ffffff', 'red'] }, 'past>crops',false,1.0);
//Map.addLayer(B, {min: 0.0, max: 1.0, palette: ['ffffff', 'red'] }, 'HANPP>0',false,1.0);
//Map.addLayer(C, {min: 0.0, max: 1.0, palette: ['ffffff', 'red'] }, 'Cattle>500',false,1.0);
Map.addLayer(result, {min: 1.0, max: 2.0, palette: ['red', 'yellow'] }, EFGname + ' new IM',true,1.0);

// Create a geometry representing an export region.
var export_region_W = ee.Geometry.Rectangle([-180, -60, 0, 80]);
var export_region_E = ee.Geometry.Rectangle([0, -60, 180, 80]);

// export map
Export.image.toCloudStorage({image: result, description: 'T7_2_EEmap_v1',
  bucket: 'iucn_get_output', fileNamePrefix: 'T7_2_EEmap_v1_W',scale: 1000,
  region: export_region_W, maxPixels: 1e9
});
Export.image.toCloudStorage({image: result, description: 'T7_2_EEmap_v1',
  bucket: 'iucn_get_output', fileNamePrefix: 'T7_2_EEmap_v1_E',scale: 1000,
  region: export_region_E, maxPixels: 1e9
});

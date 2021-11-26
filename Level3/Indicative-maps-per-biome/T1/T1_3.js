/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps"),
    image = ee.Image("users/jrferrerparis/IUCN-GET/L3_WM_nwt/T1_3"),
    tcf_2018 = ee.Image("projects/agile-tangent-319108/assets/tcf_ensemble_mnv16_2001_2018"),
    geometry = /* color: #d63000 */ee.Geometry.Point([-98.37966394963776, 20.477334831716146]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T1.3 Tropical/Subtropical montane rainforests';
var EFG_IM = indMaps.filter(ee.Filter.equals("title", EFGname))

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

// https://samapriya.github.io/awesome-gee-community-datasets/projects/gcc/
// Global 1-km Cloud Cover (2016):
var cf_pred = ee.Image("projects/sat-io/open-datasets/gcc/MODCF_CloudForestPrediction");
var msked_pred = cf_pred.updateMask(cf_pred.gte(0.0001));

Map.addLayer(msked_pred, {
  bands: ['b1'],
  palette: ['white', 'purple'],
  min: 0.0001, max: 0.00077
}, 'Cloud Forest prediction 2016', false, 0.7);

// new version 
Map.addLayer(image, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGname + ' -- Indicative Map (new version)', false, 0.7);


var msked_tcf = tcf_2018.updateMask(tcf_2018.gte(0));

Map.addLayer(msked_tcf, {
  bands: ['b1'],
  palette: ['cyan', 'purple'],
  min: 0, max: 500
}, 'Cloud Forest prediction 2021', true, 1.0);

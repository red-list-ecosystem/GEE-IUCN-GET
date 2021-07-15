/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T7.4 Urban and industrial ecosystems';
var EFG_IM = indMaps.filter(ee.Filter.equals("title", EFGname));

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

// define map center
// Map.setCenter(114.96, 31.13, 4); // China
// Map.setCenter(-74.7, 40.6, 7);
Map.setCenter(-107.62, 25.8, 7); // Mexico

// alternative data sources

// Tsinghua FROM-GLC year of change to impervious surface
var dataset = ee.Image("Tsinghua/FROM-GLC/GAIA/v10");

var visualization = {
  bands: ['change_year_index'],
  min: 0.0,
  max: 34.0,
  palette: [
    "014352","1A492C","071EC4","B5CA36","729EAC","8EA5DE",
    "818991","62A3C3","CCF4FE","74F0B9","32BC55","C72144",
    "56613B","C14683","C31C25","5F6253","11BF85","A61B26",
    "99FBC5","188AAA","C2D7F1","B7D9D8","856F96","109C6B",
    "2DE3F4","9A777D","151796","C033D8","510037","640C21",
    "31A191","223AB0","B692AC","2DE3F4",
  ]
};


Map.addLayer(dataset, visualization, "FROM-GLC Change year index",false,0.5);

// YCEO Surface Urban Heat Islands
var dataset = ee.ImageCollection("YALE/YCEO/UHI/UHI_yearly_averaged/v4");

var visualization = {
  bands: ['Daytime'],
  min: -1.5,
  max: 7.5,
  palette: [
    "#313695","#74add1","#fed976","#feb24c","#fd8d3c","#fc4e2a",
    "#e31a1c","#b10026",
  ]
};


Map.addLayer(dataset, visualization, "Daytime Urban Heat Islands",false,0.5);


// GHSL degree of urbanization

var dataset = ee.ImageCollection('JRC/GHSL/P2016/SMOD_POP_GLOBE_V1')
                  .filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var degreeOfUrbanization = dataset.select('smod_code');
var visParams = {
  min: 0.0,
  max: 3.0,
  palette: ['000000', '448564', '70daa4', 'ffffff'],
};
Map.addLayer(degreeOfUrbanization, visParams, 'GHSL Degree of Urbanization',false,0.5);

//Copernicus global landcover
var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('discrete_classification'); // urban cover fraction


Map.addLayer(dataset, {}, "COPERNICUS Land Cover",false,0.5);

var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('urban-coverfraction'); // urban cover fraction

var visParams = {
  min: 0.0,
  max: 100.0,
  palette: ['000000', '448564', '70daa4', 'ffffff'],
};
Map.addLayer(dataset, visParams, "COPERNICUS Urban cover fraction",false,0.5);

// ESRI 2020 landcover 10m
var esri_lulc10 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m");

// need to extract values for urban (6) 
//probably map the mask function for each image in the collection?
//var esri_urban = esri_lulc10.updateMask(esri_lulc10.gte(7));

var dict = {
  "names": [
    "Water",
    "Trees",
    "Grass",
    "Flooded Vegetation",
    "Crops",
    "Scrub/Shrub",
    "Built Area",
    "Bare Ground",
    "Snow/Ice",
    "Clouds"
  ],
  "colors": [
    "#1A5BAB",
    "#358221",
    "#A7D282",
    "#87D19E",
    "#FFDB5C",
    "#EECFA8",
    "#ED022A",
    "#EDE9E4",
    "#F2FAFF",
    "#C8C8C8"
  ]};

Map.addLayer(esri_lulc10.mosaic(), {min:1, max:10, palette:dict['colors']}, 'ESRI LULC 10m',false,0.5)

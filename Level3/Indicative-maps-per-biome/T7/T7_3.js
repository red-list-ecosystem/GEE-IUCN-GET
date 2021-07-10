/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/T7_3");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T7.3 Plantations';

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

// Global map of oil palm plantations
// Import the dataset; a collection of composite granules from 2019.
var dataset = ee.ImageCollection('BIOPAMA/GlobalOilPalm/v1');

// Select the classification band.
var opClass = dataset.select('classification');

// Mosaic all of the granules into a single image.
var mosaic = opClass.mosaic();

// Define visualization parameters.
var classificationVis = {
  min: 1,
  max: 3,
  palette: ['ff0000','ef00ff', '696969']
};

// Create a mask to add transparency to non-oil palm plantation class pixels.
var mask = mosaic.neq(3);
mask = mask.where(mask.eq(0), 0.6);

// Display the data on the map.
Map.addLayer(mosaic.updateMask(mask),
             classificationVis, 'Oil palm plantation type', true);
Map.setCenter(-3.0175, 5.2745,12);
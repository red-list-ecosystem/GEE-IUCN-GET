/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'M1.3 Photic coral reefs';
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


// Allen Coral Atlas (ACA) - Geomorphic Zonation and Benthic Habitat - v1.0
// Allen Coral Atlas (2020). Imagery, maps and monitoring of the world's tropical coral reefs. 
// Zenodo. DOI: https://doi.org/10.5281/zenodo.3833242

var dataset = ee.Image("ACA/reef_habitat/v1_0");

// Teti'aroa, an atoll in French Polynesia
Map.setOptions('SATELLITE');

// Mitch: The visualisations are baked into the image properties

// Benthic habitat classification
var benthic_habitat = dataset.select('benthic').selfMask();
Map.addLayer(benthic_habitat, {}, "Benthic habitat map",false);

// Geomorphic zonation classification
var geomorphic_zonation = dataset.select('geomorphic').selfMask();
Map.addLayer(geomorphic_zonation, {}, "Geomorphic zonation map",false);

// Example mask application
var global_mask = dataset.select('reef_mask').selfMask();
Map.addLayer(global_mask, {}, "Global reporting reef mask",false);
Map.addLayer(
    geomorphic_zonation.updateMask(global_mask), {},
    "Geomorphic map (global mask applied)");

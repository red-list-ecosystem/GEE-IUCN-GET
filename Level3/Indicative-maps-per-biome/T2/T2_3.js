/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T2.3 Oceanic cool temperate rainforests';
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


//


// OpenLandMap Potential distribution of biomes
// https://developers.google.com/earth-engine/datasets/catalog/OpenLandMap_PNV_PNV_BIOME-TYPE_BIOME00K_C_v01

var pot_biome = ee.Image("OpenLandMap/PNV/PNV_BIOME-TYPE_BIOME00K_C/v01");

var slc_biome = pot_biome.updateMask(pot_biome.eq(7));

var biome_viz = {
  bands: ['biome_type'],
  min: 1.0,
  max: 32.0,
  palette: [
    "1c5510","659208","ae7d20","000065","bbcb35","009a18",
    "caffca","55eb49","65b2ff","0020ca","8ea228","ff9adf",
    "baff35","ffba9a","ffba35","f7ffca","e7e718","798649",
    "65ff9a","d29e96",
  ]
};

Map.centerObject(slc_biome);

Map.addLayer(slc_biome, biome_viz, "Potential distribution of biomes", false, 0.5);
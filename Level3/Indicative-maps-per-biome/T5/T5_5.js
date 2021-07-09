/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/T5_5");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// load module
var slegend=require("users/jrferrerparis/IUCN-GET:simple-legend.js");

// name of functional group
var EFGname = 'T5.5 Hyper-arid deserts';

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
// Global Aridity Index
var aridity_index = ee.Image("projects/sat-io/open-datasets/global_ai_et0"),
/*
|Aridity Index Value|Climate Class|
|:------------------|:------------|
|<0.03              |Hyper Arid   |
|0.03-0.2           |Arid         |
|0.2-0.5            |Semi-Arid    |
|0.5-0.65           |Dry sub-humid|
|>0.65              |Humid        |
*/


//Import palette
var palettes = require('users/gena/packages:palettes')

/*
Convert back by multiplying by 10,000 [The Aridity Index values reported within the Global Aridity Index_ET0 geodataset
have been multiplied by a factor of 10,000 to derive and distribute the data as integers (with 4 decimal accuracy).
This multiplier has been used to increase the precision of the variable values without using decimals.]
*/

var image = ee.Image(aridity_index.multiply(0.0001))
// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#0000ff" quantity="0.03" label="0-0.03"/>' +
      '<ColorMapEntry color="#00ff00" quantity="0.21" label="0.03-0.2" />' +
      '<ColorMapEntry color="#007f30" quantity="0.51" label="0.2-0.51" />' +
      '<ColorMapEntry color="#30b855" quantity="0.65" label="0.5-0.65" />' +
      '<ColorMapEntry color="#ff0000" quantity="2.5" label=">0.66" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
  
Map.addLayer(image.sldStyle(sld_intervals),{},'Aridity index')
Map.addLayer(image,{'min':0,'max':2.5,palette: palettes.cmocean.Haline[7]},'Aridity Index',false)
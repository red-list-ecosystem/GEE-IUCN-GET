// Example of spatial queries for the indicative maps

// load the image collection:
var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
print('Indicative maps of the IUCN GET:',indMaps);

// Get the number of functional groups (EFGs).
var count = indMaps.size();
print('Number of EFGs in the collection: ', count);
// Get list of names
var names = indMaps.aggregate_array('title');
print('List of EFG names: ', names);

// example how to extract and visualise one EFG:
var EFGshortname = 'M1.6 Subtidal rocky reefs';
var EFG = indMaps.filter(ee.Filter.equals('title', EFGshortname));

Map.addLayer(EFG, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGshortname + ' -- Indicative Map', true, 0.7);


// example query at point location
// define location:
var geometry = ee.Geometry.Point([-69.679, 9.479]);

var reductionTable = indMaps.map(function(img) {
  var stats = ee.Dictionary(img.reduceRegion(
      {reducer: ee.Reducer.first(), geometry: geometry, scale: 250}));
  return ee.Feature(null, stats);
});
// filter not empty results
var filteredTable=reductionTable.filter(ee.Filter.notNull(['occurrence_type']));

var count=filteredTable.size();
print('How many EFGs at this location: ', count);
print('List of EFGs at this location:', filteredTable);

// -- Create a geometry of Caracas (Venezuela's capital)
var geomCaracas = ee.Geometry.Rectangle([-67.062383, 10.558489, -66.667078, 10.364908]);

var reductionTable = indMaps.map(function(img) {
  var stats = ee.Dictionary(img.reduceRegion(
      {reducer: ee.Reducer.fixedHistogram(1.0,2.0,1),
        geometry: geomCaracas, scale: 1000}));
  //ee.Algorithms.If(stats.size().g, trueCase, falseCase)
  return ee.Feature(null,stats);
});
// this does not work
var filteredTable=reductionTable.filter(ee.Filter.notNull(['occurrence_type']));

var count=filteredTable.size();
print('How many EFGs in this region: ', count);
print('List of EFGs in this region:', filteredTable);


var indMaps = ee.ImageCollection('users/jrferrerparis/IUCN-GET/L3_IndMaps');
print(indMaps);

// Get the number of images.
var count = indMaps.size();
print('Count: ', count);
// Get list of names
var names = indMaps.aggregate_array('title');
print('All names: ', names);

// example how to extract one EFG:
var EFGshortname = 'M1.6 Subtidal rocky reefs';
var EFG = indMaps.filter(ee.Filter.equals('title', EFGshortname));
print(EFG);
Map.addLayer(EFG, {
  bands: ['occurrence_type'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, EFGshortname + ' -- Indicative Map', true, 0.7);



// example query at point location
var geometry = ee.Geometry.Point([-69.679, 9.479]);

var reductionTable = indMaps.map(function(img) {
  var stats = ee.Dictionary(img.reduceRegion(
      {reducer: ee.Reducer.first(), geometry: geometry, scale: 250}));
  var row = ee.Number(stats.get('occurrence_type'));
  return ee.Feature(null, {row: row});
});

// this works for a single point
var filteredTable=reductionTable.filter(ee.Filter.notNull('occurrence'));
print(filteredTable);

// -- Create a geometry of Caracas (Venezuela's capital)
var geomCaracas = ee.Geometry.Rectangle([-67.062383, 10.558489, -66.667078, 10.364908]);

var reductionTable = indMaps.map(function(img) {
  var stats = ee.Dictionary(img.reduceRegion(
      {reducer: ee.Reducer.fixedHistogram(1.0,2.0,1),
        geometry: geomCaracas, scale: 1000}));
  //ee.Algorithms.If(stats.size().g, trueCase, falseCase)
  return ee.Feature(null,stats);
});
print(reductionTable);
// this does not work
var filteredTable=reductionTable.filter(ee.Filter.notNull('occurrence_type'));

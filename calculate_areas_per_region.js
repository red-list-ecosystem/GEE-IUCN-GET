//Global Administrative Unit Layers (GAUL)
var dataset = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
// Get list of names
//var names = dataset.aggregate_array('ADM0_NAME');
//print('List of ADM0 names: ', names);

var slc = dataset.filter(ee.Filter.equals('ADM0_NAME', 'Rwanda'));
print(slc)

//var styleParams = {fillColor: 'b5ffb4', color: '00909F', width: 1.0,};
//dataset = dataset.style(styleParams);

 
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IndMaps/T4_1");
// name of functional group
print(EFG_IM);
var EFGname = ee.String(EFG_IM.getString('title'));
print(EFGname);
//print(typeof(EFGname));

Map.setCenter(29.89,-2,7);
// problem with the name... when I use EFGname, print(EFGname), ee.String(EFGname) +
Map.addLayer(EFG_IM,{min:1,max:2,palette:['red','yellow']}, '(IM)',true,0.85);
Map.addLayer(slc, {}, 'Second Level Administrative Units',true,0.25);


//from this example:
//https://spatialthoughts.com/2020/06/19/calculating-area-gee/

var areaImage = ee.Image.pixelArea().addBands(EFG_IM.select('occurrence_type'));
 
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: slc.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
    
// flatten dictionary

var classAreas = ee.List(areas.get('groups'));
 
var classAreaLists = classAreas.map(function(item) {
  var areaDict = ee.Dictionary(item),
  classNumber = ee.Number(areaDict.get('class')).format(),
  area = ee.Number(
    areaDict.get('sum')).divide(1e6).round();
  return ee.List([classNumber, area]);
});
 
var result = ee.Dictionary(classAreaLists.flatten());
print(result);
 
// Area Calculation by Class by Admin Area 

// We saw how we can calculate areas by class for the whole state
// What if we wanted to know the breakup of these class areas by each district?
// This requires one more level of processing.
// We can apply a similar computation as above, but
// by applying .map() on the Feature Collection to obtain the values by each district geometies

var calculateClassArea = function(feature) {
    var areas = ee.Image.pixelArea().addBands(EFG_IM.select('occurrence_type')).reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: feature.geometry(),
    scale: 500,
    maxPixels: 1e10
    })
    var classAreas = ee.List(areas.get('groups'))
    var classAreaLists = classAreas.map(function(item) {
      var areaDict = ee.Dictionary(item)
      var classNumber = ee.Number(areaDict.get('class')).format()
      var area = ee.Number(areaDict.get('sum')).divide(1e6).round()
      return ee.List([classNumber, area])
    })
    var result = ee.Dictionary(classAreaLists.flatten());
    // The result dictionary has area for all the classes
    // We add the district name to the dictionary and create a feature
    var district = feature.get('ADM2_NAME');
    return ee.Feature(feature.geometry(), result.set('this_district', district));
};

var districtAreas = slc.map(calculateClassArea);

print(districtAreas);
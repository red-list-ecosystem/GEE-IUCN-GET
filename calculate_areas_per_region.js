//Global Administrative Unit Layers (GAUL)
var dataset = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
// Get list of names
//var names = dataset.aggregate_array('ADM0_NAME');
//print('List of ADM0 names: ', names);

var slc = dataset.filter(ee.Filter.equals('ADM0_NAME', 'Rwanda'));
print(slc)

//var styleParams = {fillColor: 'b5ffb4', color: '00909F', width: 1.0,};
//dataset = dataset.style(styleParams);

 
var EFG_IM = ee.Image("users/jrferrerparis/IUCN-GET/L3_IndMaps/T7_2");
// name of functional group
var EFGname = 'T7.2 Sown pastures and fields';

Map.setCenter(29.89,-2,7);
Map.addLayer(EFG_IM,{palette:['red','yellow']},EFGname,true,0.85);
Map.addLayer(slc, {}, 'Second Level Administrative Units',true,0.25);

print(EFG_IM);

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
 

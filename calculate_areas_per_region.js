//Global Administrative Unit Layers (GAUL)
var dataset = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
// Get list of names
//var names = dataset.aggregate_array('ADM0_NAME');
//print('List of ADM0 names: ', names);

var slc = dataset.filter(ee.Filter.equals('ADM0_NAME', 'Rwanda'));
print(slc)

//var styleParams = {fillColor: 'b5ffb4', color: '00909F', width: 1.0,};
//dataset = dataset.style(styleParams);

 
var indMaps = ee.ImageCollection("users/jrferrerparis/IUCN-GET/L3_IndMaps");
// name of functional group
var EFGname = 'T7.2 Sown pastures and fields';
var EFG_IM = indMaps.filter(ee.Filter.equals("title", EFGname))

Map.setCenter(29.89,-2,7);
Map.addLayer(EFG_IM,{palette:['red','yellow']},EFGname,true,0.85);
Map.addLayer(slc, {}, 'Second Level Administrative Units',true,0.25);
 

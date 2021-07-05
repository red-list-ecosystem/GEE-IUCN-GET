/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("users/jrferrerparis/IUCN-GET/L3_IM/TF1_6");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

Map.addLayer(image, {
  bands: ['b1'],
  palette: ['red', 'yellow'],
  min: 1, max: 2
}, 'Indicative Map', true, 0.7);

// Create the title label.
var title = ui.Label('IUCN Global Ecosystem Typology');
title.style().set('position', 'bottom-center');
Map.add(title);



var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});

var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {color: '#ffffff',
      backgroundColor: color,
      padding: '10px',
      margin: '0 0 4px 0',
    }
  });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0px 0 4px 6px',
    }
  }); 
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')}
)};

var title = ui.Label({
  value: 'TF1.6 Boreal, temperate and montane peat bogs',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0px 0 4px 0px'}});
    
legend.add(title);
legend.add(makeRow('red','Major occurrences'));
legend.add(makeRow('yellow','Minor occurrences'));

Map.add(legend);
/* Creates a simple legend to display minor a major occurrences for all indicative maps.
 *
 * legendTitle - Name to display as the legend title
 */
exports.minorMajorLegend = function(legendTitle) {
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
    value: legendTitle,
    style: {fontWeight: 'bold',
      fontSize: '16px',
      margin: '0px 0 4px 0px'}});

  legend.add(title);
  legend.add(makeRow('red','Major occurrences'));
  legend.add(makeRow('yellow','Minor occurrences'));
  return legend;
}
/* Create the title label. */
exports.titleLabel = function() {
  var title = ui.Label('IUCN Global Ecosystem Typology');
  title.style().set('position', 'bottom-center');
  return title;
}

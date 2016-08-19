var assert = require('assert')

console.log(process.browser)
if (!process.browser) {
  var test = require('tap').test
  test('setup', function (t) { t.end() })
}

module.exports.tilesEqual = tilesEqual
// assert that the two tiles are (deep) clones of one another
function tilesEqual (tile, cachedTile) {
  assert(tile && tile.layers)
  assert.deepEqual(Object.keys(tile.layers), Object.keys(cachedTile.layers))
  for (var id in tile.layers) {
    var layer = tile.layers[id]
    var cachedLayer = cachedTile.layers[id]

    assert(cachedLayer && cachedLayer !== layer)
    assert.equal(layer.version, cachedLayer.version)
    assert.equal(layer.name, cachedLayer.name)
    assert.equal(layer.extent, cachedLayer.extent)
    assert.equal(layer.length, cachedLayer.length)

    for (var i = 0; i < layer.length; i++) {
      var feature = layer.feature(i)
      var cachedFeature = cachedLayer.feature(i)
      assert.deepEqual(feature.properties, cachedFeature.properties)
      assert.equal(feature.extent, cachedFeature.extent)
      assert.equal(feature.type, cachedFeature.type)

      var geom = feature.loadGeometry()
      var cachedGeom = cachedFeature.loadGeometry()
      assert.equal(geom.length, cachedGeom.length)
      for (var j = 0; j < geom.length; j++) {
        var line = geom[j]
        var cachedLine = cachedGeom[j]
        for (var k = 0; k < line.length; k++) {
          assert(line[k] !== cachedLine[k])
          assert.deepEqual(line[k], cachedLine[k])
        }
      }
    }
  }
  return true
}


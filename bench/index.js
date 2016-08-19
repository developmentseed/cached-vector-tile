var fs = require('fs')
var path = require('path')
var Benchmark = require('benchmark')
var Protobuf = require('pbf')
var VectorTile = require('vector-tile').VectorTile
var CachedVectorTile = require('../vectortile')

var buf = fs.readFileSync(path.join(__dirname, '../test/fixtures/14-8801-5371.vector.pbf'))
var parsed = new VectorTile(new Protobuf(buf))
var cloned = new CachedVectorTile(parsed)
var serialized = cloned.serialize()

var suite = new Benchmark.Suite()

console.log('After construction, loadGeometry() is called on every feature in the tile.')

/* eslint-disable no-new */
suite
.add('new CachedVectorTile(vt: VectorTile)', function () {
  loadAllGeometries(new CachedVectorTile(parsed))
})
.add('new CachedVectorTile(vt: CachedVectorTile)', function () {
  loadAllGeometries(new CachedVectorTile(cloned))
})
.add('new CachedVectorTile(vt: plain JS object)', function () {
  loadAllGeometries(new CachedVectorTile(serialized))
})
.add('new VectorTile(new Protobuf(pbf))', function () {
  loadAllGeometries(new VectorTile(new Protobuf(buf)))
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
// run async
.run({ 'async': true })

function loadAllGeometries (tile) {
  for (var id in tile.layers) {
    var layer = tile.layers[id]
    for (var i = 0; i < layer.length; i++) {
      var feature = layer.feature(i)
      feature.loadGeometry()
      feature.bbox()
    }
  }
}

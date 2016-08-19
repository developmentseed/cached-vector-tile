'use strict'

var util = require('./util')
var CachedVectorTileLayer = require('./vectortilelayer')

module.exports = CachedVectorTile

/**
 * A vector tile.  Implements the interface defined in the [vector-tile-js API reference](https://github.com/mapbox/vector-tile-js) (except that the constructor is different).
 *
 * @param {VectorTile|CachedVectorTile|object} vt The vector tile to clone.  Can be a [vector-tile-js](https://github.com/mapbox/vector-tile-js) tile, a CachedVectorTile, or a plain JS object as serialized by [CachedVectorTile#serialize](#serialize)
 * @param {object} [properties] An optional object mapping feature ids to property values.  If provided, these properties will be used instead of the ones present in vt's features.
 */
function CachedVectorTile (vt, properties) {
  var length = 0
  this.layers = util.mapObject(vt.layers, function (layer) {
    length += layer.length
    return new CachedVectorTileLayer(layer, properties)
  })
  this.length = length
}

CachedVectorTile.prototype = {
  /**
   * Returns a plain JS object representation of the vector tile.
   */
  serialize: function () {
    return {
      length: this.length,
      layers: util.mapObject(this.layers, function (layer) { return layer.serialize() })
    }
  }
}

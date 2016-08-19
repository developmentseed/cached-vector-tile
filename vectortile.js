'use strict'

var util = require('./util')
var CachedVectorTileLayer = require('./vectortilelayer')

module.exports = CachedVectorTile

/**
 * An alternative implementation of the VectorTile interface that is backed by
 * plain JS objects/arrays rather than a protobuf that is parsed on demand.
 * Trades away memory efficiency for faster feature.loadGeometry() calls.
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

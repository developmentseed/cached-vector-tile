'use strict'

var CachedVectorTileFeature = require('./vectortilefeature.js')

module.exports = CachedVectorTileLayer

/**
 * A vector tile layer.  Implements the interface defined in the [vector-tile-js API reference](https://github.com/mapbox/vector-tile-js)
 * @name CachedVectorTileLayer
 */
function CachedVectorTileLayer (layer, properties) {
  // Public
  this.length = layer.length
  this.version = layer.version
  this.name = layer.name
  this.extent = layer.extent

  // Private
  this._features = []
  if (typeof layer.feature === 'function') {
    for (var i = 0; i < layer.length; i++) {
      var feature = layer.feature(i)
      this._features.push(new CachedVectorTileFeature(feature, properties))
    }
  } else {
    for (i = 0; i < layer.length; i++) {
      this._features.push(new CachedVectorTileFeature(layer._features[i], properties))
    }
  }
}

CachedVectorTileLayer.prototype.feature = function (i) {
  return new CachedVectorTileFeature(this._features[i])
}

/**
 * Returns a plain JS object representation of the vector tile layer.
 */
CachedVectorTileLayer.prototype.serialize = function () {
  return {
    version: this.version,
    name: this.name,
    extent: this.extent,
    length: this.length,
    _features: this._features.map(function (f) { return f.serialize() })
  }
}

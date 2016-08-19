'use strict'

var CachedVectorTileFeature = require('./vectortilefeature.js')

module.exports = CachedVectorTileLayer

function CachedVectorTileLayer (layer, properties) {
  // Public
  this.version = layer.version
  this.name = layer.name
  this.extent = layer.extent
  this.length = layer.length

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

CachedVectorTileLayer.prototype.serialize = function () {
  return {
    version: this.version,
    name: this.name,
    extent: this.extent,
    length: this.length,
    _features: this._features.map(function (f) { return f.serialize() })
  }
}

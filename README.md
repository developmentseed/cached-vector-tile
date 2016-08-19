# cached-vector-tile [![CircleCI](https://circleci.com/gh/developmentseed/cached-vector-tile.svg?style=svg)](https://circleci.com/gh/developmentseed/cached-vector-tile)

An alternative implementation of the [vector-tile-js](https://github.com/mapbox/vector-tile-js) interface that is backed by plain JS objects/arrays rather than parsed-on-demand protobuf data.  Trades away memory efficiency for faster feature.loadGeometry() calls.

## Install and Use

`npm install cached-vector-tile`

```js
var Protobuf = require('pbf');
var VectorTile = require('vector-tile').VectorTile
var CachedVectorTile = require('cached-vector-tile')

var vt = new VectorTile(new Protobuf(rawdata))

var cached = new CachedVectorTile(vt)

var plain = cached.serialize()
// 'plain' is a plain JS object, suitable for JSON.serialize() or storage in
// something like IndexedDB
```

## API

### CachedVectorTile

A vector tile.  Implements the interface defined in the [vector-tile-js API reference](https://github.com/mapbox/vector-tile-js) (except that the constructor is different).

**Parameters**

-   `vt` **(VectorTile | [CachedVectorTile](#cachedvectortile) \| [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** The vector tile to clone.  Can be a [vector-tile-js](https://github.com/mapbox/vector-tile-js) tile, a CachedVectorTile, or a plain JS object as serialized by [CachedVectorTile#serialize](#serialize)
-   `properties` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** An optional object mapping feature ids to property values.  If provided, these properties will be used instead of the ones present in vt's features.

#### serialize

Returns a plain JS object representation of the vector tile.

### CachedVectorTileLayer

A vector tile layer.  Implements the interface defined in the [vector-tile-js API reference](https://github.com/mapbox/vector-tile-js)

#### serialize

Returns a plain JS object representation of the vector tile layer.

### CachedVectorTileFeature

A vector tile feature.  Implements the interface defined in the [vector-tile-js API reference](https://github.com/mapbox/vector-tile-js).

#### serialize

Returns a plain JS object representation of the vector tile feature.

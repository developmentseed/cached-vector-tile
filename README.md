# cached-vector-tile

## Install and Use

`npm install cached-vector-tile`

```js
var CachedVectorTile = require('cached-vector-tile');
```

## API

### CachedVectorTile

An alternative implementation of the VectorTile interface that is backed by
plain JS objects/arrays rather than a protobuf that is parsed on demand.
Trades away memory efficiency for faster feature.loadGeometry() calls.

**Parameters**

-   `vt` **(VectorTile | [CachedVectorTile](#cachedvectortile) \| [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** The vector tile to clone.  Can be a [vector-tile-js](https://github.com/mapbox/vector-tile-js) tile, a CachedVectorTile, or a plain JS object as serialized by [CachedVectorTile#serialize](#serialize)
-   `properties` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** An optional object mapping feature ids to property values.  If provided, these properties will be used instead of the ones present in vt's features.

#### serialize

Returns a plain JS object representation of the vector tile.

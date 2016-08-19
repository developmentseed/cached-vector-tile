'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tap').test
var VectorTile = require('vector-tile').VectorTile
var Protobuf = require('pbf')
var CachedVectorTile = require('../vectortile')

var tilesEqual = require('./helpers').tilesEqual

test('cached vector tile from pbf-parsed vector tile', function (t) {
  var data = fs.readFileSync(path.join(__dirname, '/fixtures/14-8801-5371.vector.pbf'))
  var tile = new VectorTile(new Protobuf(data))
  var cachedTile = new CachedVectorTile(tile)
  t.ok(tilesEqual(tile, cachedTile))
  t.end()
})

test('cached vt from cached vt', function (t) {
  var data = fs.readFileSync(path.join(__dirname, '/fixtures/14-8801-5371.vector.pbf'))
  var tile = new VectorTile(new Protobuf(data))
  var cachedTile = new CachedVectorTile(tile)
  var deserialized = new CachedVectorTile(cachedTile)
  t.ok(tilesEqual(deserialized, tile))
  t.ok(tilesEqual(deserialized, cachedTile))
  t.end()
})

test('cached vt from serialized', function (t) {
  var data = fs.readFileSync(path.join(__dirname, '/fixtures/14-8801-5371.vector.pbf'))
  var tile = new VectorTile(new Protobuf(data))
  var serialized = new CachedVectorTile(tile).serialize()
  var deserialized = new CachedVectorTile(serialized)
  t.ok(tilesEqual(deserialized, tile))
  t.end()
})


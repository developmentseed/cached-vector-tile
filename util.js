/**
 * Create an object by mapping all the values of an existing object while
 * preserving their keys.
 * @param {Object} input
 * @param {Function} iterator
 * @returns {Object}
 * @private
 *
 * Copied from mapbox-gl-js.
 */
exports.mapObject = function (input, iterator, context) {
  var output = {}
  for (var key in input) {
    output[key] = iterator.call(context || this, input[key], key, input)
  }
  return output
}


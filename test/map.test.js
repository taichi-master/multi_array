'use strict';

var assert = require('assert'),
    { MultiArray } = require('../multi_array');

exports['map'] = {
	before: function() {
	},

	'MultiArray arr_obj.map': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr_obj = new MultiArray(extents, data);

    var mapped_obj = arr_obj.map((x, indices, arr, i) => x * 10);

    // got to be the same object type.
    assert(mapped_obj instanceof MultiArray, "Not the same type");

    // got to be the same size and structure.
    for (var i=0, len=extents.length; i < len; i++)
      assert.equal(arr_obj.extents[i], mapped_obj.extents[i], "Extents mismatch");

    assert.equal(arr_obj.size, mapped_obj.size, "Size mismatch");

    // got to be transformable.
    var idx = 0;
    mapped_obj.forEach((x, indices, arr, i) => assert.equal(x, data[idx++] * 10, "Data mismatch"));

    // assert.notStrictEqual(data, range, "Shouldn't be the same");
    // for (var i=0, len=range.length; i < len; i++)
    //   assert.equal(data[i], range[i], "Data mismatch");
	},
};

if (module == require.main) {
	require('./run_mocha.js')(__filename);
}

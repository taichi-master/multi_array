'use strict';

var assert = require('assert'),
    { MultiArray, multi_array, forEach, getValue } = require('../multi_array');

exports['create'] = {
	before: function() {
	},

	'multi_array': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr = multi_array(extents);
    assert.ok(Array.isArray(arr), "Not an array.");
    arr = multi_array(extents, data); // optional second parameter for the data.
    console.log('console.log');
    console.log(arr);

    // this is not dynamic because three "for" loops are being hard coded here.
    var idx = 0;
    for (let i=0; i < extents[0]; i++)
      for (let j=0; j < extents[1]; j++)
        for (let k=0; k < extents[2]; k++)
          assert.equal(arr[i][j][k], data[idx++], "Data mismatch");  // arr[][][] is not dynamic.

    // dynamic way
    idx = 0;
    forEach(arr, (x, indices, arr, i) => assert.equal(x, data[idx++], "Data mismatch"));
	},

	'instantiate MultiArray': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr_obj = new MultiArray(extents);
    assert.ok(Array.isArray(arr_obj.value), "Not an array.");
    arr_obj = new MultiArray(extents, data); // optional second parameter for the data.
    console.log('console.log');
    console.log(arr_obj.value);

    var idx = 0;
    arr_obj.forEach((x, indices, arr, i) => assert.equal(x, data[idx++], "Data mismatch"));
	},

  'static functions create and size': function() {
    var extents = [4,3,2],
        data = [...Array(MultiArray.size(extents))].map((x,i) => i),
        arr1 = multi_array(extents, data),
        arr2 = MultiArray.create(extents, data);

    assert.notStrictEqual(arr1, arr2, "Shouldn't be the same");
    forEach(arr1, (x, indices, arr, i) => assert.equal(x, getValue(arr2, indices), "Data mismatch"));
	},

	'MultiArray properties': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr_obj = new MultiArray(extents, data);
    assert.equal(arr_obj.dimension, extents.length, "Dimension mismatch");
    assert.equal(arr_obj.size, 24, "Size not the same");
    assert.equal(arr_obj.size, MultiArray.size(extents), "Size not the same");
    for (var i=0, len=extents.length; i < len; i++)
      assert.equal(arr_obj.extents[i], extents[i], "Extents mismatch");
	},
};

if (module == require.main) {
	require('./run_mocha.js')(__filename);
}

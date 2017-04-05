'use strict';

var assert = require('assert'),
    { MultiArray, multi_array, forEach } = require('../multi_array');

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
};

if (module == require.main) {
	require('./run_mocha.js')(__filename);
}

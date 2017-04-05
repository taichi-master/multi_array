'use strict';

var assert = require('assert'),
    { MultiArray, multi_array, getValue, forEach } = require('../multi_array');

exports['getValue'] = {
	before: function() {
	},

	'pure function': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr = multi_array(extents, data);
    assert.equal(getValue(arr, [3,2,1]), 23, "Data mismatch")
    forEach(arr, (x, indices, a, i) => assert.equal(x, getValue(arr, indices), "Data mismatch"));
	},

	'MultiArray arr_obj.get': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr_obj = new MultiArray(extents, data);
    assert.equal(arr_obj.get([3,2,1]), 23, "Data mismatch")
    arr_obj.forEach((x, indices, arr, i) => assert.equal(x, arr_obj.get(indices), "Data mismatch"));
	},
};

if (module == require.main) {
	require('./run_mocha.js')(__filename);
}

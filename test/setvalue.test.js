'use strict';

var assert = require('assert'),
    { MultiArray, multi_array, getValue, setValue } = require('../multi_array');

exports['setValue'] = {
	before: function() {
	},

	'pure function': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr = multi_array(extents, data);
    assert.equal(getValue(setValue(arr, [3,2,1], 999), [3,2,1]), 999, "Data mismatch")
	},

	'MultiArray arr_obj.set': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr_obj = new MultiArray(extents, data);
    assert.equal(arr_obj.set([3,2,1], 999).get([3,2,1]), 999, "Data mismatch")
	},
};

if (module == require.main) {
	require('./run_mocha.js')(__filename);
}

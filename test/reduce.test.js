'use strict';

var assert = require('assert'),
    { MultiArray } = require('../multi_array');

exports['reduce'] = {
	before: function() {
	},

	'MultiArray arr_obj.reduce': function() {
    var extents = [4,3,2],
        data = [...Array(24)].map((x,i) => i),
        arr_obj = new MultiArray(extents, data);

    var sum = 0;
    for (var i=0, len=data.length; i < len; i++)
      sum += data[i];

    assert.equal(arr_obj.reduce((acc, val) => acc + val), sum, "Data mismatch");
	},
};

if (module == require.main) {
	require('./run_mocha.js')(__filename);
}

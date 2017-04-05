'use strict';

var assert = require('assert'),
    { MultiArray } = require('../multi_array');

exports['data'] = {
	before: function() {
	},

	'MultiArray arr_obj.data': function() {
    var extents = [4,3,2],
        range = [...Array(24)].map((x,i) => i),
        arr_obj = new MultiArray(extents, range);

    var data = arr_obj.data();
    assert.notStrictEqual(data, range, "Shouldn't be the same");
    for (var i=0, len=range.length; i < len; i++)
      assert.equal(data[i], range[i], "Data mismatch");
	},
};

if (module == require.main) {
	require('./run_mocha.js')(__filename);
}

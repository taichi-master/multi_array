var fs = require('fs'),
    Image = require('./image.js');

var buffer = fs.readFileSync('sample.txt', 'utf-8').trim().split(' '),
    ptr = 0,
    d = +buffer[ptr++],
    L = [...Array(d)].map(x=>+buffer[ptr++]),
    data = [...Array(Image.size(Image.extents(L)))].map(x=>+buffer[ptr++]),
    img = new Image(L, data);

console.log(img.value);
for (var l=1, len=Math.min(...L); l <= len; l++)
  console.log(img.downSample(l).value);

var fs = require('fs'),
    Image = require('./image.js');

const async = require('async');

var buffer = fs.readFileSync('sample3.txt', 'utf-8').trim().split(' '),
    ptr = 0,
    d = +buffer[ptr++],
    L = [...Array(d)].map(x=>+buffer[ptr++]),
    data = [...Array(Image.size(Image.extents(L)))].map(x=>+buffer[ptr++]),
    img = new Image(L, data);

// console.log('original image');
// console.log(img.value);
// console.log();

console.time('Linear');
for (var l=1, len=img.max_sample; l <= len; l++)
  console.log(img.downSample(l).value);
console.timeEnd('Linear');

console.log();

console.time('Concurrent');
async.parallel(
  [...Array(img.max_sample)].map((x, i) => callback => callback(null, img.downSample(i+1).value)),
  (err, values) => {
    values.forEach(value => console.log(value));
    console.timeEnd('Concurrent');
  }
)

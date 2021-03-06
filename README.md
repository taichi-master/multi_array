# multi_array - Dynamic Multi-dimensional Array
Dynamic means you can create any dimensional array in run time.

FYI, whenever you see an array in this form, it is not dynamic.
```javascript
  arr[1][2][3] = ...  // <= not dynamic
```

# Usages
There are two ways to use the library.

## 1). Use it from pure function.
e.g.
```javascript
var extents = [4,3,2],
    data = [...Array(24)].map((x,i) => i),
    arr = multi_array(extents);
arr = multi_array(extents, data); // optional second parameter for the data.
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
```

## 2). Use it from a class.
e.g.
```javascript
var extents = [4,3,2],
    data = [...Array(24)].map((x,i) => i),
    arr_obj = new MultiArray(extents);
arr_obj = new MultiArray(extents, data); // optional second parameter for the data.
console.log(arr_obj.value);

var idx = 0;
arr_obj.forEach((x, indices, arr, i) => assert.equal(x, data[idx++], "Data mismatch"));
```
Please see more usages in the test folder.

License:
-------
MIT &copy; 2017 Kei Sing Wong

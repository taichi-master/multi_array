function multi_array (extents = [], data) {
  var N = 0;

  function create (extents) {
    var n=extents[0],
        arr = Array(n);
    for (let i=0; i < n; i++)
      if (extents.length === 1)
        data && (arr[i] = data[N++]);
      else
        arr[i] = create(extents.slice(1));
    return arr;
  }

  return create(extents);
}

function getValue (arr, indices) {
  let i = indices[0];
  return indices.length > 1 ? getValue(arr[i], indices.slice(1)) : arr[i];
}

function setValue (arr, indices, value) {
  let i = indices[0];
  if (indices.length > 1)
    setValue(arr[i], indices.slice(1), value);
  else
    arr[i] = value;
  return arr;
}

function forEach (arr, fn, indices=[]) {
  for (let i=0, len=arr.length; i < len; i++)
    if (Array.isArray(arr[i]))
      forEach(arr[i], fn, [...indices, i]);
    else
      fn(arr[i], [...indices, i], arr, i);
}

class MultiArray {
  static create (extents, data) {
    return multi_array(extents, data);
  }

  static size (extents) {
    return extents.reduce((a,b) => a * b, 1);
  }

  constructor (extents = [], data) {
    let _value = MultiArray.create(extents, data);

    Object.defineProperties(this, {
      extents: {
        get: function () {
          return extents;
        }
      },
      dimension: {
        get: function () {
          return this.extents.length;
        }
      },
      size: {
        get: function () {
          return MultiArray.size(this.extents);;
        }
      },
      value: {
        get: function () {
          return _value;
        }
      }
    });
  }

  get (indices) {
    return getValue(this.value, indices);
  }

  set (indices, value) {
    setValue(this.value, indices, value);
    return this;
  }

  forEach (fn) {
    forEach(this.value, fn);
    return this;
  }

  map (fn) {
    var obj = new MultiArray(this.extents);
    this.forEach((x, indices, arr, i) => obj.set(indices, fn(x, indices, arr, i)));
    return obj;
  }

  reduce (fn, init=null) {
    var value = init;
    this.forEach((x, indices, arr, i) => value = fn(value, x));
    return value;
  }

  load (data = []) {
    let idx = 0;
    this.forEach((x, indices, arr, i) => arr[i] = data[idx++]);
    return this;
  }

  data () {
    var arr = Array(this.size),
        i = 0;
    this.forEach(x => arr[i++] = x);
    return arr;
  }
}

module.exports = {
  MultiArray,
  multi_array,
  getValue,
  setValue,
  forEach
};

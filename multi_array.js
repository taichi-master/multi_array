function multi_array (extents = [], data) {
  var N = 0;

  function create (extents) {
    var n=extents[0],
        arr = Array(n);
    for (let i=0; i < n; i++)
      if (extents.length === 1)
        arr[i] = data ? data[N++] : N++;
      else
        arr[i] = create(extents.slice(1));
    return arr;
  }

  return create(extents);
}

module.exports = multi_array;

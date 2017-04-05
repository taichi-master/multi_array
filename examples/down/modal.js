function modal (arr = []) {
  let bucket = {},
      sortable = [];
  arr.forEach(x => {
    let k = x+'';
    if (k in bucket)
      bucket[k]++;
    else
      bucket[k] = 1;
  });
  for (let k in bucket)
    sortable.push([k, bucket[k]]);
  sortable.sort((a,b) => b[1] - a[1]);
  return +sortable[0][0];
}

module.exports = modal;

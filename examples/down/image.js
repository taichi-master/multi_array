var { MultiArray } = require('../../multi_array'),
    modal = require('./modal');

class Image extends MultiArray {
  static extents (L = []) {
    return L.map(x => Math.pow(2, x));
  }

  constructor (L = [], data) {
    super(Image.extents(L), data);

    Object.defineProperties(this, {
      L: {
        get: function () {
          return L;
        }
      },
      max_sample: {
        get: function () {
          return Math.min(...L);
        }
      }
    })
  }

  downSample (l=1) {
    let L = this.L.map(x=>x-l),
        down = new Image(L),
        trunk = Array(this.size / down.size),
        section_size = Math.pow(2, l),
        oImage = this;

    let idx = 0,
        dive_in = (indices, oIndices=[]) => {
          if (indices.length > 0)
            for (let s=indices[0]*section_size, len=s+section_size; s < len; s)
              dive_in(indices.slice(1), [...oIndices, s++]);
          else
            trunk[idx++] = oImage.get(oIndices);
        };

    down.forEach((x, indices, arr, i) => {
      idx = 0;
      dive_in(indices);
      arr[i] = modal(trunk);
    });

    return down;
  }
}

module.exports = Image;

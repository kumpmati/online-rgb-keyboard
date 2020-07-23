const keyIndexes = require('./M750Keys.json');

let bitmap = createBitmap([0, 255, 0]);

function createBitmap([r, g, b]) {
    let arr = [];
    for(let i=0; i<132; i++) {
        arr[i] = [r, g, b];
    }
    return arr;
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function mapKeysToArr(data) {
    let arr = bitmap.slice(0);
    // iterate key names
    for(const key of Object.keys(data)) {
        //get bitmap array index using keyname
        const index = keyIndexes[key];

        if(index) {
            const { r, g, b } = hexToRgb(data[key]);
            arr[index] = [r, g, b];
        }
    }
    return arr;
}

function updateBitmap(data) {
    bitmap = mapKeysToArr(data);
    return bitmap;
}

module.exports = {
    createBitmap,
    updateBitmap
};
function createBitmap([r, g, b]) {
    let arr = [];
    for(let i=0; i<132; i++) {
        arr[i] = [r, g, b];
    }
    return arr;
}

function lerpBitmap(prev, next, step) {
    if(prev.length !== next.length) return null;

    let arr = prev.slice(0);
    for(let i=0; i<prev.length; i++) {
        arr[i][0] += ~~((next[i][0] - arr[i][0]) * step),
        arr[i][1] += ~~((next[i][1] - arr[i][1]) * step),
        arr[i][2] += ~~((next[i][2] - arr[i][2]) * step)
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

module.exports = {
    createBitmap,
    lerpBitmap,
    hexToRgb
};
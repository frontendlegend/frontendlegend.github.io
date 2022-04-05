function findCursorPos(obj) {
  let curLeft = 0, curTop = 0;

  if (obj.offsetParent) {
    do {
      curLeft += obj.offsetLeft;
      curTop += obj.offsetTop;
    } 
    while (obj = obj.offsetParent);

    return { x: curLeft, y: curTop };
  }

  return undefined;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  
  return ((r << 16) | (g << 8) | b).toString(16);
}
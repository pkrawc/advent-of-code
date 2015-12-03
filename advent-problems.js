
var advent = (function() {
  'use strict';
  function dayOne(directions, up, down) {
    const directionsArray = directions.split('');
    let floorNumber = 0;
    for (let i = 0; i < directionsArray.length; i++) {
      if (directionsArray[i] === up) {
        ++ floorNumber;
      } else if (directionsArray[i] === down) {
        -- floorNumber;
      }
      if (floorNumber < 0) console.log(i + 1);
    }
    console.log('We need to end up on the '+floorNumber+' floor');
  }

  function dayTwo(presentsDimensions) {
    let squareFootage = 0;
    let totalRibbonLength = 0;
    const boxArray = presentsDimensions.split('\n');
    let l, w, h, side1, side2, side3, surfaceArea, slipArea, dimensions, dimensionsInt, ribbonLength;
    for (let a = 0; a < boxArray.length - 1; a++) {
      dimensions = boxArray[a].split('x');
      l = dimensions[0];
      w = dimensions[1];
      h = dimensions[2];
      dimensionsSorted = [l, w, h];
      dimensionsSorted.sort(function(a, b){return a - b});
      side1 = l * w;
      side2 = l * h;
      side3 = w * h;
      surfaceArea = 2 * side1 + 2 * side2 + 2 * side3;
      slipArea = Math.min.apply(Math,[side1, side2, side3]);
      squareFootage += (surfaceArea + slipArea);
      ribbonLength = (l * w * h) + (dimensionsSorted[0] + dimensionsSorted[0] + dimensionsSorted[1] + dimensionsSorted[1]);
      totalRibbonLength += ribbonLength;
    }
    console.log('There is '+squareFootage+' sqft of wrapping paper needed.');
    console.log('We need '+totalRibbonLength+' feet of ribbon for this many presents.');
  }

  function dayThree(santas, route) {
    const routeArray = route.split('');
    let santa = {};
    let step = 0;
    let houses = { '0:0': 0 };
    for (let a = 0; a < santas; a++) {
      santa[a] = { x: 0, y: 0 }
      houses['0:0']++;
    }
    for (let b = 0; b < routeArray.length; b++) {
      switch (routeArray[b]) {
        case '^': santa[step].y++;
        break;
        case '>': santa[step].x++;
        break;
        case 'v': santa[step].y--;
        break;
        case '<': santa[step].x--;
        break;
      }
      let index = santa[b % santas].x+' : '+santa[b % santas].y;
      houses[index] ? houses[index]++ : houses[index] = 1;

      step = (step == Object.keys(santa).length - 1 ? 0 : turnOrder + 1);
    }
    console.log(santas+' Santa(s) brought presents to '+(Object.keys(houses).length - 1)+' houses.'); // Because it counts its own prototype in length? Just a guess...
  }

  return {
    findFloor: dayOne,
    wrappingPaperCalc: dayTwo,
    deliveredPresents: dayThree
  }
})();

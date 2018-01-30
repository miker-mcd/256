// const collapseRight = function (line) {
  // Input: array of four numbers
  // if line contains all zeros, return array
  // if nums in line equal to 2, replace last slot with 2
  // Output: a new array of four numbers with identical nums added
// }

function collapseRight (row) {
  var filtered = row.filter(function (num) {
    return num > 0;
  })

  var rowSum = filtered.reduce(function (acc, num) {
    return acc + num;
  }, 0)

  if (filtered.length > 2) {
    var check = filtered[0];
    for (let i = 1;i < filtered.length;i++) {
      if (check == filtered[i]) {
        var sumOfPair = check + filtered[i];
        filtered.splice(i, 1, sumOfPair);
        filtered.splice(filtered.indexOf(check), 1);
      } else {
        check = filtered[i];
      }
    }
    var zerosToAdd = row.length - filtered.length;
    for (let i = 0;i < zerosToAdd;i++) {
      filtered.unshift(0);
    }
    row = filtered;
  }
  else if (filtered.length >= 1) {
    row = [0,0,0];
    row.push(rowSum);
  }
  return row;
}

const Board = function (str) {
  // Generate a string of 16 zeros
  // => '0000000000000000';

  // Replace a 2 or 4 in two slots in the string
  // => '0000200020000000';
}

const Game = function (str) {
  this.board = str.split().map(function (char) {
    return parseInt(char);
  }); // || new Board();

  this.toString = function () {}
    // Use toString() to split string into four lines of four characters
    // => '0000
        // 2020
        // 0000
        // 0000'

  this.move = function (direction) {}
}

var game = new Game('0000202000000000');
// var game = new Game();
console.log(game)
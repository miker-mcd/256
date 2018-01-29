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

  if (filtered.length == 1) {
    row = [0,0,0];
    row.push(filtered[0])
  }
  // else if (row.length > 3) {
  //   row = 'pizza';
  // }
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
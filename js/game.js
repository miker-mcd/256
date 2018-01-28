// Generate a string of 16 zeros
// => '0000000000000000';

// Replace a 2 or 4 in two slots in the string
// => '0000200020000000';

// Use toString() to split string into four lines of four characters
// => '0000
    // 2020
    // 0000
    // 0000'

// const combine = function (line) {
  // Input: array of four numbers
  // if array contains all zeros, return array
  // Output: a new array of four numbers with identical nums added
// }

const Game = function (string) {
  var board = '0000000000000000';

  return {
    "board": string || board,
    "toString": function () {},
    "move": function (direction) {
      // Input: array of nums (0, 2, 4)
    }
  }
}

// var game = new Game('0000202000000000');
var game = new Game();
console.log(game)
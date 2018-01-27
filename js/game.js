const Game = function newGame() {
  var board = [
  ['0', '0', '0', '0'],
  ['0', '0', '0', '0'],
  ['0', '0', '0', '0'],
  ['0', '0', '0', '0'],
  ]
  if (arguments) {
    var args = Array.prototype.slice.call(arguments, 1);
    board = args[0];
    return {
      "toString": function (board) {
        return board.split();
      }
    }
  }
  return board;
}
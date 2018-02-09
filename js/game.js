function spawnBlock(board) {
    // board = board.split('').map(function (char) {
    //   return parseInt(char, 10);
    // }) // => [0,0,0,0,0,0,0,4,0,0,4,4,0,2,8,2]
    var blocks = [2, 4];
    function insertBlock(board) {
      let randomRow = Math.floor(Math.random() * Math.floor(board.length));
      let randomIndex = Math.floor(Math.random() * Math.floor(board[randomRow].length));
      let newBlock = blocks[(Math.floor(Math.random() * Math.floor(2)))];

      if (board[randomRow][randomIndex] < 1) {
        board[randomRow].splice(randomIndex, 1, newBlock)
        // board = board.join('');
        return board;
      }
      else {
        // board.splice(randomIndex, 1)
        return insertBlock(board)
      }
    }
  var newBoard = insertBlock(board);
  // return newBoard.join('');
  return newBoard;
}

// TODO
const Board = function (str) {
  // Generate a string of 16 zeros
  // => '0000000000000000';

  // Replace a 2 or 4 in two slots in the string
  // => '0000200020000000';
}

const Game = function (str) {
  // this.board = str // || new Board(); => '2020'
  this.board = str.split('').map(function (char) {
    return parseInt(char, 10);
  }); // => [0,0,0,0,2,0,2,0,2,2,4,0,0,2,8,2]
  var ret = [];
  for(let i = 0; i < this.board.length; i += 4) {
     ret.push(this.board.slice(i, i + 4))
  }
  this.board = ret;

  this.toString = function () {
    // var ret = [];
    // for(let i = 0; i < this.board.length; i += 4) {
    //    ret.push(this.board.slice(i, i + 4))
    // }
    // this.board = ret;
    return this.board.join('<br>');
  }

  function collapseRight (board) {
    var newBoard = [];

    var splitBoard = [];
    // for(let i = 0; i < board.length; i += 4) {
    //    splitBoard.push(board.substr(i, 4))
    // }

    // splitBoard.forEach(function (row) {
    board.forEach(function (row) {
      // row = row.split('').map(function (char) {
      //   return parseInt(char, 10);
      // }) // => [2,0,2,0]

      var filtered = row.filter(function (num) {
        return num > 0;
      }) // => [2,2]

      var rowSum = filtered.reduce(function (acc, num) {
        return acc + num;
      }, 0) // => 4

      if (filtered.length > 3) {
        var check = filtered[0];
        for (let i = 1;i < filtered.length;i++) {
          if (check == filtered[i]) {
            var sumOfPair = check + filtered[i];
            filtered.splice(i, 1, sumOfPair);
            filtered.splice(filtered.indexOf(check), 1)
          }
          check = filtered[i];
        }
        var zerosToAdd = row.length - filtered.length;
        for (let i = 0;i < zerosToAdd;i++) {
          filtered.unshift(0);
        }
        row = filtered;
        // row = filtered.join('');
      }

      else if (filtered.length > 2) {
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
        // row = filtered.join('');
        row = filtered;
      }

      else if (filtered.length > 1) {
        if (filtered[0] == filtered[1]) {
          filtered.splice(1, 1, rowSum);
          filtered.shift();
          filtered.unshift(0, 0, 0);
          // row = filtered.join('');
          row = filtered;
        } else {
          filtered.unshift(0, 0);
          // row = filtered.join('');
          row = filtered;
        }
      }

      // else if (filtered.length >= 0) {
      else {
        row = [0,0,0];
        row.push(rowSum);
        // row = row.join('');
      }
      newBoard.push(row);
    })
    // newBoard = newBoard.join('');
    return spawnBlock(newBoard);
  }

  function collapseDown(board) {
    board = _.zip.apply(_, board);
    board = collapseRight(board);
    board = _.zip.apply(_, board);
    return board;
  }

  this.move = function (direction) {
    if (direction == 'right') {
      this.board = collapseRight(this.board);
      return this.board;
      // return collapseRight(this.board);
    }
    else if (direction == 'down') {
      this.board = collapseDown(this.board);
      return this.board;
    }
  }

}
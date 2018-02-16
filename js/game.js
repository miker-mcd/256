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

const Board = function () {
  this.randomStart = '0000000000000000'.split('').map(function (char) {
    return parseInt(char, 10);
  });
  var ret = [];
  for (let i = 0;i < this.randomStart.length;i += 4) {
    ret.push(this.randomStart.slice(i, i + 4))
  }
  var count = 2;
  for (let j = 0;j < count;j++) {
    spawnBlock(ret);
  }
  ret = ret.map(function (row) {
    return row.join('');
  })
  this.randomStart = ret.join('');
}

const Game = function (str) {
  var board = new Board();
  this.board = str || board.randomStart;
  this.board = this.board.split('').map(function (char) {
    return parseInt(char, 10);
  }); // => [0,0,0,0,2,0,2,0,2,2,4,0,0,2,8,2]
  var ret = [];
  for(let i = 0; i < this.board.length; i += 4) {
     ret.push(this.board.slice(i, i + 4))
  }
  this.board = ret;

  function is256(board) {
    var merged = [].concat.apply([], board);

    return merged.includes(256);
  };

  function availableMoves(board) {
    var merged = [].concat.apply([], board);

    return merged.includes(0) || collapseRight(board) === board || collapseDown(board) === board || collapseLeft(board) === board || collapseUp(board) === board;
  }

  this.toString = function () {
    var viewBoard = this.board.map(function (row) {
      return row.map(function (num) {
        return "<span class='tile'>" + num.toString() + "</span>";
      }).join('')
    })

    if (is256(this.board)) {
      return "<div class='game-message'><div class='text'>You Win!</div></div>" + "<div class='game-over'><p class='row'>" + viewBoard.join("<p class='row'>") + "</div>";
    }
    else if (!(availableMoves(this.board))) {
      return "<div class='game-message'><div class='text'>You Lose, try again!</div></div>" + "<div class='game-over'><p class='row'>" + viewBoard.join("<p class='row'>") + "</div>";
    } else {
      // var viewBoard = this.board.map(function (row) {
      //   return row.map(function (num) {
      //     return "<span class='tile'>" + num.toString() + "</span>";
      //   }).join('')
      // })
      return "<div class='game-grid'><p class='row'>" + viewBoard.join("<p class='row'>") + "</div>";
    }
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

    if (board.join('') === newBoard.join('')) {
      return board;
    } else {
      return spawnBlock(newBoard);
    }
    // newBoard = newBoard.join('');
   // return spawnBlock(newBoard);
  }

  function collapseDown(board) {
    board = _.zip.apply(_, board);
    board = collapseRight(board);
    board = _.zip.apply(_, board);
    return board;
  }

  function collapseLeft(board) {
    var newBoard = [];
    board.forEach(function (row) {
      var filtered = row.filter(function (num) {
        return num > 0;
      });
      var rowSum = filtered.reduce(function (sum, num) {
        return sum + num;
      }, 0)

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
          filtered.push(0);
        }
        row = filtered;
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
          filtered.push(0);
        }
        row = filtered;
      }

      else if (filtered.length > 1) {
        if (filtered[0] == filtered[1]) {
          filtered.splice(0, 1, rowSum);
          filtered.pop();
          filtered.push(0, 0, 0);
          row = filtered;
        } else {
          filtered.push(0, 0);
          row = filtered;
        }
      }

      else if (filtered.length >= 0) {
        row = [0,0,0];
        row.unshift(rowSum);
      }
      newBoard.push(row);
    });

    if (board.join('') === newBoard.join('')) {
      return board;
    } else {
      return spawnBlock(newBoard);
    }

  }

  function collapseUp(board) {
    board = _.zip.apply(_, board);
    board = collapseLeft(board);
    board = _.zip.apply(_, board);
    return board;
  };

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
    else if (direction == 'left') {
      this.board = collapseLeft(this.board);
      return this.board;
    }
    else if (direction == 'up') {
      this.board = collapseUp(this.board);
      return this.board;
    }
  }

}
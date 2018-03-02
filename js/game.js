function spawnBlock(board) {
    var blocks = [2, 4];
    var oldBoard = board;

    function insertBlock() {
      let randomRow = Math.floor(Math.random() * Math.floor(oldBoard.length));
      let randomIndex = Math.floor(Math.random() * Math.floor(oldBoard[randomRow].length));
      let newBlock = blocks[(Math.floor(Math.random() * Math.floor(2)))];

      if (oldBoard[randomRow][randomIndex] < 1) {
        oldBoard[randomRow].splice(randomIndex, 1, newBlock)
        return oldBoard;
      }
      else {
        return insertBlock();
      }
    }

  // var newBoard = insertBlock();
  // return newBoard;
  return insertBlock();
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
    return row.join(',');
  });
  this.randomStart = ret.join(',');
}

const Game = function (str) {
  var board = new Board();
  var score = 0;
  this.board = str || board.randomStart;
  this.board = this.board.split(',').map(function (char) {
    return parseInt(char, 10);
  });
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
    return collapseRight(board).join('') !== board.join('') || collapseDown(board).join('') !== board.join('') || collapseLeft(board).join('') !== board.join('') || collapseUp(board).join('') !== board.join('');
  }

  this.toString = function () {
    // var viewBoard = spawnBlock(this.board).map(function (row) {
    var viewBoard = this.board.map(function (row) {
      return row.map(function (num) {
        if (num > 0) {
          return "<span class='tile'>" + num.toString() + "</span>";
        } else {
          return "<span class='zero'>" + num.toString() + "</span>";
        }
      }).join('')
    })

    if (is256(this.board)) {
      return "<div class='game-message'><div class='text'>You Win!</div><button class='button'>Play Again</button></div><div class='game-over'><p class='row'>" + viewBoard.join("<p class='row'>") + "</div>";
    }
    else if (!(availableMoves(this.board))) {
      return  "<div class='game-message'><div class='text'>Game Over!</div><button class='button'>Try Again</button></div><div class='game-over'><p class='row'>" + viewBoard.join("<p class='row'>") + "</div>";
    } else {
      return "<div class='game-grid'><p class='row'>" + viewBoard.join("<p class='row'>") + "</div>";
    }
  }

  function collapseRight (board) {
    var newBoard = [];
    var splitBoard = [];

    board.forEach(function (row) {
      var filtered = row.filter(function (num) {
        return num > 0;
      });
      var rowSum = filtered.reduce(function (acc, num) {
        return acc + num;
      }, 0);

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
        row = filtered;
      }
      else if (filtered.length > 1) {
        if (filtered[0] == filtered[1]) {
          filtered.splice(1, 1, rowSum);
          filtered.shift();
          filtered.unshift(0, 0, 0);
          row = filtered;
        } else {
          filtered.unshift(0, 0);
          row = filtered;
        }
      }
      else {
        row = [0,0,0];
        row.push(rowSum);
      }
      newBoard.push(row);
    })

    if (board.join('') === newBoard.join('')) {
      return board;
    } else {
      return newBoard;
      // return spawnBlock(newBoard);
    }
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
      }, 0);

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
      return newBoard;
      // return spawnBlock(newBoard);
    }

  }

  function collapseUp(board) {
    board = _.zip.apply(_, board);
    board = collapseLeft(board);
    board = _.zip.apply(_, board);
    return board;
  };

  function getScore(beforeMove, afterMove) {
    var filteredBeforeBoard = beforeMove.map(function (row) {
      return row.filter(function (num) {
        return num > 0;
      });
    });
    var filteredAfterBoard = afterMove.map(function (row) {
      return row.filter(function (num) {
        return num > 0;
      });
    });
    filteredAfterBoard.forEach(function (row, index) {
      if (row.length < filteredBeforeBoard[index].length) {
        if (row.length === 3) {
          for (let i = 0;i < row.length;i++) {
            if (filteredBeforeBoard[index][i] !== row[i]) {
              score += row[i];
              return score;
            }
          }
        }
        else if (row.length === 2) {
          if (filteredBeforeBoard[index].length === 4) {
            score += filteredBeforeBoard[index].reduce(function (sum, num) {
              return sum + num;
            });
            return score;
          } else {
            for (let i = 0;i < row.length;i++) {
              if (row[i] === filteredBeforeBoard[index][i]) {
                score += row[1];
                return score;
              }
              else {
                score += row[i];
                return score;
              }
            }
          }
          // if (row[0] === filteredBeforeBoard[index][0]) {
          //   score += row[1];
          // }
          // else {
          //   score += row[0];
          // }
        }
        else if (row.length === 1) {
          score += row[0];
          return score;
        }
      }
    })
    return score;
  }

  this.move = function (direction) {
    var board = this.board;
    if (direction == 'right') {
      var boardRight = collapseRight(board);
      if (board.join('') === boardRight.join('')) {
        getScore(board, boardRight);
        this.board = collapseRight(this.board);
      }
      else {
        getScore(board, boardRight);
        this.board = spawnBlock(collapseRight(this.board));
      }
      return this.board;
    }
    else if (direction == 'down') {
      board = _.zip.apply(_, board);
      var boardDown = collapseRight(board);
      if (board.join('') === boardDown.join('')) {
        getScore(board, boardDown);
        this.board = collapseDown(this.board);
      } else {
        getScore(board, boardDown);
        this.board = spawnBlock(collapseDown(this.board));
      }
      return this.board;
    }
    else if (direction == 'left') {
      var boardLeft = collapseLeft(board);
      if (board.join('') === boardLeft.join('')) {
        getScore(board, boardLeft);
        this.board = collapseLeft(this.board);
      } else {
        getScore(board, boardLeft);
        this.board = spawnBlock(collapseLeft(this.board));
      }
      return this.board;
    }
    else if (direction == 'up') {
      board = _.zip.apply(_, board);
      var boardUp = collapseLeft(board);
      if (board.join('') === boardUp.join('')) {
        getScore(board, boardUp);
        this.board = collapseUp(this.board);
      } else {
        getScore(board, boardUp);
        this.board = spawnBlock(collapseUp(this.board));
      }
      return this.board;
    }
  }

  this.updateScore = function (str) {
    score = parseInt(str, 10) || score;
    return score.toString();
  }

}
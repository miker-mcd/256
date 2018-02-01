function spawnBlock(newBoard) {
  // Input: string of nums
    // Change string of nums into array of nums
    var board = newBoard.split('').map(function (char) {
      return parseInt(char, 10);
    }) // => [0,0,0,0,2,0,2,0,0,0,0,0]
    // function: pick a random slot between 0 and the length of the array
    var blocks = [2, 4];
    function insertBlock(board) {
      let randomIndex = Math.floor(Math.random() * Math.floor(board.length + 1));
      let newBlock = blocks[(Math.floor(Math.random() * Math.floor(2)))];
      // base case: if length of array is 0 return newboard array
      if (board.length < 1) {
        return board;
      }
      // if slot is empty
      if (board[randomIndex] < 2) {
        // replace slot with a 2 or 4
        return board.splice(randomIndex, 1, newBlock)
        // return array
        // return board;
      }
      // else not empty
      else {
        // run function with value at slot removed
        insertBlock(board.splice(randomIndex, 1))
      }
    }
  // Output: string of nums with an empty space replaced with a 2 or 4
  newBoard = insertBlock(board);
  console.log(newBoard);
  return newBoard.join('');
}

function collapseRight (board) {
  var newBoard = [];

  var splitBoard = [];
  for(let i = 0; i < board.length; i += 4) {
     splitBoard.push(board.substr(i, 4))
  }

  splitBoard.forEach(function (row) {
    row = row.split('').map(function (char) {
      return parseInt(char, 10);
    }) // => [2,0,2,0]

    var filtered = row.filter(function (num) {
      return num > 0;
    }) // => [2,2]

    var rowSum = filtered.reduce(function (acc, num) {
      return acc + num;
    }, 0) // => 4

    if (filtered.length > 3) {
      // Input: [2,4,4,2]
      // set up check
      var check = filtered[0];
      // iterate through line after first num
      for (let i = 1;i < filtered.length;i++) {
        // if check equals num
        if (check == filtered[i]) {
          // add check and num => 8
          var sumOfPair = check + filtered[i];
          // replace num with sum => [2,4,8,2]
          filtered.splice(i, 1, sumOfPair);
          // remove check => [2,8,2]
          filtered.splice(filtered.indexOf(check), 1)
        // end if
        }
        // reassign check to i => 2
        check = filtered[i];
      // end loop => [2,8,2]
      }
      // subtract the row length from the new filtered length to get the number of zeros to buffer
      var zerosToAdd = row.length - filtered.length;
      // add zeros to front of filtered array
      for (i = 0;i < zerosToAdd;i++) {
        filtered.unshift(0);
      }
      // reassign the row to the filtered collection
      row = filtered.join('');
      // Output: [0,2,8,2]
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
      row = filtered.join('');
    }

    else if (filtered.length >= 0) {
      row = [0,0,0];
      row.push(rowSum);
      row = row.join('');
    }
    newBoard.push(row);
  })
  // return newBoard.join('');
  return spawnBlock(newBoard.join(''));
}

// TODO
const Board = function (str) {
  // Generate a string of 16 zeros
  // => '0000000000000000';

  // Replace a 2 or 4 in two slots in the string
  // => '0000200020000000';
}

const Game = function (str) {
  this.board = str // || new Board(); => '2020'

  this.toString = function () {
    var ret = [];
    for(let i = 0; i < str.length; i += 4) {
       ret.push(str.substr(i, 4))
    }
    return ret.join('<br>');
  }

  this.move = function (direction) {
    if (direction == 'right') {
      return collapseRight(this.board);
    }
  }
}
function collapseRight (row) {
  row = row.split().map(function (char) {
    return parseInt(char)
  })

  var filtered = row.filter(function (num) {
    return num > 0;
  })

  var rowSum = filtered.reduce(function (acc, num) {
    return acc + num;
  }, 0) // => 8

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
    row = filtered;
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
    row = filtered;
  }
  else if (filtered.length >= 1) {
    row = [0,0,0];
    row.push(rowSum);
  }
  return row.join();
}

const Board = function (str) {
  // Generate a string of 16 zeros
  // => '0000000000000000';

  // Replace a 2 or 4 in two slots in the string
  // => '0000200020000000';
}

const Game = function (str) {
  this.board = str.split().map(function (char) {
    return parseInt(char)
  }).join()
  // }); || new Board();

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

// var game = new Game();
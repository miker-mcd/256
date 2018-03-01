$(document).ready(function() {
  var game;
  var savedGame = localStorage.getItem('game');
  var savedScore = localStorage.getItem('score');
  if (savedGame != 'undefined' || savedGame != 'null') {
    var el = $('<div></div>');
    el.html(savedGame);
    var tiles = $.map($('span', el), function (tile) {
      return $(tile).text();
    });
    game = new Game(tiles.join(','));
  } else {
    game = new Game();
  }

  if (savedScore != 'undefined' || savedScore != 'null') {
    $('.score').html(savedScore);
  } else {
    $('.score').html(game.updateScore());
  }

  $(".game").html(game.toString());
  Mousetrap.bind('right', function () {
    game.move('right');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
    if (localStorage) {
      localStorage.setItem('game', $('.game').html());
      localStorage.setItem('score', $('.score').html());
    }
  });
  Mousetrap.bind('down', function () {
    game.move('down');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
    if (localStorage) {
      localStorage.setItem('game', $('.game').html());
      localStorage.setItem('score', $('.score').html());
    }
  })
  Mousetrap.bind('left', function () {
    game.move('left');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
    if (localStorage) {
      localStorage.setItem('game', $('.game').html());
      localStorage.setItem('score', $('.score').html());
    }
  })
  Mousetrap.bind('up', function () {
    game.move('up');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
    if (localStorage) {
      localStorage.setItem('game', $('.game').html());
      localStorage.setItem('score', $('.score').html());
    }
  })
  $(document).on('click', '.button', function() {
    game = new Game();
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
  })
});

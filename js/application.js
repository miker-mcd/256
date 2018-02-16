$(document).ready(function() {
  var game = new Game();
  $(".game").append(game.toString());
  Mousetrap.bind('right', function () {
    game.move('right');
    $('.game').html(game.toString());
  });
  Mousetrap.bind('down', function () {
    game.move('down');
    $('.game').html(game.toString());
  })
  Mousetrap.bind('left', function () {
    game.move('left');
    $('.game').html(game.toString());
  })
  Mousetrap.bind('up', function () {
    game.move('up');
    $('.game').html(game.toString());
  })
  $('.button').click(function() {
    game = new Game();
    $('.game').html(game.toString());
  })
});

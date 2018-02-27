$(document).ready(function() {
  var game = new Game();
  $(".game").append(game.toString());
  $('.score').html(game.updateScore());
  Mousetrap.bind('right', function () {
    game.move('right');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
  });
  Mousetrap.bind('down', function () {
    game.move('down');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
  })
  Mousetrap.bind('left', function () {
    game.move('left');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
  })
  Mousetrap.bind('up', function () {
    game.move('up');
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
  })
  $(document).on('click', '.button', function() {
    game = new Game();
    $('.game').html(game.toString());
    $('.score').html(game.updateScore());
  })
});

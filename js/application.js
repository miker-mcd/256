$(document).ready(function() {
  var game = new Game('0000202042402882');
  $(".game").append(game.toString());
  Mousetrap.bind('right', function () {
    game.move('right');
    // game = new Game(game.move('right'));
    $('.game').html(game.toString());
  });
  Mousetrap.bind('down', function () {
    game.move('down');
    $('.game').html(game.toString());
  })
});

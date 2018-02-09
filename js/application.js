$(document).ready(function() {
  var game = new Game('0000202022402882');
  $(".game").append(game.toString());
  Mousetrap.bind('right', function () {
    game.move('right');
    // game = new Game(game.move('right'));
    $('.game').html(game.toString());
  });
});

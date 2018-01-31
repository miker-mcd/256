$(document).ready(function() {
  var game = new Game('2020');
  $(".game").append(game.board);
  Mousetrap.bind('right', function () {
    $('.game').html(game.move('right'));
  });
});

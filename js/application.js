$(document).ready(function() {
  var game = new Game('2020');
  $(".game").append(game.board);
  Mousetrap.bind('right', function () {
    console.log('right');
    $('.game').html(game.move('right'));
  });
});

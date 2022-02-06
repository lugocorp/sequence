import Game from './game';
Game.game = new Game();

// For click handling
let downCoordX = 0;
let downCoordY = 0;
const canvas = document.getElementById('canvas');
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  downCoordX = e.clientX - rect.left;
  downCoordY = e.clientY - rect.top;
  Game.game.click(downCoordX, downCoordY, true);
});
canvas.addEventListener('mouseup', () => {
  Game.game.click(downCoordX, downCoordY, false);
});

// For game start
document.addEventListener('deviceready', () => Game.game.start(), false);
document.dispatchEvent(new Event('deviceready'));
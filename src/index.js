import Game from './game';
Game.game = new Game();

// For game start
document.addEventListener('deviceready', async () => {
  await Game.game.start();

  // For click handling
  let downCoordX = 0;
  let downCoordY = 0;
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('mousedown', (e) => {
    const scale = Game.game.renderer.scale;
    const rect = canvas.getBoundingClientRect();
    downCoordX = (e.clientX - rect.left) / scale;
    downCoordY = (e.clientY - rect.top) / scale;
    Game.game.click(downCoordX, downCoordY, true);
  });
  canvas.addEventListener('mouseup', () => {
    Game.game.click(downCoordX, downCoordY, false);
  });
}, false);
document.dispatchEvent(new Event('deviceready'));
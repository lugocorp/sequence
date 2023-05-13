import Injector from './injector';
import Game from './game';

// For game start
document.addEventListener(
  'deviceready',
  async () => {
    const injector = new Injector();
    Game.game = await injector.get('game');
    await Game.game.start();

    // For click handling
    let downCoordX = 0;
    let downCoordY = 0;
    const canvas = document.getElementById('canvas');
    const clickDown = (e) => {
      const scale = Game.game.renderer.scale;
      const rect = canvas.getBoundingClientRect();
      downCoordX = (e.clientX - rect.left) / scale;
      downCoordY = (e.clientY - rect.top) / scale;
      Game.game.click(downCoordX, downCoordY, true);
    };
    window.addEventListener('mousedown', clickDown);
    window.addEventListener('mousemove', clickDown);
    window.addEventListener('mouseup', () => {
      Game.game.click(downCoordX, downCoordY, false);
    });
    window.addEventListener('resize', () => {
        Game.game.renderer.setCanvasSize();
        Game.game.invalidate();
    });
  },
  false
);
document.dispatchEvent(new Event('deviceready'));

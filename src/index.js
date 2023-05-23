import Game from './game';
import HTML5HistoryManager from './media/html5/history';
import HTML5Graphics from './media/html5/graphics';
import HTML5GameAudio from './media/html5/audio';

// For game start
document.addEventListener(
  'deviceready',
  async () => {
    const game = new Game(new HTML5Graphics(), new HTML5GameAudio(), new HTML5HistoryManager());
    await game.start();

    // For click handling
    let downCoordX = 0;
    let downCoordY = 0;
    const canvas = document.getElementById('canvas');
    const clickDown = (e) => {
      const scale = game.graphics.scale;
      const rect = canvas.getBoundingClientRect();
      downCoordX = (e.clientX - rect.left) / scale;
      downCoordY = (e.clientY - rect.top) / scale;
      game.click(downCoordX, downCoordY, true);
    };
    if (window.cordova === undefined) {
      window.addEventListener('mousedown', (e) => clickDown(e));
      window.addEventListener('mousemove', (e) => clickDown(e));
      window.addEventListener('mouseup', () => game.click(downCoordX, downCoordY, false));
    } else {
      window.addEventListener('touchstart', (e) => clickDown(e.touches[0]));
      window.addEventListener('touchmove', (e) => clickDown(e.touches[0]));
      window.addEventListener('touchend', () => game.click(downCoordX, downCoordY, false));
    }
    window.addEventListener('resize', () => {
      game.graphics.setSize();
      game.invalidate();
    });
  },
  false
);
document.dispatchEvent(new Event('deviceready'));

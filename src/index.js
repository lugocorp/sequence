import Game from './game';
Game.game = new Game();

document.addEventListener('deviceready', () => {
  console.log('Hello, world!');
  Game.game.start();
}, false);

document.dispatchEvent(new Event('deviceready'));

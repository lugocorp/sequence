import Game from './src/game';
const game = new Game();

document.addEventListener('deviceready', () => {
    console.log('Hello, world!');
    game.start();
}, false);

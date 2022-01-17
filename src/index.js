import Game from './game';
const game = new Game();

document.addEventListener('deviceready', () => {
    console.log('Hello, world!');
    game.start();
}, false);

document.dispatchEvent(new Event('deviceready'));

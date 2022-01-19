import Game from './game';
Game.game = new Game();

// For click handling
const canvas = document.getElementById('canvas');
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  Game.game.click(e.clientX - rect.left, e.clientY - rect.top);
});

// For game start
document.addEventListener('deviceready', () => Game.game.start(), false);
document.dispatchEvent(new Event('deviceready'));
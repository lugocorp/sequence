/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */
import Sprites from '../enums/sprites';
import DrawCoords from './draw-coords';
import GraphicsLoader from './loader';
import View from './view';
import Game from '../game';

export default class GraphicsRenderer {
  static WIDTH = 124;
  static HEIGHT = 200;
  static TEXT_WIDTH = 24;
  static TEXT_HEIGHT = 12;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  assets: GraphicsLoader;
  scale: number;
  constructor(canvas: HTMLCanvasElement, assets: GraphicsLoader) {
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.canvas = canvas;
    this.assets = assets;
  }

  /*
   * Scales the canvas to be an integer multiple of the base resolution value,
   * whatever will fit the device screen. For a list of commonly used mobile
   * device resolutions, see here:
   * https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
   */
  setCanvasSize(): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.scale = Math.floor(screenHeight / GraphicsRenderer.HEIGHT);
    if (GraphicsRenderer.WIDTH * this.scale > screenWidth) {
      this.scale = Math.floor(screenWidth / GraphicsRenderer.WIDTH);
    }
    this.canvas.height = GraphicsRenderer.HEIGHT * this.scale;
    this.canvas.width = GraphicsRenderer.WIDTH * this.scale;
    this.ctx.scale(this.scale, this.scale);
  }

  /*
   * This method draws a single frame of the app.
   */
  frame(view: View): void {
    this.ctx.clearRect(0, 0, GraphicsRenderer.WIDTH, GraphicsRenderer.HEIGHT);
    if (!view) {
      this.drawSprite(Sprites.LOADING, 25, 96);
      return;
    }
    if (view.image) {
      this.drawSprite(view.image, 12, 0);
    }
    if (view.text) {
      this.drawText(view.text, 0, 0);
    }
    if (view.hasOptions()) {
      // Draw option arrows
    }
    if (view.hasActions()) {
      // Draw action borders
      for (let a = 0; a < view.actions.length; a++) {
        const action = view.actions[a];
        const coords: number[] = view.getActionCoords(a);
        this.drawText(action.text, coords[0], coords[1]);
      }
    }
  }

  toDisplayCoords(x: number, y: number): number[] {
    return [(x * 5) + 2, (y * 8) + 102];
  }

  /*
   * This method draws a single sprite from a 3-byte hexadecimal.
   */
  drawSprite(id: number, x: number, y: number): void {
    const c: DrawCoords = this.assets.getSprite(id);
    this.ctx.drawImage(c.src, c.left, c.top, c.width, c.height, x, y, c.width, c.height);
  }

  /*
   * This method is like drawText but for numerical values
   */
  drawNumber(msg: number, x:number, y: number): void {
    this.drawText(`${msg}`, x, y);
  }

  /*
   * This method draws some text using the custom in-game font.
   * x and y are given in units of text glyph position
   */
  drawText(msg: string, x: number, y: number, clickable = false): void {
    x = this.toDisplayCoords(x, y)[0];
    y = this.toDisplayCoords(x, y)[1];
    const highlight = clickable &&
      Game.game.currentClick.down &&
      Game.game.currentClick.x >= x &&
      Game.game.currentClick.y >= y &&
      Game.game.currentClick.x <= x + (msg.length * 5) &&
      Game.game.currentClick.y <= y + 8;
    if (highlight) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(x, y, 5 * msg.length, 8);
      this.ctx.fillStyle = 'black';
    }
    let dx = 0;
    for (let a = 0; a < msg.length; a++) {
      if (msg[a] === '\n') {
        y += 8;
        dx = 0;
      } else {
        if (msg[a] !== ' ') {
          const glyph: Sprites = this.getGlyph(msg[a]);
          const c: DrawCoords = this.assets.getSprite(glyph);
          this.ctx.drawImage(c.src, c.left, c.top, c.width, c.height, x + (dx * c.width), y, c.width, c.height);
        }
        dx++;
      }
    }
  }

  /*
   * This method returns a sprite for a specific character.
   */
  getGlyph(char: string): Sprites {
    const a = 'a'.charCodeAt(0);
    const z = 'z'.charCodeAt(0);
    const zero = '0'.charCodeAt(0);
    const nine = '9'.charCodeAt(0);
    const code = char.charCodeAt(0);
    if (code >= a && code <= z) {
      return ((Sprites.A as number) + ((code - a) << 8)) as Sprites;
    }
    if (code >= zero && code <= nine) {
      return ((Sprites.ZERO as number) + ((code - zero) << 8)) as Sprites;
    }
    switch (char) {
      case '.': return Sprites.PERIOD;
      case ',': return Sprites.COMMA;
      case '!': return Sprites.EXCLAIM;
      case '?': return Sprites.QUESTION;
      case '+': return Sprites.PLUS;
      case '-': return Sprites.MINUS;
      case '\'': return Sprites.APOSTROPHE;
      case '/': return Sprites.SLASH;
      case '%': return Sprites.PERCENT;
    }
    throw new Error(`No font glyph for character '${char}'`);
  }
}
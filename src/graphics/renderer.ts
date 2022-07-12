/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */
import Sprites from '../enums/sprites';
import { WIDTH, HEIGHT, GLYPH_W, GLYPH_H } from '../enums/values';
import DrawCoords from './draw-coords';
import GraphicsLoader from './loader';
import View from './view';
import Game from '../game';

export default class GraphicsRenderer {
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
    this.scale = Math.floor(screenHeight / HEIGHT);
    if (WIDTH * this.scale > screenWidth) {
      this.scale = Math.floor(screenWidth / WIDTH);
    }
    this.canvas.height = HEIGHT * this.scale;
    this.canvas.width = WIDTH * this.scale;
    this.ctx.scale(this.scale, this.scale);
  }

  /*
   * This method draws a single frame of the app.
   */
  frame(view: View): void {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
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
      this.drawSprite(Sprites.ARROW_LEFT, 3, 46);
      this.drawSprite(Sprites.ARROW_RIGHT, 116, 46);
    }
    if (view.hasActions()) {
      const top = this.toDisplayCoords(0, view.getActionCoords(0)[1])[1] - GLYPH_H;
      for (let a = 0; a < 24; a++) {
        let sprite1 = Sprites.LINE_HORT;
        let sprite2 = Sprites.LINE_HORT;
        if (a === 0) {
          sprite1 = Sprites.BOT_LEFT;
          sprite2 = Sprites.TOP_LEFT;
        } else if (a === 23) {
          sprite1 = Sprites.BOT_RIGHT;
          sprite2 = Sprites.TOP_RIGHT;
        }
        this.drawSprite(sprite1, (a * GLYPH_W) + 2, 190);
        this.drawSprite(sprite2, (a * GLYPH_W) + 2, top);
      }
      for (let a = 0; a < view.actions.length; a++) {
        const action = view.actions[a];
        const coords: number[] = view.getActionCoords(a);
        this.drawText(action.label, coords[0], coords[1], true);
        this.drawSprite(Sprites.LINE_VERT, 2, (coords[1] * GLYPH_H) + 102);
        this.drawSprite(Sprites.LINE_VERT, (23 * GLYPH_W) + 2, (coords[1] * GLYPH_H) + 102);
      }
    }
  }

  // Converts text coords to display coords
  toDisplayCoords(tx: number, ty: number): number[] {
    return [(tx * GLYPH_W) + 2, (ty * GLYPH_H) + 102];
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
  drawNumber(msg: number, tx: number, ty: number): void {
    this.drawText(`${msg}`, tx, ty);
  }

  /*
   * This method draws some text using the custom in-game font.
   * x and y are given in units of text glyph position
   */
  drawText(msg: string, tx: number, ty: number, clickable = false): void {
    const coords = this.toDisplayCoords(tx, ty);
    let x = coords[0];
    let y = coords[1];
    const highlight = clickable &&
      Game.game.currentClick.down &&
      Game.game.currentClick.x >= x &&
      Game.game.currentClick.y >= y &&
      Game.game.currentClick.x <= x + (msg.length * GLYPH_W) &&
      Game.game.currentClick.y <= y + GLYPH_H;
    if (highlight) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(x, y, GLYPH_W * msg.length, GLYPH_H);
      this.ctx.fillStyle = 'black';
    }
    let dx = 0;
    for (let a = 0; a < msg.length; a++) {
      if (msg[a] === '\n') {
        y += GLYPH_H;
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
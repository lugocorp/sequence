/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */
import { WIDTH, HEIGHT, WGLYPH, HGLYPH, WTEXT } from '../enums/values';
import Sprites from '../enums/sprites';
import DrawCoords from './draw-coords';
import GraphicsLoader from './loader';
import Action from '../ui/action';
import View from '../ui/view';
import Game from '../game';

export default class GraphicsRenderer {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  assets: GraphicsLoader;
  scale: number;
  constructor(canvas: HTMLCanvasElement, assets: GraphicsLoader) {
    this.ctx = canvas.getContext('2d');
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
    const text = view.getText();
    if (text) {
      this.drawText(text, 0, 0);
    }
    if (view.hasOptions()) {
      if (view.selector.index > 0) {
        this.drawSprite(Sprites.ARROW_LEFT, 3, 46);
      }
      if (view.selector.index < view.selector.size() - 1) {
        this.drawSprite(Sprites.ARROW_RIGHT, 116, 46);
      }
    }
    if (view.hasActions()) {
      const actionCoords = view.getActionCoords(0);
      const top = this.toDisplayCoords(0, actionCoords[1])[1] - HGLYPH;
      for (let a = 0; a < WTEXT; a++) {
        let sprite1 = Sprites.LINE_HORT;
        let sprite2 = Sprites.LINE_HORT;
        if (a === 0) {
          sprite1 = Sprites.BOT_LEFT;
          sprite2 = Sprites.TOP_LEFT;
        } else if (a === 23) {
          sprite1 = Sprites.BOT_RIGHT;
          sprite2 = Sprites.TOP_RIGHT;
        }
        this.drawSprite(sprite1, (a * WGLYPH) + 2, 190);
        this.drawSprite(sprite2, (a * WGLYPH) + 2, top);
      }
      for (let a = 0; a < view.actions.length; a++) {
        const action: Action = view.actions[a];
        const coords: number[] = view.getActionCoords(a);
        this.drawText(action.label, coords[0], coords[1], true);
        this.drawSprite(Sprites.LINE_VERT, 2, (coords[1] * HGLYPH) + 102);
        this.drawSprite(Sprites.LINE_VERT, (23 * WGLYPH) + 2, (coords[1] * HGLYPH) + 102);
      }
    }
  }

  // Converts text coords to display coords
  toDisplayCoords(tx: number, ty: number): number[] {
    return [(tx * WGLYPH) + 2, (ty * HGLYPH) + 102];
  }

  /*
   * This method draws a single sprite from a 3-byte hexadecimal.
   */
  drawSprite(id: number, x: number, y: number): void {
    if (id === Sprites.NONE) {
      return;
    }
    const c: DrawCoords = this.assets.getSprite(id);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(c.src, c.left, c.top, c.width, c.height, x, y, c.width, c.height);
  }

  // Returns the bounds of some text
  getTextBounds(msg: string): number[] {
    const lines: string[] = msg.split('\n');
    if (!lines[lines.length - 1].length) {
      lines.pop();
    }
    return [
      lines.reduce((acc: number, x: string) => Math.max(acc, x.length), 0) * WGLYPH,
      lines.length * HGLYPH
    ];
  }

  /*
   * This method draws some text using the custom in-game font.
   * x and y are given in units of text glyph position
   */
  drawText(msg: string, tx: number, ty: number, clickable = false): void {
    const coords = this.toDisplayCoords(tx, ty);
    const x = coords[0];
    const y = coords[1];
    const highlight = clickable && Game.game.within(msg, x, y, true);
    let dx = 0;
    let dy = 0;
    for (let a = 0; a < msg.length; a++) {
      if (msg[a] === '\n') {
        dx = 0;
        dy++;
      } else {
        if (msg[a] !== ' ') {
          const glyph: Sprites = this.getGlyph(msg[a]);
          const c: DrawCoords = this.assets.getSprite(glyph);
          this.ctx.imageSmoothingEnabled = false;
          this.ctx.drawImage(c.src, c.left, c.top, WGLYPH, HGLYPH, x + (dx * WGLYPH), y + (dy * HGLYPH), WGLYPH, HGLYPH);
        }
        dx++;
      }
    }
    if (highlight) {
      const bounds: number[] = this.getTextBounds(msg);
      this.ctx.fillStyle = '#dcd36a';
      this.ctx.globalCompositeOperation = 'source-atop';
      this.ctx.fillRect(x, y, bounds[0], bounds[1]);
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.fillStyle = 'black';
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
      case 'í': return Sprites.I;
      case '.': return Sprites.PERIOD;
      case ',': return Sprites.COMMA;
      case '!': return Sprites.EXCLAIM;
      case '?': return Sprites.QUESTION;
      case '+': return Sprites.PLUS;
      case '-': return Sprites.MINUS;
      case '\'': return Sprites.APOSTROPHE;
      case '/': return Sprites.SLASH;
      case '%': return Sprites.PERCENT;
      case ':': return Sprites.COLON;
    }
    throw new Error(`No font glyph for character '${char}'`);
  }
}
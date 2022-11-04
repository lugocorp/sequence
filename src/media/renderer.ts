/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */
import { WIDTH, HEIGHT, WGLYPH, HGLYPH, WTEXT } from '../enums/values';
import { colors } from '../enums/colors';
import Sprites from '../enums/sprites';
import Glyphs from '../serial/glyphs';
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
  dark: number;

  constructor(canvas: HTMLCanvasElement, assets: GraphicsLoader) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.assets = assets;
    this.dark = 0;
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
    this.scale = screenHeight / HEIGHT;
    if (WIDTH * this.scale > screenWidth) {
      this.scale = screenWidth / WIDTH;
    }
    this.scale = Math.round(this.scale * 1000) / 1000;
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
      const background: number = Game.game.getBackground();
      if (background !== Sprites.NONE) {
        this.drawSprite(background, 12, 3);
      }
      const c: DrawCoords = this.assets.getSprite(view.image);
      this.drawSprite(view.image, (100 - c.width) / 2 + 12, (100 - c.height) / 2 + 3);
    }
    this.ctx.lineWidth = 1;
    this.ctx.rect(11, 2, 102, 1);
    this.ctx.rect(11, 103, 102, 1);
    this.ctx.rect(11, 2, 1, 102);
    this.ctx.rect(112, 2, 1, 102);
    this.ctx.fill();
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
      const actionCoords: [number, number] = view.getActionCoords(0);
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
        this.drawSprite(sprite1, a * WGLYPH + 2, 190);
        this.drawSprite(sprite2, a * WGLYPH + 2, top);
      }
      for (let a = 0; a < view.actions.length; a++) {
        const action: Action = view.actions[a];
        const coords: [number, number] = view.getActionCoords(a);
        this.drawText(action.label, coords[0], coords[1], true);
        this.drawSprite(Sprites.LINE_VERT, 2, coords[1] * HGLYPH + 102);
        this.drawSprite(Sprites.LINE_VERT, 23 * WGLYPH + 2, coords[1] * HGLYPH + 102);
      }
    }
    if (this.dark) {
      this.ctx.globalAlpha = this.dark / 100;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalAlpha = 1.0;
    }
  }

  // Converts text coords to display coords
  toDisplayCoords(tx: number, ty: number): [number, number] {
    return [ tx * WGLYPH + 2, ty * HGLYPH + 104 ];
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
  getTextBounds(msg: string): [number, number] {
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
  drawText(text: string, tx: number, ty: number, clickable = false): void {
    // Calculate colored character indices
    const colorIndices: Record<number, string> = {};
    let lastIndex = 0;
    while (lastIndex < text.length && text.substring(lastIndex).indexOf('#') !== -1) {
      lastIndex += text.substring(lastIndex).indexOf('#');
      colorIndices[lastIndex - 2 * Object.values(colorIndices).length] =
        colors[parseInt(text[++lastIndex])];
    }

    // Position and render actual text
    const msg = text.replace(/#./g, ''); // Replace color coded string with just visible characters
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
          const glyph: Sprites = Glyphs.getGlyph(msg[a]);
          const c: DrawCoords = this.assets.getSprite(glyph);
          this.ctx.imageSmoothingEnabled = false;
          this.ctx.drawImage(
            c.src,
            c.left,
            c.top,
            WGLYPH,
            HGLYPH,
            x + dx * WGLYPH,
            y + dy * HGLYPH,
            WGLYPH,
            HGLYPH
          );
          // Highlight specified characters
          if (colorIndices[a]) {
            this.ctx.fillStyle = colorIndices[a];
            this.ctx.globalCompositeOperation = 'source-atop';
            this.ctx.fillRect(x + dx * WGLYPH, y + dy * HGLYPH, WGLYPH, HGLYPH);
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.fillStyle = 'black';
          }
        }
        dx++;
      }
    }
    if (highlight) {
      const bounds: [number, number] = this.getTextBounds(msg);
      this.ctx.fillStyle = '#dcd36a';
      this.ctx.globalCompositeOperation = 'source-atop';
      this.ctx.fillRect(x, y, bounds[0], bounds[1]);
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.fillStyle = 'black';
    }
  }
}

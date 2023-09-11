/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */
import { WIDTH, HEIGHT, WGLYPH, HGLYPH, WTEXT, PADDING } from '../../types';
import { HTML5GraphicsLoader, DrawCoords } from './loader';
import Glyphs from '../glyphs';
import Graphics from '../graphics';
import { colors } from '../colors';
import Sprites from '../sprites';
import Action from '../../ui/action';
import { View } from '../../ui/view';
import Game from '../../game';

export default class HTML5Graphics extends Graphics {
  private assets: HTML5GraphicsLoader = new HTML5GraphicsLoader();
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor() {
    super();
    this.scale = 1;
    this.dark = 0;
  }

  setup() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  async loadInitialAsset(): Promise<void> {
    await this.assets.loadInitialAsset();
  }

  async loadAssets(): Promise<void> {
    await this.assets.loadAssets();
  }

  /*
   * Scales the canvas to be an integer multiple of the base resolution value,
   * whatever will fit the device screen. For a list of commonly used mobile
   * device resolutions, see here:
   * https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
   */
  setSize(): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.ctx.scale(1 / this.scale, 1 / this.scale);
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
  frame(game: Game): void {
    const view: View = game.views.getView();
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (!view) {
      this.drawSprite(Sprites.LOADING, 25, 96);
      return;
    }
    if (view.image) {
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
      this.drawText(game, text, 0, 0);
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
      const top = this.toDisplayCoords(0, actionCoords[1])[1];
      for (let a = 0; a < WTEXT; a++) {
        this.drawSprite(Sprites.LINE_HORT, a * WGLYPH + PADDING, top);
      }
      for (let a = 0; a < view.actions.length; a++) {
        const action: Action = view.actions[a];
        const coords: [number, number] = view.getActionCoords(a);
        this.drawText(game, action.label, coords[0], coords[1], true);
      }
    }
    if (this.dark) {
      this.ctx.globalAlpha = this.dark / 100;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalAlpha = 1.0;
    }
  }

  /*
   * This method draws a single sprite from a 3-byte hexadecimal.
   */
  private drawSprite(id: number, x: number, y: number): void {
    if (id === Sprites.NONE) {
      return;
    }
    const c: DrawCoords = this.assets.getSprite(id);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(c.src, c.left, c.top, c.width, c.height, x, y, c.width, c.height);
  }

  /*
   * This method draws some text using the custom in-game font.
   * x and y are given in units of text glyph position
   */
  private drawText(game: Game, text: string, tx: number, ty: number, clickable = false): void {
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
    const highlight = clickable && game.within(msg, x, y, true);
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
            this.ctx.fillStyle = '#10121c';
          }
        }
        dx++;
      }
    }
    if (highlight) {
      const bounds: [number, number] = this.getTextBounds(msg);
      this.ctx.fillStyle = '#8c78a5';
      this.ctx.globalCompositeOperation = 'source-atop';
      this.ctx.fillRect(x, y + 1, bounds[0], bounds[1] - 1);
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.fillStyle = '#000000';
    }
  }
}

/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */
import Sprites from '../enums/sprites';
import DrawCoords from './draw-coords';
import GraphicsLoader from './loader';

export default class GraphicsRenderer {
  static WIDTH = 100;
  static HEIGHT = 200;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  assets: GraphicsLoader;
  inverse: number;
  ratio: number;
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
    this.ratio = Math.floor(screenHeight / GraphicsRenderer.HEIGHT);
    if (GraphicsRenderer.WIDTH * this.ratio > screenWidth) {
      this.ratio = Math.floor(screenWidth / GraphicsRenderer.WIDTH);
    }
    this.canvas.height = GraphicsRenderer.HEIGHT * this.ratio;
    this.canvas.width = GraphicsRenderer.WIDTH * this.ratio;
    this.inverse = 1 / this.ratio;
  }

  /*
   * This method draws a single frame of the app.
   */
  frame(): void {
    this.ctx.scale(this.ratio, this.ratio);
    // Do something here
    this.drawSprite(0x020100, 2, 2); // Image
    this.drawSprite(Sprites.SPEED, 64, 3);
    this.drawText('2', 82, 4);
    this.drawSprite(Sprites.SHIELD, 64, 15);
    this.drawText('1', 82, 16);
    this.drawSprite(Sprites.DAMAGE, 64, 27);
    this.drawText('4', 82, 28);
    this.drawSprite(Sprites.LIFE, 64, 39);
    this.drawSprite(Sprites.DEATH, 76, 39);
    this.drawSprite(Sprites.WATER, 88, 39);
    this.drawSprite(Sprites.FIRE, 64, 51);
    this.drawSprite(Sprites.GROUND, 76, 51);
    this.drawSprite(Sprites.ELECTRIC, 88, 51);
    this.drawText('toxic sludge', 2, 65);
    this.drawSprite(Sprites.HEALTH, 76, 64);
    this.drawText('99', 88, 65);
    this.drawText('weak', 7, 77);
    this.drawSprite(Sprites.LIFE, 33, 76);
    this.drawSprite(Sprites.DEATH, 44, 76);
    this.drawSprite(Sprites.WATER, 55, 76);
    this.drawSprite(Sprites.FIRE, 66, 76);
    this.drawSprite(Sprites.GROUND, 77, 76);
    this.drawSprite(Sprites.ELECTRIC, 88, 76);
    this.drawText('resist', 2, 89);
    this.drawSprite(Sprites.LIFE, 33, 88);
    this.drawSprite(Sprites.DEATH, 44, 88);
    this.drawSprite(Sprites.WATER, 55, 88);
    this.drawSprite(Sprites.FIRE, 66, 88);
    this.drawSprite(Sprites.GROUND, 77, 88);
    this.drawSprite(Sprites.ELECTRIC, 88, 88);
    this.drawText('ability name', 2, 100);
    this.drawParagraph('this is an ability that is really just used for testing. yep, nothing much to see here in this ability!', 2, 110);
    this.ctx.scale(this.inverse, this.inverse);
  }

  /*
   * This method draws a single sprite from a 3-byte hexadecimal.
   */
  drawSprite(id: number, x: number, y: number): void {
    const c: DrawCoords = this.assets.getSprite(id);
    this.ctx.drawImage(c.src, c.left, c.top, c.width, c.height, x, y, c.width, c.height);
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
    }
    throw new Error(`No font glyph for character '${char}'`);
  }

  /*
   * This method draws some text using the custom in-game font.
   */
  drawText(msg: string, x: number, y: number): void {
    for (let a = 0; a < msg.length; a++) {
      if (msg[a] !== ' ') {
        const glyph: Sprites = this.getGlyph(msg[a]);
        const c: DrawCoords = this.assets.getSprite(glyph);
        this.ctx.drawImage(c.src, c.left, c.top, c.width, c.height, x + (a * c.width), y, c.width, c.height);
      }
    }
  }

  /*
   * This method invokes drawText to render long text in a
   * word-wrapped format.
   */
  drawParagraph(msg: string, x: number, y: number, max: number = 19): void {
    const words: string[] = msg.split(' ');
    let line: string = words.splice(0, 1)[0];
    let index: number = 0;
    while (line.length) {
      while (words.length && line.length + words[0].length + 1 <= max) {
        line = `${line} ${words.splice(0, 1)[0]}`;
      }
      this.drawText(line, x, y + (index * 8));
      line = words.length ? words.splice(0, 1)[0]: '';
      index++;
    }
  }
}
/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */
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
    this.drawSprite(0x000100, 10, 10);
    this.ctx.scale(this.inverse, this.inverse);
  }

  /*
   * This method draws a single sprite from a 3-byte hexadecimal.
   */
  drawSprite(id: number, x: number, y: number): void {
    const c: DrawCoords = this.assets.getSprite(id);
    this.ctx.drawImage(c.src, c.left, c.top, c.width, c.height, x, y, c.width, c.height);
  }
}
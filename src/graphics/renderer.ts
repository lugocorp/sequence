/*
 * This class handles working with the HTML5 canvas to render game elements.
 * Use it whenever you have to interact with the game canvas.
 */

export default class GraphicsRenderer {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }

    /*
     * Scales the canvas to be an integer multiple of the base resolution value,
     * whatever will fit the device screen. For a list of commonly used mobile
     * device resolutions, see here:
     * https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
     */
    setCanvasSize(): void {
        const unitWidth = 100;
        const unitHeight = 200;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        let ratio = Math.floor(screenHeight / unitHeight);
        if (unitWidth * ratio > screenWidth) {
            ratio = Math.floor(screenWidth / unitWidth);
        }
        this.canvas.height = unitHeight * ratio;
        this.canvas.width = unitWidth * ratio;
    }
}
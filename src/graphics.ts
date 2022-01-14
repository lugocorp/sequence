
export default class Graphics {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }

    // https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
    setCanvasSize() {
        const screenHeight = 750;
        const screenWidth = 500;
        const unitHeight = 300;
        const unitWidth = 200;
        let ratio = Math.floor(screenHeight / unitHeight);
        if (unitWidth * ratio > screenWidth) {
            ratio = Math.floor(screenWidth / unitWidth);
        }
        this.canvas.height = unitHeight * ratio;
        this.canvas.width = unitWidth * ratio;
    }
}

export default class Graphics {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    placeholder: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }

    // https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
    setCanvasSize(): void {
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

    // Loads every spritesheet
    async loadSheets(): Promise<void> {
        this.placeholder = new Image();
        await new Promise((resolve) => {
            this.placeholder.src = './assets/placeholder.jpeg';
            this.placeholder.onload = resolve;
        });
    }

    // Grabs a sprite from the spritesheet
    getSprite(id: number): HTMLImageElement {
        const sheet: number = id >> 16;
        const x = (id - sheet << 16) >> 8;
        const y = (id - sheet << 16) - x << 8;
        return this.placeholder;
    }
}
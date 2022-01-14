import Graphics from './graphics';

export default class Game {
    graphics: Graphics;

    start(): void {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        this.graphics = new Graphics(canvas);
        this.graphics.setCanvasSize();
    }
}
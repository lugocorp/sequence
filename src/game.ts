import GraphicsRenderer from './graphics/renderer';
import GraphicsLoader from './graphics/loader';

export default class Game {
    renderer: GraphicsRenderer;
    assets: GraphicsLoader;

    // Initializes the game object so the player can start interacting with it
    async start(): Promise<void> {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        this.renderer = new GraphicsRenderer(canvas);
        this.assets = new GraphicsLoader();
        this.renderer.setCanvasSize();
        // Display some sort of loading screen here
        await this.assets.loadAssets();
    }
}
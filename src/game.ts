import GraphicsRenderer from './graphics/renderer';
import GraphicsLoader from './graphics/loader';
import DataManager from './data/manager';

export default class Game {
    renderer: GraphicsRenderer;
    assets: GraphicsLoader;
    data: DataManager;

    // Initializes the game object so the player can start interacting with it
    async start(): Promise<void> {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        this.renderer = new GraphicsRenderer(canvas);
        this.assets = new GraphicsLoader();
        this.data = new DataManager();
        this.renderer.setCanvasSize();
        // Display some sort of loading screen here
        await this.assets.loadAssets();
        this.data.index();
    }
}
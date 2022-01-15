import GraphicsRenderer from './graphics/renderer';
import GraphicsLoader from './graphics/loader';
import DataManager from './data/manager';

export default class Game {
    renderer: GraphicsRenderer;
    assets: GraphicsLoader;
    data: DataManager;
    party: Party;

    // Initializes the game object so the player can start interacting with it
    async start(): Promise<void> {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        this.renderer = new GraphicsRenderer(canvas);
        this.assets = new GraphicsLoader();
        this.data = new DataManager();
        this.party = new Party();
        this.renderer.setCanvasSize();

        // Load and setup game assets (with a loading screen)
        await this.assets.loadAssets();
        this.data.index();
    }
}
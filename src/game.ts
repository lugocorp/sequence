import GraphicsRenderer from './graphics/renderer';
import GraphicsLoader from './graphics/loader';
import DataManager from './serial/manager';
import Party from './entities/party';
import GameView from './views/game';
import View from './views/view';

export default class Game {
  static game: Game;
  renderer: GraphicsRenderer;
  assets: GraphicsLoader;
  data: DataManager;
  party: Party;

  // Initializes the game object so the player can start interacting with it
  async start(): Promise<void> {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.assets = new GraphicsLoader();
    this.renderer = new GraphicsRenderer(canvas, this.assets);
    this.data = new DataManager();
    this.party = new Party();
    this.renderer.setCanvasSize();

    // Load and setup game assets (with a loading screen)
    await this.assets.loadAssets();
    this.data.index();
    // Loading has completed
    const view: View = new GameView();
    this.renderer.frame(view);
  }
}
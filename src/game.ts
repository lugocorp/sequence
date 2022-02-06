import GraphicsRenderer from './graphics/renderer';
import GraphicsLoader from './graphics/loader';
import DataManager from './serial/manager';
import EventChain from './events/chain';
import Party from './entities/party';
import GameView from './views/game';
import View from './views/view';

export default class Game {
  static game: Game;
  renderer: GraphicsRenderer;
  assets: GraphicsLoader;
  chain: EventChain;
  data: DataManager;
  party: Party;
  view: View;

  constructor() {
    this.assets = new GraphicsLoader();
    this.chain = new EventChain();
    this.data = new DataManager();
    this.party = new Party();
  }

  // Initializes the game object so the player can start interacting with it
  async start(): Promise<void> {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.renderer = new GraphicsRenderer(canvas, this.assets);
    this.renderer.setCanvasSize();
    // Load and setup game assets (with a loading screen)
    await this.assets.loadAssets();
    this.data.index();
    // Loading has completed
    this.view = new GameView(this.chain);
    this.invalidate();
  }

  // Tells the game to render a new frame
  invalidate(): void {
    this.renderer.frame(this.view);
  }

  // Alerts the current view of a click event
  click(x: number, y: number, down: boolean): void {
    if (this.view) {
      this.view.click(x, y, down);
    }
  }
}
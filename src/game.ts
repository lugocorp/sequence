import GraphicsRenderer from './graphics/renderer';
import GraphicsLoader from './graphics/loader';
import DataManager from './serial/manager';
import EventChain from './events/chain';
import Party from './entities/party';
import LoadingView from './views/loading';
import StartView from './views/start';
import View from './views/view';

export default class Game {
  static game: Game;
  currentClick: {x: number, y: number, down: boolean};
  renderer: GraphicsRenderer;
  assets: GraphicsLoader;
  chain: EventChain;
  data: DataManager;
  party: Party;
  view: View;

  constructor() {
    this.currentClick = {x: 0, y: 0, down: false};
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
    await this.assets.loadInitialAsset();
    this.view = new LoadingView();
    this.invalidate();
    await this.assets.loadAssets();
    this.data.index();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    // Loading has completed
    this.party.add(this.data.getRandomHero());
    this.party.add(this.data.getRandomHero());
    this.party.add(this.data.getRandomHero());
    this.view = new StartView();
    this.invalidate();
  }

  // Tells the game to render a new frame
  invalidate(): void {
    this.renderer.frame(this.view);
  }

  // Progresses to the next event in the game
  progress(): void {
    if (!this.party.length() || this.chain.events.length === 1) {
      this.chain.plan(this.chain.events[0]);
    }
    this.chain.events.splice(0, 1);
    this.invalidate();
  }

  // Alerts the current view of a click event
  click(x: number, y: number, down: boolean): void {
    if (this.view) {
      this.currentClick = {x, y, down};
      this.view.click();
      this.invalidate();
    }
  }

  // Returns true if the current click happened inside this text
  within(msg: string, x: number, y: number): boolean {
    return !this.currentClick.down &&
      this.currentClick.x >= x &&
      this.currentClick.y >= y &&
      this.currentClick.x <= x + (msg.length * 5) &&
      this.currentClick.y <= y + 8;
  }
}
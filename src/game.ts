import GraphicsRenderer from './graphics/renderer';
import GraphicsLoader from './graphics/loader';
import DataManager from './serial/manager';
import EventChain from './logic/chain';
import Party from './entities/party';
import StartView from './views/start';
import View from './graphics/view';
import {GLYPH_W, GLYPH_H} from './enums/values';

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
    this.view = this.chain.latest();
    this.invalidate();
  }

  // Alerts the current view of a click event
  click(x: number, y: number, down: boolean): void {
    if (this.view) {
      this.currentClick = {x, y, down};
      if (this.view.hasActions()) {
        for (let a = 0; a < this.view.actions.length; a++) {
          const action = this.view.actions[a];
          const precoords: number[] = this.view.getActionCoords(a);
          const coords: number[] = this.renderer.toDisplayCoords(precoords[0], precoords[1]);
          if (this.within(action.label, coords[0], coords[1])) {
            action.effect();
            break;
          }
        }
      }
      if (this.view.hasOptions()) {
        if (this.view.selector.index > 0 && this.within('a', 3, 46)) {
          this.view.selector.index--;
        }
        if (this.view.selector.index < this.view.selector.size() && this.within('a', 116, 46)) {
          this.view.selector.index++;
        }
      }
      this.invalidate();
    }
  }

  // Returns true if the current click happened inside this text
  within(msg: string, x: number, y: number, down = false): boolean {
    return this.currentClick.down === down &&
      this.currentClick.x >= x &&
      this.currentClick.y >= y &&
      this.currentClick.x <= x + (msg.length * GLYPH_W) &&
      this.currentClick.y <= y + GLYPH_H;
  }
}
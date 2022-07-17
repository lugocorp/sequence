import {DAY_NIGHT_CYCLE, World, Weather, Time} from './enums/world';
import GraphicsRenderer from './media/renderer';
import GraphicsLoader from './media/loader';
import GameAudio from './media/audio';
import DataManager from './serial/manager';
import FutureEvent from './logic/future';
import EventChain from './logic/chain';
import Party from './entities/party';
import TimeEvent from './views/events/time';
import StartView from './views/start';
import View from './ui/view';

export default class Game {
  static game: Game;
  currentClick: {x: number, y: number, down: boolean};
  renderer: GraphicsRenderer;
  assets: GraphicsLoader;
  chain: EventChain;
  data: DataManager;
  audio: GameAudio;
  world: World;
  party: Party;
  view: View;

  constructor() {
    this.currentClick = {x: 0, y: 0, down: false};
    this.assets = new GraphicsLoader();
    this.chain = new EventChain();
    this.data = new DataManager();
    this.audio = new GameAudio();
    this.party = new Party();
    this.world = {
      weather: Weather.SUN,
      time: Time.DAY
    };
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
    await this.audio.loadAudio();
    this.data.index();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Loading has completed
    for (let a = 0; a < Party.MAX; a++) {
      this.party.add(this.data.getRandomHero());
    }
    Game.futureEvent(new TimeEvent(), DAY_NIGHT_CYCLE);
    this.view = new StartView();
    this.invalidate();
  }

  // Tells the game to render a new frame
  invalidate(): void {
    this.renderer.frame(this.view);
  }

  // Sets the current view of the game
  static setView(view: View): void {
    Game.game.view = view;
    view.init();
  }

  // Queues a FutureEvent
  static futureEvent(view: View, turns: number, valid?: () => boolean): void {
    Game.game.chain.futures.push(new FutureEvent(view, turns, valid));
  }

  // Progresses to the next event in the game
  progress(): void {
    if (!this.party.length() || this.chain.events.length === 1) {
      this.chain.plan();
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
          const actionCoords: number[] = this.view.getActionCoords(a);
          const coords: number[] = this.renderer.toDisplayCoords(actionCoords[0], actionCoords[1]);
          if (this.within(action.label, coords[0], coords[1])) {
            this.audio.play(GameAudio.CLICK);
            action.effect();
            break;
          }
        }
      }
      if (this.view.hasOptions()) {
        if (this.view.selector.index > 0 && this.bounded(0, 0, 12, 100)) {
          this.audio.play(GameAudio.CLICK);
          this.view.selector.index--;
          this.view.selector.invalidate();
        }
        if (this.view.selector.index < this.view.selector.size() - 1 && this.bounded(112, 0, 12, 100)) {
          this.audio.play(GameAudio.CLICK);
          this.view.selector.index++;
          this.view.selector.invalidate();
        }
      }
      this.invalidate();
    }
  }

  // Returns true if the current click happened inside the given rectangle
  bounded(x: number, y: number, w: number, h: number, down = false): boolean {
    return this.currentClick.down === down &&
      this.currentClick.x >= x &&
      this.currentClick.y >= y &&
      this.currentClick.x <= x + w &&
      this.currentClick.y <= y + h;
  }

  // Returns true if the current click happened inside this text
  within(msg: string, x: number, y: number, down = false): boolean {
    const bounds = this.renderer.getTextBounds(msg);
    return this.bounded(x, y, bounds[0], bounds[1], down);
  }
}
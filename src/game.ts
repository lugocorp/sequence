import { DAY_NIGHT_CYCLE, World, Weather, Time } from './enums/world';
import { TriggerType } from './enums/triggers';
import Sprites from './enums/sprites';
import GraphicsRenderer from './media/renderer';
import GraphicsLoader from './media/loader';
import GameAudio from './media/audio';
import History from './media/history';
import DataManager from './serial/manager';
import FutureEvent from './logic/future';
import EventChain from './logic/chain';
import Party from './entities/party';
import TimeEvent from './views/events/time';
import StartView from './views/start';
import { EventView } from './views/event';
import View from './ui/view';

export default class Game {
  private view: View;
  currentClick: { x: number; y: number; down: boolean };
  score: number;
  world: World;

  constructor(
    private renderer: GraphicsRenderer,
    private assets: GraphicsLoader,
    private chain: EventChain,
    private data: DataManager,
    private history: History,
    private audio: GameAudio,
    private party: Party
  ) {
    this.currentClick = { x: 0, y: 0, down: false };
  }

  // Initializes the game object so the player can start interacting with it
  async start(): Promise<void> {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.renderer.setup(canvas, this.assets);
    this.renderer.setCanvasSize();

    // Load and setup game assets (with a loading screen)
    await this.assets.loadInitialAsset();
    this.invalidate();
    await this.history.initialize();
    await this.assets.loadAssets();
    await this.audio.loadAudio();
    this.data.index();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.audio.play(GameAudio.STARTUP);

    // Loading has completed
    this.setView(new StartView());
    this.invalidate();
  }

  // Sets initial game state
  setInitialState(): void {
    this.history.clear();
    this.chain.clear();
    this.party.clear();
    this.world = {
      weather: Weather.SUN,
      time: Time.DAY,
      cave: false
    };
    this.party.populate('bird catcher');
    this.futureEvent(new TimeEvent(), DAY_NIGHT_CYCLE);
  }

  // Tells the game to render a new frame
  invalidate(): void {
    this.renderer.frame(this.view);
  }

  // Protected access to the current View
  getView(): View {
    return this.view;
  }

  // Returns the current view if it's an event
  get event(): EventView {
    return this.view['label'] ? (this.view as EventView) : null;
  }

  // Sets the current view of the game
  setView(view: View): void {
    this.view = view;
    view.init();
  }

  // Queues a FutureEvent
  futureEvent(view: EventView, turns: number, valid?: () => boolean): void {
    this.chain.futures.push(new FutureEvent(view, turns, valid));
  }

  getBackground(includeCave = false): Sprites {
    if (includeCave && this.world.cave) {
      return Sprites.CAVE_INSIDE;
    }
    if (this.world.time === Time.NIGHT) {
      return Sprites.NIGHT;
    }
    switch (this.world.weather) {
      case Weather.RAIN:
        return Sprites.RAIN;
      case Weather.WIND:
        return Sprites.WIND;
      case Weather.SNOW:
        return Sprites.SNOW;
      default:
        return Sprites.SUN;
    }
  }

  // Progresses to the next event in the game
  async progress(): Promise<void> {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 10));
    for (this.renderer.dark = 0; this.renderer.dark < 100; this.renderer.dark += 20) {
      this.invalidate();
      await wait();
    }
    this.invalidate();
    for (const hero of this.party.members) {
      hero.basket.activate({
        type: TriggerType.AFTER_EVENT
      });
    }
    if (this.party.length() && this.chain.events.length === 1) {
      this.chain.plan();
    }
    this.chain.events.splice(0, 1);
    this.setView(this.chain.latest());
    for (this.renderer.dark = 100; this.renderer.dark > 0; this.renderer.dark -= 20) {
      this.invalidate();
      await wait();
    }
    this.invalidate();
  }

  // Alerts the current view of a click event
  click(x: number, y: number, down: boolean): void {
    if (this.view) {
      this.currentClick = { x, y, down };
      if (!down && this.view.hasActions()) {
        for (let a = 0; a < this.view.actions.length; a++) {
          const action = this.view.actions[a];
          const actionCoords: [number, number] = this.view.getActionCoords(a);
          const coords: [number, number] = this.renderer.toDisplayCoords(
            actionCoords[0],
            actionCoords[1]
          );
          if (this.within(action.label, coords[0], coords[1])) {
            this.audio.play(GameAudio.OPTION);
            action.effect();
            break;
          }
        }
      }
      if (!down && this.view.hasOptions()) {
        if (this.view.selector.index > 0 && this.bounded(0, 0, 12, 100)) {
          this.audio.play(GameAudio.ARROW);
          this.view.selector.index--;
          this.view.selector.invalidate();
        }
        if (
          this.view.selector.index < this.view.selector.size() - 1 &&
          this.bounded(112, 0, 12, 100)
        ) {
          this.audio.play(GameAudio.ARROW);
          this.view.selector.index++;
          this.view.selector.invalidate();
        }
      }
      this.invalidate();
    }
  }

  // Returns true if the current click happened inside the given rectangle
  bounded(x: number, y: number, w: number, h: number, down = false): boolean {
    return (
      this.currentClick.down === down &&
      this.currentClick.x >= x &&
      this.currentClick.y >= y &&
      this.currentClick.x < x + w &&
      this.currentClick.y < y + h
    );
  }

  // Returns true if the current click happened inside this text
  within(msg: string, x: number, y: number, down = false): boolean {
    const bounds = this.renderer.getTextBounds(msg);
    return this.bounded(x, y, bounds[0], bounds[1], down);
  }
}

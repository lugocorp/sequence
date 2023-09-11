import { DAY_NIGHT_CYCLE, World, Weather, Time } from './types';
import ViewManager from './ui/manager';
import View from './ui/view';
import Graphics from './media/graphics';
import GameAudio from './media/audio';
import HistoryManager from './media/history';
import DataManager from './logic/data';
import EventChain from './logic/chain';
import Party from './entities/party';
import TimeEvent from './views/events/time';
import StartView from './views/start';

export default class Game {
  views: ViewManager = new ViewManager();
  chain: EventChain;
  data: DataManager;
  party: Party;
  currentClick: { x: number; y: number; down: boolean };
  score: number;
  world: World;

  constructor(private graphics: Graphics, public audio: GameAudio, public history: HistoryManager) {
    this.currentClick = { x: 0, y: 0, down: false };
    this.audio = audio;
  }

  // Initializes the game object so the player can start interacting with it
  async start(): Promise<void> {
    this.chain = new EventChain(this);
    this.data = new DataManager(this);
    this.party = new Party(this);

    // Set up canvas then load game assets (with a loading screen)
    this.graphics.setup();
    this.graphics.setSize();
    await this.graphics.loadInitialAsset();
    this.graphics.frame(this);
    await this.history.initialize();
    await this.graphics.loadAssets();
    await this.audio.loadAudio();
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.audio.play(GameAudio.STARTUP);
    this.chain.setup();

    // Loading has completed
    this.views.setView(new StartView(this));
    this.graphics.frame(this);
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
    this.party.populate();
    this.chain.futureEvent(new TimeEvent(this), DAY_NIGHT_CYCLE);
  }

  // Progresses to the next event in the game
  async progress(): Promise<void> {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 10));
    for (this.graphics.dark = 0; this.graphics.dark < 100; this.graphics.dark += 20) {
      this.graphics.frame(this);
      await wait();
    }
    this.graphics.frame(this);
    if (this.party.size && this.chain.events.length === 1) {
      this.chain.plan();
    }
    this.chain.events.splice(0, 1);
    this.views.setView(this.chain.latest());
    for (this.graphics.dark = 100; this.graphics.dark > 0; this.graphics.dark -= 20) {
      this.graphics.frame(this);
      await wait();
    }
    this.graphics.frame(this);
  }

  // Alerts the current view of a click event
  click(x: number, y: number, down: boolean): void {
    const view: View = this.views.getView();
    if (!view) {
      return;
    }
    this.currentClick = { x, y, down };
    if (!down) {
      for (const [label, effect] of Object.entries(view.actions)) {
        const actionCoords: [number, number] = view.getActionCoords(a);
        const coords: [number, number] = this.graphics.toDisplayCoords(
          actionCoords[0],
          actionCoords[1]
        );
        if (this.within(label, coords[0], coords[1])) {
          this.audio.play(GameAudio.OPTION);
          effect();
          break;
        }
      }

      if (this.views.hasOptions() && ((this.bounded(0, 0, 12, 100) && this.views.changeOption(-1)) || (this.bounded(112, 0, 12, 100) && this.views.changeOption(1)))) {
        this.audio.play(GameAudio.ARROW);
      }
    }
    this.graphics.frame(this);
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
    const bounds = this.graphics.getTextBounds(msg);
    return this.bounded(x, y, bounds[0], bounds[1], down);
  }
}

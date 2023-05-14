/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
import { Time } from '../enums/world';
import { Trigger, TriggerType } from '../enums/triggers';
import { EventView } from '../views/event';
import SkinwalkerEvent from '../views/events/skinwalker';
import ThreeSistersEvent from '../views/events/sisters';
import MedicineManEvent from '../views/events/medicine';
import TricksterEvent from '../views/events/trickster';
import ChallengeEvent from '../views/events/challenge';
import OfferingEvent from '../views/events/offering';
import ObstacleEvent from '../views/events/obstacle';
import RecruitEvent from '../views/events/recruit';
import WeatherEvent from '../views/events/weather';
import ProjectEvent from '../views/events/project';
import FatigueEvent from '../views/events/fatigue';
import AnimalEvent from '../views/events/animal';
import ThiefEvent from '../views/events/thief';
import DeathEvent from '../views/events/death';
import BeginEvent from '../views/events/begin';
import DreamEvent from '../views/events/dream';
import TradeEvent from '../views/events/trade';
import RapidEvent from '../views/events/rapid';
import PlantEvent from '../views/events/plant';
import TreeEvent from '../views/events/tree';
import GiftEvent from '../views/events/gift';
import TrapEvent from '../views/events/trap';
import DeerEvent from '../views/events/deer';
import CaveEvent from '../views/events/cave';
import Party from '../entities/party';
import FutureEvent from './future';
import Random from './random';
import Game from '../game';

type EventGenerator = (game: Game) => EventView;

export default class EventChain {
  private previouslyPlanned: string;
  futures: FutureEvent[] = [];
  events: EventView[];

  constructor(private readonly game: Game) {}

  setup() {
    this.events = [ new BeginEvent(this.game) ];
  }

  /*
   * This function returns the roll table for the next event
   */
  private getEventRollTable(): [number, EventGenerator][] {
    let table: [number, EventGenerator][] = [
      [ 35, (game: Game) => new ChallengeEvent(game) ], // 35
      [ 8, (game: Game) => new WeatherEvent(game) ], // 43
      [ 6, (game: Game) => new TrapEvent(game) ], // 49
      [ 5, (game: Game) => new ObstacleEvent(game) ], // 54
      [ 5, (game: Game) => new OfferingEvent(game) ], // 59
      [ 5, (game: Game) => new GiftEvent(game) ], // 64
      [ 4, (game: Game) => new PlantEvent(game) ], // 68
      [ 4, (game: Game) => new ProjectEvent(game) ], // 72
      [ 4, (game: Game) => new RapidEvent(game) ], // 76
      [ 3, (game: Game) => new AnimalEvent(game) ], // 79
      [ 3, (game: Game) => new TradeEvent(game) ], // 82
      [ 3, (game: Game) => new MedicineManEvent(game) ], // 85
      [ 3, (game: Game) => new TreeEvent(game) ], // 88
      [ 3, (game: Game) => new RecruitEvent(game) ], // 91
      [ 2, (game: Game) => new DeerEvent(game) ], // 93
      [ 2, (game: Game) => new TricksterEvent(game) ], // 95
      [ 2, (game: Game) => new CaveEvent(game) ], // 97
      [ 2, (game: Game) => new ThiefEvent(game) ], // 99
      [ 1, (game: Game) => new ThreeSistersEvent(game) ] // 100
    ];
    if (this.game.world.cave) {
      table = [
            [ 30, (game: Game) => new ChallengeEvent(game) ], // 30
            [ 20, (game: Game) => new OfferingEvent(game) ], // 50
            [ 20, (game: Game) => new GiftEvent(game) ], // 70
            [ 10, (game: Game) => new TricksterEvent(game) ], // 80
            [ 5, (game: Game) => new AnimalEvent(game) ], // 85
            [ 5, (game: Game) => new ThiefEvent(game) ], // 90
            [ 5, (game: Game) => new WeatherEvent(game) ], // 95
            [ 5, (game: Game) => new SkinwalkerEvent(game) ] // 100
          ];
    }
    if (this.game.world.time === Time.NIGHT) {
      if (!this.game.world.cave) {
        table.push([ 3, (game: Game) => new SkinwalkerEvent(game) ]);
      }
      table.push([ 5, (game: Game) => new DreamEvent(game) ]);
    }
    return table;
  }

  /*
   * This function clears the chain's internal state
   */
  clear(): void {
    this.futures = [];
    this.events = [ new BeginEvent(this.game) ];
  }

  /*
   * This function returns the current event in the sequence.
   */
  latest(): EventView {
    for (const hero of this.game.party.members) {
      if (hero.isFatigued()) {
        return new FatigueEvent(this.game, hero);
      }
    }
    if (!this.game.party.length()) {
      return new DeathEvent(this.game);
    }
    if (!this.events.length) {
      this.plan();
    }
    return this.events[0];
  }

  /*
   * This function plans out future events based on various factors.
   * It's the core algorithm that runs the game, and it basically
   * determines difficulty.
   */
  plan(): void {
    // Tick future events and push if they're ready
    let a = 0;
    let future = false;
    while (a < this.futures.length) {
      const v: EventView = this.futures[a].tick();
      if (v) {
        if (this.futures[a].valid()) {
          this.events.push(v);
          future = true;
        }
        this.futures.splice(a, 1);
      } else {
        a++;
      }
    }
    if (future) {
      return;
    }

    // Roll for the next event
    const event: EventGenerator = (Random.weighted(
      this.getEventRollTable().filter(
        (x: [number, EventGenerator]) =>
          x[1].toString().includes('ChallengeEvent') || x[1].toString() !== this.previouslyPlanned
      )
    ));
    this.previouslyPlanned = event.toString();
    this.events.push(event(this.game));
  }
}

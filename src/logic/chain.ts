/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
import { Time } from '../types';
import EventView from '../views/event';
import PlantingSeasonEvent from '../views/events/plantingseason';
import ThreeSistersEvent from '../views/events/threesisters';
import HungryBadgerEvent from '../views/events/hungrybadger';
import TradingPostEvent from '../views/events/tradingpost';
import BabyPeccaryEvent from '../views/events/babypeccary';
import MedicineManEvent from '../views/events/medicineman';
import YauponHollyEvent from '../views/events/yauponholly';
import SkinwalkerEvent from '../views/events/skinwalker';
import ChallengeEvent from '../views/events/challenge';
import OldBridgeEvent from '../views/events/oldbridge';
import OfferingEvent from '../views/events/offering';
import ProphecyEvent from '../views/events/prophecy';
import CaravanEvent from '../views/events/caravan';
import WeatherEvent from '../views/events/weather';
import FatigueEvent from '../views/events/fatigue';
import VillageEvent from '../views/events/village';
import ForageEvent from '../views/events/forage';
import CliffsEvent from '../views/events/cliffs';
import CoyotlEvent from '../views/events/coyotl';
import RabbitEvent from '../views/events/rabbit';
import RavenEvent from '../views/events/raven';
import DeathEvent from '../views/events/death';
import BeginEvent from '../views/events/begin';
import RiverEvent from '../views/events/river';
import GiftEvent from '../views/events/gift';
import DeerEvent from '../views/events/deer';
import CaveEvent from '../views/events/cave';
import SeedEvent from '../views/events/seed';
import EggEvent from '../views/events/egg';
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

  // Queues a FutureEvent
  futureEvent(view: EventView, turns: number, valid?: () => boolean): void {
    this.futures.push(new FutureEvent(view, turns, valid));
  }

  /*
   * This function returns the roll table for the next event
   */
  private getEventRollTable(): [number, EventGenerator][] {
    let table: [number, EventGenerator][] = [
      [ 35, (game: Game) => new ChallengeEvent(game) ], // 35
      [ 8, (game: Game) => new WeatherEvent(game) ], // 43
      [ 4, (game: Game) => new OfferingEvent(game) ], // 47
      [ 4, (game: Game) => new GiftEvent(game) ], // 51
      [ 4, (game: Game) => new CoyotlEvent(game) ], // 55
      [ 4, (game: Game) => new CliffsEvent(game) ], // 59
      [ 4, (game: Game) => new ForageEvent(game) ], // 63
      [ 3, (game: Game) => new RiverEvent(game) ], // 66
      [ 3, (game: Game) => new PlantingSeasonEvent(game) ], // 69
      [ 3, (game: Game) => new BabyPeccaryEvent(game) ], // 72
      [ 3, (game: Game) => new TradingPostEvent(game) ], // 75
      [ 3, (game: Game) => new CaravanEvent(game) ], // 78
      [ 3, (game: Game) => new HungryBadgerEvent(game) ], // 81
      [ 3, (game: Game) => new EggEvent(game) ], // 84
      [ 2, (game: Game) => new MedicineManEvent(game) ], // 86
      [ 2, (game: Game) => new YauponHollyEvent(game) ], // 88
      [ 2, (game: Game) => new RavenEvent(game) ], // 90
      [ 2, (game: Game) => new RabbitEvent(game) ], // 92
      [ 2, (game: Game) => new SeedEvent(game) ], // 94
      [ 1, (game: Game) => new ProphecyEvent(game) ], // 95
      [ 1, (game: Game) => new DeerEvent(game) ], // 96
      [ 1, (game: Game) => new CaveEvent(game) ], // 97
      [ 1, (game: Game) => new ThreeSistersEvent(game) ], // 98
      [ 1, (game: Game) => new OldBridgeEvent(game) ], // 99
      [ 1, (game: Game) => new VillageEvent(game) ] // 100
    ];
    if (this.game.world.cave) {
      table = [
        [ 30, (game: Game) => new ChallengeEvent(game) ], // 30
        [ 15, (game: Game) => new OfferingEvent(game) ], // 45
        [ 10, (game: Game) => new GiftEvent(game) ], // 55
        [ 10, (game: Game) => new RavenEvent(game) ], // 65
        [ 5, (game: Game) => new ProphecyEvent(game) ], // 70
        [ 5, (game: Game) => new BabyPeccaryEvent(game) ], // 75
        [ 5, (game: Game) => new RabbitEvent(game) ], // 80
        [ 5, (game: Game) => new WeatherEvent(game) ], // 85
        [ 5, (game: Game) => new SkinwalkerEvent(game) ], // 90
        [ 5, (game: Game) => new EggEvent(game) ], // 95
        [ 5, (game: Game) => new HungryBadgerEvent(game) ] // 100
      ];
    }
    if (this.game.world.time === Time.NIGHT && !this.game.world.cave) {
      table.push([ 3, (game: Game) => new SkinwalkerEvent(game) ]);
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
      if (hero.stats.energy === 0) {
        return new FatigueEvent(this.game, hero);
      }
    }
    if (!this.game.party.size) {
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
    const event: EventGenerator = Random.weighted(
      this.getEventRollTable().filter(
        (x: [number, EventGenerator]) =>
          x[1].toString().includes('ChallengeEvent') || x[1].toString() !== this.previouslyPlanned
      )
    );
    this.previouslyPlanned = event.toString();
    this.events.push(event(this.game));
  }
}

// An event to show in the future
class FutureEvent {
  constructor(
    private event: EventView,
    private turns: number,
    public valid: () => boolean = () => true
  ) {}

  tick(): EventView {
    return --this.turns <= 0 ? this.event : undefined;
  }
}

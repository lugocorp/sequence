/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
import ChallengeEvent from '../views/events/challenge';
import OfferingEvent from '../views/events/offering';
import ObstacleEvent from '../views/events/obstacle';
import RecruitEvent from '../views/events/recruit';
import WeatherEvent from '../views/events/weather';
import ProjectEvent from '../views/events/project';
import FatigueEvent from '../views/events/fatigue';
import AnimalEvent from '../views/events/animal';
import DeathEvent from '../views/events/death';
import BeginEvent from '../views/events/begin';
import DreamEvent from '../views/events/dream';
import TradeEvent from '../views/events/trade';
import RapidEvent from '../views/events/rapid';
import PlantEvent from '../views/events/plant';
import GiftEvent from '../views/events/gift';
import TrapEvent from '../views/events/trap';
import FutureEvent from './future';
import { Time } from '../enums/world';
import Random from './random';
import View from '../ui/view';
import Game from '../game';

export default class EventChain {
  private previouslyPlanned: View;
  futures: FutureEvent[] = [];
  events: View[] = [
    new BeginEvent()
  ];

  /*
   * This function returns the roll table for the next event
   */
  private getEventRollTable(): any[][] {
    const table: any[][] = [
      [ 40, ChallengeEvent ],
      [ 15, WeatherEvent ],
      [ 6, OfferingEvent ],
      [ 6, GiftEvent ],
      [ 5, ObstacleEvent ],
      [ 5, RecruitEvent ],
      [ 5, TrapEvent ],
      [ 4, PlantEvent ],
      [ 4, ProjectEvent ],
      [ 4, RapidEvent ],
      [ 3, AnimalEvent ],
      [ 3, TradeEvent ]
    ];
    if (Game.game.world.time === Time.NIGHT) {
      table.push([ 5, DreamEvent ]);
    }
    return table;
  }

  /*
   * This function clears the chain's internal state
   */
  clear(): void {
    this.futures = [];
    this.events = [
      new BeginEvent()
    ];
  }

  /*
   * This function returns the current event in the sequence.
   */
  latest(): View {
    for (const hero of Game.game.party.members) {
      if (hero.isFatigued()) {
        return new FatigueEvent(hero);
      }
    }
    if (!Game.game.party.length()) {
      return new DeathEvent();
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
    while (a < this.futures.length) {
      const v: View = this.futures[a].tick();
      if (v) {
        if (this.futures[a].valid()) {
          this.events.push(v);
        }
        this.futures.splice(a, 1);
      } else {
        a++;
      }
    }

    // Roll for the next event
    const event: View = new (Random.weighted(
      this.getEventRollTable()
        .map((x: any[]): [number, any] => x as [number, any])
        .filter((x: [number, any]) => x[1] === ChallengeEvent || x[1] !== this.previouslyPlanned?.constructor)
    ))();
    this.previouslyPlanned = event;
    this.events.push(event);
  }
}
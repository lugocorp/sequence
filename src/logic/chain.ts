/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
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
import FutureEvent from './future';
import { Time } from '../enums/world';
import Random from './random';
import View from '../ui/view';
import Game from '../game';

export default class EventChain {
  private previouslyPlanned: View;
  futures: FutureEvent[] = [];
  events: View[] = [new BeginEvent()];

  /*
   * This function returns the roll table for the next event
   */
  private getEventRollTable(): any[][] {
    const table: any[][] = [
      [35, ChallengeEvent], // 35
      [8, WeatherEvent], // 43
      [6, OfferingEvent], // 49
      [6, GiftEvent], // 55
      [5, ObstacleEvent], // 60
      [5, RecruitEvent], // 65
      [5, TrapEvent], // 70
      [4, PlantEvent], // 74
      [4, ProjectEvent], // 78
      [4, RapidEvent], // 82
      [3, AnimalEvent], // 85
      [3, TradeEvent], // 88
      [3, MedicineManEvent], // 91
      [3, TreeEvent], // 94
      [2, DeerEvent], // 96
      [1, TricksterEvent], // 97
      [1, ThreeSistersEvent], // 98
      [1, ThiefEvent] // 99
      // [1, CaveEvent], // 100
    ];
    if (Game.game.world.time === Time.NIGHT) {
      table.push([2, SkinwalkerEvent]);
      table.push([5, DreamEvent]);
    }
    return table;
  }

  /*
   * This function clears the chain's internal state
   */
  clear(): void {
    this.futures = [];
    this.events = [new BeginEvent()];
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
    let future = false;
    while (a < this.futures.length) {
      const v: View = this.futures[a].tick();
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
    const event: View = new (Random.weighted(
      this.getEventRollTable()
        .map((x: any[]): [number, any] => x as [number, any])
        .filter(
          (x: [number, any]) =>
            x[1] === ChallengeEvent || x[1] !== this.previouslyPlanned?.constructor
        )
    ))();
    this.previouslyPlanned = event;
    this.events.push(event);
  }
}

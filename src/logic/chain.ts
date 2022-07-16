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
import DeathEvent from '../views/events/death';
import BeginEvent from '../views/events/begin';
import DreamEvent from '../views/events/dream';
import TradeEvent from '../views/events/trade';
import RapidEvent from '../views/events/rapid';
import PlantEvent from '../views/events/plant';
import GiftEvent from '../views/events/gift';
import TrapEvent from '../views/events/trap';
import FutureEvent from './future';
import {Time} from '../enums/world';
import Random from './random';
import View from '../ui/view';
import Game from '../game';

export default class EventChain {
  futures: FutureEvent[] = [];
  events: View[] = [
    new BeginEvent()
  ];

  /*
   * This function returns the current event in the sequence.
   */
  latest(): View {
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

    // Time-specific rolls
    if (Game.game.world.time === Time.NIGHT) {
      const event: () => View = Random.weighted([
        [95, undefined],
        [5,  (): View => new DreamEvent()]
      ]);
      if (event) {
        this.events.push(event());
        return;
      }
    }

    // Basic event roll
    this.events.push(Random.weighted([
      [40, (): View => new ChallengeEvent()],
      [18, (): View => new WeatherEvent()],
      [6,  (): View => new OfferingEvent()],
      [6,  (): View => new GiftEvent()],
      [5,  (): View => new ObstacleEvent()],
      [5,  (): View => new RecruitEvent()],
      [5,  (): View => new TrapEvent()],
      [4,  (): View => new PlantEvent()],
      [4,  (): View => new ProjectEvent()],
      [4,  (): View => new RapidEvent()],
      [3,  (): View => new TradeEvent()]
    ])());
  }
}
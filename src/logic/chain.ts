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
import DeathEvent from '../views/events/death';
import BeginEvent from '../views/events/begin';
import GiftEvent from '../views/events/gift';
import TrapEvent from '../views/events/trap';
import FutureEvent from './future';
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
      this.plan(null);
    }
    return this.events[0];
  }

  /*
   * This function plans out future events based on various factors.
   * It's the core algorithm that runs the game, and it basically
   * determines difficulty.
   */
  plan(previous: View): void {
    if (!previous) {
      this.events.push(new ChallengeEvent());
      return;
    }

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

    // Basic event roll
    this.events.push(Random.weightedList([
      [40, () => new ChallengeEvent()],
      [20, () => new OfferingEvent()],
      [15, () => new GiftEvent()],
      [10, () => new WeatherEvent()],
      [5,  () => new ObstacleEvent()],
      [5,  () => new RecruitEvent()],
      [5,  () => new TrapEvent()]
    ])());
  }
}
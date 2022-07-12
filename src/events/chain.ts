/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
import ChallengeEvent from './challenge';
import OfferingEvent from './offering';
import ObstacleEvent from './obstacle';
import RecruitEvent from './recruit';
import DeathEvent from './death';
import GiftEvent from './gift';
import TrapEvent from './trap';
import Random from '../random';
import View from '../graphics/view';
import Game from '../game';

export default class EventChain {
  events: View[] = [];

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
    this.events.push(Random.weightedList([
      [40, () => new ChallengeEvent()],
      [25, () => new OfferingEvent()],
      [5,  () => new ObstacleEvent()],
      [5,  () => new RecruitEvent()],
      [20, () => new GiftEvent()],
      [5,  () => new TrapEvent()]
    ])());
  }
}
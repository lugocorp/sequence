/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
import DeathEvent from './death';
import Event from './event';
import Game from '../game';

export default class EventChain {
  events: Event[] = [];

  /*
   * This function returns the current event in the sequence.
   */
  latest(): Event {
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
  plan(previous: Event): void {
    if (!previous) {
      this.events.push(new DeathEvent());
      return;
    }
    if (!Game.game.party.length()) {
      this.events.splice(1, this.events.length - 1);
      this.events.push(new DeathEvent());
      return;
    }
  }
}
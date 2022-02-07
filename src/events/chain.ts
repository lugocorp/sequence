/*
 * This class represents the game's main event sequence.
 * Its job is to generate and serve events for as long as
 * the player survives.
 */
import LootEvent from './loot';
import Event from './event';
import Game from '../game';

export default class EventChain {
  event: Event;

  /*
   * This function returns the current event in the sequence.
   */
  latest(): Event {
    if (!this.event) {
      this.event = new LootEvent(Game.game.data.getRandomItem());
    }
    return this.event;
  }
}
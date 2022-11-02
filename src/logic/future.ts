import { Event } from '../views/event';

export default class FutureEvent {

  constructor(private event: Event, private turns: number, public valid: () => boolean = () => true) {}

  tick(): Event {
    return --this.turns <= 0 ? this.event : undefined;
  }
}

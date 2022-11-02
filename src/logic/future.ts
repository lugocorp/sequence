import { EventView } from '../views/event';

export default class FutureEvent {
  constructor(
    private event: EventView,
    private turns: number,
    public valid: () => boolean = () => true
  ) {}

  tick(): EventView {
    return --this.turns <= 0 ? this.event : undefined;
  }
}

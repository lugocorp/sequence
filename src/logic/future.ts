import View from '../ui/view';

export default class FutureEvent {
  valid: () => boolean;
  private turns: number;
  private view: View;

  constructor(view: View, turns: number, valid?: () => boolean) {
    this.valid = valid || (() => true);
    this.turns = turns;
    this.view = view;
  }

  tick(): View {
    return --this.turns <= 0 ? this.view : undefined;
  }
}

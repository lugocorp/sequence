import View from '../ui/view';

export interface EventClass {
  label: string;
}

/**
 * This class wraps game event logic such as event type labelling and comparison
 */
export class EventView extends View {
  private _label: string;

  constructor(_class: EventClass) {
    super();
    this._label = _class.label;
  }

  // Label field for subclasses
  get label(): string {
    return this._label;
  }

  // Returns true if the given event is of the same type as this one
  isSameEvent(event: EventView): boolean {
    return this.label === event.label;
  }

  // Returns true if this event is of the given event type
  isTypeEvent(_class: EventClass): boolean {
    return this.label === _class.label;
  }
}

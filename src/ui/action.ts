export default class Action {
  effect: () => void;
  label: string;

  constructor(label: string, effect: () => void) {
    this.effect = effect;
    this.label = label;
  }
}

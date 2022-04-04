import GraphicsRenderer from '../graphics/renderer';
import Widget from '../widgets/widget';
import Game from '../game';

abstract class View {
  widgets: Widget[];

  constructor() {
    this.widgets = [];
  }

  frame(r: GraphicsRenderer): void {
    let animated = false;
    for (const w of this.widgets) {
      w.render(r);
      animated = animated || w.isAnimated();
    }
    if (animated) {
      setTimeout(() => Game.game.invalidate(), 50);
    }
  }

  click(): void {
    for (const w of this.widgets) {
      w.click();
    }
  }
}

export default View;
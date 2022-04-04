import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';

abstract class Widget {

  isAnimated(): boolean {
    return false;
  }

  click(): void {
    throw new Error();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    throw new Error();
  }
}

export default Widget;
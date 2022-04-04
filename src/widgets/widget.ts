import GraphicsRenderer from '../graphics/renderer';

abstract class Widget {

  isAnimated(): boolean {
    return false;
  }

  click(): void {
    throw new Error();
  }

  render(r: GraphicsRenderer): void {
    throw new Error();
  }
}

export default Widget;
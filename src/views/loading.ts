import GraphicsRenderer from '../graphics/renderer';
import Sprites from '../enums/sprites';
import View from './view';

export default class LoadingView extends View {

  click(): void {
    // Do nothing here
  }

  frame(r: GraphicsRenderer): void {
    r.drawSprite(Sprites.LOADING, 25, 96);
  }
}
import GraphicsRenderer from '../graphics/renderer';
import EventChain from '../events/chain';
import Ability from '../entities/ability';
import Item from '../entities/item';
import View from './view';

export default class GameView extends View {
  chain: EventChain;

  constructor(chain: EventChain) {
    super();
    this.chain = chain;
  }

  /*
   * This method is responsible for handling click events
   */
  click(): void {
    this.chain.latest().click();
  }

  /*
   * This method renders a single frame of the game view
   */
  frame(r: GraphicsRenderer): void {
    this.chain.latest().render(this, r);
  }

  /*
   * This method renders an ability inspection
   */
  abilityInspection(r: GraphicsRenderer, ability: Ability): void {
    r.drawText(ability.name, 2, 2);
    r.drawParagraph(ability.description, 2, 20);
  }

  /*
   * This method renders an item inspection
   */
  itemInspection(r: GraphicsRenderer, item: Item): void {
    r.drawText(item.name, 2, 2);
    r.drawParagraph(item.description, 2, 20);
  }
}
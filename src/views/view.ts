import GraphicsRenderer from '../graphics/renderer';
import Text from '../graphics/text';
import Challenger from '../entities/challenger';
import Hero from '../entities/hero';
import Game from '../game';

abstract class View {
  currentFrame: number;
  endFrame: number;
  words: Text[];

  constructor() {
    this.currentFrame = 0;
    this.endFrame = 0;
    this.words = [];
  }

  frame(r: GraphicsRenderer): void {
    for (const t of this.words) {
      let msg: string = t.msg;
      if (t.animated) {
        msg = t.msg.substring(0, this.currentFrame > t.msg.length ? t.msg.length : this.currentFrame);
      }
      r.drawText(msg, t.x, t.y, t.click ? true : false);
    }
  }

  /*
   * This method renders a challenger card
   */
  challengerCard(r: GraphicsRenderer, challenger: Challenger): void {
    // Do something here eventually
  }
  
  /*
   * This method renders a hero card
   */
  heroCard(r: GraphicsRenderer, hero: Hero): void {
    // Do something here eventually
  }

  click(): void {
    for (const t of this.words) {
      if (t.click && Game.game.within(t.msg, t.x, t.y)) {
        t.click();
      }
    }
  }

  // This method triggers animated text
  startTextAnimation(): void {
    const that = this;
    this.currentFrame = 0;
    function tick() {
      Game.game.invalidate();
      that.currentFrame++;
      if (that.currentFrame === that.endFrame) {
        that.endFrame = 0;
        setTimeout(() => Game.game.invalidate(), 50);
      } else {
        setTimeout(() => tick(), 50);
      }
    }
    tick();
  }

  // Adds some Text to this View
  addText(...text: Text[]): void {
    for (const t of text) {
      this.words.push(t);
      if (t.msg.length > this.endFrame) {
        this.endFrame = t.msg.length;
      }
    }
  }

  // Clears all Text from this View
  clearText(): void {
    this.words.splice(0, this.words.length);
  }
}

export default View;
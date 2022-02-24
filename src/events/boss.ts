import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import EncounterEvent from './encounter';
import Hero from '../entities/hero';
import Game from '../game';

export default class BossEvent extends EncounterEvent {

  /**
   * Override this function so that you cannot progress unless
   * you've defeated the boss.
   */
  postBattleHandler(): void {
    const hero: Hero = Game.game.party.get(this.heroIndex);
    if (!hero.health) {
      Game.game.party.remove(hero);
    }
    if (Game.game.party.length() && this.enemy.health) {
      this.state = EncounterEvent.VIEW_PARTY;
      this.turn = {
        enemyDamaged: false,
        heroDamaged: false,
        enemyArmor: 0,
        heroArmor: 0,
        step: 0
      };
      Game.game.invalidate();
    } else {
      Game.game.progress();
    }
  }

  /**
   * Override the draw method so that we have extra prelude text.
   */
  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === EncounterEvent.PRELUDE) {
      r.drawParagraph('your party comes across a terrible monster that towers far above them...', 2, 0);
      r.drawText('continue', 30, 190);
    } else {
      super.render(view, r);
    }
  }
}
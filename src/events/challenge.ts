import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Challenger from '../entities/challenger';
import Ability from '../entities/ability';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Event from './event';
import Game from '../game';

export default class ChallengeEvent implements Event {
  static PRELUDE         = 0;
  static VIEW_CHALLENGER = 1;
  static VIEW_PARTY      = 2;
  static VIEW_ABILITY    = 3;
  static VIEW_ITEM       = 4;
  static BATTLE          = 5;
  static FINISHED        = 6;
  challenger: Challenger;
  heroIndex: number;
  ability: Ability;
  state: number;
  item: Item;

  click(): void {
    if (this.state === ChallengeEvent.PRELUDE) {
      if (Game.game.within('continue', 30, 190)) {
        this.state = ChallengeEvent.VIEW_CHALLENGER;
      }
    } else if (this.state === ChallengeEvent.VIEW_CHALLENGER) {
      if (Game.game.within('view party', 25, 190)) {
        this.state = ChallengeEvent.VIEW_PARTY;
      }
    } else if (this.state === ChallengeEvent.VIEW_PARTY) {
      const hero: Hero = Game.game.party.get(this.heroIndex);
      if (hero.ability1 && Game.game.within(hero.ability1.name, 2, 110)) {
        this.state = ChallengeEvent.VIEW_ABILITY;
        this.ability = hero.ability1;
      }
      if (hero.ability2 && Game.game.within(hero.ability2.name, 2, 120)) {
        this.state = ChallengeEvent.VIEW_ABILITY;
        this.ability = hero.ability2;
      }
      if (hero.item1 && Game.game.within(hero.item1.name, 2, 140)) {
        this.state = ChallengeEvent.VIEW_ITEM;
        this.item = hero.item1;
      }
      if (hero.item2 && Game.game.within(hero.item2.name, 2, 150)) {
        this.state = ChallengeEvent.VIEW_ITEM;
        this.item = hero.item2;
      }
      if (Game.game.within('last', 2, 180) && Game.game.party.length() > 1) {
        this.heroIndex = (this.heroIndex || Game.game.party.length()) - 1;
      }
      if (Game.game.within('choose', 35, 180)) {
        this.state = ChallengeEvent.BATTLE;
        // this.stepBattleLogic();
      }
      if (Game.game.within('next', 78, 180) && Game.game.party.length() > 1) {
        this.heroIndex = (this.heroIndex === Game.game.party.length() - 1) ? 0 : this.heroIndex + 1;
      }
      if (Game.game.within('view challenger', 25, 190)) {
        this.state = ChallengeEvent.VIEW_CHALLENGER;
      }
    } else if (this.state === ChallengeEvent.VIEW_ABILITY || this.state === ChallengeEvent.VIEW_ITEM) {
      if (Game.game.within('back', 40, 190)) {
        this.state = ChallengeEvent.VIEW_PARTY;
      }
    } else if (this.state === ChallengeEvent.FINISHED) {
      if (Game.game.within('continue', 30, 101)) {
        // this.postBattleHandler();
      }
    }
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === ChallengeEvent.PRELUDE) {
      r.drawParagraph('your party comes across a challenger', 2, 0);
      r.drawText('continue', 30, 190);
    }
    if (this.state === ChallengeEvent.VIEW_CHALLENGER) {
      view.challengerCard(r, this.challenger);
      r.drawText('view party', 25, 190, true);
    }
    if (this.state === ChallengeEvent.VIEW_PARTY) {
      view.heroCard(r, Game.game.party.get(this.heroIndex));
      if (Game.game.party.length() > 1) {
        r.drawText('last', 2, 180, true);
        r.drawText('next', 78, 180, true);
      }
      r.drawText('choose', 35, 180, true);
      r.drawText('view challenger', 25, 190, true);
    }
    if (this.state === ChallengeEvent.VIEW_ABILITY) {
      view.abilityInspection(r, this.ability);
      r.drawText('back', 40, 190, true);
    }
    if (this.state === ChallengeEvent.VIEW_ITEM) {
      view.itemInspection(r, this.item);
      r.drawText('back', 40, 190, true);
    }
  }
}
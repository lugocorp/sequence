import { Skill } from '../../types';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

/*
 * In this event you choose a party member to receive some pre-selected item.
 */
export default class MentorEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.MENTOR,
      `a mentor offers to teach some skill to your party. choose someone to learn it.`,
      [ new Action('continue', () => this.viewParty()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.emptySkillSlots());
  }

  viewParty(): void {
    if (this.game.party.canLearnSkills()) {
      this.setSelector(this.heroSelector, [ new Action('choose', () => this.finish()) ]);
    } else {
      this.setDetails(
        Sprites.MENTOR,
        `no one in your party can learn new skills. the mentor goes their own way.`,
        [ new Action('continue', () => this.game.progress()) ]
      );
    }
  }

  finish(): void {
    const hero: Hero = this.heroSelector.item();
    const skill: Skill = Random.element(
      EnumsHelper.skills().filter((x: Skill) => !EnumsHelper.hasSkill(hero.skills, x))
    );
    if (hero.skills[0] === undefined) {
      hero.skills[0] = skill;
    } else {
      hero.skills[1] = skill;
    }
    this.setDetails(Sprites.MENTOR, `${hero.name} learned ${skill} from the mentor.`, [
      new Action('continue', () => this.game.progress())
    ]);
  }
}

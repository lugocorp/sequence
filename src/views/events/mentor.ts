import { Skill } from '../../types';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class MentorEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.MENTOR,
                text: `a mentor offers to teach some skill to your party. choose someone to learn it.`,
                actions: { continue: () => this.viewParty() }
            }
        ];
    }

    viewParty(): void {
        if (this.game.party.canLearnSkills) {
            this.game.views.setViews(
                Selectors.heroes(this.game, this.game.party.emptySkillSlots(), (hero: Hero) => ({
                    'learn a skill': () => this.finish(hero)
                }))
            );
        } else {
            this.game.views.setViews([
                {
                    image: Sprites.MENTOR,
                    text: `no one in your party can learn new skills. the mentor goes their own way.`,
                    actions: { continue: () => this.game.progress() }
                }
            ]);
        }
    }

    finish(hero: Hero): void {
        const skill: Skill = Random.element(
            EnumsHelper.skills().filter((x: Skill) => !EnumsHelper.hasSkill(hero.skills, x))
        );
        if (hero.skills[0] === undefined) {
            hero.skills[0] = skill;
        } else {
            hero.skills[1] = skill;
        }
        this.game.views.setViews([
            {
                image: Sprites.MENTOR,
                text: `${hero.name} learned ${skill} from the mentor.`,
                actions: {
                    continue: () => this.game.progress()
                }
            }
        ]);
    }
}

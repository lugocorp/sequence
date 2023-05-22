import { Skill, TriggerType, Trigger, Time } from '../types';
import EventView from '../views/event';
import Sprites from '../media/sprites';
import Hero from '../entities/hero';
import Action from '../ui/action';
import Game from '../game';

export type HeroGenerator = (game: Game) => Hero;

export const heroes: HeroGenerator[] = [
  (game: Game) =>
    new Hero(
      game,
      Sprites.CORN_WOMAN,
      'corn woman',
      'oneida',
      6,
      0,
      0,
      2,
      1,
      [ undefined, undefined ],
      'summons her younger sister when she leaves the party',
      (game: Game, data: Trigger) => {
        if (data.type === TriggerType.LEAVE_PARTY) {
          summon(game, game.data.getNamedHero('squash lady'));
        }
      }
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.SQUASH_LADY,
      'squash lady',
      'piscataway',
      0,
      6,
      0,
      2,
      1,
      [ undefined, undefined ],
      'summons her younger sister when she leaves the party',
      (game: Game, data: Trigger) => {
        if (data.type === TriggerType.LEAVE_PARTY) {
          summon(game, game.data.getNamedHero('bean girl'));
        }
      }
    ),
  (game: Game) => new Hero(game, Sprites.BEAN_GIRL, 'bean girl', 'narragansett', 0, 0, 6, 2, 1),
  (game: Game) =>
    new Hero(game, Sprites.MINDIMOOYENH, 'mindimooyenh', 'ojibwe', 3, 3, 0, 4, 2, [
      Skill.DIPLOMACY,
      undefined
    ]),
  (game: Game) =>
    new Hero(game, Sprites.HERO_4, 'guecha', 'muisca', 3, 0, 3, 4, 2, [ Skill.PROWESS, undefined ]),
  (game: Game) =>
    new Hero(game, Sprites.BIRD_CATCHER, 'bird catcher', 'taíno', 0, 3, 3, 4, 2, [
      Skill.STEALTH,
      undefined
    ]),
  (game: Game) => {
    const hero = new Hero(
      game,
      Sprites.BEAD_QUEEN,
      'bead queen',
      'diné',
      2,
      2,
      2,
      4,
      4,
      [ Skill.ENDURANCE, Skill.DIPLOMACY ],
      '+5% luck for each equipped item'
    );
    hero.effect = (game: Game, data: Trigger) => {
      if (data.type === TriggerType.GET_STATS) {
        data.luck += 5 * hero.basket.itemCount;
      }
    };
    return hero;
  },
  (game: Game) =>
    new Hero(game, Sprites.HERO_4, 'highlander', 'guachichil', 2, 2, 2, 4, 2, [
      Skill.PROWESS,
      Skill.STEALTH
    ]),
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'guardian',
      'wampanoag',
      3,
      3,
      0,
      2,
      2,
      [ Skill.PROWESS, Skill.DIPLOMACY ],
      '+1 stats when you have no other party members',
      (game: Game, data: Trigger) => {
        if (data.type === TriggerType.GET_STATS && game.party.size === 1) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  (game: Game) => {
    const hero = new Hero(
      game,
      Sprites.EAGLE_KNIGHT,
      'eagle knight',
      'mexica',
      3,
      0,
      3,
      2,
      2,
      [ Skill.PROWESS, Skill.ENDURANCE ],
      'will eventually heal from 1 base energy'
    );
    hero.effect = (game: Game, data: Trigger) => {
      if (data.type === TriggerType.LOSE_ENERGY && hero.stats.energy === 1) {
        const view = new EventView(game);
        view.setDetails(hero.sprite, `${hero.name} healed from low energy.`, [
          new Action('continue', () => {
            hero.energy++;
            game.progress();
          })
        ]);
        game.chain.futureEvent(view, 3, () => game.party.contains(hero));
      }
    };
    return hero;
  },
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'medicine woman',
      'mapuche',
      0,
      3,
      3,
      2,
      2,
      [ Skill.ENDURANCE, Skill.DIPLOMACY ],
      'cannot lose any luck',
      (game: Game, data: Trigger) => {
        if (data.type === TriggerType.LOSS_CHECK) {
          data.luck = false;
        }
      }
    ),
  (game: Game) =>
    new Hero(game, Sprites.HERO_4, 'kamayuq', 'quechua', 3, 0, 0, 2, 2, [
      Skill.PROWESS,
      Skill.STEALTH
    ]),
  (game: Game) =>
    new Hero(game, Sprites.HERO_4, 'gourd elder', 'aymara', 0, 3, 0, 2, 2, [
      Skill.DIPLOMACY,
      Skill.STEALTH
    ]),
  (game: Game) =>
    new Hero(game, Sprites.HERO_4, 'hoop dancer', 'cree', 0, 0, 3, 2, 2, [
      Skill.ENDURANCE,
      Skill.STEALTH
    ]),
  (game: Game) =>
    new Hero(game, Sprites.SWORD_HOLDER, 'sword holder', 'lakota', 6, 0, 0, 3, 1, [
      Skill.PROWESS,
      undefined
    ]),
  (game: Game) =>
    new Hero(game, Sprites.FROST_WOMAN, 'tracker', 'inuit', 0, 6, 0, 3, 1, [
      Skill.ENDURANCE,
      undefined
    ]),
  (game: Game) =>
    new Hero(game, Sprites.RUNNER, 'runner', 'ohkay owingeh', 0, 0, 6, 3, 1, [
      Skill.ENDURANCE,
      undefined
    ]),

  (game: Game) => {
    const hero = new Hero(
      game,
      Sprites.HERO_4,
      'wanderer',
      'omaha',
      3,
      0,
      0,
      3,
      2,
      [ undefined, undefined ],
      '+1 stats and +10% luck when she joins your party'
    );
    let boosts = 0;
    hero.effect = (game: Game, data: Trigger) => {
      if (data.type === TriggerType.JOIN_PARTY) {
        boosts++;
      }
      if (data.type === TriggerType.GET_STATS) {
        data.str += boosts;
        data.wis += boosts;
        data.dex += boosts;
        data.luck += boosts * 10;
      }
    };
    return hero;
  },
  (game: Game) =>
    new Hero(
      game,
      Sprites.SERPENT_PRIESTESS,
      'moon priestess',
      'itza',
      0,
      3,
      0,
      3,
      2,
      [ undefined, undefined ],
      '+1 stats at night',
      (game: Game, data: Trigger) => {
        if (data.type === TriggerType.GET_STATS && game.world.time === Time.NIGHT) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  (game: Game) => {
    const hero = new Hero(
      game,
      Sprites.HERO_4,
      'fisherman',
      'lummi',
      0,
      0,
      3,
      3,
      2,
      [ undefined, undefined ],
      'will eventually rejoin your party if he has leftover energy'
    );
    hero.effect = (game: Game, data: Trigger) => {
      if (data.type === TriggerType.LEAVE_PARTY && hero.stats.energy > 0) {
        summon(game, hero);
      }
    };
    return hero;
  }
];

function summon(game: Game, hero: Hero): void {
  const view: EventView = new EventView(game);
  view.setDetails(hero.sprite, `${hero.name} joins your party.`, [
    new Action('continue', () => {
      game.party.add(hero);
      game.progress();
    })
  ]);
  game.chain.futureEvent(view, 4, () => !game.party.isFull());
}

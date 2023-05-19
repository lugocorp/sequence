import { Skill } from '../types';
import Sprites from '../media/sprites';
import Hero from '../entities/hero';
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
      'summons her younger sister when she leaves the party',
      [ undefined, undefined ],
      undefined
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
      'summons her younger sister when she leaves the party',
      [ undefined, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.BEAN_GIRL,
      'bean girl',
      'narragansett',
      0,
      0,
      6,
      2,
      1,
      'no effect',
      [ undefined, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.MINDIMOOYENH,
      'mindimooyenh',
      'ojibwe',
      3,
      3,
      0,
      4,
      2,
      'no effect',
      [ Skill.DIPLOMACY, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'guecha',
      'muisca',
      3,
      0,
      3,
      4,
      2,
      'no effect',
      [ Skill.PROWESS, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.BIRD_CATCHER,
      'bird catcher',
      'taíno',
      0,
      3,
      3,
      4,
      2,
      'no effect',
      [ Skill.STEALTH, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.BEAD_QUEEN,
      'bead queen',
      'diné',
      2,
      2,
      2,
      4,
      4,
      '+5% luck for each equipped item',
      [ Skill.ENDURANCE, Skill.DIPLOMACY ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'highlander',
      'guachichil',
      2,
      2,
      2,
      4,
      2,
      'no effect',
      [ Skill.PROWESS, Skill.STEALTH ],
      undefined
    ),
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
      '+1 stats when you have no other party members',
      [ Skill.PROWESS, Skill.DIPLOMACY ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.EAGLE_KNIGHT,
      'eagle knight',
      'mexica',
      3,
      0,
      3,
      2,
      2,
      'will eventually heal from 1 energy',
      [ Skill.PROWESS, Skill.ENDURANCE ],
      undefined
    ),
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
      'cannot lose any luck',
      [ Skill.ENDURANCE, Skill.DIPLOMACY ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'kamayuq',
      'quechua',
      3,
      0,
      0,
      2,
      2,
      'no effect',
      [ Skill.PROWESS, Skill.STEALTH ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'gourd elder',
      'aymara',
      0,
      3,
      0,
      2,
      2,
      'no effect',
      [ Skill.DIPLOMACY, Skill.STEALTH ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'hoop dancer',
      'cree',
      0,
      0,
      3,
      2,
      2,
      'no effect',
      [ Skill.ENDURANCE, Skill.STEALTH ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.SWORD_HOLDER,
      'sword holder',
      'lakota',
      6,
      0,
      0,
      3,
      1,
      'no effect',
      [ Skill.PROWESS, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.FROST_WOMAN,
      'tracker',
      'inuit',
      0,
      6,
      0,
      3,
      1,
      'no effect',
      [ Skill.ENDURANCE, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.RUNNER,
      'runner',
      'ohkay owingeh',
      0,
      0,
      6,
      3,
      1,
      'no effect',
      [ Skill.ENDURANCE, undefined ],
      undefined
    ),

  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'wanderer',
      'omaha',
      3,
      0,
      0,
      3,
      2,
      '+1 stats and +10% luck when she joins your party',
      [ undefined, undefined ],
      undefined
    ),
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
      '+1 stats at night',
      [ undefined, undefined ],
      undefined
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.HERO_4,
      'fisherman',
      'lummi',
      0,
      0,
      3,
      3,
      2,
      'will eventually rejoin your party if he has leftover energy',
      [ undefined, undefined ],
      undefined
    )
];

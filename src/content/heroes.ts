import Sprites from '../media/sprites';
import Hero from '../entities/hero';
import Game from '../game';

export type HeroGenerator = (game: Game) => Hero;

export const heroes: HeroGenerator[] = [
  (game: Game) =>
    new Hero(
      game,
      Sprites.SWORD_HOLDER,
      'sword holder',
      'lakota',
      6,
      0,
      0,
      2,
      'a poetry enthusiast who likes swords.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.FROST_WOMAN,
      'frost woman',
      'inuit',
      0,
      6,
      0,
      2,
      'travels the frozen places of turtle island.'
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
      2,
      'runs between villages with important information.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.EAGLE_KNIGHT,
      'eagle knight',
      'mexica',
      5,
      0,
      1,
      2,
      'a highly skilled and decorated warrior.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.CHILLY_ELDER,
      'chilly elder',
      'yaghan',
      1,
      5,
      0,
      2,
      "he's discovered a way to stay warm at all times."
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.SERPENT_PRIESTESS,
      'serpent priestess',
      'mayan',
      0,
      5,
      1,
      2,
      'a literal snake whisperer.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.CORN_WOMAN,
      'corn woman',
      'oneida',
      4,
      1,
      1,
      3,
      'a strong woman who loves corn.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.SQUASH_LADY,
      'squash lady',
      'piscataway',
      1,
      4,
      1,
      3,
      'has spent her entire life curating wisdom.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.BEAN_GIRL,
      'bean girl',
      'narragansett',
      1,
      1,
      4,
      3,
      'the youngest and most active of her sisters.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.MINDIMOOYENH,
      'mindimooyenh',
      'ojibwe',
      4,
      2,
      0,
      3,
      'holds her village together.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.BRAWLER,
      'brawler',
      'aymara',
      4,
      0,
      2,
      3,
      'skilled fighter who never holds grudges.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.POTTER,
      'potter',
      'cochitl',
      2,
      4,
      0,
      3,
      'skilled crafter known across nations.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.BIRD_CATCHER,
      'bird catcher',
      'taíno',
      2,
      0,
      4,
      3,
      'uses gourds to hunt birds for his yukayeke.'
    ),
  (game: Game) =>
    new Hero(
      game,
      Sprites.BEAD_QUEEN,
      'bead queen',
      'navajo',
      2,
      2,
      2,
      4,
      'makes her own jewelry from turquoise.'
    )
];

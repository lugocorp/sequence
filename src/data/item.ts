import { ItemData } from '../serial/types';
import { Rarity } from '../enums/types';
import Sprites from '../enums/sprites';

const data: ItemData[] = [
  {
    name: 'corn',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: '+1 strength'
  },
  {
    name: 'squash',
    sprite: Sprites.SQUASH,
    rarity: Rarity.COMMON,
    description: '+1 wisdom'
  },
  {
    name: 'beans',
    sprite: Sprites.BEANS,
    rarity: Rarity.COMMON,
    description: '+1 dexterity'
  },
  {
    name: 'turquoise bead',
    sprite: Sprites.TURQUOISE,
    rarity: Rarity.COMMON,
    description: '+5% luck'
  },
  {
    name: 'pigeon feather',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: '+10% luck on the next luck check'
  },
  {
    name: 'ground cherry',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: 'resists the next fatigue'
  },
  {
    name: 'acorn',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: "adds a point to this character's next challenge"
  },
  {
    name: 'indian grass',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: 'does not get swept away at the next river'
  },
  {
    name: 'wool blanket',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: 'passes the next natural obstacle'
  },
  {
    name: 'cranberry',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: 'resists every few fatigues'
  },
  {
    name: 'amaranth',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 strength every few challenges'
  },
  {
    name: 'sunchoke',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 wisdom every few challenges'
  },
  {
    name: 'groundnut',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 dexterity every few challenges'
  },
  {
    name: 'poncho',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: 'chance to pass any natural obstacle'
  },
  {
    name: 'copper axe',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+2 strength, -1 wisdom'
  },
  {
    name: 'quipu',
    sprite: Sprites.QUIPU,
    rarity: Rarity.UNCOMMON,
    description: '+2 wisdom, -1 dexterity'
  },
  {
    name: 'moccasins',
    sprite: Sprites.MOCCASIN,
    rarity: Rarity.UNCOMMON,
    description: '+2 dexterity, -1 strength'
  },
  {
    name: 'cardinal feather',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+15% luck every couple luck checks'
  },
  {
    name: 'medicine bag',
    sprite: Sprites.MEDICINE_BAG,
    rarity: Rarity.UNCOMMON,
    description: '+5% luck to all party members when this character leaves the party'
  },
  {
    name: 'tobacco',
    sprite: Sprites.TOBACCO,
    rarity: Rarity.UNCOMMON,
    description: '+5% luck after a successful challenge'
  },
  {
    name: 'fry bread',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+2 to all stats if you have 3 or fewer party members'
  },
  {
    name: 'sack of gold',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats during the day'
  },
  {
    name: 'sack of silver',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats at night'
  },
  {
    name: 'paw paw',
    sprite: Sprites.PAW_PAW,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in rainy weather'
  },
  {
    name: 'cassava',
    sprite: Sprites.CASSAVA,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in windy weather'
  },
  {
    name: 'sunflower',
    sprite: Sprites.SUNFLOWER,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in sunny weather'
  },
  {
    name: 'crowberry',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 to all stats in snowy weather'
  },
  {
    name: 'dream catcher',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: "absorbs other party members' fatigue"
  },
  {
    name: 'serpentine armbands',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 strength to your party when this party member leaves'
  },
  {
    name: 'turkey headdress',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 wisdom to your party when this party member leaves'
  },
  {
    name: 'deerskin boots',
    sprite: Sprites.CORN,
    rarity: Rarity.UNCOMMON,
    description: '+1 dexterity to your party when this party member leaves'
  },
  {
    name: 'jade dagger',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'this character gains strength equal to the weakest party member'
  },
  {
    name: 'sunglasses',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'this character gains wisdom equal to the least wise party member'
  },
  {
    name: 'guanín amulet',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'this character gains dexterity equal to the slowest party member'
  },
  {
    name: 'echinacea',
    sprite: Sprites.ECHINACEA,
    rarity: Rarity.RARE,
    description: 'reverts a random stat to original after a successful challenge'
  },
  {
    name: 'frog glyph',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'the weather changes to rain during challenges with this party member'
  },
  {
    name: 'storm glyph',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'the weather changes to wind during challenges with this party member'
  },
  {
    name: 'sun glyph',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'the weather changes to sun during challenges with this party member'
  },
  {
    name: 'bird glyph',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'the weather changes to snow during challenges with this party member'
  },
  {
    name: 'bag of salmon',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'this character cannot be swept away by rivers'
  },
  {
    name: 'drinking gourd',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'this character passes all natural obstacles'
  },
  {
    name: 'succotash',
    sprite: Sprites.SUCCOTASH,
    rarity: Rarity.RARE,
    description: '+1 strength, +1 wisdom, +1 dexterity'
  },
  {
    name: 'bluejay feather',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: '100% luck every couple luck checks'
  },
  {
    name: 'macuahuitl',
    sprite: Sprites.MACUAHUITL,
    rarity: Rarity.RARE,
    description: '+2 strength, -5% luck'
  },
  {
    name: 'amoxtli',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: '+2 wisdom, -5% luck'
  },
  {
    name: 'huarache',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: '+2 dexterity, -5% luck'
  },
  {
    name: 'rattle gourd',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'challengers gain a random luck value'
  },
  {
    name: 'lynx cape',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'cannot drop to 0 strength from a successful challenge'
  },
  {
    name: 'racoon cape',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'cannot drop to 0 wisdom from a successful challenge'
  },
  {
    name: 'deerskin cape',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'cannot drop to 0 dexterity from a successful challenge'
  },
  {
    name: 'bow and arrow',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'catches the next deer immediately'
  },
  {
    name: 'jungle manual',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: 'boosts the chances of finding wild plants'
  },
  {
    name: 'flowering sash',
    sprite: Sprites.CORN,
    rarity: Rarity.RARE,
    description: '+1 to a random stat when a party member leaves'
  },
  {
    name: 'bison totem',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'all stats on this character become strength'
  },
  {
    name: 'turtle totem',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'all stats on this character become wisdom'
  },
  {
    name: 'eagle totem',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'all stats on this character become dexterity'
  },
  {
    name: 'corn and bean soup',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: '+2 strength, +2 wisdom, +2 dexterity'
  },
  {
    name: 'obsidian collar',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'all random item drops become uncommon or better'
  },
  {
    name: 'eagle feather',
    sprite: Sprites.EAGLE_FEATHER,
    rarity: Rarity.LEGENDARY,
    description: '+100% luck'
  },
  {
    name: 'condor feather',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: '100% luck in strength challenges'
  },
  {
    name: 'quetzal feather',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: '100% luck in wisdom challenges'
  },
  {
    name: 'hummingbird feather',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: '100% luck in dexterity challenges'
  },
  {
    name: "condor's cleaver",
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'challenging party members get +1 strength'
  },
  {
    name: "quetzal's quiver",
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'challenging party members get +1 wisdom'
  },
  {
    name: "eagle's aegis",
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'challenging party members get +1 dexterity'
  },
  {
    name: 'golden mirror',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'makes caves less dangerous'
  },
  {
    name: 'pine needle tea',
    sprite: Sprites.CORN,
    rarity: Rarity.LEGENDARY,
    description: 'chance to not get fatigued after a successful challenge'
  },
  {
    name: 'jade collar',
    sprite: Sprites.CORN,
    rarity: Rarity.MYTHIC,
    description: 'all random item drops become rare or better'
  },
  {
    name: 'turquoise mask',
    sprite: Sprites.CORN,
    rarity: Rarity.MYTHIC,
    description: 'this character only gets fatigued in strength challenges'
  },
  {
    name: 'jade mask',
    sprite: Sprites.CORN,
    rarity: Rarity.MYTHIC,
    description: 'this character only gets fatigued in wisdom challenges'
  },
  {
    name: 'gold mask',
    sprite: Sprites.CORN,
    rarity: Rarity.MYTHIC,
    description: 'this character only gets fatigued in dexterity challenges'
  },
  {
    name: 'pemmican',
    sprite: Sprites.CORN,
    rarity: Rarity.MYTHIC,
    description: 'this character cannot get fatigued if its stats are all in balance'
  },
  {
    name: 'turquoise ring',
    sprite: Sprites.TURQUOISE_RING,
    rarity: Rarity.MYTHIC,
    description: '+3 strength, +3 wisdom, +3 dexterity'
  },
  {
    name: 'medicine wheel',
    sprite: Sprites.CORN,
    rarity: Rarity.MYTHIC,
    description: 'this character gets boosted after each successful challenge not involving it'
  },
  {
    name: 'spirit rattle',
    sprite: Sprites.CORN,
    rarity: Rarity.MYTHIC,
    description: 'adds a spirit to your party when this member becomes fully fatigued'
  }
];

export default data;

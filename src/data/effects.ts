import Hero from '../entities/hero';
import Random from '../logic/random';
import { ItemData } from '../serial/types';
import { Rarity, Trigger, Effect } from '../enums/types';
import { Weather } from '../enums/world';
import Sprites from '../enums/sprites';
import Stats from '../enums/stats';
import Game from '../game';

const data: Record<string, Effect> = {
  corn: undefined,
  squash: undefined,
  beans: undefined,
  'turquoise bead': undefined,
  'pigeon feather': undefined,
  'ground cherry': undefined,
  acorn: undefined,
  'indian grass': undefined,
  'wool blanket': undefined,
  cranberry: undefined,
  amaranth: undefined,
  sunchoke: undefined,
  groundnut: undefined,
  poncho: undefined,
  'copper axe': undefined,
  quipu: undefined,
  moccasins: undefined,
  'cardinal feather': undefined,
  'medicine bag': undefined,
  tobacco: undefined,
  'fry bread': undefined,
  'sack of gold': undefined,
  'sack of silver': undefined,
  'paw paw': undefined,
  cassava: undefined,
  sunflower: undefined,
  crowberry: undefined,
  'dream catcher': undefined,
  'serpentine armbands': undefined,
  'turkey headdress': undefined,
  'deerskin boots': undefined,
  'jade dagger': undefined,
  sunglasses: undefined,
  'guanín amulet': undefined,
  echinacea: undefined,
  'frog glyph': undefined,
  'storm glyph': undefined,
  'sun glyph': undefined,
  'bird glyph': undefined,
  'bag of salmon': undefined,
  'drinking gourd': undefined,
  succotash: undefined,
  'bluejay feather': undefined,
  macuahuitl: undefined,
  amoxtli: undefined,
  huarache: undefined,
  'rattle gourd': undefined,
  'lynx cape': undefined,
  'racoon cape': undefined,
  'deerskin cape': undefined,
  'bow and arrow': undefined,
  'jungle manual': undefined,
  'flowering sash': undefined,
  'bison totem': undefined,
  'eagle totem': undefined,
  'turtle totem': undefined,
  'corn and bean soup': undefined,
  'obsidian collar': undefined,
  'eagle feather': undefined,
  'condor feather': undefined,
  'quetzal feather': undefined,
  'hummingbird feather': undefined,
  "condor's cleaver": undefined,
  "quetzal's quiver": undefined,
  "eagle's aegis": undefined,
  'golden mirror': undefined,
  'pine needle tea': undefined,
  'jade collar': undefined,
  'turquoise mask': undefined,
  'jade mask': undefined,
  'gold mask': undefined,
  pemmican: undefined,
  'turquoise ring': undefined,
  'medicine wheel': undefined,
  'spirit rattle': undefined
};

export default data;

import Glyphs from './serial/glyphs';
import challengers from './data/challenger';
import heroes from './data/hero';
import items from './data/item';
const MAX_CHALLENGER_NAME_LENGTH = 20;
const MAX_HERO_PEOPLE_LENGTH = 13;
const MAX_HERO_NAME_LENGTH = 20;
const MAX_ITEM_NAME_LENGTH = 20;
let errors = 0;

function error(msg: string, entity: string, name: string, additional = ''): void {
  process.stdout.write(`\u001b[31mERROR\u001b[39m ${msg} in ${entity} '${name}'. ${additional}\n`);
  errors++;
}

// Check items
for (const item of items) {
  if (item.name != item.name.toLowerCase() || item.description != item.description.toLowerCase()) {
    error('Uppercase letters detected', 'item', item.name);
  }
  if (item.name.length > MAX_ITEM_NAME_LENGTH) {
    error('Invalid name length', 'item', item.name, `Maximum name length is ${MAX_ITEM_NAME_LENGTH}.`);
  }
  if (!Glyphs.isValid(item.name)) {
    error('Invalid name', 'item', item.name);
  }
  if (!Glyphs.isValid(item.description)) {
    error('Invalid description', 'item', item.name);
  }
}

// Check enemies
for (const challenger of challengers) {
  if (challenger.name != challenger.name.toLowerCase()) {
    error('Uppercase letters detected', 'challenger', challenger.name);
  }
  if (challenger.name.length > MAX_CHALLENGER_NAME_LENGTH) {
    error('Invalid name length', 'challenger', challenger.name, `Maximum name length is ${MAX_CHALLENGER_NAME_LENGTH}.`);
  }
  if (challenger.strength + challenger.wisdom + challenger.dexterity != 6) {
    error('Invalid stat spread detected', 'challenger', challenger.name, 'Stats should add up to 6');
  }
  if (!Glyphs.isValid(challenger.name)) {
    error('Invalid name', 'challenger', challenger.name);
  }
}

// Check heroes
for (const hero of heroes) {
  if (hero.name != hero.name.toLowerCase()) {
    error('Uppercase letters detected', 'hero', hero.name);
  }
  if (hero.name.length > MAX_HERO_NAME_LENGTH) {
    error('Invalid name length', 'hero', hero.name, `Maximum name length is ${MAX_HERO_NAME_LENGTH}.`);
  }
  if (hero.people.length > MAX_HERO_PEOPLE_LENGTH) {
    error('Invalid people length', 'hero', hero.name, `Maximum people length is ${MAX_HERO_PEOPLE_LENGTH}.`);
  }
  if ([0, 6].indexOf(hero.strength + hero.wisdom + hero.dexterity) < 0) {
    error('Invalid stat spread detected', 'hero', hero.name, 'Stats should add up to 6');
  }
  if ([1, 2, 3, 4].indexOf(hero.itemSlots) < 0) {
    error('Invalid number of item slots detected', 'hero', hero.name, 'Item slots can only be either (0, 1, 2)');
  }
  if (!Glyphs.isValid(hero.name)) {
    error('Invalid name', 'hero', hero.name);
  }
  if (!Glyphs.isValid(hero.people)) {
    error('Invalid people', 'hero', hero.name);
  }
}

// Return with number of errors
if (errors) {
  process.stdout.write(`\nAuditor found \u001b[31m${errors}\u001b[39m error(s)\n`);
  process.exit(errors);
}
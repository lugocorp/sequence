import challengers from './data/challenger';
import abilities from './data/ability';
import heroes from './data/hero';
import items from './data/item';
const MAX_CHALLENGER_NAME_LENGTH = 14;
const MAX_ABILITY_NAME_LENGTH = 19;
const MAX_ITEM_NAME_LENGTH = 19;
const MAX_HERO_NAME_LENGTH = 14;
const valid_abilities = [];
let errors = 0;

function error(msg: string, entity: string, name: string, additional = ''): void {
  process.stdout.write(`\u001b[31mERROR\u001b[39m ${msg} in ${entity} '${name}'. ${additional}\n`);
  errors++;
}

// Check abilities
for (const ability of abilities) {
  if (ability.name != ability.name.toLowerCase() || ability.description != ability.description.toLowerCase()) {
    error('Uppercase letters detected', 'ability', ability.name);
  }
  if (ability.name.length > MAX_ABILITY_NAME_LENGTH) {
    error('Invalid name length', 'ability', ability.name, `Maximum name length is ${MAX_ABILITY_NAME_LENGTH}.`);
  }
  valid_abilities.push(ability.name);
}

// Check items
for (const item of items) {
  if (item.name != item.name.toLowerCase() || item.description != item.description.toLowerCase()) {
    error('Uppercase letters detected', 'item', item.name);
  }
  if (item.name.length > MAX_ITEM_NAME_LENGTH) {
    error('Invalid name length', 'item', item.name, `Maximum name length is ${MAX_ITEM_NAME_LENGTH}.`);
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
  if (challenger.strength + challenger.wisdom + challenger.agility != 6) {
    error('Invalid stat spread detected', 'challenger', challenger.name, 'stats should add up to 6');
  }
  if (challenger.ability && valid_abilities.indexOf(challenger.ability) < 0) {
    error(`Unregistered ability '${challenger.ability}'`, 'challenger', challenger.name);
  }
}

for (const hero of heroes) {
  if (hero.name != hero.name.toLowerCase()) {
    error('Uppercase letters detected', 'hero', hero.name);
  }
  if (hero.name.length > MAX_HERO_NAME_LENGTH) {
    error('Invalid name length', 'hero', hero.name, `Maximum name length is ${MAX_HERO_NAME_LENGTH}.`);
  }
  if (hero.strength + hero.wisdom + hero.agility != 6) {
    error('Invalid stat spread detected', 'hero', hero.name, 'stats should add up to 6');
  }
  if ([0, 1, 2].indexOf(hero.itemSlots) < 0) {
    error('Invalid number of item slots detected', 'hero', hero.name, 'Item slots can only be either (0, 1, 2)');
  }
  if (hero.ability && valid_abilities.indexOf(hero.ability) < 0) {
    error(`Unregistered ability '${hero.ability}'`, 'hero', hero.name);
  }
}

// Return with number of errors
if (errors) {
  process.stdout.write(`\nAuditor found \u001b[31m${errors}\u001b[39m error(s)\n`);
  process.exit(errors);
}
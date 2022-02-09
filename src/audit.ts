import abilities from './data/ability';
import enemies from './data/enemy';
import heroes from './data/hero';
import items from './data/item';
const MAX_ABILITY_NAME_LENGTH = 19;
const MAX_ENEMY_NAME_LENGTH = 14;
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
for (const enemy of enemies) {
  if (enemy.name != enemy.name.toLowerCase()) {
    error('Uppercase letters detected', 'enemy', enemy.name);
  }
  if (enemy.name.length > MAX_ENEMY_NAME_LENGTH) {
    error('Invalid name length', 'enemy', enemy.name, `Maximum name length is ${MAX_ENEMY_NAME_LENGTH}.`);
  }
  if (enemy.damage > 99 || enemy.health > 99 || enemy.armor > 99) {
    error('Damage, health or armor is over 99', 'enemy', enemy.name);
  }
  if ([1, 2, 3].indexOf(enemy.speed) < 0) {
    error('Invalid speed detected', 'enemy', enemy.name, 'Speed can only be either (1, 2, 3)');
  }
  if (enemy.ability && valid_abilities.indexOf(enemy.ability) < 0) {
    error(`Unregistered ability '${enemy.ability}'`, 'enemy', enemy.name);
  }
}

for (const hero of heroes) {
  if (hero.name != hero.name.toLowerCase()) {
    error('Uppercase letters detected', 'hero', hero.name);
  }
  if (hero.name.length > MAX_HERO_NAME_LENGTH) {
    error('Invalid name length', 'hero', hero.name, `Maximum name length is ${MAX_HERO_NAME_LENGTH}.`);
  }
  if (hero.damage > 99 || hero.health > 99 || hero.armor > 99) {
    error('Damage, health or armor is over 99', 'hero', hero.name);
  }
  if ([1, 2, 3].indexOf(hero.speed) < 0) {
    error('Invalid speed detected', 'hero', hero.name, 'Speed can only be either (1, 2, 3)');
  }
  if ([0, 1, 2].indexOf(hero.itemSlots) < 0) {
    error('Invalid number of item slots detected', 'hero', hero.name, 'Item slots can only be either (0, 1, 2)');
  }
  if ([0, 1, 2].indexOf(hero.abilitySlots) < 0) {
    error('Invalid number of ability slots detected', 'hero', hero.name, 'Ability slots can only be either (0, 1, 2)');
  }
  if (hero.ability1 && valid_abilities.indexOf(hero.ability1) < 0) {
    error(`Unregistered ability '${hero.ability1}'`, 'hero', hero.name);
  }
  if (hero.ability2 && valid_abilities.indexOf(hero.ability2) < 0) {
    error(`Unregistered ability '${hero.ability2}'`, 'hero', hero.name);
  }
}

// Return with number of errors
if (errors) {
  process.stdout.write(`\nAuditor found \u001b[31m${errors}\u001b[39m error(s)\n`);
  process.exit(errors);
}
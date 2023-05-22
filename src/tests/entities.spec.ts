import { expect } from 'chai';
import { TestAudio, TestGraphics, TestHistory } from './media';
import Sprites from '../media/sprites';
import Basket from '../entities/basket';
import Party from '../entities/party';
import Hero from '../entities/hero';
import Item from '../entities/item';
import { Rarity, Stats } from '../types';
import Game from '../game';

const game = new Game(new TestGraphics(), new TestAudio(), new TestHistory());
game.start();

describe('Basket tests', function () {
  let basket: Basket;

  beforeEach(function () {
    const hero = new Hero(game, Sprites.NONE, '', '', 0, 0, 0, 0, 2);
    basket = hero.basket;
  });

  it('Can equip items until there is no more space', function () {
    const item = (name: string) => new Item(name, Sprites.NONE, Rarity.COMMON, '', undefined);
    for (let a = 0; a < 2; a++) {
      expect(basket.hasSpace).to.be.true;
      basket.equip(item(`item ${a + 1}`));
      expect(basket.itemCount).to.equal(a + 1);
    }
    expect(basket.hasSpace).to.be.false;
    expect(basket.toList().map((x) => x.name)).to.deep.equal([ 'item 1', 'item 2' ]);
    expect(() => basket.equip(item('too many items'))).to.throw('Item equip overflow');
    expect(() => basket.unequip(item('too many items'))).to.throw('Item equip underflow');
  });

  it('Correctly identify items it has or does not have', function () {
    const item = new Item('something', Sprites.NONE, Rarity.COMMON, '', undefined);
    expect(basket.hasItems).to.be.false;
    expect(basket.has('something')).to.be.false;
    expect(basket.contains(item)).to.be.false;
    basket.equip(item);
    expect(basket.hasItems).to.be.true;
    expect(basket.has('something')).to.be.true;
    expect(basket.contains(item)).to.be.true;
  });
});

describe('Party tests', function () {
  const party = game.party;
  const hero = (name: string, items = 2) =>
    new Hero(game, Sprites.NONE, name, '', 0, 0, 0, 0, items);

  beforeEach(function () {
    party.clear();
  });

  it('Adding and removing party members', function () {
    const member = hero('someone');
    expect(party.size).to.equal(0);
    expect(party.members).to.deep.equal([]);
    expect(member.isInParty(party)).to.be.false;
    party.add(member);
    expect(member.isInParty(party)).to.be.true;
    expect(party.size).to.equal(1);
    expect(party.contains(member)).to.be.true;
    expect(party.members.map((x) => x.name)).to.deep.equal([ 'someone' ]);
    expect(party.get(0)).to.equal(member);
    party.remove(member);
    expect(party.size).to.equal(0);
    expect(party.contains(member)).to.be.false;
    expect(party.members).to.deep.equal([]);
    expect(() => party.remove(member)).to.throw(
      'someone is not in your party and therefore cannot be removed'
    );
  });

  it('Check if the party can pick up items', function () {
    const member = hero('someone');
    expect(party.emptyItemSlots()).to.deep.equal([]);
    expect(party.canPickupItems()).to.be.false;
    expect(party.hasItems()).to.be.false;
    party.add(member);
    expect(party.emptyItemSlots().map((x) => x.name)).to.deep.equal([ 'someone' ]);
    expect(party.canPickupItems()).to.be.true;
    expect(party.hasItems()).to.be.false;
    member.basket.equip(new Item('something', Sprites.NONE, Rarity.COMMON, '', undefined));
    expect(party.emptyItemSlots().map((x) => x.name)).to.deep.equal([ 'someone' ]);
    expect(party.canPickupItems()).to.be.true;
    expect(party.hasItems()).to.be.true;
    member.basket.equip(new Item('something else', Sprites.NONE, Rarity.COMMON, '', undefined));
    expect(party.emptyItemSlots()).to.deep.equal([]);
    expect(party.canPickupItems()).to.be.false;
    expect(party.hasItems()).to.be.true;
    party.remove(party.get(0));
    expect(party.emptyItemSlots()).to.deep.equal([]);
    expect(party.canPickupItems()).to.be.false;
    expect(party.hasItems()).to.be.false;
  });

  it('Enforce max party size', function () {
    expect(party.isFull()).to.be.false;
    party.populate();
    expect(party.isFull()).to.be.true;
    expect(party.size).to.equal(Party.MAX);
    expect(() => party.add(hero('someone'))).to.throw(
      `Cannot have more than ${Party.MAX} members in your party`
    );
  });
});

describe('Hero tests', function () {
  let hero: Hero;

  beforeEach(function () {
    hero = new Hero(game, Sprites.NONE, 'someone', '', 3, 3, 3, 0, 0);
  });

  it('empowerRandom()', function () {
    expect(hero.str + hero.wis + hero.dex).to.equal(9);
    hero.empowerRandom();
    expect(hero.str + hero.wis + hero.dex).to.equal(10);
  });

  it('refresh()', function () {
    hero.str++;
    hero.wis++;
    hero.dex++;
    expect(hero.str + hero.wis + hero.dex).to.equal(12);
    hero.refresh(Stats.STRENGTH);
    hero.refresh(Stats.WISDOM);
    hero.refresh(Stats.DEXTERITY);
    expect(hero.str + hero.wis + hero.dex).to.equal(9);
    hero.str--;
    hero.wis--;
    hero.dex--;
    expect(hero.str + hero.wis + hero.dex).to.equal(6);
    hero.refresh(Stats.STRENGTH);
    hero.refresh(Stats.WISDOM);
    hero.refresh(Stats.DEXTERITY);
    expect(hero.str + hero.wis + hero.dex).to.equal(9);
  });

  it('getStat()', function () {
    hero.str += 1;
    hero.wis += 2;
    hero.dex += 3;
    expect(hero.getStat(Stats.STRENGTH)).to.equal(4);
    expect(hero.getStat(Stats.WISDOM)).to.equal(5);
    expect(hero.getStat(Stats.DEXTERITY)).to.equal(6);
  });
});

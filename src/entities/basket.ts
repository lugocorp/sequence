import Game from '../game';
import Item from './item';
import Hero from './hero';

/**
 * This class handles item storage logic for the Hero class.
 */
export default class Basket {
    private items: Item[] = [];

    constructor(
        private readonly game: Game,
        private readonly bearer: Hero,
        public readonly total: number
    ) {}

    // Returns a shallow copy of the items list
    toList(): Item[] {
        return [ ...this.items ];
    }

    // Returns true if there are empty item slots
    get hasSpace(): boolean {
        return this.itemCount < this.total;
    }

    // Returns true if there are items in this basket
    get hasItems(): boolean {
        return this.itemCount > 0;
    }

    // Equips an item
    equip(item: Item): void {
        if (!this.hasSpace) {
            throw new Error(`Item equip overflow`);
        }
        this.game.history.itemsCollected++;
        item.bearer = this.bearer;
        this.items.push(item);
    }

    // Unequips an item
    unequip(item: Item): void {
        const index: number = this.items.indexOf(item);
        if (index < 0) {
            throw new Error(`Item equip underflow`);
        }
        this.items.splice(index, 1);
    }

    // Returns true if this basket has the given item
    contains(item: Item): boolean {
        return this.items.indexOf(item) > -1;
    }

    // Returns the number of held items
    get itemCount(): number {
        return this.items.length;
    }
}

import Hero from '../entities/hero';
import Item from '../entities/item';
import { Actions } from '../types';
import View from './view';

export default class Selectors {
    static heroes(
        heroes: Hero[],
        actions: (hero: Hero) => Actions,
        extra?: (hero: Hero) => string
    ): View[] {
        return heroes.map((x: Hero, i: number) => ({
            image: x.sprite,
            text: `${i + 1}/${heroes.length} ${x.descriptionText()}${extra ? '\n' + extra(x) : ''}`,
            actions: actions(x)
        }));
    }

    static items(items: Item[], actions: (item: Item) => Actions): View[] {
        return items.map((x: Item, i: number) => ({
            image: x.sprite,
            text: `${i + 1}/${items.length} ${x.descriptionText()}`,
            actions: actions(x)
        }));
    }
}

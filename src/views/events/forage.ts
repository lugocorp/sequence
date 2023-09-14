import EventView from '../event';
import Sprites from '../../media/sprites';
import Random from '../../logic/random';
import View from '../view';

export default class ForageEvent extends EventView {
    getViews(): View[] {
        const SAFE = 0;
        const SEMISAFE = 1;
        const TOXIC = 2;
        const plant = Random.element([
            {
                name: 'purple passionflower',
                sprite: Sprites.PASSIONFLOWER,
                type: SAFE
            },
            {
                name: 'pokeweed',
                sprite: Sprites.POKEWEED,
                type: SEMISAFE
            },
            {
                name: 'castor bean',
                sprite: Sprites.CASTOR_BEAN,
                type: TOXIC
            }
        ]);
        const that = this;
        const result = (action: string, aftermath: () => void): void =>
            this.game.views.setViews([
                {
                    image: plant.sprite,
                    text: `your party ${action} the plant known as ${plant.name}.`,
                    actions: {
                        continue: () => aftermath()
                    }
                }
            ]);
        return [
            {
                image: plant.sprite,
                text: `your party is hungry and they come across a plant known as ${plant.name}. what do they do?`,
                actions: {
                    'eat it raw': () => {
                        if (plant.type === SAFE) {
                            result('eats', () => that.empower());
                        } else {
                            result('eats', () => that.poison());
                        }
                    },
                    'boil it': () => {
                        if (plant.type === SEMISAFE) {
                            result('boils and eats', () => that.empower());
                        } else if (plant.type === TOXIC) {
                            result('boils and eats', () => that.poison());
                        } else {
                            result('boils and eats', () => this.game.progress());
                        }
                    },
                    'avoid it': () => result('avoids', () => this.game.progress())
                }
            }
        ];
    }

    empower() {
        this.game.chain.futureEvent(new EmpowerEvent(this.game), 3);
        this.game.progress();
    }

    poison() {
        this.game.chain.futureEvent(new PoisonEvent(this.game), 3);
        this.game.progress();
    }
}

class PoisonEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: this.game.party.members[0].sprite,
                text: `your party suddenly feels weaker and slower. perhaps it was something they ate...`,
                actions: {
                    continue: () => {
                        for (const hero of this.game.party.members) {
                            hero.str--;
                            hero.wis--;
                            hero.dex--;
                        }
                        this.game.progress();
                    }
                }
            }
        ];
    }
}

class EmpowerEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: this.game.party.members[0].sprite,
                text: `your party suddenly feels stronger, smarter and faster. perhaps it was something they ate!`,
                actions: {
                    continue: () => {
                        for (const hero of this.game.party.members) {
                            hero.str++;
                            hero.wis++;
                            hero.dex++;
                        }
                        this.game.progress();
                    }
                }
            }
        ];
    }
}

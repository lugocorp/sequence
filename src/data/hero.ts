import Element from '../enums/element';
import Slots from '../enums/slots';

const data = [
    {
        name: 'Test Hero',
        health: 10,
        damage: 2,
        armor: 2,
        speed: 2,
        damages: [Element.FIRE],
        weaknesses: [Element.WATER],
        resistances: [Element.DEATH],
        abilitySlots: Slots.TWO,
        itemSlots: Slots.TWO
    }
];

export default data;
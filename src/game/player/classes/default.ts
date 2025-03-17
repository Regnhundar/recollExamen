import { GameClass, Ability } from '../../../../interfaces';
import fallback from '../../../../assets/images/fallback.png';

const defaultAbility: Ability = {
    id: 'ability',
    name: 'ability',
    icon: fallback,
    mana: 0,
    cost: 8,
    description: 'Do nothing!',
    execute: () => {
        console.log('Default ability pressed!');
    },
};

export const defaultClass: GameClass = {
    id: 'default',
    name: 'Default',
    portrait: fallback,
    fullPicture: fallback,
    maxhp: 100,
    hp: 100,
    description: 'I am an unselected class',
    abilities: [defaultAbility, defaultAbility, defaultAbility],
};

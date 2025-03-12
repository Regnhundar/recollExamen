import { GameClass, Ability } from '../../../../interfaces';
import { manipulateHealth } from '../abilityFunctions';
import { getBattleState } from '@/src/stores/battleState';
import pyroPortrait from '../../../../assets/images/pyro.png';
import pyroFireball from '../../../../assets/images/abilities/pyro/fire-ball.png';
import pyroFlameShield from '../../../../assets/images/abilities/pyro/flame-shield.png';
import pyroBurningHeart from '../../../../assets/images/abilities/pyro/burning-heart.png';

const fireBall: Ability = {
    id: 'fireBall',
    name: 'Fire ball',
    icon: pyroFireball,
    mana: 0,
    cost: 5,
    description: 'Shoot a fireball and deal direct damage leaving a burning DOT.',
    execute: () => {
        const { opponent, setOpponent } = getBattleState();

        if (opponent) {
            const damagedOpponent = manipulateHealth({ target: opponent, operator: '-', amount: 10 });
            setOpponent(damagedOpponent);
        }
    },
};

const flameShield: Ability = {
    id: 'flameShield',
    name: 'Flame shield',
    icon: pyroFlameShield,
    mana: 0,
    cost: 8,
    description: 'Envelop yourself in flames! Attackers take damage for the duration.',
    execute: () => {
        console.log('Flame shield pressed!');
    },
};

const burningHeart: Ability = {
    id: 'burningHeart',
    name: 'Burning heart',
    icon: pyroBurningHeart,
    mana: 0,
    cost: 12,
    description: 'Shoot a fireball each time you match fireball cards for the duration.',
    execute: () => {
        console.log('Burning heart');
    },
};

export const pyroClass: GameClass = {
    id: 'pyro',
    name: 'Pyro',
    portrait: pyroPortrait,
    maxhp: 100,
    hp: 100,
    description: 'Spreads his love of fire with fiery destruction!',
    abilities: [fireBall, flameShield, burningHeart],
};

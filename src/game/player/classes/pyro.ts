import { GameClass, Ability } from '../../../../interfaces';
import { applyStatusEffect, manipulateHealth, updateAbilityMana } from '../abilityFunctions';
import { getBattleState } from '@/src/stores/battleState';
import pyroPortrait from '../../../../assets/images/characters/pyro/pyro.png';
import pyroFireball from '../../../../assets/images/abilities/pyro/fire-ball.png';
import pyroFlameShield from '../../../../assets/images/abilities/pyro/flame-shield.png';
import pyroBurningHeart from '../../../../assets/images/abilities/pyro/burning-heart.png';
import { burn } from '../statusEffects';

const fireBall: Ability = {
    id: 'fireBall',
    name: 'Fire ball',
    icon: pyroFireball,
    mana: 0,
    cost: 1,
    baseDamage: 10,
    description: 'Shoot a fireball and deal direct damage leaving a burning DOT.',
    execute: () => {
        const { opponent, setOpponent, player, setPlayer } = getBattleState();
        const damagedOpponent = manipulateHealth({ target: opponent, operator: '-', amount: fireBall.baseDamage });
        const updatedAbilityMana = updateAbilityMana(player.abilities, 'fireBall');
        const newStatusArray = applyStatusEffect(opponent.debuffs, burn);
        setPlayer({ ...player, abilities: updatedAbilityMana });
        setOpponent({ ...opponent, hp: damagedOpponent, debuffs: newStatusArray });
    },
};

const flameShield: Ability = {
    id: 'flameShield',
    name: 'Flame shield',
    icon: pyroFlameShield,
    mana: 0,
    cost: 5,
    baseDamage: 0,
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
    cost: 8,
    baseDamage: 0,
    description: 'Shoot a fireball each time you match fireball cards for the duration.',
    execute: () => {
        console.log('Burning heart');
    },
};

export const pyroClass: GameClass = {
    id: 'pyro',
    name: 'Pyro',
    portrait: pyroPortrait,
    fullPicture: pyroPortrait,
    maxhp: 100,
    hp: 100,
    buffs: [],
    debuffs: [],
    description: 'Spreads his love of fire with fiery destruction!',
    abilities: [fireBall, flameShield, burningHeart],
};

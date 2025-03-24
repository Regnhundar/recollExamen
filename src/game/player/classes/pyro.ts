import { GameClass, Ability } from '../../../interfaces';
import { applyStatusEffect, manipulateHealth, updateAbilityMana } from '../abilityFunctions';
import { getBattleState } from '@/src/stores/battleState';
import pyroPortrait from '../../../../assets/images/characters/pyro/pyro.png';
import pyroFull from '../../../../assets/images/characters/pyro/pyroFull.png';
import pyroFireball from '../../../../assets/images/abilities/pyro/fire-ball.png';
import pyroFlameShield from '../../../../assets/images/abilities/pyro/flame-shield.png';
import pyroBurningHeart from '../../../../assets/images/abilities/pyro/burning-heart.png';
import { burn } from '../statusEffects';
import { Buff } from '@/src/interfaces/interfaceStatusEffects';

export const fireBall: Ability = {
    id: 'fireBall',
    name: 'Fireball',
    icon: pyroFireball,
    mana: 0,
    cost: 2,
    baseDamage: 10,
    description: `Deal direct damage that makes your enemy burn for ${burn.duration} turns.`,
    execute: () => {
        const { opponent, setOpponent, player, setPlayer } = getBattleState();

        const damagedOpponent = manipulateHealth({ target: opponent, operator: '-', amount: fireBall.baseDamage });
        const updatedAbilityMana = updateAbilityMana(player.abilities, 'fireBall');
        const newStatusArray = applyStatusEffect(opponent.debuffs, burn);

        setPlayer({ ...player, abilities: updatedAbilityMana });
        setOpponent({ ...opponent, hp: damagedOpponent, debuffs: newStatusArray });
    },
};

const burninate: Ability = {
    id: 'burninate',
    name: 'Burninate',
    icon: pyroFlameShield,
    mana: 0,
    cost: 5,
    baseDamage: 5,
    description: 'Consume burn to deal BIG DAMAGE! Not burning? Meh. Small damage.',
    execute: () => {
        const { opponent, setOpponent, player, setPlayer } = getBattleState();

        const existingBurn = opponent.debuffs.find((debuff) => debuff.id === 'burn');

        const damagedOpponent = manipulateHealth({
            target: opponent,
            operator: '-',
            amount: existingBurn ? burninate.baseDamage * existingBurn.duration : burninate.baseDamage,
        });

        if (existingBurn) {
            const removeBurnFromDebuffs = opponent.debuffs.filter((debuff) => debuff.id !== 'burn');
            setOpponent({ ...opponent, hp: damagedOpponent, debuffs: removeBurnFromDebuffs });
        } else {
            setOpponent({ ...opponent, hp: damagedOpponent });
        }

        const updatedAbilityMana = updateAbilityMana(player.abilities, 'burninate');
        setPlayer({ ...player, abilities: updatedAbilityMana });
    },
};

const freeBall: Ability = {
    id: 'fireBall',
    name: 'Freeball',
    icon: pyroFireball,
    mana: 0,
    cost: 0,
    baseDamage: 10,
    description: `This is the free version of fireball that triggers by matching fireball cards`,
    execute: () => {
        const { opponent, setOpponent } = getBattleState();
        const damagedOpponent = manipulateHealth({ target: opponent, operator: '-', amount: fireBall.baseDamage });
        const newStatusArray = applyStatusEffect(opponent.debuffs, burn);
        setOpponent({ ...opponent, hp: damagedOpponent, debuffs: newStatusArray });
    },
};

const burningHeartBuff: Buff = {
    id: 'burningHeartBuff',
    icon: pyroBurningHeart,
    duration: 5,
    isTriggeringAbilityOnMatch: true,
    abilityToTrigger: freeBall,
};

const burningHeart: Ability = {
    id: 'burningHeart',
    name: 'Burning heart',
    icon: pyroBurningHeart,
    mana: 0,
    cost: 0,
    baseDamage: 0,
    description: `Shoot a fireball each time you match fireball cards for ${burningHeartBuff.duration} turns.`,
    execute: () => {
        const { player, setPlayer } = getBattleState();

        const updatedAbilityMana = updateAbilityMana(player.abilities, 'burningHeart');
        const newStatusArray = applyStatusEffect(player.buffs, burningHeartBuff);
        setPlayer({ ...player, abilities: updatedAbilityMana, buffs: newStatusArray });
    },
};

export const pyroClass: GameClass = {
    id: 'pyro',
    name: 'Pyro',
    portrait: pyroPortrait,
    fullPicture: pyroFull,
    classColor: '#A163C5',
    maxhp: 100,
    hp: 100,
    buffs: [],
    debuffs: [],
    description: 'Spreads his love of fire with fiery destruction!',
    abilities: [fireBall, burninate, burningHeart],
};

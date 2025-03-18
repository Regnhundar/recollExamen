import { GameClass, Ability } from '../../../../interfaces';
import { applyStatusEffect, manipulateHealth, updateAbilityMana } from '../abilityFunctions';
import { getBattleState } from '@/src/stores/battleState';
import pyroPortrait from '../../../../assets/images/characters/pyro/pyro.png';
import pyroFireball from '../../../../assets/images/abilities/pyro/fire-ball.png';
import pyroFlameShield from '../../../../assets/images/abilities/pyro/flame-shield.png';
import pyroBurningHeart from '../../../../assets/images/abilities/pyro/burning-heart.png';
import { burn } from '../statusEffects';
import { Buff } from '@/interfaces/interfaceStatusEffects';

export const fireBall: Ability = {
    id: 'fireBall',
    name: 'Fireball',
    icon: pyroFireball,
    mana: 0,
    cost: 3,
    baseDamage: 10,
    description: `Shoot a fireball and deal direct damage that makes your enemy burn for ${burn.duration} turns.`,
    execute: () => {
        const { opponent, setOpponent, player, setPlayer } = getBattleState();
        const isBurningHeartActive = player.buffs.some((buff) => buff.id === 'burningHeartBuff');
        const damagedOpponent = manipulateHealth({ target: opponent, operator: '-', amount: fireBall.baseDamage });
        if (!isBurningHeartActive) {
            const updatedAbilityMana = updateAbilityMana(player.abilities, 'fireBall');
            setPlayer({ ...player, abilities: updatedAbilityMana });
        }
        const newStatusArray = applyStatusEffect(opponent.debuffs, burn);

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
    description: 'Enemy burning? Consume burn to deal BIG DAMAGE! Not burning? Meh. Small damage.',
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

const burningHeartBuff: Buff = {
    id: 'burningHeartBuff',
    duration: 5,
    isTriggeringAbilityOnMatch: true,
    abilityToTrigger: fireBall,
};

const burningHeart: Ability = {
    id: 'burningHeart',
    name: 'Burning heart',
    icon: pyroBurningHeart,
    mana: 0,
    cost: 8,
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
    fullPicture: pyroPortrait,
    maxhp: 100,
    hp: 100,
    buffs: [],
    debuffs: [],
    description: 'Spreads his love of fire with fiery destruction!',
    abilities: [fireBall, burninate, burningHeart],
};

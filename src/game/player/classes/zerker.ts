import { GameClass, Ability } from '../../../interfaces/index';
import zerkerPortrait from '../../../../assets/images/characters/zerker/zerker.png';
import zerkerFull from '../../../../assets/images/characters/zerker/zerker-full.png';
import zerkerMadSwing from '../../../../assets/images/abilities/zerker/mad-swing.png';
import theLegs from '../../../../assets/images/abilities/zerker/the-legs.png';
import zerkerEnrage from '../../../../assets/images/abilities/zerker/enrage.png';
import { getBattleState } from '@/src/stores';
import { applyStatusEffect, calculateDamage, manipulateHealth, updateAbilityMana } from '../abilityFunctions';
import { Buff } from '@/src/interfaces/interfaceStatusEffects';

const wildSwing: Ability = {
    id: 'wildSwing',
    name: 'Wild swing',
    icon: zerkerMadSwing,
    mana: 0,
    cost: 2,
    baseDamage: 20,
    description: 'Swing wildly dealing big damage. Sometimes hitting yourself instead!',
    execute: () => {
        const { player, setPlayer, opponent, setOpponent } = getBattleState();
        const updatedAbilityMana = updateAbilityMana(player.abilities, 'wildSwing');
        const damageToDeal = calculateDamage(player, wildSwing.baseDamage);
        if (Math.random() > 0.2) {
            const damagedOpponent = manipulateHealth({ target: opponent, operator: '-', amount: damageToDeal });
            setPlayer({ ...player, abilities: updatedAbilityMana });
            setOpponent({ ...opponent, hp: damagedOpponent });
        } else {
            const damagedSelf = manipulateHealth({ target: player, operator: '-', amount: damageToDeal });
            setPlayer({ ...player, hp: damagedSelf, abilities: updatedAbilityMana });
        }
    },
};

const eatALeg: Ability = {
    id: 'theLegs',
    name: 'What about the legs?',
    icon: theLegs,
    mana: 0,
    cost: 3,
    baseDamage: 20,
    description: 'Since no one needs both of them. Take a bite and heal back up!',
    execute: () => {
        const { player, setPlayer } = getBattleState();
        const updatedAbilityMana = updateAbilityMana(player.abilities, 'theLegs');
        const healedSelf = manipulateHealth({ target: player, operator: '+', amount: eatALeg.baseDamage });
        setPlayer({ ...player, hp: healedSelf, abilities: updatedAbilityMana });
    },
};
const bloodyNineBuff: Buff = { id: 'bloodyNine', icon: zerkerEnrage, duration: 5, damageIncrease: 1 };

const bloodyNine: Ability = {
    id: 'bloodyNine',
    name: 'Bloody nine!',
    icon: zerkerEnrage,
    mana: 0,
    cost: 6,
    baseDamage: 0,
    description: 'Enrage and deal double damage! To everyone! Even yourself!',
    execute: () => {
        const { player, setPlayer } = getBattleState();
        const newStatusArray = applyStatusEffect(player.buffs, bloodyNineBuff);
        const updatedAbilityMana = updateAbilityMana(player.abilities, 'bloodyNine');
        setPlayer({ ...player, buffs: newStatusArray, abilities: updatedAbilityMana });
    },
};

export const zerkerClass: GameClass = {
    id: 'zerker',
    name: 'Zerker',
    portrait: zerkerPortrait,
    fullPicture: zerkerFull,
    classColor: '#9E6546',
    maxhp: 100,
    hp: 100,
    buffs: [],
    debuffs: [],
    description: 'Swings wildly for big damage. Sometimes hits himself.',
    abilities: [wildSwing, eatALeg, bloodyNine],
};

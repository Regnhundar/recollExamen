import { GameClass, Ability } from '../../../../interfaces/index';
import zerkerPortrait from '../../../../assets/images/characters/zerker/zerker.png';
import zerkerFull from '../../../../assets/images/characters/zerker/zerker-full.png';
import zerkerMadSwing from '../../../../assets/images/abilities/zerker/mad-swing.png';
import theLegs from '../../../../assets/images/abilities/zerker/the-legs.png';
import zerkerEnrage from '../../../../assets/images/abilities/zerker/enrage.png';
import { getBattleState } from '@/src/stores';
import { applyStatusEffect, calculateDamage, manipulateHealth, updateAbilityMana } from '../abilityFunctions';
import { Buff } from '@/interfaces/interfaceStatusEffects';

const wildSwing: Ability = {
    id: 'wildSwing',
    name: 'Wild swing',
    icon: zerkerMadSwing,
    mana: 0,
    cost: 1,
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
    cost: 5,
    baseDamage: 0,
    description: 'Since no one needs both of them. Take a bite and heal back up!',
    execute: () => {
        const { player, setPlayer } = getBattleState();
        const updatedAbilityMana = updateAbilityMana(player.abilities, 'theLegs');
        const healedSelf = manipulateHealth({ target: player, operator: '+', amount: 20 });
        setPlayer({ ...player, hp: healedSelf, abilities: updatedAbilityMana });
    },
};

const bloodyNine: Ability = {
    id: 'bloodyNine',
    name: 'Bloody nine!',
    icon: zerkerEnrage,
    mana: 0,
    cost: 1,
    baseDamage: 0,
    description: 'Enrage and become posessed by a nine fingered demon! Deal double damage!',
    execute: () => {
        const { player, setPlayer } = getBattleState();
        const enrage: Buff = { id: 'bloodyNine', duration: 3, damageIncrease: 1 };
        const newStatusArray = applyStatusEffect(player.buffs, enrage);
        const updatedAbilityMana = updateAbilityMana(player.abilities, 'bloodyNine');
        setPlayer({ ...player, buffs: newStatusArray, abilities: updatedAbilityMana });
    },
};

export const zerkerClass: GameClass = {
    id: 'zerker',
    name: 'Zerker',
    portrait: zerkerPortrait,
    fullPicture: zerkerFull,
    maxhp: 120,
    hp: 120,
    buffs: [],
    debuffs: [],
    description: 'Hard hitting lunatic that can take a punch. Sometimes from himself!',
    abilities: [wildSwing, eatALeg, bloodyNine],
};

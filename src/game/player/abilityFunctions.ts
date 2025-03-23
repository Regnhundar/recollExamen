import { Buff, Debuff } from '@/src/interfaces/interfaceStatusEffects';
import { Ability, GameClass } from '../../interfaces';
import { getBattleState, useGameStore } from '../../stores';

const { setIsGameOver } = useGameStore.getState();
interface Health {
    target: GameClass;
    operator: '+' | '-';
    amount: number;
}

export const calculateDamage = (target: GameClass, baseDamage: number) => {
    const buffMultipliers = target.buffs.reduce((acc, buff: Buff) => acc + (buff.damageIncrease ?? 0), 0);
    const debuffMultipliers = target.debuffs.reduce((acc, debuff: Debuff) => acc + (debuff.damageDecrease ?? 0), 0);
    const multiplier = 1 + (buffMultipliers - debuffMultipliers);
    return baseDamage * multiplier;
};

export const manipulateHealth = ({ target, operator, amount }: Health): number => {
    switch (operator) {
        case '+':
            target.hp = Math.min(target.hp + amount, target.maxhp);
            break;
        case '-':
            target.hp < amount ? (target.hp = 0) : (target.hp -= amount);
            target.hp === 0 && setIsGameOver(true);
            break;
        default:
            console.error('Invalid operator.');
            break;
    }
    return target.hp;
};

export const updateAbilityMana = (abilityArray: [Ability, Ability, Ability], abilityID: string, mana: number = 0) => {
    const updatedAbilities = abilityArray.map((ability: Ability) =>
        ability.id === abilityID ? { ...ability, mana: mana } : ability
    ) as [Ability, Ability, Ability];

    return updatedAbilities;
};

export const applyStatusEffect = (statusArray: Buff[] | Debuff[], newStatus: Buff | Debuff) => {
    const indexOfStatusToRefresh = statusArray.findIndex((existingStatus) => existingStatus.id === newStatus.id);

    if (indexOfStatusToRefresh !== -1) {
        const updatedStatusArray = statusArray.map((status, i) =>
            i === indexOfStatusToRefresh ? { ...status, duration: newStatus.duration } : status
        );
        return updatedStatusArray;
    }

    const newStatusArray = [...statusArray, newStatus];
    return newStatusArray;
};

export const executeStatusEffects = () => {
    const { player } = getBattleState();
    const buffsToExecute = player.buffs.filter((buff) => buff.execute);
    const debuffsToExecute = player.debuffs.filter((debuff) => debuff.execute);

    if (buffsToExecute.length > 0) {
        buffsToExecute.forEach((buff) => buff.execute!());
    }

    if (debuffsToExecute.length > 0) {
        debuffsToExecute.forEach((debuff) => debuff.execute!());
    }
    updateStatusDurations(player);
};

const updateStatusDurations = (player: GameClass) => {
    const { setPlayer } = getBattleState();

    const updatedBuffDurations = player.buffs
        .filter((buff) => buff.duration > 1)
        .map((buff) => ({ ...buff, duration: buff.duration - 1 }));

    const updatedDebuffDurations = player.debuffs
        .filter((debuff) => debuff.duration > 1)
        .map((debuff) => ({ ...debuff, duration: debuff.duration - 1 }));

    setPlayer({ ...player, buffs: updatedBuffDurations, debuffs: updatedDebuffDurations });
};

// const executeAbilityOnMatch = (abilityID: string) => {
//     const triggeringAbilities = [{ abilityID: 'fireBall', executeAbility: fireBall.execute }];
//     const abilityToTrigger = triggeringAbilities.find((ability) => ability.abilityID === abilityID);

//     if (abilityToTrigger) {
//         abilityToTrigger.executeAbility();
//     }
// };

import { Debuff } from '@/interfaces/interfaceStatusEffects';
import { getBattleState } from '@/src/stores';
import { manipulateHealth } from './abilityFunctions';

export const burn: Debuff = {
    id: 'burn',
    duration: 5,
    execute: () => {
        const { player, setPlayer } = getBattleState();
        const burnedPlayer = manipulateHealth({ target: player, operator: '-', amount: 1 });
        setPlayer({ ...player, hp: burnedPlayer });
    },
};

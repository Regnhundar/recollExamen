import { Debuff } from '@/src/interfaces/interfaceStatusEffects';
import { getBattleState } from '@/src/stores';
import { manipulateHealth } from './abilityFunctions';
import pyroFireball from '../../../assets/images/abilities/pyro/fire-ball.png';

export const burn: Debuff = {
    id: 'burn',
    duration: 5,
    icon: pyroFireball,
    execute: () => {
        const { player, setPlayer } = getBattleState();
        const burnedPlayer = manipulateHealth({ target: player, operator: '-', amount: 1 });
        setPlayer({ ...player, hp: burnedPlayer });
    },
};

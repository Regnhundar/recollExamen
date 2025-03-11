import { GameClass } from '../../../interfaces';
import { useGameStore } from '../../stores';

const { setIsGameOver } = useGameStore.getState();
interface Health {
    target: GameClass;
    operator: '+' | '-';
    amount: number;
}

export const manipulateHealth = ({ target, operator, amount }: Health): GameClass => {
    switch (operator) {
        case '+':
            target.hp += amount > target.maxhp ? (target.hp = target.maxhp) : (target.hp += amount);
            break;
        case '-':
            target.hp < amount ? (target.hp = 0) : (target.hp -= amount);
            target.hp === 0 && setIsGameOver(true);
            break;
        default:
            console.error('Invalid operator.');
            break;
    }
    return target;
};

// const applyBuff = (target) => {
//     console.log("I should apply a buff on someone.");
// };

// const applyDebuff = () => {
//     // Applicerar debuff med duration.
//     console.log("I should apply a debuff on someone.");
// };

// const pickRandomTarget = (array) => {
//     const target = array[Math.floor(Math.random() * array.length)];
//     return target;
// };

// 20 % [player1, player2, player2, player2, player2];

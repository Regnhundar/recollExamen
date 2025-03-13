import { useGameStore } from './useGameStore';
export const getBattleState = () => {
    const { playerTurn, playerOne, playerTwo, setPlayerOne, setPlayerTwo } = useGameStore.getState();

    const player = playerTurn === 1 ? playerOne : playerTwo;
    const setPlayer = playerTurn === 1 ? setPlayerOne : setPlayerTwo;
    const opponent = playerTurn === 1 ? playerTwo : playerOne;
    const setOpponent = playerTurn === 1 ? setPlayerTwo : setPlayerOne;

    return { player, setPlayer, opponent, setOpponent };
};

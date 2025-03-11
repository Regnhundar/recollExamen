import { create } from 'zustand';
import { GameClass } from '../../interfaces/index';

interface GameStore {
    playerTurn: number;
    setPlayerTurn: () => void;
    playerOne: GameClass | null;
    setPlayerOne: (playerOne: GameClass | null) => void;
    playerTwo: GameClass | null;
    setPlayerTwo: (playerTwo: GameClass | null) => void;
    isGameOver: boolean;
    setIsGameOver: (arg: boolean) => void;
}

const useGameStore = create<GameStore>((set) => ({
    playerTurn: 1,
    setPlayerTurn: () =>
        set((state) => ({
            playerTurn: state.playerTurn === 1 ? 2 : 1,
        })),
    playerOne: null,
    setPlayerOne: (playerOne) => set({ playerOne: playerOne }),
    playerTwo: null,
    setPlayerTwo: (playerTwo) => set({ playerTwo: playerTwo }),
    isGameOver: false,
    setIsGameOver: (boolean) => set({ isGameOver: boolean }),
}));

export default useGameStore;

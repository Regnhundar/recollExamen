import { create } from 'zustand';
import { GameClass } from '../../interfaces/index';

interface GameStore {
    playerTurn: number;
    setPlayerTurn: (value: number | ((prev: number) => number)) => void;
    playerOne: GameClass | null;
    setPlayerOne: (playerOne: GameClass | null) => void;
    playerTwo: GameClass | null;
    setPlayerTwo: (playerTwo: GameClass | null) => void;
    isGameOver: boolean;
    setIsGameOver: (arg: boolean) => void;
}

export const useGameStore = create<GameStore>((set) => ({
    playerTurn: 1,
    setPlayerTurn: (value) =>
        set((state) => ({
            playerTurn: typeof value === 'function' ? value(state.playerTurn) : value,
        })),
    playerOne: null,
    setPlayerOne: (playerOne) => set({ playerOne: playerOne }),
    playerTwo: null,
    setPlayerTwo: (playerTwo) => set({ playerTwo: playerTwo }),
    isGameOver: false,
    setIsGameOver: (boolean) => set({ isGameOver: boolean }),
}));

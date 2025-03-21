import { create } from 'zustand';
import { defaultClass } from '../game/player/classes/default';
import { GameClass } from '../../interfaces/index';

interface GameStore {
    playerTurn: number;
    setPlayerTurn: (value: number | ((prev: number) => number)) => void;
    playerOne: GameClass;
    setPlayerOne: (playerOne: GameClass) => void;
    playerTwo: GameClass;
    setPlayerTwo: (playerTwo: GameClass) => void;
    isGameOver: boolean;
    setIsGameOver: (arg: boolean) => void;
}

export const useGameStore = create<GameStore>((set) => ({
    playerTurn: 1,
    setPlayerTurn: (value) =>
        set((state) => ({
            playerTurn: typeof value === 'function' ? value(state.playerTurn) : value,
        })),
    playerOne: { ...defaultClass },
    setPlayerOne: (playerOne) => set({ playerOne: playerOne }),
    playerTwo: { ...defaultClass },
    setPlayerTwo: (playerTwo) => set({ playerTwo: playerTwo }),
    isGameOver: false,
    setIsGameOver: (boolean) => set({ isGameOver: boolean }),
}));

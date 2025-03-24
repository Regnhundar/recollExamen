import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import GameSquare from './GameSquare';
import { Card } from '@/src/interfaces';
import { useGameStore } from '../stores';
import { theme } from '../theme';

interface Props {
    playerCards: Card[];
    onPress?: (arg: number) => void;
}
export default function GameBoard({ playerCards, onPress }: Props) {
    const { playerTurn } = useGameStore();
    return (
        <LinearGradient
            colors={['rgba(0, 0, 0, .6)', 'rgba(0, 0, 0, .5)']}
            style={[styles.gameBoard, playerTurn === 1 ? styles.playerOne : styles.playerTwo]}>
            {playerCards.map((card) => (
                <GameSquare
                    key={card.id}
                    card={card}
                    onPress={() => (!card.isFlipped && onPress ? onPress(card.id) : null)}
                />
            ))}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gameBoard: {
        gap: 5,
        alignContent: 'center',
        justifyContent: 'center',
        padding: theme.spacing.medium,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#685755',
    },
    playerOne: {
        boxShadow:
            'inset 0 0 1 11 rgba(0, 0, 0, .07), inset 10 10 4 0 rgba(0, 0, 0, .35),inset -10 -10 4 0 rgba(255, 255, 255, .2)',
    },
    playerTwo: {
        boxShadow:
            'inset 0 0 1 11 rgba(0, 0, 0, .05), inset -10 -10 4 0 rgba(0, 0, 0, .35),inset 10 10 4 0 rgba(255, 255, 255, .2)',
        transform: [{ rotate: '180deg' }],
    },
});

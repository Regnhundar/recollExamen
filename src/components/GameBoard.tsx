import { StyleSheet, View } from 'react-native';
import React from 'react';
import GameSquare from './GameSquare';
import { Card } from '@/interfaces';
import { useGameStore } from '../stores';
interface Props {
    playerCards: Card[];
    onPress?: (arg: number) => void;
}
export default function GameBoard({ playerCards, onPress }: Props) {
    const { playerTurn } = useGameStore();
    return (
        <View style={[styles.gameBoard, playerTurn === 2 && styles.playerTwo]}>
            {playerCards.map((card) => (
                <GameSquare
                    key={card.id}
                    card={card}
                    onPress={() => (!card.isFlipped && onPress ? onPress(card.id) : null)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    gameBoard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBlock: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerTwo: {
        transform: [{ rotate: '180deg' }],
    },
});

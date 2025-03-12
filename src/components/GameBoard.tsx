import { StyleSheet, View } from 'react-native';
import React from 'react';
import GameSquare from './GameSquare';
import { Card } from '@/interfaces';
interface Props {
    playerCards: Card[];
    onPress?: (arg: number) => void;
}
export default function GameBoard({ playerCards, onPress }: Props) {
    return (
        <View style={styles.gameBoard}>
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
});

import { Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Card } from '@/interfaces';
import { theme } from '../theme';
import { useGameStore } from '../stores';

interface Props {
    card: Card;
    onPress: () => void;
}
export default function GameSquare({ card, onPress }: Props) {
    const { playerTurn } = useGameStore();

    return (
        <Pressable
            style={[
                styles.gameSquare,
                card.isFlipped
                    ? styles.gameSquareFlipped
                    : playerTurn === 1
                    ? styles.gameSquarePlayerOne
                    : styles.gameSquarePlayerTwo,
            ]}
            onPress={onPress}>
            {card.isFlipped ? <Image style={styles.gameSquareAbilityImage} source={card.icon} /> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    gameSquare: {
        backgroundColor: theme.colors.secondary,
        aspectRatio: 1,
        width: '40%',
        padding: theme.spacing.large,
    },

    gameSquarePlayerOne: {
        backgroundColor: theme.colors.playerOne,
    },
    gameSquarePlayerTwo: {
        backgroundColor: theme.colors.playerTwo,
    },
    gameSquareFlipped: {
        backgroundColor: 'beige',
    },
    gameSquareAbilityImage: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
});

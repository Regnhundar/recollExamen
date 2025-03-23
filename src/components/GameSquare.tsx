import { Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Card } from '@/src/interfaces';
import { theme } from '../theme';
import { useGameStore } from '../stores';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    card: Card;
    onPress: () => void;
}
export default function GameSquare({ card, onPress }: Props) {
    const { playerTurn } = useGameStore();

    return (
        <LinearGradient
            colors={
                playerTurn === 1
                    ? ['rgba(255, 255, 255, .1)', 'rgba(0, 0, 0, .2)']
                    : ['rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .1)']
            }
            style={[
                styles.gameSquareWrapper,
                card.isFlipped && playerTurn === 1
                    ? styles.gameSquareFlippedPlayerOne
                    : card.isFlipped && playerTurn === 2
                      ? styles.gameSquareFlippedPlayerTwo
                      : playerTurn === 1
                        ? styles.gameSquarePlayerOne
                        : styles.gameSquarePlayerTwo,
            ]}>
            <Pressable style={[styles.gameSquare]} onPress={onPress}>
                {card.isFlipped ? <Image style={styles.gameSquareAbilityImage} source={card.icon} /> : null}
            </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gameSquareWrapper: { width: '45%', aspectRatio: 1, borderRadius: 4, borderWidth: 2 },
    gameSquare: {
        aspectRatio: 1,
        width: '100%',
        padding: theme.spacing.large,
    },

    gameSquarePlayerOne: {
        backgroundColor: theme.colors.playerOne,
        boxShadow: theme.shadows.bigBulge,
    },
    gameSquarePlayerTwo: {
        backgroundColor: theme.colors.playerTwo,
        boxShadow: theme.shadows.bigBulgeReverse,
    },
    gameSquareFlippedPlayerOne: {
        backgroundColor: theme.colors.offwhite,
        boxShadow: theme.shadows.bigBulge,
    },
    gameSquareFlippedPlayerTwo: {
        boxShadow: theme.shadows.bigBulgeReverse,
        backgroundColor: theme.colors.offwhite,
    },
    gameSquareAbilityImage: {
        aspectRatio: 1,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
});

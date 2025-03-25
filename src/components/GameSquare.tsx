import { Pressable, StyleSheet, Image, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
    const flipAnim = useRef(new Animated.Value(0)).current;
    const [showFlippedSide, setShowFlippedSide] = useState(card.isFlipped);

    useEffect(() => {
        Animated.timing(flipAnim, {
            toValue: card.isFlipped ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            setShowFlippedSide(card.isFlipped);
        }, 150);

        return () => clearTimeout(timeout);
    }, [card.isFlipped]);

    const rotateY = flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });
    useEffect(() => {}, []);
    return (
        <Animated.View
            style={[
                styles.gameSquareWrapper,
                {
                    transform: [{ rotateY }],
                },
            ]}>
            <LinearGradient
                colors={
                    playerTurn === 1
                        ? ['rgba(255, 255, 255, .1)', 'rgba(0, 0, 0, .2)']
                        : ['rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .1)']
                }
                style={[
                    { borderRadius: 4 },
                    showFlippedSide
                        ? playerTurn === 1
                            ? styles.gameSquareFlippedPlayerOne
                            : styles.gameSquareFlippedPlayerTwo
                        : playerTurn === 1
                          ? styles.gameSquarePlayerOne
                          : styles.gameSquarePlayerTwo,
                ]}>
                <Pressable style={[styles.gameSquare]} onPress={onPress}>
                    {showFlippedSide ? <Image style={styles.gameSquareAbilityImage} source={card.icon} /> : null}
                </Pressable>
            </LinearGradient>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    gameSquareWrapper: { width: '45%', aspectRatio: 1, borderWidth: 2, borderRadius: 4 },
    gameSquare: {
        aspectRatio: 1,
        width: '100%',
        padding: theme.spacing.large,
    },

    gameSquarePlayerOne: {
        backgroundColor: theme.colors.playerOne,
        boxShadow:
            'inset 6 6 1 0 rgba(255, 255, 255, .2), inset -6 -6 1 0 rgba(0, 0, 0, .15), inset 0 0 1 7 rgba(0, 0, 0, .03), 5 5 15 0 rgba(0, 0, 0, .5)',
    },
    gameSquarePlayerTwo: {
        backgroundColor: theme.colors.playerTwo,
        boxShadow:
            'inset -6 -6 1 0 rgba(255, 255, 255, .2), inset 6 6 1 0 rgba(0, 0, 0, .15), inset 0 0 1 7 rgba(0, 0, 0, .03), -5 -5 15 0 rgba(0, 0, 0, .5)',
    },
    gameSquareFlippedPlayerOne: {
        backgroundColor: theme.colors.flipped,
        boxShadow:
            'inset -6 6 1 0 rgba(255, 255, 255, .2), inset 6 -6 1 0 rgba(0, 0, 0, .15), inset 0 0 1 7 rgba(0, 0, 0, .03), -5 5 15 0 rgba(0, 0, 0, .5)',
    },
    gameSquareFlippedPlayerTwo: {
        boxShadow:
            'inset -6 6 1 0 rgba(0, 0, 0, .15), inset 6 -6 1 0 rgba(255, 255, 255, .2), inset 0 0 1 7 rgba(0, 0, 0, .03), 5 -5 15 0 rgba(0, 0, 0, .5)',
        backgroundColor: theme.colors.flipped,
    },
    gameSquareAbilityImage: {
        aspectRatio: 1,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        transform: [{ rotateY: '180deg' }],
    },
});

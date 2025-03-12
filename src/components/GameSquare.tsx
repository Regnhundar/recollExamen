import { Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Card } from '@/interfaces';
import { theme } from '../theme';

interface Props {
    card: Card;
    onPress: () => void;
}
export default function GameSquare({ card, onPress }: Props) {
    return (
        <Pressable style={styles.gameSquare} onPress={onPress}>
            {card.isFlipped ? <Image style={styles.gameSquareAbilityImage} source={card.icon} /> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    gameSquare: { backgroundColor: theme.colors.secondary, aspectRatio: 1, width: '22%' },
    gameSquarePlayerOne: {},
    gameSquarePlayerTwo: {},
    gameSquareFlipped: {},
    gameSquareAbilityImage: {},
});

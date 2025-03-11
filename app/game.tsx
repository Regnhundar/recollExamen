import { View, StyleSheet, SafeAreaView, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import PlayerFrame from '@/src/components/PlayerFrame';
import { theme } from '@/src/theme';

import GameBoard from '@/src/components/GameBoard';
import { useGameStore } from '@/src/stores';
import { Card } from '@/interfaces';
import { createCards } from '@/src/game/gameboard/gameBoardFunctions';

export default function Game() {
    const { playerOne, setPlayerOne, setPlayerTwo, playerTwo, playerTurn, setPlayerTurn, isGameOver } = useGameStore();
    if (!playerOne || !playerTwo) {
        return (
            <Pressable style={styles.toClassSelect}>
                <Text>Both players have to select a class to start the game...</Text>
            </Pressable>
        );
    }

    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [isBoardActive, setIsBoardActive] = useState(true);
    const playerOneDeck = createCards(playerOne.abilities);
    const playerTwoDeck = createCards(playerTwo.abilities);
    const [playerOneCards, setPlayerOneCards] = useState<Card[]>(playerOneDeck);
    const [playerTwoCards, setPlayerTwoCards] = useState<Card[]>(playerTwoDeck);
    return (
        <SafeAreaView style={styles.container}>
            <PlayerFrame player={2} />

            <GameBoard />

            <PlayerFrame player={1} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.black,
    },
    toClassSelect: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.danger,
    },
});

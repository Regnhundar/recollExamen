import { StyleSheet, SafeAreaView, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PlayerFrame from '@/src/components/PlayerFrame';
import { theme } from '@/src/theme';
import GameBoard from '@/src/components/GameBoard';
import { getBattleState, useGameStore } from '@/src/stores';
import { Card } from '@/interfaces';
import { createCards, matchCards } from '@/src/game/gameboard/gameBoardFunctions';
import { useRouter } from 'expo-router';
import GameOver from '@/src/components/GameOver';
import { executeStatusEffects } from '@/src/game/player/abilityFunctions';

export default function Game() {
    const { playerOne, setPlayerOne, setPlayerTwo, playerTwo, playerTurn, setPlayerTurn, isGameOver } = useGameStore();
    const { opponent, setOpponent, player, setPlayer } = getBattleState();
    const router = useRouter();

    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [isBoardActive, setIsBoardActive] = useState(true);
    const playerOneDeck = createCards(playerOne.abilities);
    const playerTwoDeck = createCards(playerTwo.abilities);
    const [playerOneCards, setPlayerOneCards] = useState<Card[]>(playerOneDeck);
    const [playerTwoCards, setPlayerTwoCards] = useState<Card[]>(playerTwoDeck);

    if (playerOne.id === 'default' || playerTwo.id === 'default') {
        return (
            <Pressable style={styles.toClassSelect} onPress={() => router.push('/classSelection')}>
                <Text>Both players have to select a class to start the game...</Text>
            </Pressable>
        );
    }
    useEffect(() => {
        setFlippedCards([]);
        const unFlipCards = (cards: Card[]) => cards.map((card) => ({ ...card, isFlipped: false }));
        setPlayerOneCards((prev) => unFlipCards(prev));
        setPlayerTwoCards((prev) => unFlipCards(prev));
        setIsBoardActive(true);
        if (player.buffs.length > 0 || player.debuffs.length > 0) {
            executeStatusEffects();
        }
    }, [playerTurn]); // Resettar states när turn ändras och kör debuffs/buffs

    useEffect(() => {
        if (flippedCards.length >= 2 && flippedCards.length % 2 === 0) {
            const player = playerTurn === 1 ? playerOne : playerTwo;
            const matchResult = matchCards(flippedCards, player);

            if (matchResult.success) {
                const updateAbilityMana = playerTurn === 1 ? setPlayerOne : setPlayerTwo;
                const getNewBoard = playerTurn === 1 ? setPlayerOneCards : setPlayerTwoCards;
                const newDeck = playerTurn === 1 ? playerOneDeck : playerTwoDeck;
                updateAbilityMana(matchResult.player);
                if (flippedCards.length % 6 === 0) {
                    setTimeout(() => {
                        getNewBoard(newDeck);
                    }, 1000);
                }
            } else {
                setIsBoardActive(false);
                setTimeout(() => {
                    setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
                }, 1000);
            }
        }
    }, [flippedCards]);

    const updatePlayerCards = (cards: Card[], id: number) => {
        const updatedCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card));
        const flippedCard = updatedCards.find((card) => card.id === id);
        if (flippedCard) {
            setFlippedCards((prev) => [...prev, flippedCard]);
        }
        return updatedCards;
    };

    const handleFlip = (id: number) => {
        if (playerTurn === 1) {
            setPlayerOneCards((prev) => updatePlayerCards(prev, id));
        } else {
            setPlayerTwoCards((prev) => updatePlayerCards(prev, id));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isGameOver ? (
                <GameOver />
            ) : (
                <>
                    <PlayerFrame player={2} classData={playerTwo} />

                    <GameBoard
                        playerCards={playerTurn === 1 ? playerOneCards : playerTwoCards}
                        onPress={isBoardActive ? handleFlip : undefined}
                    />

                    <PlayerFrame player={1} classData={playerOne} />
                </>
            )}
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

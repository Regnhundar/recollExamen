import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useGameStore } from '../stores';
import { useRouter } from 'expo-router';
import TextButton from './TextButton';
import { defaultClass } from '../game/player/classes/default';
import { theme } from '../theme';
import GameOverMessageCard from './GameOverMessageCard';

interface Props {}
const GameOver: React.FC<Props> = () => {
    const { playerOne, playerTwo, setIsGameOver, setPlayerTurn, setPlayerOne, setPlayerTwo } = useGameStore();

    const router = useRouter();

    const winner = playerOne?.hp > playerTwo?.hp ? 1 : 2;

    const handleRematch = () => {
        setIsGameOver(false);
        setPlayerOne({ ...defaultClass });
        setPlayerTwo({ ...defaultClass });
        setPlayerTurn(1);
        router.replace('/classSelection');
    };

    return (
        <LinearGradient
            colors={[theme.colors.playerTwo, theme.colors.playerOne]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gameOver}>
            <GameOverMessageCard player={2} winner={winner} />
            <TextButton text={'play again'} onPress={handleRematch} />
            <GameOverMessageCard player={1} winner={winner} />
        </LinearGradient>
    );
};

export default GameOver;

const styles = StyleSheet.create({
    gameOver: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: theme.spacing.small,
    },

    gameOverButtonWrapper: {},
});

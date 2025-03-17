import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useGameStore } from '../stores';
import { useRouter } from 'expo-router';
import TextButton from './TextButton';

interface Props {}
const GameOver: React.FC<Props> = () => {
    const { playerOne, playerTwo, setPlayerOne, setPlayerTwo, setIsGameOver, setPlayerTurn } = useGameStore();
    const players = playerOne !== null && playerTwo !== null;
    const router = useRouter();
    const winner = players ? (playerOne?.hp > playerTwo?.hp ? 'Player one wins!' : 'Player two wins!') : 'Error!';

    const handleRematch = () => {
        setIsGameOver(false);
        setPlayerTurn(1);
        router.push('/classSelection');
    };

    return (
        <View style={styles.gameOver}>
            <Text>{winner}</Text>

            <View style={styles.gameOverButtonWrapper}>
                <TextButton text={'spela igen'} onPress={handleRematch}></TextButton>
            </View>
        </View>
    );
};

export default GameOver;

const styles = StyleSheet.create({
    gameOver: {
        flex: 1,
        width: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverButtonWrapper: {},
});

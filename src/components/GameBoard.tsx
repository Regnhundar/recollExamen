import { StyleSheet, View } from 'react-native';
import React from 'react';
import GameSquare from './GameSquare';

export default function GameBoard() {
    return (
        <View style={styles.gameBoard}>
            <GameSquare />
            <GameSquare />
            <GameSquare />
            <GameSquare />

            <GameSquare />
            <GameSquare />
            <GameSquare />
            <GameSquare />

            <GameSquare />
            <GameSquare />
            <GameSquare />
            <GameSquare />

            <GameSquare />
            <GameSquare />
            <GameSquare />
            <GameSquare />

            <GameSquare />
            <GameSquare />
            <GameSquare />
            <GameSquare />
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

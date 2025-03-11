import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
    player: number;
}
export default function PlayerFrame({ player }: Props) {
    return (
        <View style={player === 1 ? styles.playerFrame1 : styles.playerFrame2}>
            <Text>PlayerFrame</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    playerFrame1: {
        width: '100%',
        height: '15%',
        backgroundColor: 'red',
        marginBottom: 'auto',
    },
    playerFrame2: {
        width: '100%',
        height: '15%',
        backgroundColor: 'red',
        marginTop: 'auto',
    },
});

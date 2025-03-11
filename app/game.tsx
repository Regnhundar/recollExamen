import { View, StyleSheet, SafeAreaView } from 'react-native';

import React from 'react';
import PlayerFrame from '@/src/components/PlayerFrame';

export default function Game() {
    return (
        <SafeAreaView style={styles.container}>
            <PlayerFrame player={1} />
            <View style={styles.gameBoard}>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>

                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>

                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>

                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>

                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
            </View>
            <PlayerFrame player={2} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingBottom: 20,
    },
    gameBoard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBlock: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'hotpink',
        aspectRatio: 1,
        width: '22%',
    },
    text: {
        color: 'white',
    },

    button: {
        aspectRatio: 1,
        width: 200,
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 150,
        padding: 20,
        backgroundColor: 'white',
    },
});

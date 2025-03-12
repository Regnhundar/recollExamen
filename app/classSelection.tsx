import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useGameStore } from '@/src/stores';
import { theme } from '@/src/theme';
import { GameClass } from '@/interfaces';
import { classes } from '@/src/game/player/classes';

export default function classSelection() {
    const [selectedClass, setSelectedClass] = useState<GameClass | null>(null);
    const { setPlayerOne, setPlayerTwo, playerOne, playerTwo, playerTurn, setPlayerTurn } = useGameStore();

    const handlePlayerSelect = () => {
        if (!selectedClass) {
            return console.error('No class selected!');
        }
        const selectedPlayer = {
            ...selectedClass,
            hp: selectedClass.maxhp,
        };
        if (playerTurn === 1) {
            setPlayerOne(selectedPlayer);
        } else {
            setPlayerTwo(selectedPlayer);
        }
        setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
        setSelectedClass(null);
    };

    return (
        <SafeAreaView style={styles.classSelectionContainer}>
            <View style={styles.classInfoWrapper}>
                {classes.map((classItem) => (
                    <TouchableOpacity key={classItem.id} style={styles.classItemContainer} onPress={handlePlayerSelect}>
                        <Image source={classItem.portrait} style={styles.classInfoImage} />
                        <Text style={styles.classInfoName}>{classItem.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    classSelectionContainer: {
        backgroundColor: theme.colors.primary,
        flex: 1,
    },
    classInfoWrapper: {
        gap: theme.spacing.large,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    classItemContainer: {
        borderWidth: 2,

        padding: theme.spacing.large,
        alignItems: 'center',
        justifyContent: 'center',
    },
    classInfoImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    classInfoName: {
        color: theme.colors.white,
        fontSize: theme.fontSize.large,
        textAlign: 'center',
    },
});

import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/src/stores';
import { theme } from '@/src/theme';
import { Ability, GameClass } from '@/interfaces';
import { classes } from '@/src/game/player/classes';
import { useRouter } from 'expo-router';
import ClassInfo from '@/src/components/ClassInfo';

export default function classSelection() {
    const [selectedClass, setSelectedClass] = useState<GameClass | null>(null);
    const { setPlayerOne, setPlayerTwo, playerTurn, setPlayerTurn } = useGameStore();
    const router = useRouter();

    useEffect(() => {
        setPlayerTurn(1);
    }, []);

    const handlePlayerSelect = () => {
        if (!selectedClass) {
            return console.error('No class selected!');
        }
        const resetAbilities = selectedClass.abilities.map((ability) => ({ ...ability, mana: 0 })) as [
            Ability,
            Ability,
            Ability
        ];
        const selectedPlayerClass = {
            ...selectedClass,
            hp: selectedClass.maxhp,
            abilities: resetAbilities,
            buffs: [],
            debuffs: [],
        };
        if (playerTurn === 1) {
            setPlayerOne(selectedPlayerClass);
        } else {
            setPlayerTwo(selectedPlayerClass);
            router.push('/game');
        }
        setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
        setSelectedClass(null);
    };

    return (
        <SafeAreaView style={[styles.classSelectionContainer, playerTurn === 1 ? styles.playerOne : styles.playerTwo]}>
            {!selectedClass ? (
                <View style={styles.classInfoWrapper}>
                    {classes.map((classItem) => (
                        <TouchableOpacity
                            key={classItem.id}
                            style={styles.classItemContainer}
                            onPress={() => setSelectedClass(classItem)}>
                            <Image source={classItem.portrait} style={styles.classInfoImage} />
                            <Text style={styles.classInfoName}>{classItem.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <ClassInfo
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                    handlePlayerSelect={handlePlayerSelect}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    classSelectionContainer: {
        padding: theme.spacing.medium,

        flex: 1,
    },
    playerOne: {
        backgroundColor: theme.colors.playerOne,
    },
    playerTwo: {
        transform: [{ rotate: '180deg' }],
        backgroundColor: theme.colors.playerTwo,
    },
    classInfoWrapper: {
        gap: theme.spacing.large,
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

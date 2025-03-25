import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useGameStore } from '@/src/stores';
import { theme } from '@/src/theme';
import { Ability, GameClass } from '@/src/interfaces';
import { classes } from '@/src/game/player/classes';
import { useRouter } from 'expo-router';
import ClassInfo from '@/src/components/ClassInfo';
import ClassCard from '@/src/components/ClassCard';

export default function classSelection() {
    const [selectedClass, setSelectedClass] = useState<GameClass | null>(null);
    const { setPlayerOne, setPlayerTwo, playerTurn, setPlayerTurn } = useGameStore();
    const router = useRouter();

    const handlePlayerSelect = () => {
        if (!selectedClass) {
            return console.error('No class selected!');
        }
        const resetAbilities = selectedClass.abilities.map((ability) => ({ ...ability, mana: 0 })) as [
            Ability,
            Ability,
            Ability,
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
            router.replace('/game');
        }
        setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
        setSelectedClass(null);
    };

    return (
        <View
            style={[
                styles.classSelectionPageWrapper,
                playerTurn === 1
                    ? { backgroundColor: theme.colors.playerOne }
                    : { backgroundColor: theme.colors.playerTwo },
            ]}>
            <SafeAreaView
                style={[
                    styles.classSelectionPlayer,
                    styles.classSelectionWrapper,
                    playerTurn === 1 ? styles.playerOne : styles.playerTwo,
                ]}>
                <Text
                    style={[
                        styles.classSelectionPlayerTurnText,
                        playerTurn === 1 ? styles.classSelectionPlayerOneText : styles.classSelectionPlayerTwoText,
                    ]}>
                    {playerTurn === 1 ? 'Select player one' : 'Select player two'}
                </Text>

                {!selectedClass ? (
                    <ScrollView
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: theme.spacing.large,
                            marginTop: 20,
                        }}>
                        {classes.map((classItem, i) => (
                            <ClassCard
                                key={classItem.id}
                                classItem={classItem}
                                setSelectedClass={setSelectedClass}
                                index={i}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <ClassInfo
                        selectedClass={selectedClass}
                        setSelectedClass={setSelectedClass}
                        handlePlayerSelect={handlePlayerSelect}
                    />
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    classSelectionPageWrapper: {
        flex: 1,
        padding: theme.spacing.small,
    },

    classSelectionWrapper: {
        borderWidth: 2,
        flex: 1,
        padding: theme.spacing.small,
        borderRadius: 8,
    },
    classSelectionHeader: {
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    headerPlayerOne: {},
    headerPlayerTwo: {},
    classSelectionPlayerTurnText: {
        textAlign: 'center',
        fontFamily: 'Bangers',
        fontSize: 42,
        ...theme.shadows.textShadowBlack,
    },
    classSelectionPlayerOneText: {
        color: theme.colors.playerOne,
    },
    classSelectionPlayerTwoText: {
        color: theme.colors.playerTwo,
    },

    classSelectionPlayer: {
        gap: theme.spacing.medium,
        backgroundColor: 'beige',
    },
    playerOne: {},
    playerTwo: {
        transform: [{ rotate: '180deg' }],
    },
});

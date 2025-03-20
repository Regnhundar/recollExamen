import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useGameStore } from '@/src/stores';
import { theme } from '@/src/theme';
import { Ability, GameClass } from '@/interfaces';
import { classes } from '@/src/game/player/classes';
import { useRouter } from 'expo-router';
import ClassInfo from '@/src/components/ClassInfo';
import ClassCard from '@/src/components/ClassCard';
import { LinearGradient } from 'expo-linear-gradient';

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
            router.replace('/game');
        }
        setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
        setSelectedClass(null);
    };

    return (
        <LinearGradient style={styles.classSelectionPage} colors={[theme.colors.playerOne, theme.colors.playerTwo]}>
            <SafeAreaView style={playerTurn === 1 ? styles.playerOne : styles.playerTwo}>
                <View
                    style={[
                        styles.classSelectionHeader,
                        playerTurn === 1 ? styles.headerPlayerOne : styles.headerPlayerTwo,
                    ]}>
                    <Text>{playerTurn === 1 ? 'Spelare 1' : 'Spelare 2'}</Text>
                </View>
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
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    classSelectionPage: {
        flex: 1,
        padding: theme.spacing.small,
    },
    classSelectionHeader: {
        minHeight: 50,
        padding: theme.spacing.small,
        transform: [{ perspective: 100 }, { rotateZ: '1deg' }],
        boxShadow: theme.shadows.bulge,
        borderWidth: 1,
    },
    headerPlayerOne: {},
    headerPlayerTwo: {},

    playerOne: { flex: 1 },
    playerTwo: {
        flex: 1,
        transform: [{ rotate: '180deg' }],
    },
    classInfoWrapper: {},
});

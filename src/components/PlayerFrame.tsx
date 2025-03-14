import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { theme } from '../theme';
import { GameClass } from '@/interfaces';

interface Props {
    player: number;
    classData: GameClass;
}
export default function PlayerFrame({ player, classData }: Props) {
    return (
        <View style={[styles.playerFrame, player === 1 ? styles.playerOne : styles.playerTwo]}>
            <View style={styles.portraitWrapper}>
                <Image style={styles.playerPortrait} source={classData.portrait} />
            </View>

            <View style={styles.rightSide}>
                <View style={styles.healthbarWrapper}>
                    <Text style={styles.healthNumber}>{classData.hp}</Text>
                    <View style={[styles.healthBar, { width: `${(classData.hp / classData.maxhp) * 100}%` }]}></View>
                </View>
                <View style={styles.abilityButtonContainer}>
                    {classData.abilities.map((ability) => (
                        <Pressable
                            key={`${ability.id}-${player}`}
                            style={styles.abilityButton}
                            onPress={ability.execute}>
                            <Image source={ability.icon} style={styles.abilityIcon} />
                            <Text style={styles.abilityMana}>{`${ability.mana}/${ability.cost}`}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    playerFrame: {
        width: '100%',
        height: '18%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        paddingInline: theme.spacing.small,
        paddingBlock: theme.spacing.medium,
        gap: theme.spacing.small,
        backgroundColor: theme.colors.primary,
    },
    playerOne: {
        marginTop: 'auto',
        backgroundColor: theme.colors.playerOne,
    },
    playerTwo: {
        marginBottom: 'auto',
        transform: [{ rotate: '180deg' }],
        backgroundColor: theme.colors.playerTwo,
    },
    portraitWrapper: { height: '100%' },
    playerPortrait: {
        maxHeight: '100%',
        aspectRatio: 1,
        objectFit: 'contain',
        backgroundColor: theme.colors.white,
    },
    rightSide: {
        flex: 1,
        gap: theme.spacing.xxsmall,
    },
    healthbarWrapper: {
        position: 'relative',
        flex: 1,
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: theme.borderWidth.medium,
        backgroundColor: 'red',
    },
    healthBar: {
        position: 'absolute',
        backgroundColor: 'green',
        zIndex: 9,
        height: '100%',
        left: 0,
    },

    healthNumber: {
        color: theme.colors.white,
        fontWeight: 600,
        zIndex: 999,
    },
    abilityButtonContainer: {
        height: '60%',
        flexDirection: 'row',
        columnGap: theme.spacing.xxsmall,
    },
    abilityButton: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: theme.spacing.xxsmall,
        backgroundColor: 'beige',
        gap: 2,
    },
    abilityMana: {
        position: 'absolute',
        bottom: '-15%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '15%' }],
        backgroundColor: theme.colors.black,
        fontWeight: 600,
        color: theme.colors.white,
    },
    abilityIcon: { resizeMode: 'contain', height: '80%', width: '80%' },
});

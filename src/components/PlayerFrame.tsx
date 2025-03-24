import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { theme } from '../theme';
import { GameClass } from '@/src/interfaces';
import { useGameStore } from '../stores';
import StatusTracker from './StatusTracker';

interface Props {
    player: number;
    classData: GameClass;
}
export default function PlayerFrame({ player, classData }: Props) {
    const { playerTurn, isGameOver } = useGameStore();
    const percentOfHitPoints = (classData.hp / classData.maxhp) * 100;

    const playerBasedShadow =
        player === 1 ? { boxShadow: theme.shadows.bulge } : { boxShadow: theme.shadows.bulgeReverse };

    return (
        <LinearGradient
            colors={
                player === 1
                    ? ['rgba(255, 255, 255, .1)', 'rgba(0, 0, 0, .2)']
                    : ['rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .1)']
            }
            style={[styles.playerFrame, player === 1 ? styles.playerOne : styles.playerTwo]}>
            <LinearGradient
                colors={
                    player === 1
                        ? ['rgba(255, 255, 255, .1)', 'rgba(0, 0, 0, .2)']
                        : ['rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .1)']
                }
                style={[styles.portraitWrapper, { backgroundColor: `${classData.classColor}` }]}>
                <StatusTracker type={'buff'} statusArray={classData.buffs} />
                <Image style={styles.playerPortrait} source={classData.portrait} />
                <StatusTracker type={'debuff'} statusArray={classData.debuffs} />
            </LinearGradient>

            <View style={styles.rightSide}>
                <View style={styles.healthbarWrapper}>
                    <Text style={styles.healthNumber}>{classData.hp}</Text>
                    <View
                        style={[
                            styles.healthBar,
                            { width: `${percentOfHitPoints}%` },
                            percentOfHitPoints !== 100 && { borderRightColor: '#bd0000', borderRightWidth: 2 },
                            playerBasedShadow,
                        ]}></View>
                </View>
                <View style={styles.abilityButtonContainer}>
                    {classData.abilities.map((ability) => (
                        <Pressable
                            key={`${ability.id}-${player}`}
                            style={[styles.abilityButton, playerBasedShadow]}
                            onPress={
                                playerTurn === player && ability.mana === ability.cost && !isGameOver
                                    ? ability.execute
                                    : undefined
                            }>
                            <Image source={ability.icon} style={styles.abilityIcon} />
                            <Text
                                style={[
                                    styles.abilityMana,
                                    ability.mana === ability.cost
                                        ? styles.abilityEnoughMana
                                        : styles.abilityNotEnoughMana,
                                    playerBasedShadow,
                                ]}>{`${ability.mana}/${ability.cost}`}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </LinearGradient>
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
        boxShadow: 'inset 0 4 1 0 #5ebff0, inset 0 5 1 0 rgba(0,0,0,.1),',
    },
    playerTwo: {
        marginBottom: 'auto',
        transform: [{ rotate: '180deg' }],
        backgroundColor: theme.colors.playerTwo,
        boxShadow: 'inset 0 4 1 0 #c06413, inset 0 5 1 0 rgba(0,0,0,.1),',
    },
    portraitWrapper: {
        height: '100%',
        position: 'relative',
        borderWidth: 2,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
    },
    playerPortrait: {
        maxHeight: '100%',
        aspectRatio: 1,
        objectFit: 'contain',
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

        boxShadow: 'rgba(50, 50, 93, 0.4) 0 30 60 -12 inset, rgba(0, 0, 0, 0.4) 0 18 36 -18 inset',
        borderRadius: 4,
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
        ...theme.shadows.textShadowBlackSmall,
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
        boxShadow: theme.shadows.bulge,
        borderRadius: 4,
    },
    abilityMana: {
        position: 'absolute',
        bottom: -25,
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        width: '60%',
        textAlign: 'center',
        borderRadius: 4,
        fontWeight: 600,
        color: theme.colors.white,
        borderWidth: 1,
        ...theme.shadows.textShadowBlackSmall,
    },
    abilityEnoughMana: {
        backgroundColor: theme.colors.proceed,
    },
    abilityNotEnoughMana: {
        backgroundColor: 'gray',
    },
    abilityIcon: {
        resizeMode: 'contain',
        height: '80%',
        width: '80%',
        filter: [{ dropShadow: theme.shadows.dropShadow }],
    },
});

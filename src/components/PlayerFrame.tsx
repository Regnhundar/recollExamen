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
                <View style={styles.healthbar}>
                    <Text style={styles.healthNumber}>{classData.hp}</Text>
                </View>
                <View style={styles.abilityButtonContainer}>
                    {classData.abilities.map((ability) => (
                        <Pressable
                            key={`${ability.id}-${player}`}
                            style={styles.abilityButton}
                            onPress={ability.execute}>
                            <Image source={ability.icon} style={styles.icon} />
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
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        paddingInline: theme.spacing.small,
        paddingBlock: theme.spacing.large,
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
        backgroundColor: 'white',
    },
    rightSide: {
        flex: 1,
        gap: theme.spacing.xxsmall,
    },
    healthbar: {
        flex: 1,
        height: '50%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: theme.borderWidth.medium,
    },
    healthNumber: {
        color: theme.colors.white,
        fontWeight: 600,
    },
    abilityButtonContainer: {
        height: '50%',
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
        padding: theme.spacing.small,
    },
    abilityMana: { position: 'absolute', bottom: 2, left: 2 },
    icon: { resizeMode: 'contain', height: '80%', width: '80%' },
});

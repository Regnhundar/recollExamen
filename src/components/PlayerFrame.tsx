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
                <Image
                    style={styles.playerPortrait}
                    source={require('../../assets/images/characters/zerker/zerker.png')}
                />
            </View>

            <View style={styles.rightSide}>
                <View style={styles.healthbar}>
                    <Text style={styles.healthNumber}>100</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => console.log('MAD SWING!')}>
                        <Image
                            source={require('../../assets/images/abilities/zerker/mad-swing.png')}
                            style={styles.icon}
                        />
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => console.log('IGNORE PAIN')}>
                        <Image
                            source={require('../../assets/images/abilities/zerker/ignore-pain.png')}
                            style={styles.icon}
                        />
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => console.log('ENRAGE')}>
                        <Image
                            source={require('../../assets/images/abilities/zerker/enrage.png')}
                            style={styles.icon}
                        />
                    </Pressable>
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
    buttonContainer: {
        height: '50%',
        flexDirection: 'row',
        columnGap: theme.spacing.xxsmall,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: theme.spacing.xxsmall,
        backgroundColor: 'beige',
    },
    icon: { objectFit: 'contain' },
});

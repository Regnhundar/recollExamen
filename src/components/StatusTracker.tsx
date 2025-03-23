import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Buff, Debuff } from '@/src/interfaces/interfaceStatusEffects';
import { theme } from '../theme';

interface Props {
    statusArray: Buff[] | Debuff[];
    type: 'buff' | 'debuff';
}
const StatusTracker: React.FC<Props> = ({ statusArray, type }) => {
    return (
        <View style={[styles.statusTrackerWrapper, type === 'buff' ? styles.buffBar : styles.debuffBar]}>
            {statusArray.map((statusEffect) => (
                <View
                    key={statusEffect.id}
                    style={[
                        styles.statusEffect,
                        type === 'buff' ? styles.statusEffectBuff : styles.statusEffectDebuff,
                    ]}>
                    <Image source={statusEffect.icon} style={styles.statusImage} />
                    <Text style={styles.statusDuration}>{statusEffect.duration}</Text>
                </View>
            ))}
        </View>
    );
};

export default StatusTracker;

const styles = StyleSheet.create({
    statusTrackerWrapper: {
        flexDirection: 'row',
        gap: 1,
        position: 'absolute',
    },
    buffBar: {
        bottom: 0,
        right: 0,
        zIndex: 999,
    },
    debuffBar: {
        top: 0,
        left: 0,
        zIndex: 999,
    },
    statusEffect: {
        padding: 2,
        width: 40,
        height: 40,
        borderWidth: 2,
        position: 'relative',
        backgroundColor: theme.colors.white,
    },
    statusEffectBuff: {
        borderColor: 'green',
    },
    statusEffectDebuff: {
        borderColor: 'red',
    },
    statusImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        resizeMode: 'contain',
    },
    statusDuration: {
        fontSize: theme.fontSize.medium,
        fontWeight: 600,
        top: 1,
        left: 1,
        position: 'absolute',
        backgroundColor: 'black',
        color: 'white',
    },
});

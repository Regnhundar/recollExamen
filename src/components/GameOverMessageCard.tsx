import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../theme';

interface Props {
    player: 1 | 2;
    winner: 1 | 2;
}
const GameOverMessageCard: React.FC<Props> = ({ player, winner }) => {
    return (
        <View
            style={[
                styles.gameOverMessageWrapper,
                player === 1 ? styles.gameOverMessageWrapperPlayerOne : styles.gameOverMessageWrapperPlayerTwo,
            ]}>
            <Text style={styles.gameOverEmote}>{winner === player ? '👑' : '😵'}</Text>
            <Text
                style={[
                    styles.gameOverMessage,
                    player === 1 ? { color: theme.colors.playerOne } : { color: theme.colors.playerTwo },
                ]}>
                {winner === player ? 'Awesome! You won!' : 'Aww you lost!'}
            </Text>
        </View>
    );
};

export default GameOverMessageCard;

const styles = StyleSheet.create({
    gameOverMessageWrapper: {
        backgroundColor: theme.colors.offwhite,
        boxShadow: theme.shadows.bulge,
        padding: theme.spacing.large,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderRadius: 4,
        height: '30%',
        width: '80%',
    },
    gameOverMessageWrapperPlayerOne: {},
    gameOverMessageWrapperPlayerTwo: {
        transform: [{ rotate: '180deg' }],
    },
    gameOverEmote: {
        fontSize: 55,
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        top: -40,
        textAlign: 'center',
        ...theme.shadows.textShadowBlack,
    },
    gameOverMessage: {
        fontFamily: 'Bangers',
        textAlign: 'center',
        fontSize: 28,
        ...theme.shadows.textShadowBlack,
    },
});

import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import React from 'react';
import { theme } from '../theme';

interface Props {
    text: string;
    onPress?: () => void;
    type?: 'proceed' | 'cancel' | 'info';
}
const TextButton: React.FC<Props> = ({ text, onPress, type = 'proceed' }) => {
    return (
        <TouchableHighlight
            style={[
                styles.textButton,
                type === 'proceed' ? styles.proceed : type === 'cancel' ? styles.cancel : styles.info,
            ]}
            onPress={onPress}>
            <Text style={styles.textButtonText}>{text.toUpperCase()}</Text>
        </TouchableHighlight>
    );
};

export default TextButton;

const styles = StyleSheet.create({
    textButton: {
        paddingInline: theme.spacing.medium,
        paddingBlock: theme.spacing.small,
        alignSelf: 'flex-start',
        boxShadow: theme.shadows.bulge,

        borderRadius: 4,
        borderWidth: 1,
    },
    textButtonText: { fontWeight: 600, fontSize: theme.fontSize.medium },
    proceed: { backgroundColor: theme.colors.proceed },
    cancel: {
        backgroundColor: theme.colors.cancel,
    },
    info: {
        backgroundColor: theme.colors.info,
    },
});

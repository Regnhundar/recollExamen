import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import React from 'react';
import { theme } from '../theme';

interface Props {
    text: string;
    onPress?: () => void;
    type?: 'proceed' | 'cancel';
}
const TextButton: React.FC<Props> = ({ text, onPress, type = 'proceed' }) => {
    return (
        <TouchableHighlight
            style={[styles.textButton, type === 'proceed' ? styles.proceed : styles.cancel]}
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
    },
    textButtonText: { fontWeight: 600, fontSize: theme.fontSize.medium },
    proceed: { backgroundColor: 'green' },
    cancel: {
        backgroundColor: 'red',
    },
});

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme } from '../theme';

interface Props {
    text: string;
    onPress?: () => void;
    type?: 'proceed' | 'cancel';
}
const TextButton: React.FC<Props> = ({ text, onPress, type = 'proceed' }) => {
    return (
        <TouchableOpacity
            style={[styles.textButton, type === 'proceed' ? styles.proceed : styles.cancel]}
            onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;

const styles = StyleSheet.create({
    textButton: {
        paddingInline: theme.spacing.medium,
        paddingBlock: theme.spacing.xsmall,
    },
    proceed: {
        backgroundColor: 'green',
    },
    cancel: {
        backgroundColor: 'red',
    },
});

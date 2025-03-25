import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { GameClass } from '@/src/interfaces';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    classItem: GameClass;
    setSelectedClass: (selectedClass: GameClass) => void;
    index: number;
}
const ClassCard: React.FC<Props> = ({ classItem, setSelectedClass, index }) => {
    const everyOtherStyle = index % 2 === 0 ? styles.classItemUneven : styles.classItemEven;
    return (
        <TouchableOpacity
            key={classItem.id}
            style={[
                styles.classItemContainer,
                index % 2 === 0 ? styles.classItemContainerUneven : styles.classItemContainerEven,
            ]}
            onPress={() => setSelectedClass(classItem)}>
            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                style={[{ backgroundColor: classItem.classColor }, styles.classInfoImageWrapper, everyOtherStyle]}>
                <Image source={classItem.portrait} style={[styles.classInfoImage, everyOtherStyle]} />
            </LinearGradient>

            <LinearGradient
                style={[styles.classInfoNameWrapper, { backgroundColor: classItem.classColor }, everyOtherStyle]}
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}>
                <Text style={styles.classInfoName}>{classItem.name}</Text>
            </LinearGradient>
            <View style={[styles.classInfoDescriptionWrapper, everyOtherStyle]}>
                <Text style={styles.classInfoDescription}>{classItem.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ClassCard;

const styles = StyleSheet.create({
    classItemContainer: {
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: theme.colors.offwhite,
        padding: theme.spacing.small,
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        width: '100%',
        boxShadow: theme.shadows.bulge,
        borderRadius: 4,
    },
    classItemContainerEven: { transform: [{ perspective: 100 }, { rotateZ: '1deg' }] },
    classItemContainerUneven: { transform: [{ perspective: 100 }, { rotateZ: '-1deg' }] },
    classItemEven: { transform: [{ perspective: 100 }, { rotateZ: '-1deg' }] },
    classItemUneven: { transform: [{ perspective: 100 }, { rotateZ: '1deg' }] },

    classInfoImageWrapper: {
        borderWidth: 2,
        position: 'absolute',
        left: 10,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    classInfoImage: {
        width: '100%',
        height: '100%',
        flexShrink: 1,
        resizeMode: 'contain',
    },
    classInfoNameWrapper: {
        textAlign: 'center',
        position: 'absolute',
        top: '-20%',
        left: '50%',
        boxShadow: theme.shadows.bulge,
        paddingBlock: theme.spacing.xxsmall,
        paddingInline: theme.spacing.small,
        borderRadius: 4,
        borderWidth: 2,
    },
    classInfoName: {
        color: theme.colors.white,
        ...theme.shadows.textShadowBlack,
        fontSize: theme.fontSize.large,
    },
    classInfoDescriptionWrapper: {
        width: '60%',
        padding: theme.spacing.small,
        flexShrink: 1,
        alignSelf: 'flex-end',
    },
    classInfoDescription: {
        fontSize: theme.fontSize.medium,
    },
});

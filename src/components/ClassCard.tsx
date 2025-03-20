import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { GameClass } from '@/interfaces';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    classItem: GameClass;
    setSelectedClass: (selectedClass: GameClass) => void;
    index: number;
}
const ClassCard: React.FC<Props> = ({ classItem, setSelectedClass, index }) => {
    return (
        <TouchableOpacity
            key={classItem.id}
            style={[
                styles.classItemContainer,
                (index + 1) % 2 === 0 ? styles.classItemContainerEven : styles.classItemContainerUneven,
            ]}
            onPress={() => setSelectedClass(classItem)}>
            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                style={[
                    { backgroundColor: classItem.classColor },
                    styles.classInfoImageWrapper,
                    (index + 1) % 2 === 0 ? styles.classItemEven : styles.classItemUneven,
                ]}>
                <Image
                    source={classItem.portrait}
                    style={[
                        styles.classInfoImage,
                        (index + 1) % 2 === 0 ? styles.classItemEven : styles.classItemUneven,
                    ]}
                />
            </LinearGradient>
            <LinearGradient
                style={[
                    styles.classInfoNameWrapper,
                    { backgroundColor: classItem.classColor },
                    (index + 1) % 2 === 0 ? styles.classItemEven : styles.classItemUneven,
                ]}
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}>
                <Text style={styles.classInfoName}>{classItem.name}</Text>
            </LinearGradient>
            <View
                style={[
                    styles.classInfoDescriptionWrapper,

                    (index + 1) % 2 === 0 ? styles.classItemEven : styles.classItemUneven,
                ]}>
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
        flexDirection: 'row',
        alignItems: 'center',
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
        alignSelf: 'flex-start',
        color: theme.colors.white,
        filter: theme.shadows.dropShadow,
        fontSize: theme.fontSize.large,
    },
    classInfoDescriptionWrapper: {
        padding: 10,
        flexShrink: 1,
    },
    classInfoDescription: {
        fontSize: theme.fontSize.medium,
    },
});

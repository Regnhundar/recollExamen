import { StyleSheet, Text, View, Image, FlatList, Platform } from 'react-native';
import React from 'react';
import { theme } from '../theme';
import TextButton from './TextButton';
import { GameClass } from '@/src/interfaces';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    selectedClass: GameClass;
    setSelectedClass: (arg: GameClass | null) => void;
    handlePlayerSelect: () => void;
}
const ClassInfo: React.FC<Props> = ({ selectedClass, setSelectedClass, handlePlayerSelect }) => {
    return (
        <View style={styles.selectedClassWrapper}>
            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                style={[styles.selectedClassImageWrapper, { backgroundColor: selectedClass.classColor }]}>
                <Text style={styles.selectedClassName}>{selectedClass.name.toUpperCase()}</Text>
                <Image source={selectedClass.fullPicture} style={styles.selectedClassPicture} />
            </LinearGradient>
            <FlatList
                style={styles.selectedAbilityList}
                contentContainerStyle={{
                    paddingBottom: theme.spacing.large,
                    paddingTop: theme.spacing.small,
                    gap: theme.spacing.small,
                    marginBlock: 'auto',
                }}
                data={selectedClass.abilities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.selectedAbilityListItem}>
                        <Image
                            source={item.icon}
                            style={
                                Platform.OS === 'android' &&
                                ({ filter: [{ dropShadow: theme.shadows.dropShadow }] } as any)
                            }
                        />
                        <View style={styles.selectedAbilityListTextWrapper}>
                            <Text style={styles.selectedAbilityName}>{item.name.toUpperCase()}</Text>
                            <Text style={styles.selectedAbilityDescription}>{item.description}</Text>
                            <Text style={styles.selectedAbilityCost}>{`ABILITY COST: ${item.cost}`}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.selectedClassButtonWrapper}>
                <TextButton text='Back' type='cancel' onPress={() => setSelectedClass(null)} />
                <TextButton text={`PICK ${selectedClass.name}`} onPress={handlePlayerSelect} />
            </View>
        </View>
    );
};

export default ClassInfo;

const styles = StyleSheet.create({
    selectedClassWrapper: {
        flex: 1,
    },
    selectedClassName: {
        fontWeight: 600,
        fontSize: theme.fontSize.large,
        color: theme.colors.white,
        ...theme.shadows.textShadowBlack,
    },
    selectedAbilityList: {
        flex: 3,
        flexShrink: 1,
    },
    selectedAbilityListItem: {
        gap: theme.spacing.medium,
        padding: theme.spacing.small,
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: theme.shadows.bulge,
        backgroundColor: theme.colors.offwhite,
        borderRadius: 4,
        borderWidth: 2,
    },
    selectedAbilityIcon: {
        filter: [{ dropShadow: theme.shadows.dropShadow }],
    },
    selectedAbilityListTextWrapper: {
        flex: 1,
    },
    selectedAbilityName: {
        fontWeight: 600,
    },
    selectedAbilityDescription: {
        fontStyle: 'italic',
    },
    selectedAbilityCost: { fontWeight: 600 },
    selectedClassButtonWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        gap: theme.spacing.large,
    },
    selectedClassImageWrapper: {
        padding: theme.spacing.large,
        flex: 2,
        alignSelf: 'center',
        maxHeight: '35%',
        maxWidth: '60%',
        boxShadow: theme.shadows.pictureFrame,
        marginTop: theme.spacing.medium,
        marginInline: theme.spacing.small,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        borderWidth: 2,
    },

    selectedClassPicture: {
        alignSelf: 'center',
        filter: [{ dropShadow: theme.shadows.dropShadow }],
        resizeMode: 'contain',
        height: '100%',
    },
});

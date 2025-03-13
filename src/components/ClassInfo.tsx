import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { theme } from '../theme';
import TextButton from './TextButton';
import { GameClass } from '@/interfaces';

interface Props {
    selectedClass: GameClass;
    setSelectedClass: (arg: GameClass | null) => void;
    handlePlayerSelect: () => void;
}
const ClassInfo: React.FC<Props> = ({ selectedClass, setSelectedClass, handlePlayerSelect }) => {
    return (
        <View style={styles.selectedClassWrapper}>
            <Text style={styles.selectedClassName}>{selectedClass.name.toUpperCase()}</Text>
            <View style={styles.selectedClassImageWrapper}>
                <Image source={selectedClass.fullPicture} style={styles.selectedClassPicture} />
            </View>
            <FlatList
                style={styles.selectedAbilityList}
                contentContainerStyle={{ paddingBottom: theme.spacing.large }}
                data={selectedClass.abilities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.selectedAbilityListItem}>
                        <Image source={item.icon} style={styles.selectedAbilityIcon} />
                        <View style={styles.selectedAbilityListTextWrapper}>
                            <Text style={styles.selectedAbilityName}>{item.name.toUpperCase()}</Text>
                            <Text style={styles.selectedAbilityDescription}>{item.description}</Text>
                            <Text style={styles.selectedAbilityCost}>{`ABILITY COST: ${item.cost}`}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.selectedClassButtonWrapper}>
                <TextButton text='Tillbaka' type='cancel' onPress={() => setSelectedClass(null)} />
                <TextButton text={`Välj ${selectedClass.name}`} onPress={handlePlayerSelect} />
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
    },
    selectedAbilityList: {
        flex: 1,
    },
    selectedAbilityListItem: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    selectedAbilityIcon: {
        backgroundColor: 'red',
    },
    selectedAbilityListTextWrapper: {
        padding: theme.spacing.small,
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
        flex: 1,
    },

    selectedClassPicture: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});

import { Link } from 'expo-router';
import { View, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Link style={styles.button} href={'/classSelection'}>
                <Image source={require('./../assets/images/wizard.png')} />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    button: {
        aspectRatio: 1,
        width: 200,
        borderWidth: 10,
        borderColor: 'hotpink',
        borderRadius: 150,
        padding: 20,
        backgroundColor: 'white',
    },
});

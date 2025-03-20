import { useRouter } from 'expo-router';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Pressable style={styles.button} onPress={() => router.replace('/classSelection')}>
                <Image style={styles.image} source={require('./../assets/images/wizard.png')} />
            </Pressable>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        maxWidth: '100%',
    },
});

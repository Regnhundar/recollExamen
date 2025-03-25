import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Pressable, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { theme } from '@/src/theme';

export default function Index() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Bangers: require('../assets/fonts/Bangers-Regular.ttf'),
            });
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size='large' />;
    }
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Pressable style={styles.button} onPress={() => router.replace('/classSelection')}>
                <View style={styles.logoWrapper}>
                    <Text style={styles.emote}>⚔️</Text>
                    <Text style={styles.title}>
                        Recoll<Text style={styles.titleHighlight}>Action</Text>
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.playerOne,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.medium,
    },
    text: {
        color: 'white',
    },
    title: {
        fontFamily: 'Bangers',
        ...theme.shadows.textShadowBlack,
        fontSize: 46,
        color: theme.colors.playerOne,
        textAlign: 'center',
    },
    titleHighlight: {
        color: theme.colors.playerTwo,
    },

    button: {
        aspectRatio: 1,
        width: '100%',
        borderWidth: 3,
        borderRadius: '50%',
        padding: 20,
        backgroundColor: theme.colors.offwhite,
        boxShadow: theme.shadows.bulge,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        width: '100%',
    },
    emote: {
        fontSize: 130,
        textAlign: 'center',
    },
    image: {
        resizeMode: 'contain',
        maxWidth: '100%',
    },
});

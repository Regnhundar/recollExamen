import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                    navigationBarHidden: true,
                    statusBarHidden: true,
                    statusBarBackgroundColor: 'transparent',
                }}
            />
            <Stack.Screen
                name='game'
                options={{ headerShown: false, navigationBarHidden: true, statusBarHidden: true }}
            />
        </Stack>
    );
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthProvider } from '../components/src/context/authContext';


SplashScreen.preventAutoHideAsync();

const defaultHeaderOptions = {
  headerShown: true,
  headerTitle: () => (
    <Image 
      source={require("../assets/images/lumin-blacklogo.png")}
      style={{width: 110, height: 55, resizeMode: "contain" }} 
    />
  ),
  headerTitleAlign: 'center' as 'center',
  headerBackground: () => (
    <LinearGradient
      colors={["#4B7CCC", "#4B7CCC", "#4B7CCC"]}
      style={{ flex: 1 }}
    />
  ),
  headerTintColor: '#fff',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="welcome" options={defaultHeaderOptions} />
        <Stack.Screen name="login" options={defaultHeaderOptions} />
        <Stack.Screen name="register" options={defaultHeaderOptions}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={defaultHeaderOptions} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
  );
}

export { defaultHeaderOptions };

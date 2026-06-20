/**
 * App.tsx -- Root entry point for Beyond I.
 * Defines the navigation stack, registers all screens, and wraps the app
 * in the SafeAreaProvider. All new screens must be declared in RootStackParamList
 * and registered here.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { PathRevealScreen } from './src/screens/PathRevealScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { GuideScreen } from './src/screens/GuideScreen';
import { TransitionProvider } from './src/context/TransitionContext';
import { TransitionOverlay } from './src/components/TransitionOverlay';

export type RootStackParamList = {
  Welcome: undefined;
  Quiz: undefined;
  PathReveal: { answers: import('./src/types').QuizAnswer[] };
  Home: undefined;
  Guide: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <TransitionProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false, animation: 'fade' }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="PathReveal" component={PathRevealScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Guide" component={GuideScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <TransitionOverlay />
      </TransitionProvider>
    </SafeAreaProvider>
  );
}

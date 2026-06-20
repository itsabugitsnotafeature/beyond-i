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

export type RootStackParamList = {
  Welcome: undefined;
  Quiz: undefined;
  PathReveal: undefined;
  Home: undefined;
  Guide: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="PathReveal" component={PathRevealScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Guide" component={GuideScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

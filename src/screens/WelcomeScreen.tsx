/**
 * WelcomeScreen.tsx -- First screen the user sees on app launch.
 * Sets the tone for the Beyond I experience and begins the user journey
 * toward the onboarding quiz.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export function WelcomeScreen({ navigation }: Props) {
  const go = useNavigateWithTransition(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beyond I</Text>
      <Text style={styles.subtitle}>A platform for inner transformation</Text>
      <TouchableOpacity style={styles.button} onPress={() => go('Quiz')}>
        <Text style={styles.buttonText}>Begin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#7C6AF7',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

/**
 * PathRevealScreen.tsx -- Phase 3 (BLOOM): AI-generated path reveal.
 * Receives quiz answers, calls the OpenAI service, and streams the personalized
 * Beyond I Path to the user in real time. Acts as the bridge between the quiz
 * and the home screen.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PathReveal'>;
};

export function PathRevealScreen({ navigation }: Props) {
  const go = useNavigateWithTransition(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>PHASE 3 — BLOOM</Text>
      <Text style={styles.title}>Your Path</Text>
      <Text style={styles.subtitle}>
        AI-generated personalized path will stream here.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => go('Home')}>
        <Text style={styles.buttonText}>See your path →</Text>
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
  label: {
    fontSize: 11,
    color: '#7C6AF7',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#7C6AF7',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
